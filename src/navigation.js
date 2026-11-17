import {operationalLinks} from './discovery-data.js';
/** The source booking block is retained; discovery is an independent state machine. */
export function initializeNavigation(root,model){
  const controller=new AbortController();
  const on=(el,event,fn)=>el?.addEventListener(event,fn,{signal:controller.signal});
  const $=(s,el=root)=>el.querySelector(s);
  const $$=(s,el=root)=>[...el.querySelectorAll(s)];
  const compact=()=>innerWidth<1100;
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate=(el,frames,duration=400,delay=0)=>el.animate(frames,{duration:reduced()?0:duration,delay:reduced()?0:delay,easing:'cubic-bezier(.455,.03,.515,.955)'});
  const nav=$('.cascade-nav'),columns=$('.cascade-columns'),header=$('.cascade-header'),shell=$('.cascade-shell'),main=$('main');
  const menuTrigger=$('.header__primary-navigation__trigger'),book=$('.book-now__container');
  const search=$('.header-search__panel'),weather=$('.cascade-weather-panel'),sheet=$('.cascade-utility-sheet');
  let savedScroll=0,bookOpen=null,auxiliary=null,auxOpener=null,utilityOpener=null,closingAnimation=null;
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
  function refresh(){
    const s=model.state,modal=!!auxiliary;
    main.inert=s.open||modal;shell.inert=modal;nav.inert=!s.open||modal;
    if(s.open&&!modal){shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','Explore Aspen Snowmass');}
    else{shell.removeAttribute('role');shell.removeAttribute('aria-modal');shell.removeAttribute('aria-label');}
    $('.cascade-categories').inert=!!s.utility||(compact()&&!!s.category);
    $('.cascade-options').inert=!!s.utility||!s.category||(compact()&&!!s.option);
    $('.cascade-context').inert=!!s.utility||!s.option;
    $('.cascade-utilities').inert=!!s.utility;
    document.documentElement.style.overflowY=s.open||modal?'hidden':'';
    menuTrigger.setAttribute('aria-expanded',String(s.open));menuTrigger.setAttribute('aria-label',s.open?'Close Navigation':'Open Navigation');menuTrigger.classList.toggle('is-open',s.open);
    header.classList.toggle('solid',s.open);book.classList.toggle('primary-navigation__book-now__container',s.open);
    nav.setAttribute('role','region');nav.removeAttribute('aria-modal');
    sheet.hidden=!s.utility;
  }
  function focusHeading(panel){
    panel.scrollTop=0;
    requestAnimationFrame(()=>{if(model.state.open&&!panel.inert)panel.querySelector('h2')?.focus({preventScroll:true});});
  }
  function go(event,source){
    closeBook();const previous=model.dispatch(event),s=model.state;
    if(s.open||event.type==='CLOSE'||event.type==='BACK')closingAnimation?.cancel();refresh();
    if(event.type==='OPEN'){
      nav.classList.add('active');
      animate(columns,[{opacity:0,transform:compact()?'translateY(16px)':'translateX(-24px)'},{opacity:1,transform:'translate(0)'}],compact()?300:400);
      requestAnimationFrame(()=>$('.cascade-categories [data-category]')?.focus({preventScroll:true}));
    }else if(event.type==='CLOSE'||(event.type==='BACK'&&!s.open)){
      closingAnimation=animate(columns,[{opacity:1,transform:'translate(0)'},{opacity:0,transform:compact()?'translateY(16px)':'translateX(-24px)'}],300);
      closingAnimation.onfinish=()=>{if(!model.state.open)nav.classList.remove('active');};
      menuTrigger.focus({preventScroll:true});
    }else if(event.type==='CATEGORY'){
      const panel=$('.cascade-options');animate(panel,[{opacity:0,transform:'translateX(-18px)'},{opacity:1,transform:'translateX(0)'}],300);focusHeading(panel);
    }else if(event.type==='OPTION'){
      if(s.option){const panel=$('.cascade-context');animate(panel,[{opacity:0,transform:'translateX(18px)'},{opacity:1,transform:'translateX(0)'}],260);focusHeading(panel);}
      else $(`[data-option="${previous.option}"]`)?.focus({preventScroll:true});
    }else if(event.type==='BACK'){
      if(previous.utility)utilityOpener?.focus({preventScroll:true});
      else if(previous.option)$(`[data-option="${previous.option}"]`)?.focus({preventScroll:true});
      else if(previous.category)$(`[data-category="${previous.category}"]`)?.focus({preventScroll:true});
    }else if(event.type==='UTILITY'){
      utilityOpener=source;
      sheet.querySelector('h2').textContent=s.utility==='maps'?'Choose your trail map':'Choose your lift report';
      sheet.querySelector('ul').innerHTML=operationalLinks(s.utility,s.season).map(l=>`<li><a class="cascade-link" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a></li>`).join('');
      sheet.querySelector('h2').focus({preventScroll:true});
    }
  }
  function closeAux(){
    if(!auxiliary)return;const panel=auxiliary;auxiliary=null;
    panel.style.visibility='';panel.style.opacity='';panel.style.pointerEvents='';panel.inert=true;panel.classList.remove('header-search__panel--open');
    refresh();auxOpener?.focus({preventScroll:true});
  }
  function openAux(panel,source){
    closeBook();auxiliary=panel;auxOpener=source;panel.inert=false;panel.style.visibility='visible';panel.style.opacity='1';panel.style.pointerEvents='auto';
    if(panel===search){panel.classList.add('header-search__panel--open');const box=$('.header-search__box');box.style.transform='translateY(0)';box.style.opacity='1';}
    else{$('.weather-widget__panel-box').style.transform='translateX(0)';$('.weather-widget__panel-close').style.opacity='1';}
    refresh();(panel===search?$('input',panel):$('.weather-widget__panel-close')).focus({preventScroll:true});
  }
  on(menuTrigger,'click',event=>{event.stopPropagation();go({type:model.state.open?'CLOSE':'OPEN'});});
  on($('.cascade-scrim'),'click',()=>go({type:'CLOSE'}));
  on(root,'click',event=>{
    const category=event.target.closest('button[data-category]');if(category){go({type:'CATEGORY',id:category.dataset.category},category);return;}
    const option=event.target.closest('button[data-option]');if(option){go({type:'OPTION',id:option.dataset.option},option);return;}
    const back=event.target.closest('[data-back]');if(back){go({type:'BACK'},back);return;}
    const season=event.target.closest('button[data-season]');if(season){go({type:'SEASON',season:season.dataset.season},season);return;}
    const utility=event.target.closest('[data-utility]');if(utility){go({type:'UTILITY',id:utility.dataset.utility},utility);return;}
    const weatherTrigger=event.target.closest('[data-weather]');if(weatherTrigger)openAux(weather,weatherTrigger);
  });
  on($('[data-close-utility]'),'click',()=>go({type:'BACK'}));
  on($('.header-search__trigger'),'click',event=>openAux(search,event.currentTarget));
  on($('.header-search__close'),'click',closeAux);on($('.weather-widget__panel-close'),'click',closeAux);
  on(search,'click',event=>{if(event.target===search)closeAux();});on(weather,'click',event=>{if(event.target===weather)closeAux();});
  on($('.cascade-brand a'),'click',event=>{event.preventDefault();if(model.state.open)go({type:'CLOSE'});window.scrollTo({top:0,behavior:reduced()?'instant':'smooth'});});
  const focusable=scope=>$$('a,button,input,[tabindex="0"]',scope).filter(e=>!e.disabled&&!e.closest('[inert]')&&e.getClientRects().length&&getComputedStyle(e).visibility==='visible');
  on(document,'keydown',event=>{
    if(event.key==='Escape'){
      event.preventDefault();if(bookOpen)closeBook(true);else if(auxiliary)closeAux();else if(model.state.open)go({type:'BACK'});
    }
    if(event.key==='Tab'&&(model.state.open||auxiliary||bookOpen)){
      const scopes=auxiliary?[auxiliary]:bookOpen?[bookOpen.trigger,bookOpen.popup]:model.state.utility?[sheet]:[header,nav];
      const controls=scopes.flatMap(el=>el.matches('button,a,input')?[el]:focusable(el));if(!controls.length)return;
      event.preventDefault();const active=document.activeElement,index=controls.indexOf(active);
      if(index>=0)controls[(index+(event.shiftKey?-1:1)+controls.length)%controls.length].focus();
      else{const candidates=controls.filter(el=>active.compareDocumentPosition(el)&(event.shiftKey?Node.DOCUMENT_POSITION_PRECEDING:Node.DOCUMENT_POSITION_FOLLOWING));(event.shiftKey?candidates.at(-1)||controls.at(-1):candidates[0]||controls[0]).focus();}
    }
  });
  on(window,'resize',refresh);
  const scrolled=()=>header.classList.toggle('scrolled',scrollY>40);on(window,'scroll',scrolled);scrolled();refresh();
  return()=>{controller.abort();closingAnimation?.cancel();main.inert=false;document.documentElement.style.overflowY='';if(bookOpen?.locks)unlock();};
}
