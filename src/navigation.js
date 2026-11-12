/** Interaction logic reconstructed from the observed site and its public menu scripts.
 * Source styling and markup live separately so subsequent design tweaks are easy to isolate.
 */
export function initializeNavigation(root) {
  const controller = new AbortController();
  const on = (el, event, fn) => el?.addEventListener(event, fn, { signal: controller.signal });
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const desktop = () => innerWidth >= 1024;
  const nav = $('.primary-navigation');
  const mobile = $('.primary-navigation-mobile');
  const menuTrigger = $('.header__primary-navigation__trigger');
  let savedScroll = 0;
  let bookOpen = null;
  let menuOpen = false;
  let menuAnimation;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = (el, frames, duration = 400, delay = 0) => el.animate(frames, {
    duration: reducedMotion ? 0 : duration, delay: reducedMotion ? 0 : delay,
    easing: 'cubic-bezier(.455,.03,.515,.955)',
  });
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
  function setMenu(open, focus = true) {
    closeBook();
    menuOpen = open;
    menuAnimation?.cancel();
    menuTrigger.setAttribute('aria-expanded', String(open));
    menuTrigger.setAttribute('aria-label', open ? 'Close Navigation' : 'Open Navigation');
    document.documentElement.style.overflowY = open ? 'hidden' : '';
    if (desktop()) {
      if (open) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        nav.classList.add('active');
        menuAnimation = animate(nav, [{ width: '0%' }, { width: '100%' }]);
        const controls = $$('.primary-navigation__controls > *');
        controls.forEach((el, i) => animate(el, [{opacity:0,transform:'translateX(10%)'}, {opacity:1,transform:'translateX(0)'}], 300, 66+(controls.length-1-i)*100));
        $$('.primary-navigation-items__item', nav).forEach((el, i) => animate(el, [{opacity:0,transform:'translateX(5%)'}, {opacity:1,transform:'translateX(0)'}], 300, 200+i*80));
        if (focus) $('.primary-navigation__close-trigger').focus();
      } else {
        menuAnimation = animate(nav, [{width:'100%'},{width:'0%'}]);
        menuAnimation.onfinish = () => nav.classList.remove('active');
        if (focus) menuTrigger.focus();
      }
    } else {
      menuTrigger.classList.toggle('is-open', open);
      mobile.setAttribute('aria-hidden', String(!open));
      mobile.setAttribute('tabindex', open ? '0' : '-1');
      if (open) {
        mobile.classList.add('active');
        menuAnimation = animate($('.primary-navigation-mobile__inner'), [{transform:'translateY(100%)'},{transform:'translateY(0)'}], 300);
      } else {
        menuAnimation = animate($('.primary-navigation-mobile__inner'), [{transform:'translateY(0)'},{transform:'translateY(100%)'}], 300);
        menuAnimation.onfinish = () => {
          mobile.classList.remove('active', 'child-list-active');
          $('.primary-navigation-mobile__child-container').classList.remove('active');
          $('.primary-navigation-mobile__child-container').setAttribute('aria-hidden','true');
        };
      }
    }
  }
  on(menuTrigger, 'click', () => setMenu(!menuOpen));
  on($('.primary-navigation__close-trigger'), 'click', () => setMenu(false));
  const child = $('.primary-navigation-mobile__child-container');
  function setChild(open) {
    mobile.classList.toggle('child-list-active', open);
    child.classList.toggle('active', open);
    child.setAttribute('aria-hidden', String(!open));
    child.setAttribute('tabindex', open ? '0' : '-1');
  }
  $$('.primary-navigation-mobile__main-link > button').forEach(b => on(b, 'click', event => {event.stopPropagation(); setChild(true);}));
  on($('.primary-navigation-mobile__child-list-close-trigger'), 'click', event => {event.stopPropagation(); setChild(false);});
  $$('.primary-navigation__home-link,.primary-navigation-mobile__home-link,.header__home-link').forEach(link => on(link,'click', event => {
    event.preventDefault(); if (menuOpen) setMenu(false); window.scrollTo({top:0,behavior:'smooth'});
  }));
  // Preserve the source map's visual context. Live map panning/zooming is intentionally
  // excluded from this navigation prototype; the four mountain links remain real links.
  const mountainItems = $$('.interactive-map__navigation-link', nav);
  mountainItems.forEach(item => {
    const active = () => {mountainItems.forEach(x => x.classList.remove('active'));item.classList.add('active');};
    on(item, 'mouseenter', active); on(item, 'focusin', active);
  });
  const points = [[83,52], [64,54], [49,43], [19,37]];
  const spots = $('.prototype-map-hotspots');
  spots.replaceChildren();
  mountainItems.slice(1).forEach((item, i) => {
    const source = $('a',item), link = document.createElement('a');
    link.href = source.href; link.target='_blank';link.rel='noopener noreferrer';
    link.className='prototype-map-hotspot';link.style.left=points[i][0]+'%';link.style.top=points[i][1]+'%';
    link.setAttribute('aria-label',source.textContent.trim());
    const label = document.createElement('span'); label.textContent=source.textContent.trim();link.append(label);spots.append(link);
    on(link,'mouseenter',()=>{mountainItems.forEach(x=>x.classList.remove('active'));item.classList.add('active');});
  });
  const search = $('.header-search__panel');
  function closeSearch() {search.style.visibility='';search.style.opacity='';search.classList.remove('header-search__panel--open'); if(!menuOpen)document.documentElement.style.overflowY='';}
  function openSearch() {
    if (menuOpen) setMenu(false, false);
    search.style.visibility='visible';search.style.opacity='1';search.classList.add('header-search__panel--open');
    const box = $('.header-search__box');box.style.transform='translateY(0)';box.style.opacity='1';
    document.documentElement.style.overflowY='hidden';$('input', search).focus();
  }
  on($('.header-search__trigger'),'click',openSearch);
  on($('.primary-navigation__search__trigger'),'click',openSearch);
  on($('.header-search__close'),'click',closeSearch);
  on(search,'click',event=>{if(event.target===search)closeSearch();});
  const weather = $('.weather-widget');
  const panel = $('.weather-widget__panel');
  function toggleWeather() {
    weather.classList.toggle('active');
    const open=weather.classList.contains('active');
    panel.style.visibility=open?'visible':'';panel.style.opacity=open?'1':'';panel.style.pointerEvents=open?'auto':'';
    $('.weather-widget__panel-close').style.opacity=open?'1':'0';
    $('.weather-widget__panel-box').style.transform=open?'translateX(0)':'';
  }
  $$('.weather-widget__trigger').forEach(b=>on(b,'click',toggleWeather));
  on($('.weather-widget__panel-close'),'click',toggleWeather);
  on(document,'keydown',event=>{
    if(event.key==='Escape') {
      if(bookOpen)closeBook(true);
      else if(search.style.visibility==='visible')closeSearch();
      else if(weather.classList.contains('active'))toggleWeather();
      else if(menuOpen)setMenu(false);
    }
    if(event.key==='Tab'&&menuOpen&&desktop()) {
      const scope=bookOpen?.popup||nav;
      const controls=$$('a,button,input,[tabindex="0"]',scope).filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility==='visible');
      if(event.shiftKey&&document.activeElement===controls[0]){event.preventDefault();controls.at(-1)?.focus();}
      else if(!event.shiftKey&&document.activeElement===controls.at(-1)){event.preventDefault();controls[0]?.focus();}
    }
  });
  const headerBook=$('.header__book-now__container');
  const sticky=()=>headerBook.classList.toggle('fixed',desktop()&&scrollY>1000);
  on(window,'scroll',sticky);
  let wasDesktop=desktop();
  on(window,'resize',()=>{if(wasDesktop!==desktop()) {
    closeBook();nav.classList.remove('active');mobile.classList.remove('active','child-list-active');
    menuOpen=false;menuTrigger.classList.remove('is-open');menuTrigger.setAttribute('aria-expanded','false');menuTrigger.setAttribute('aria-label','Open Navigation');
    mobile.setAttribute('aria-hidden','true');document.documentElement.style.overflowY='';wasDesktop=desktop();
  }sticky();});
  return () => {controller.abort();document.documentElement.style.overflowY='';if(bookOpen?.locks)unlock();};
}
