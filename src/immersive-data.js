const base='https://www.aspensnowmass.com';
export const destination=path=>path.startsWith('http')?path:base+path;
const link=(label,path)=>({label,href:destination(path)});
export const mountains=[
 {name:'Aspen Mountain',slug:'aspen-mountain',draft:'Town-to-summit energy',alt:'Aerial view of Aspen Mountain and its snowy ski runs'},
 {name:'Aspen Highlands',slug:'aspen-highlands',draft:'Big terrain. Independent spirit.',alt:'Aerial view of Aspen Highlands under blue skies'},
 {name:'Buttermilk',slug:'buttermilk',draft:'Room to find your confidence',alt:'Aerial view of Buttermilk on a snowy winter day'},
 {name:'Snowmass',slug:'snowmass',draft:'A whole world to explore',alt:'Aerial view of Snowmass beneath snow-covered peaks'},
];
export const seasons={
 winter:{sport:'Ski & Ride',intro:'Make the most of your mountain day.',sportLinks:[link('Passes & Lift Tickets','/visit/tickets-and-passes'),link('Lessons','/visit/lessons'),link('Rentals','/visit/rentals'),{label:'Trail Maps',action:'maps'},{label:'Lift Status',action:'lifts'},link('Mountain Cameras','/four-mountains/mountain-cams')]},
 summer:{sport:'Bike',intro:'Find your flow. Take the long way down.',sportLinks:[link('Lift Tickets','/visit/activities/summer/biking/snowmass-bike-park/tickets-and-passes'),link('Lessons','/visit/activities/summer/biking/bike-clinics-and-camps'),link('Rentals','/visit/activities/summer/biking/bike-rentals')]},
};
export const lodging=[link('Lodging','/visit/lodging'),link('Packages & Offers','/visit/packages-and-deals'),link('Vacation Advisors','/visit/vacation-advisors')];
export const things=season=>[link(season==='winter'?'Dining & Après':'Dining','/visit/dining'),link('Experiences','/discover/experiences'),link('Activities',`/visit/activities/${season}`),link('Events','/visit/events'),link('Shop','/visit/retail'),link('Arts & Culture','/discover/arts-and-culture'),link('Guides','/discover/experiences')];
export const categories=season=>[{id:'mountains',label:'Four Mountains'},{id:'sport',label:seasons[season].sport},{id:'lodging',label:'Lodging'},{id:'things',label:'Things to Do'}];
export const operationalLinks=(type,season)=>mountains.filter(m=>!(type==='maps'&&season==='summer')||m.slug==='snowmass').map(m=>link(type==='maps'&&season==='summer'?'Snowmass Bike Park':m.name,type==='maps'&&season==='summer'?'/visit/activities/summer/biking/mountain-bike-trails':`/four-mountains/${m.slug}/${type==='maps'?'trail-maps':'lift-status'}`));
