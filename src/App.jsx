import {useEffect,useRef} from 'react';
import navigation from './navigation.html?raw';
import hero from './hero.html?raw';
import symbols from './symbols.html?raw';
import {prepareDiscovery} from './discovery.js';
import {initializeNavigation} from './navigation.js';
const sourceMarkup=symbols+navigation+'<main>'+hero+'</main>';
export function App(){
 const root=useRef(null);
 useEffect(()=>{root.current.innerHTML=sourceMarkup;const model=prepareDiscovery(root.current);return initializeNavigation(root.current,model);},[]);
 return <div ref={root}/>;
}
