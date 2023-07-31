import { useEffect, useState } from 'react';

export const useWindowResize = () => {
  const [size, setSize] = useState([0, 0]);
  const [portrait, setPortrait] = useState<boolean | undefined>();

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', (e) => setPortrait(e.matches));
  }, []);

  useEffect(() => {
    setSize([screen.width, screen.height]);
  }, [portrait]);

  return size;
};
