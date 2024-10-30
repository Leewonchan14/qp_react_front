import { useEffect, useRef, useState } from 'react';

export default function useOnHover<T extends HTMLElement>() {
  const hoverObserverRef = useRef<T>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!hoverObserverRef.current) return;

    const onHover = () => setIsHover(true);
    const onLeave = () => setIsHover(false);

    const hoverObserver = hoverObserverRef.current;
    hoverObserver.addEventListener('mouseenter', onHover);
    hoverObserver.addEventListener('mouseleave', onLeave);

    return () => {
      hoverObserver.removeEventListener('mouseenter', onHover);
      hoverObserver.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return { hoverObserverRef, isHover };
}
