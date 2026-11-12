import { useEffect, useRef } from 'react';
import navigation from './navigation.html?raw';
import hero from './hero.html?raw';
import symbols from './symbols.html?raw';
import { initializeNavigation } from './navigation.js';

export function App() {
  const root = useRef(null);
  useEffect(() => initializeNavigation(root.current), []);
  return <div ref={root} dangerouslySetInnerHTML={{ __html: symbols + navigation + '<main>' + hero + '<div class="prototype-scroll-context" aria-hidden="true"></div></main><footer></footer>' }} />;
}
