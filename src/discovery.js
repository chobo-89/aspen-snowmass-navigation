import winterIcon from './assets/season-winter.svg?raw';
import summerIcon from './assets/season-summer.svg?raw';
import {categoryLabels,destination,initialDiscovery,optionsFor,transition} from './discovery-data.js';
export const icon=id=>`<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
const out=(path,label,cls='cascade-link')=>`<a class="${cls}" href="${destination(path)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
export function prepareDiscovery(root){
 const $=s=>root.querySelector(s);
 const original={logo:$('.primary-navigation__home-link'),book:$('.primary-navigation__book-now__container'),account:$('.header-account'),cart:$('.header-cart'),searchButton:$('.header-search__trigger'),menu:$('.header__primary-navigation__trigger'),weather:$('.weather-widget__panel'),search:$('.header-search__panel')};
 const symbols=root.firstElementChild,main=$('main');
 const shell=document.createElement('div');shell.className='cascade-shell';
 shell.innerHTML=`<header class="cascade-header"><div class="cascade-brand"></div><div class="cascade-menu"></div><div class="cascade-global"><div class="cascade-season" role="group" aria-label="Navigation season"><div class="cascade-season-options"><button type="button" data-season="winter" aria-pressed="true">${winterIcon} Winter</button><button type="button" data-season="summer" aria-pressed="false">${summerIcon} Summer</button></div></div><div class="cascade-accounts"></div><button class="cascade-weather-badge" data-weather aria-label="Weather, 34 degrees Fahrenheit"><span>34°F</span>${icon('sun')}</button></div><div class="cascade-book"></div></header>
 <div class="cascade-scrim" aria-hidden="true"></div>
 <section class="cascade-nav" role="dialog" aria-modal="true" aria-label="Explore Aspen Snowmass" id="cascade-navigation" aria-hidden="true" inert>
  <div class="cascade-columns">
   <nav class="cascade-panel cascade-categories" aria-label="Explore categories"><p class="cascade-eyebrow">Aspen Snowmass / Explore</p><h2>Find your<br>kind of day.</h2><div data-category-list></div><div class="cascade-secondary">${out('/discover/who-we-are','About Us')}${out('/discover/guest-services','Contact Us')}</div><div class="cascade-compact-accounts"></div></nav>
   <nav class="cascade-panel cascade-options" id="cascade-options" aria-label="Category options" inert><button type="button" class="cascade-back" data-back="category">${icon('chevron-right')} All destinations</button><div data-options></div></nav>
   <section class="cascade-panel cascade-context" id="cascade-context" aria-label="Selected experience" inert><div data-context></div></section>
  </div>
  <nav class="cascade-utilities" aria-label="Mountain utilities"><span class="cascade-eyebrow">On the mountain</span><button type="button" data-utility="maps">Trail Maps</button><button type="button" data-weather>Weather <span>34°F</span></button>${out('/four-mountains/mountain-cams','Mountain Cameras')}<button type="button" data-utility="lifts">Lift Status</button>${out('/visit/parking-and-getting-around','Parking')}</nav>
  <section class="cascade-utility-sheet" aria-label="Choose a mountain" hidden><div><h2 tabindex="-1"></h2><button type="button" data-close-utility aria-label="Close mountain chooser">${icon('close')}</button></div><ul></ul></section>
 </section><p class="cascade-announcement" role="status" aria-live="polite"></p>`;
 shell.querySelector('.cascade-brand').append(original.logo);original.logo.setAttribute('aria-label','Aspen Snowmass');
 shell.querySelector('.cascade-menu').append(original.menu);original.menu.setAttribute('aria-controls','cascade-navigation');
 shell.querySelector('.cascade-book').append(original.book);original.book.classList.remove('primary-navigation__book-now__container');
 shell.querySelector('.cascade-global').prepend(original.searchButton);
 shell.querySelector('.cascade-accounts').append(original.account,original.cart);
 for(const source of [original.account,original.cart]){const link=source.cloneNode(true);link.insertAdjacentHTML('beforeend',`<span>${source.getAttribute('aria-label')}</span>`);shell.querySelector('.cascade-compact-accounts').append(link);}
 original.weather.classList.add('cascade-weather-panel');original.weather.setAttribute('role','dialog');original.weather.setAttribute('aria-label','Weather report');original.weather.setAttribute('aria-modal','true');original.weather.inert=true;
 original.search.setAttribute('role','dialog');original.search.setAttribute('aria-label','Search Aspen Snowmass');original.search.setAttribute('aria-modal','true');original.search.inert=true;
 [...root.children].forEach(el=>{if(el!==symbols&&el!==main)el.remove();});root.prepend(shell);root.append(original.search,original.weather);root.classList.add('cascade-app');
 let season='winter';try{season=localStorage.getItem('aspen-exploration-c-season')||'winter';}catch{}
 let state=initialDiscovery(season);
 function render(previous){
  const labels=categoryLabels(state.season),category=labels.find(x=>x.id===state.category),options=optionsFor(state.category,state.season),selected=options.find(x=>x.id===state.option);
  root.dataset.season=state.season;root.dataset.depth=state.option?'3':state.category?'2':'1';root.classList.toggle('cascade-open',state.open);
  $('.cascade-nav').setAttribute('aria-hidden',String(!state.open));
  root.querySelectorAll('button[data-season]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.season===state.season)));
  if(!previous||previous.season!==state.season){
   $('[data-category-list]').innerHTML=labels.map((g,i)=>`<div class="cascade-category-row"><button type="button" data-category="${g.id}" aria-controls="cascade-options" aria-expanded="false"><span class="cascade-number">0${i+1}</span><span class="cascade-category-title">${g.label}</span>${icon('chevron-right')}</button></div>`).join('');
   const hero=$('.homepage-masthead__image img');hero.src=state.season==='summer'?'/assets/landscape-summer.jpg':'/assets/b0d40a0e609af349.jpg';hero.alt=state.season==='summer'?'Summer morning and wildflowers at Aspen Mountain':'Snowy peaks of the Maroon Bells on a bluebird winter day';
  }
  root.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===state.category;b.setAttribute('aria-expanded',String(active));b.classList.toggle('selected',active);});
  if(!previous||previous.category!==state.category||previous.season!==state.season){
   $('[data-options]').innerHTML=category?`<p class="cascade-eyebrow">${category.subtitle}</p><h2 tabindex="-1">${category.label}</h2><ul>${options.map((o,i)=>`<li><button type="button" data-option="${o.id}" aria-expanded="false" aria-controls="cascade-context"><span class="cascade-number">0${i+1}</span><span>${o.label}</span>${icon('chevron-right')}</button></li>`).join('')}</ul>${state.category==='mountains'?out('/four-mountains'+(state.season==='summer'?'/summer':''),'Compare Mountains '+icon('chevron-right'),'cascade-compare'):''}`:'';
  }
  root.querySelectorAll('[data-option]').forEach(b=>{const active=b.dataset.option===state.option;b.setAttribute('aria-expanded',String(active));b.classList.toggle('selected',active);});
  if(!previous||previous.option!==state.option||previous.category!==state.category||previous.season!==state.season){
   $('[data-context]').innerHTML=selected?`<div class="cascade-context-inner"><img class="cascade-context-image" src="${selected.image}" alt="${selected.alt}"><div class="cascade-context-top"><button type="button" class="cascade-back" data-back="option">${icon('chevron-right')} ${category.label}</button><span class="cascade-eyebrow">${state.season} / Aspen Snowmass</span></div><div class="cascade-profile"><p class="cascade-eyebrow">${selected.draft?'Draft mountain profile':category.label}</p><h2 tabindex="-1">${selected.label}</h2><p class="cascade-personality">${selected.tagline}</p><p class="cascade-description">${selected.body}</p><dl>${selected.facts.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><a class="btn btn--secondary btn--outline cascade-cta" href="${selected.href}" target="_blank" rel="noopener noreferrer">${selected.cta}</a></div></div>`:'';
  }
 }
 render();
 return {get state(){return state;},dispatch(event){const previous=state;state=transition(state,event);render(previous);if(event.type==='SEASON'){try{localStorage.setItem('aspen-exploration-c-season',state.season);}catch{}$('.cascade-announcement').textContent=`${state.season==='winter'?'Winter':'Summer'} selected. Navigation, mountain profiles and imagery updated.`;}return previous;}};
}
