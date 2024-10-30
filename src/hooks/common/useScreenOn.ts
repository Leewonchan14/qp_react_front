import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const useScreenOn = (marginOffset: number) => {
  const targetRef = useRef(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  const handleOnScreen = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsOnScreen(entry.isIntersecting);
  }, []);

  const observer = useMemo(
    () =>
      new IntersectionObserver(handleOnScreen, {
        rootMargin: `${marginOffset}px`,
      }),
    [handleOnScreen, marginOffset],
  );

  useEffect(() => {
    if (!targetRef.current) return;

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [observer]);

  return { isOnScreen, targetRef };
};

export default useScreenOn;
