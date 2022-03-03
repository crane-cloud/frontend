import { useEffect, useState } from 'react';

const useMedia = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 650px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);
  return isDesktop;
};

export default useMedia;