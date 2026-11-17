const base='https://www.aspensnowmass.com';
export const destination=path=>base+path;
const img=(name,alt)=>({image:'/assets/'+name,alt});
export const mountainIds=['aspen-mountain','aspen-highlands','buttermilk','snowmass'];
const names=['Aspen Mountain','Aspen Highlands','Buttermilk','Snowmass'];
const mountainCopy={
 winter:[
  ['Town-to-summit energy.','Step from downtown Aspen into steeper terrain, then return to the energy of town. A mountain for confident skiers and riders who like their days connected to it all.',['Best for','Confident skiers & riders'],['The feel','Steeps, then town']],
  ['Big terrain. Independent spirit.','Follow the pull of Highland Bowl, wide-open turns and a mountain with a character all its own. A strong choice for intermediate and expert skiers and riders.',['Best for','Intermediate & expert'],['The feel','Bowl laps & big views']],
  ['Room to find your confidence.','Make space for first turns, long groomers and a little play. Buttermilk brings a welcoming rhythm to progressing on snow, alongside its celebrated terrain parks.',['Best for','Learning & progression'],['The feel','Easygoing & playful']],
  ['A whole world to explore.','Find your own pace across expansive terrain, tree skiing and long groomers. Snowmass brings variety to a day shared by different abilities and ambitions.',['Best for','A mix of abilities'],['The feel','Variety & room to roam']],
 ],
 summer:[
  ['A summit above the everyday.','Ride the Silver Queen Gondola or follow the trails upward. Summit scenery, outdoor dining, yoga and live music offer a different way to spend a mountain day.',['Explore','Gondola & summit trails'],['The feel','Scenery, dining & music']],
  ['A quieter kind of altitude.','Trade winter crowds for a more self-directed mountain experience. Explore the quieter side of Highlands, with summer scenery setting the pace.',['Explore','Self-directed discovery'],['The feel','Quiet & independent']],
  ['Take the trail at your pace.','Discover hiking and biking without lift access, with Pyramid Peak views along the way. Buttermilk in summer is a self-powered escape into the landscape.',['Explore','Hiking & biking'],['Access','Self-powered · no lifts']],
  ['Find your flow. Then keep going.','Build a day around Snowmass Bike Park, gondola sightseeing or the Lost Forest. Summer brings a different kind of playground to the mountain.',['Explore','Bike Park & Lost Forest'],['The feel','Active & adventurous']],
 ],
};
export function mountainProfiles(season){return mountainIds.map((id,i)=>{
 const [tagline,body,fact1,fact2]=mountainCopy[season][i];
 return {id,label:names[i],tagline,body,facts:[fact1,fact2],cta:'Explore '+names[i],href:destination('/four-mountains/'+id+(season==='summer'?'/summer':'')),draft:true,...img(id+'-'+season+'.jpg',names[i]+' in '+season)};
});}
const item=(id,label,tagline,body,facts,cta,path,image,alt)=>({id,label,tagline,body,facts,cta,href:destination(path),...img(image,alt)});
export const categoryLabels=season=>[
 {id:'mountains',label:'Four Mountains',subtitle:'Four distinct personalities.'},
 {id:'sport',label:season==='winter'?'Ski & Ride':'Bike',subtitle:season==='winter'?'Find your mountain rhythm.':'Find a different kind of flow.'},
 {id:'lodging',label:'Lodging',subtitle:'Find your place to return to.'},
 {id:'things',label:'Things to Do',subtitle:'Let the day take you further.'},
];
export function optionsFor(category,season){
 if(category==='mountains')return mountainProfiles(season);
 if(category==='sport')return season==='winter'?[
  item('access','Passes & Lift Tickets','One ticket. Four mountains.','Choose the access that fits your time here. Explore lift tickets and season passes before deciding how much mountain to make your own.',[['Choose','Lift tickets or passes'],['Discover','All four mountains']],'Find passes & tickets','/visit/tickets-and-passes','tickets-winter.jpg','A guest collects a lift ticket at Snowmass'),
  item('lessons','Lessons','A little guidance. A whole new mountain.','Build confidence with an Aspen Snowmass Pro. Explore private and group lessons to find the support that matches your experience and goals.',[['Choose','Private or group'],['Focus','Confidence & progression']],'Explore lessons','/visit/lessons','lessons-winter.jpg','A ski instructor and young skiers at Aspen'),
  item('rentals','Rentals','Less to carry. More to explore.','Find skis, snowboards and the gear for your mountain day. Start with rental options, then choose the setup that suits how you want to ride.',[['Find','Ski & snowboard gear'],['Plan','Your mountain setup']],'Explore rentals','/visit/rentals','snowmass-winter.jpg','Winter terrain at Snowmass'),
 ]:[
  item('access','Lift Tickets','Take your day downhill.','Explore lift access for Snowmass Bike Park. Plan a day of purpose-built trails with the mountain doing the climbing between runs.',[['Explore','Snowmass Bike Park'],['Choose','Bike lift access']],'Find bike tickets','/visit/activities/summer/biking/snowmass-bike-park/tickets-and-passes','summer-bike.jpg','Bikers in Snowmass Bike Park at sunset'),
  item('lessons','Lessons','Find confidence on two wheels.','Build skills with bike clinics and camps. Explore the options for your riding experience before taking the next step on the trail.',[['Focus','Bike skills & progression'],['Choose','Clinics & camps']],'Explore bike lessons','/visit/activities/summer/biking/bike-clinics-and-camps','snowmass-summer.jpg','A rider in Snowmass Bike Park'),
  item('rentals','Rentals','Your ride starts here.','Find the bike and gear for your summer day. Explore rental options before heading to the Bike Park or discovering trails around the valley.',[['Find','Summer bike rentals'],['Explore','Park & valley riding']],'Explore bike rentals','/visit/activities/summer/biking/bike-rentals','summer-bike.jpg','Bikers in Snowmass Bike Park at sunset'),
 ];
 if(category==='lodging')return [
  item('stays','Lodging','Stay close to your kind of day.',season==='winter'?'Return from the snow to a place that feels like yours. Explore hotels, condominiums and stays in Aspen and Snowmass.':'Find a base for trail days, mountain views and time in town. Explore the places to stay across Aspen and Snowmass.',[['Choose','Aspen or Snowmass'],['Find','Hotels, condos & more']],'Find your stay','/visit/lodging','lodging-'+season+'.jpg','Lodging at Aspen Snowmass in '+season),
  item('offers','Packages & Offers','Bring your plans together.','Explore current lodging packages and offers, then find the combination that fits your visit. Availability and details live on the linked page.',[['Explore','Lodging packages'],['Plan','Your time in the mountains']],'View packages & offers','/visit/packages-and-deals','lodging-'+season+'.jpg','Lodging at Aspen Snowmass in '+season),
  item('advisors','Vacation Advisors','A little local knowledge goes a long way.','Get help connecting the pieces of your visit. Aspen Snowmass vacation advisors can help you explore the options and plan a stay that feels right.',[['Support','Personal trip planning'],['Start with','Your kind of mountain day']],'Meet vacation advisors','/visit/vacation-advisors','landscape-'+season+'.jpg',season==='summer'?'Summer mountain scenery at Aspen':'Winter mountain scenery at Aspen'),
 ];
 if(category==='things'){
  const winter=season==='winter';
  return [
   item('dining',winter?'Dining & Après':'Dining',winter?'Good turns. A great table.':'A table with a mountain view.',winter?'Let the day continue around a table. Explore on-mountain dining and places to gather after time on snow.':'Take a break from the trail for outdoor dining and a taste of the mountains. Explore the places to eat across Aspen Snowmass.',[['Find','On-mountain dining'],['Make time','For the view, too']],'Explore dining','/visit/dining','dining-'+season+'.jpg',winter?'On-mountain dining at Snowmass':'Dining outdoors at Elk Camp'),
   item('experiences','Experiences','More than a place. A feeling.','Discover experiences that connect the mountains with the culture and energy of Aspen Snowmass. Find a different way into your visit.',[['Discover','Mountain experiences'],['Follow','Your curiosity']],'Discover experiences','/discover/experiences','landscape-'+season+'.jpg','Aspen Snowmass mountain scenery in '+season),
   item('activities','Activities',winter?'Let winter take you further.':'Make room for a little adventure.',winter?'Explore the ways to spend time in the snow beyond your usual routine. Find an activity that fits the pace of your day.':'Explore hiking, sightseeing and the Lost Forest. There are plenty of ways to discover the mountains beyond the Bike Park.',[['Season',winter?'Winter activities':'Summer activities'],['Your pace','Active or easygoing']],'Explore '+season+' activities','/visit/activities/'+season,winter?'buttermilk-winter.jpg':'activities-summer.jpg',winter?'Buttermilk in winter':'Climbing at the Lost Forest on Snowmass'),
   item('events','Events','Find a reason to stay a little longer.','Explore the current calendar for races, music, gatherings and more. Check the linked page for dates and event details.',[['Discover','The events calendar'],['Check','Current dates & details']],'See what’s happening','/visit/events','landscape-'+season+'.jpg','Mountain scenery at Aspen Snowmass in '+season),
   item('shop','Shop','Bring a little of Aspen with you.','Explore shopping at Aspen Snowmass, from mountain essentials to something to take home. Find the places that fit your day in town.',[['Explore','Mountain retail'],['Find','Gear & something to keep']],'Explore shopping','/visit/retail','lodging-'+season+'.jpg','Aspen Snowmass village in '+season),
   item('culture','Arts & Culture','The mountains are only the beginning.','Discover the creative side of Aspen Snowmass. Explore arts and culture that bring a different perspective to time spent here.',[['Discover','Arts & culture'],['Explore','A different perspective']],'Explore arts & culture','/discover/arts-and-culture','landscape-'+season+'.jpg','Aspen mountain landscape in '+season),
   item('guides','Guides','A little inspiration for the way ahead.','Find ideas and stories for your visit. Explore Aspen Snowmass experiences and build a day around what draws you here.',[['Find','Ideas for your visit'],['Start with','What interests you']],'Explore guides & stories','/discover/experiences','landscape-'+season+'.jpg','Aspen Snowmass landscape in '+season),
  ];
 }
 return [];
}
export const operationalLinks=(type,season)=>mountainIds.filter(id=>!(type==='maps'&&season==='summer')||id==='snowmass').map(id=>({label:type==='maps'&&season==='summer'?'Snowmass Bike Park':names[mountainIds.indexOf(id)],href:destination(type==='maps'&&season==='summer'?'/visit/activities/summer/biking/mountain-bike-trails':'/four-mountains/'+id+'/'+(type==='maps'?'trail-maps':'lift-status'))}));
export function initialDiscovery(season='winter'){return {open:false,category:null,option:null,season:season==='summer'?'summer':'winter',utility:null};}
export function transition(state,event){
 switch(event.type){
  case 'OPEN':return {...state,open:true,category:null,option:null,utility:null};
  case 'CLOSE':return {...state,open:false,utility:null};
  case 'CATEGORY':return state.category===event.id?state:categoryLabels(state.season).some(x=>x.id===event.id)?{...state,category:event.id,option:null,utility:null}:state;
  case 'OPTION':return state.option===event.id?state:optionsFor(state.category,state.season).some(x=>x.id===event.id)?{...state,option:event.id,utility:null}:state;
  case 'BACK':return state.utility?{...state,utility:null}:state.option?{...state,option:null}:state.category?{...state,category:null}:{...state,open:false};
  case 'SEASON':return ['winter','summer'].includes(event.season)?{...state,season:event.season,option:optionsFor(state.category,event.season).some(x=>x.id===state.option)?state.option:null,utility:null}:state;
  case 'UTILITY':return {...state,utility:event.id};
  default:return state;
 }
}
