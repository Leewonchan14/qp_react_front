import { useEffect, useRef, useState } from 'react';

function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handle = setTimeout(
      () => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handle);
    };
  }, [limit, value]);

  return throttledValue;
}

export default useThrottle;
