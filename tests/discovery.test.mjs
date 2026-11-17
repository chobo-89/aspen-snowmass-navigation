import test from 'node:test';
import assert from 'node:assert/strict';
import {initialDiscovery,transition,categoryLabels,optionsFor,mountainProfiles,operationalLinks} from '../src/discovery-data.js';
const apply=(state,...events)=>events.reduce(transition,state);
const open=()=>transition(initialDiscovery(),{type:'OPEN'});
test('opening starts with categories and no implied option selection',()=>{
 const state=open();assert.equal(state.open,true);assert.equal(state.category,null);assert.equal(state.option,null);
 assert.deepEqual(categoryLabels('winter').map(x=>x.label),['Four Mountains','Ski & Ride','Lodging','Things to Do']);
});
test('a category reveals choices without immediately exposing a profile',()=>{
 const state=transition(open(),{type:'CATEGORY',id:'mountains'});assert.equal(state.category,'mountains');assert.equal(state.option,null);assert.equal(optionsFor(state.category,state.season).length,4);
});
test('Back unwinds context, category and navigation one level at a time',()=>{
 let state=apply(open(),{type:'CATEGORY',id:'mountains'},{type:'OPTION',id:'snowmass'});
 state=transition(state,{type:'BACK'});assert.equal(state.option,null);assert.equal(state.category,'mountains');
 state=transition(state,{type:'BACK'});assert.equal(state.category,null);assert.equal(state.open,true);
 state=transition(state,{type:'BACK'});assert.equal(state.open,false);
});
test('switching category clears the previous context',()=>{
 const state=apply(open(),{type:'CATEGORY',id:'mountains'},{type:'OPTION',id:'snowmass'},{type:'CATEGORY',id:'lodging'});assert.equal(state.category,'lodging');assert.equal(state.option,null);
});
test('a season change keeps the selected mountain while updating copy, imagery and destination',()=>{
 const state=apply(open(),{type:'CATEGORY',id:'mountains'},{type:'OPTION',id:'buttermilk'},{type:'SEASON',season:'summer'});assert.equal(state.option,'buttermilk');
 const winter=mountainProfiles('winter')[2],summer=mountainProfiles(state.season)[2];assert.notEqual(winter.image,summer.image);assert.notEqual(winter.body,summer.body);assert.match(summer.href,/\/buttermilk\/summer$/);assert.match(summer.facts.flat().join(' '),/no lifts/);
});
test('selected ski access changes to bike access with no winter checkout link',()=>{
 const state=apply(open(),{type:'CATEGORY',id:'sport'},{type:'OPTION',id:'access'},{type:'SEASON',season:'summer'});assert.equal(state.option,'access');assert.equal(categoryLabels(state.season)[1].label,'Bike');
 const option=optionsFor(state.category,state.season).find(x=>x.id===state.option);assert.match(option.href,/summer\/biking\/snowmass-bike-park/);assert.equal(option.label,'Lift Tickets');
});
test('seasonal Things to Do updates dining, activities and imagery',()=>{
 const winter=optionsFor('things','winter'),summer=optionsFor('things','summer');assert.equal(winter[0].label,'Dining & Après');assert.equal(summer[0].label,'Dining');assert.notEqual(winter[0].image,summer[0].image);assert.match(summer.find(x=>x.id==='activities').href,/\/summer$/);assert.equal(winter.length,7);assert.equal(summer.length,7);
});
test('utility selection preserves discovery and Back closes only that utility',()=>{
 const selected=apply(open(),{type:'CATEGORY',id:'mountains'},{type:'OPTION',id:'aspen-mountain'});const sheet=transition(selected,{type:'UTILITY',id:'maps'});assert.equal(sheet.option,selected.option);assert.deepEqual(transition(sheet,{type:'BACK'}),selected);
 assert.equal(operationalLinks('maps','winter').length,4);assert.equal(operationalLinks('maps','summer').length,1);assert.equal(operationalLinks('lifts','summer').length,4);
});
test('every offered experience has useful context and an external primary CTA',()=>{
 for(const season of ['winter','summer'])for(const category of categoryLabels(season))for(const option of optionsFor(category.id,season)){
  assert.ok(option.body.length>60);assert.equal(option.facts.length,2);assert.ok(option.tagline&&option.image&&option.alt&&option.cta);assert.match(option.href,/^https:\/\/www\.aspensnowmass\.com\//);
 }
});
test('reopening returns to the simple entry while preserving the season',()=>{
 const state=apply(open(),{type:'CATEGORY',id:'mountains'},{type:'OPTION',id:'snowmass'},{type:'SEASON',season:'summer'},{type:'CLOSE'},{type:'OPEN'});assert.equal(state.season,'summer');assert.equal(state.category,null);assert.equal(state.option,null);
});
test('unknown choices and seasons do not corrupt the current selection',()=>{
 const state=transition(open(),{type:'CATEGORY',id:'mountains'});assert.deepEqual(transition(state,{type:'OPTION',id:'unknown'}),state);assert.deepEqual(transition(state,{type:'SEASON',season:'autumn'}),state);
});
test('reselecting a locked category or option preserves the immersive selection',()=>{
 const state=apply(open(),{type:'CATEGORY',id:'mountains'},{type:'OPTION',id:'aspen-mountain'});
 assert.equal(transition(state,{type:'OPTION',id:'aspen-mountain'}),state);
 assert.equal(transition(state,{type:'CATEGORY',id:'mountains'}),state);
 const changed=transition(state,{type:'OPTION',id:'snowmass'});
 assert.equal(changed.option,'snowmass');assert.equal(changed.category,'mountains');
});
