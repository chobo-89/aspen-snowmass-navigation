/** Original booking behavior with an independent immersive navigation controller. */
export function initializeNavigation(root,model) {
  const controller=new AbortController();
  const on=(el,event,fn)=>el?.addEventListener(event,fn,{signal:controller.signal});
  const $=(s,el=root)=>el.querySelector(s);
  const $$=(s,el=root)=>[...el.querySelectorAll(s)];
  let savedScroll=0,bookOpen=null,menuOpen=false,childOpen=false,opener=null,panelOpener=null,auxiliary=null;
  let menuAnimation;
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate=(el,frames,duration=400,delay=0)=>el.animate(frames,{duration:reduced()?0:duration,delay:reduced()?0:delay,easing:'cubic-bezier(.455,.03,.515,.955)'});
  const nav=$('.immersive-overlay'),header=$('.immersive-header'),main=$('main'),season=$('.immersive-season');
  const menuTrigger=$('.header__primary-navigation__trigger'),book=$('.book-now__container');
  const search=$('.header-search__panel'),weather=$('.immersive-weather-panel'),picker=$('.immersive-operation-picker');
  book.classList.remove('primary-navigation__book-now__container');
  function lock() {
    if (document.body.style.position !== 'fixed') {
      savedScroll = scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScroll}px`;
      document.body.style.overflowY = 'scroll';
      document.body.style.width = '100%';
    }
  }
  function unlock() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflowY = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScroll);
  }
  function closeBook(restoreFocus = false) {
    if (!bookOpen) return;
    const state = bookOpen;
    bookOpen = null;
    state.trigger.setAttribute('aria-expanded', 'false');
    state.overlay.classList.remove('active');
    const anim = animate(state.popup, [{ height: state.popup.offsetHeight + 'px' }, { height: '0px' }]);
    anim.onfinish = () => { state.popup.classList.remove('active'); state.popup.style.height = ''; };
    if (state.locks) unlock();
    if (restoreFocus) state.trigger.focus();
  }
  $$('.book-now__container').forEach(container => {
    const trigger = $('.book-now__trigger', container);
    const popup = $('.book-now__popup', container);
    const overlay = $('.book-now__overlay', container);
    on(trigger, 'click', event => {
      event.stopPropagation();
      if (bookOpen?.container === container) return closeBook();
      closeBook();
      popup.getAnimations().forEach(a => a.cancel());
      popup.style.height = '';
      const height = popup.offsetHeight;
      popup.style.height = height + 'px';
      const locks = !container.classList.contains('primary-navigation__book-now__container');
      bookOpen = {container, trigger, popup, overlay, locks};
      trigger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('active');
      popup.classList.add('active');
      animate(popup, [{ height: '0px' }, { height: height + 'px' }]);
      if (locks) lock();
      if (event.detail === 0) $('a', popup)?.focus();
    });
    on(overlay, 'click', event => { event.stopPropagation(); closeBook(); });
    on(trigger, 'keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); trigger.click(); }
    });
    on(popup, 'keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      if (event.key === 'Escape') return closeBook(true);
      const links = $$('a', popup), index = links.indexOf(document.activeElement);
      links[(index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length].focus();
    });
  });
  on(window, 'click', () => closeBook());
  const focusable=scope=>$$('a,button,input,[tabindex="0"]',scope).filter(e=>!e.disabled&&!e.closest('[inert]')&&e.getClientRects().length&&getComputedStyle(e).visibility==='visible');
  function refresh(){
    main.inert=menuOpen||!!auxiliary;
    nav.inert=!menuOpen||!!auxiliary;header.inert=!!auxiliary;season.inert=!!auxiliary;
    document.documentElement.style.overflowY=menuOpen||auxiliary?'hidden':'';
  }
  function setChild(open){
    childOpen=open;nav.classList.toggle('has-child',open);
    if(innerWidth<1280)$$('[data-category]').forEach(b=>b.setAttribute('aria-expanded',String(open&&b.dataset.category===model.category)));
    $('.immersive-categories').inert=open&&innerWidth<1280;
    $('.immersive-detail').inert=!open&&innerWidth<1280;
    if(open){$('.immersive-detail').scrollTop=0;requestAnimationFrame(()=>{if(childOpen)$('[data-detail] h2')?.focus({preventScroll:true});});}
    else if(innerWidth<1280)$(`.immersive-categories [data-category="${model.category}"]`)?.focus({preventScroll:true});
  }
  function closePicker(restore=true){picker.hidden=true;$('.immersive-layout').inert=false;$('.immersive-operations').inert=false;if(restore)panelOpener?.focus({preventScroll:true});}
  function setMenu(open,id=null,source=menuTrigger){
    closeBook();closePicker(false);menuAnimation?.cancel();
    if(open&&!menuOpen)opener=source;
    menuOpen=open;root.classList.toggle('immersive-open',open);header.classList.toggle('solid',open);
    menuTrigger.classList.toggle('is-open',open);menuTrigger.setAttribute('aria-expanded',String(open));menuTrigger.setAttribute('aria-label',open?'Close Navigation':'Open Navigation');
    book.classList.toggle('primary-navigation__book-now__container',open);
    nav.setAttribute('aria-hidden',String(!open));refresh();
    if(open){nav.classList.add('active');model.render(id||model.category);setChild(innerWidth>=1280||!!id);menuAnimation=animate(nav,[{opacity:0,transform:'translateY(-16px)'},{opacity:1,transform:'translateY(0)'}],innerWidth>=1280?400:300);if(innerWidth>=1280)menuTrigger.focus({preventScroll:true});}
    else{model.render(model.category);childOpen=false;menuAnimation=animate(nav,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-16px)'}],innerWidth>=1280?400:300);menuAnimation.onfinish=()=>{if(!menuOpen)nav.classList.remove('active','has-child');};const target=opener?.isConnected?opener:innerWidth>=1280?$('.immersive-primary [data-category="'+model.category+'"]'):menuTrigger;target.focus({preventScroll:true});}
  }
  function closeAux(){
    if(!auxiliary)return;const panel=auxiliary;auxiliary=null;
    panel.style.visibility='';panel.style.opacity='';panel.style.pointerEvents='';panel.inert=true;panel.classList.remove('header-search__panel--open');
    refresh();panelOpener?.focus({preventScroll:true});
  }
  function openAux(panel,trigger){
    closeBook();panelOpener=trigger;auxiliary=panel;panel.inert=false;panel.style.visibility='visible';panel.style.opacity='1';panel.style.pointerEvents='auto';
    if(panel===search){panel.classList.add('header-search__panel--open');const box=$('.header-search__box');box.style.transform='translateY(0)';box.style.opacity='1';}
    else{$('.weather-widget__panel-box').style.transform='translateX(0)';$('.weather-widget__panel-close').style.opacity='1';}
    refresh();(panel===search?$('input',panel):$('.weather-widget__panel-close')).focus({preventScroll:true});
  }
  on(menuTrigger,'click',event=>{event.stopPropagation();setMenu(!menuOpen);});
  on($('.immersive-mega-close'),'click',()=>setMenu(false));
  on($('.immersive-scrim'),'click',()=>setMenu(false));
  on($('.immersive-back'),'click',()=>setChild(false));
  on($('.immersive-detail'),'transitionend',event=>{if(event.target===$('.immersive-detail')&&event.propertyName==='transform'&&childOpen&&menuOpen)$('[data-detail] h2')?.focus({preventScroll:true});});
  on(root,'click',event=>{
    const category=event.target.closest('[data-category]');
    if(category){const primary=!!category.closest('.immersive-primary');if(primary)opener=category;if(primary&&menuOpen&&model.category===category.dataset.category){setMenu(false);return;}if(!menuOpen)setMenu(true,category.dataset.category,category);else{closeBook();closePicker(false);model.render(category.dataset.category);setChild(true);}return;}
    const seasonButton=event.target.closest('button[data-season]');
    if(seasonButton){closeBook();closePicker(false);model.setSeason(seasonButton.dataset.season);refresh();return;}
    const operation=event.target.closest('[data-operation]');
    if(operation){
      panelOpener=operation;const type=operation.dataset.operation;picker.querySelector('h2').textContent=type==='maps'?'Choose your trail map':'Choose your lift report';
      picker.querySelector('ul').innerHTML=model.operationLinks(type).map(l=>`<li><a class="immersive-link" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a></li>`).join('');
      picker.hidden=false;$('.immersive-layout').inert=true;$('.immersive-operations').inert=true;picker.querySelector('h2').focus({preventScroll:true});return;
    }
  });
  const preview=event=>{const row=event.target.closest('[data-mountain]');if(row)model.previewMountain(+row.dataset.mountain);};
  on(root,'pointerover',preview);on(root,'focusin',preview);
  on($('.immersive-picker-close'),'click',()=>closePicker());
  on($('.header-search__trigger'),'click',event=>openAux(search,event.currentTarget));
  on($('.immersive-weather'),'click',event=>openAux(weather,event.currentTarget));
  on($('.header-search__close'),'click',closeAux);on($('.weather-widget__panel-close'),'click',closeAux);
  on(search,'click',event=>{if(event.target===search)closeAux();});on(weather,'click',event=>{if(event.target===weather)closeAux();});
  on($('.immersive-brand a'),'click',event=>{event.preventDefault();if(menuOpen)setMenu(false);window.scrollTo({top:0,behavior:reduced()?'instant':'smooth'});});
  on(document,'keydown',event=>{
    if(event.key==='Escape'){
      event.preventDefault();if(bookOpen)closeBook(true);else if(auxiliary)closeAux();else if(!picker.hidden)closePicker();else if(menuOpen&&childOpen&&innerWidth<1280)setChild(false);else if(menuOpen)setMenu(false);
    }
    if(event.key==='Tab'&&(menuOpen||auxiliary||bookOpen)){
      let scopes=auxiliary?[auxiliary]:bookOpen?[bookOpen.trigger,bookOpen.popup]:!picker.hidden?[picker]:[header,nav];
      const controls=scopes.flatMap(el=>el.matches('button,a,input')?[el]:focusable(el));
      if(!controls.length)return;
      event.preventDefault();
      const active=document.activeElement,index=controls.indexOf(active);
      if(index>=0)controls[(index+(event.shiftKey?-1:1)+controls.length)%controls.length].focus();
      else {
        const candidates=controls.filter(el=>active.compareDocumentPosition(el)&(event.shiftKey?Node.DOCUMENT_POSITION_PRECEDING:Node.DOCUMENT_POSITION_FOLLOWING));
        (event.shiftKey?candidates.at(-1)||controls.at(-1):candidates[0]||controls[0]).focus();
      }
    }
  });
  let compact=innerWidth<1280;
  on(window,'resize',()=>{if(compact!==(innerWidth<1280)){compact=innerWidth<1280;closeAux();if(menuOpen)setMenu(false);$('.immersive-categories').inert=false;$('.immersive-detail').inert=compact;}});
  const scrolled=()=>header.classList.toggle('scrolled',scrollY>40);on(window,'scroll',scrolled);scrolled();
  $('.immersive-detail').inert=compact;
  return()=>{controller.abort();menuAnimation?.cancel();main.inert=false;document.documentElement.style.overflowY='';if(bookOpen?.locks)unlock();};
}
