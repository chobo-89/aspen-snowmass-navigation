import { useEffect, useRef } from 'react';
import navigation from './navigation.html?raw';
import hero from './hero.html?raw';
import symbols from './symbols.html?raw';
import { prepareImmersive } from './immersive.js';
import { initializeNavigation } from './navigation.js';

const sourceMarkup=symbols + navigation + '<main>' + hero + '<div class="prototype-scroll-context" aria-hidden="true"></div></main><footer></footer>';

export function App() {
  const root = useRef(null);
  useEffect(() => { root.current.innerHTML=sourceMarkup; const model=prepareImmersive(root.current); return initializeNavigation(root.current,model); }, []);
  return <div ref={root} />;
}
