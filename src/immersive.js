import winterIcon from './assets/season-winter.svg?raw';
import summerIcon from './assets/season-summer.svg?raw';
import {categories,destination,mountains,seasons,lodging,things,operationalLinks} from './immersive-data.js';
export const icon=(id,cls='')=>`<svg class="${cls}" aria-hidden="true"><use href="#${id}"></use></svg>`;
const out=(href,label,cls='immersive-link')=>`<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
export function prepareImmersive(root){
 const take=selector=>root.querySelector(selector);
 const logo=take('.primary-navigation__home-link');
 const book=take('.primary-navigation__book-now__container');
 const account=take('.header-account'),cart=take('.header-cart'),searchTrigger=take('.header-search__trigger'),menu=take('.header__primary-navigation__trigger');
 const search=take('.header-search__panel'),weather=take('.weather-widget__panel');
 const hero=take('main');
 const markup=document.createElement('div');markup.className='immersive-shell';
 markup.innerHTML=`<header class="immersive-header"><div class="immersive-brand"></div><nav class="immersive-primary" aria-label="Primary navigation"></nav><div class="immersive-tools"><button class="immersive-weather" aria-label="Weather, 34 degrees Fahrenheit"><span>34°F</span>${icon('sun')}</button></div><div class="immersive-book"></div><div class="immersive-menu-control"></div></header><div class="immersive-scrim" aria-hidden="true"></div>
 <section class="immersive-overlay" id="immersive-navigation" role="dialog" aria-modal="true" aria-label="Explore Aspen Snowmass" aria-hidden="true" inert>
 <button class="immersive-mega-close" type="button" aria-label="Close navigation">${icon('close')}</button><div class="immersive-layout"><nav class="immersive-categories" aria-label="Explore categories"><p class="immersive-kicker">Aspen Snowmass / Explore</p><div data-categories></div><div class="immersive-secondary">${out(destination('/discover/who-we-are'),'About Us')}${out(destination('/discover/guest-services'),'Contact Us')}</div></nav><div class="immersive-detail"><button class="immersive-back" type="button">${icon('chevron-right')} All destinations</button><div data-detail></div></div></div>
 <div class="immersive-operations"><span class="immersive-kicker">On the mountain</span><button data-operation="maps">Trail Maps</button><button data-operation="lifts">Lift Status</button>${out(destination('/four-mountains/mountain-cams'),'Mountain Cameras')}${out(destination('/visit/parking-and-getting-around'),'Parking & Getting Around')}<span class="immersive-footer-secondary">${out(destination('/discover/who-we-are'),'About Us')}${out(destination('/discover/guest-services'),'Contact Us')}</span></div>
 <div class="immersive-operation-picker" hidden><div><h2 tabindex="-1"></h2><button class="immersive-picker-close" aria-label="Close mountain chooser">${icon('close')}</button></div><ul></ul></div></section>
 <div class="immersive-season" role="group" aria-label="Navigation season"><div class="immersive-season-options"><button type="button" data-season="winter" aria-pressed="true">${winterIcon} Winter</button><button type="button" data-season="summer" aria-pressed="false">${summerIcon} Summer</button></div></div><p class="immersive-announcement" role="status" aria-live="polite"></p>`;
 // Move original interactive components, rather than recreating their internals.
 logo.setAttribute('aria-label','Aspen Snowmass');
 markup.querySelector('.immersive-brand').append(logo);
 markup.querySelector('.immersive-book').append(book);
 markup.querySelector('.immersive-tools').prepend(markup.querySelector('.immersive-season'));
 markup.querySelector('.immersive-tools').append(account,cart,searchTrigger);
 markup.querySelector('.immersive-tools').before(markup.querySelector('.immersive-weather'));
 const compactUtilities=document.createElement('div');compactUtilities.className='immersive-compact-utilities';
 for(const source of [account,cart]){const link=source.cloneNode(true);link.insertAdjacentHTML('beforeend',`<span>${source.getAttribute('aria-label')}</span>`);compactUtilities.append(link);}
 markup.querySelector('.immersive-categories').append(compactUtilities);
 markup.querySelector('.immersive-menu-control').append(menu);
 menu.setAttribute('aria-controls','immersive-navigation');
 weather.classList.add('immersive-weather-panel');weather.setAttribute('role','dialog');weather.setAttribute('aria-label','Weather report');weather.setAttribute('aria-modal','true');weather.inert=true;
 search.inert=true;search.setAttribute('role','dialog');search.setAttribute('aria-label','Search Aspen Snowmass');search.setAttribute('aria-modal','true');
 const symbols=root.firstElementChild;
 // Keep the source SVG definitions and hero, discard only the replaced navigation surfaces.
 [...root.children].forEach(el=>{if(el!==symbols&&el!==hero)el.remove();});
 root.prepend(markup);root.append(search,weather);
 const header=markup.querySelector('.immersive-header');
 let season='winter';try{season=localStorage.getItem('aspen-exploration-b-season')==='summer'?'summer':'winter';}catch{}
 let category='mountains';
 function paint(){
  root.dataset.season=season;
  root.querySelectorAll('[data-season]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.season===season)));
  const controls=categories(season).map((g,i)=>`<button type="button" data-category="${g.id}" aria-expanded="false" aria-controls="immersive-navigation"><span class="category-number">0${i+1}</span><span>${g.label}</span>${icon('chevron-right')}</button>`).join('');
  root.querySelector('.immersive-primary').innerHTML=controls;
  root.querySelector('[data-categories]').innerHTML=controls;
  render(category,false);
 }
 function render(id,moveFocus=false){
  category=id;
  root.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category===id);b.setAttribute('aria-expanded',String(root.classList.contains('immersive-open')&&(innerWidth>=1280||root.querySelector('.immersive-overlay').classList.contains('has-child'))&&b.dataset.category===id));});
  const details=root.querySelector('[data-detail]');
  const names=categories(season);const group=names.find(g=>g.id===id);
  if(id==='mountains'){
   details.innerHTML=`<div class="mountain-discovery"><div class="mountain-index"><p class="immersive-kicker">Four personalities. One destination.</p><h2 tabindex="-1">Find your <br>mountain.</h2><ul>${mountains.map((m,i)=>`<li data-mountain="${i}">${out(destination('/four-mountains/'+m.slug),`<span class="mountain-number">0${i+1}</span><span><strong>${m.name}</strong><small>Draft: ${m.draft}</small></span>${icon('chevron-right')}`)}</li>`).join('')}</ul>${out(destination('/four-mountains'),'Compare Mountains '+icon('chevron-right'),'immersive-compare')}</div><figure class="mountain-portrait"><img src="/assets/aspen-mountain.png" alt="${mountains[0].alt}"><figcaption><span class="immersive-kicker">01 / Four Mountains</span><h3>Aspen Mountain</h3>${out(destination('/four-mountains/aspen-mountain'),'Explore the mountain '+icon('chevron-right'),'portrait-link')}</figcaption></figure></div>`;
  }else{
   const links=id==='sport'?seasons[season].sportLinks:id==='lodging'?lodging:things(season);
   const intro=id==='sport'?seasons[season].intro:id==='lodging'?'A place to return to.':'Beyond the mountain. Into the moment.';
   details.innerHTML=`<div class="destination-discovery"><div><p class="immersive-kicker">${intro}</p><h2 tabindex="-1">${group.label}</h2><ul class="destination-links">${links.map(l=>`<li>${l.label==='Trail Maps'||l.label==='Lift Status'?`<button class="immersive-link" data-operation="${l.label==='Trail Maps'?'maps':'lifts'}">${l.label}</button>`:out(l.href,l.label)}</li>`).join('')}</ul></div><figure class="destination-portrait"><img src="/assets/${id==='sport'&&season==='winter'?'snowmass.png':id==='sport'?'summer-bike.jpg':'b0d40a0e609af349.jpg'}" alt="${id==='sport'&&season==='winter'?'Snowmass ski terrain':id==='sport'?'Bikers in the Snowmass Bike Park at sunset':'The Maroon Bells in winter'}"><figcaption><span class="immersive-kicker">${season==='winter'?'Winter':'Summer'} at Aspen Snowmass</span><p>${id==='sport'&&season==='summer'?'A new season.<br>A different rhythm.':id==='lodging'?'Stay a little<br>longer.':'More ways<br>to feel alive.'}</p>${season==='summer'&&id!=='sport'?'<small>Winter reference imagery</small>':''}</figcaption></figure></div>`;
  }
  if(moveFocus)details.querySelector('h2').focus({preventScroll:true});
 }
 paint();
 return {get season(){return season;},get category(){return category;},render,setSeason(value){if(value===season)return;season=value;try{localStorage.setItem('aspen-exploration-b-season',season);}catch{}paint();root.querySelector('.immersive-announcement').textContent=`${season==='winter'?'Winter':'Summer'} navigation selected.`;},previewMountain(index){const m=mountains[index];const portrait=root.querySelector('.mountain-portrait');if(!portrait)return;const img=portrait.querySelector('img');img.src=`/assets/${m.slug}.png`;img.alt=m.alt;portrait.querySelector('h3').textContent=m.name;portrait.querySelector('.immersive-kicker').textContent=`0${index+1} / Four Mountains`;portrait.querySelector('a').href=destination('/four-mountains/'+m.slug);root.querySelectorAll('[data-mountain]').forEach(e=>e.classList.toggle('active',+e.dataset.mountain===index));},operationLinks(type){return operationalLinks(type,season);}};
}
