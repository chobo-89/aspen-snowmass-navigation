import test from 'node:test';
import assert from 'node:assert/strict';
import {categories,mountains,seasons,lodging,things,operationalLinks} from '../src/immersive-data.js';

test('both seasons expose the same four navigation categories',()=>{
 for(const season of ['winter','summer'])assert.deepEqual(categories(season).map(x=>x.id),['mountains','sport','lodging','things']);
 assert.equal(categories('winter')[1].label,'Ski & Ride');assert.equal(categories('summer')[1].label,'Bike');
});
test('winter access includes all six on-mountain essentials',()=>{
 assert.deepEqual(seasons.winter.sportLinks.map(x=>x.label),['Passes & Lift Tickets','Lessons','Rentals','Trail Maps','Lift Status','Mountain Cameras']);
});
test('summer booking links point to biking rather than winter products',()=>{
 assert.deepEqual(seasons.summer.sportLinks.map(x=>x.label),['Lift Tickets','Lessons','Rentals']);
 for(const link of seasons.summer.sportLinks)assert.match(link.href,/\/summer\/biking\//);
});
test('seasonal dining and activities update without losing discovery links',()=>{
 assert.equal(things('winter')[0].label,'Dining & Après');assert.equal(things('summer')[0].label,'Dining');
 assert.match(things('winter')[2].href,/\/winter$/);assert.match(things('summer')[2].href,/\/summer$/);
 assert.deepEqual(things('winter').slice(3),things('summer').slice(3));
});
test('lodging retains direct, offer and advisor access',()=>{
 assert.deepEqual(lodging.map(x=>x.label),['Lodging','Packages & Offers','Vacation Advisors']);
 assert.ok(lodging.every(x=>x.href.startsWith('https://www.aspensnowmass.com/')));
});
test('mountains stay individually discoverable with draft descriptor data',()=>{
 assert.deepEqual(mountains.map(x=>x.name),['Aspen Mountain','Aspen Highlands','Buttermilk','Snowmass']);
 assert.equal(new Set(mountains.map(x=>x.slug)).size,4);assert.ok(mountains.every(x=>x.draft&&x.alt));
});
test('operational map choices respect the selected season',()=>{
 assert.deepEqual(operationalLinks('maps','winter').map(x=>x.label),mountains.map(x=>x.name));
 for(const l of operationalLinks('maps','winter'))assert.match(l.href,/\/trail-maps$/);
 const summer=operationalLinks('maps','summer');assert.equal(summer.length,1);assert.equal(summer[0].label,'Snowmass Bike Park');assert.match(summer[0].href,/\/summer\/biking\/mountain-bike-trails$/);
});
test('lift reports remain available for each mountain in both seasons',()=>{
 for(const season of ['winter','summer']){
  assert.deepEqual(operationalLinks('lifts',season).map(x=>x.label),mountains.map(x=>x.name));
  assert.ok(operationalLinks('lifts',season).every(x=>x.href.endsWith('/lift-status')));
 }
});
