import { DependencyList, useCallback, useEffect, useState } from 'react';
import useThrottle from './useThrottle';

function useThrottleCallback<T extends () => void>(
  callback: T,
  limit: number,
  deps: DependencyList,
): T {
  const [active, setActive] = useState(0);
  const throttledActive = useThrottle(active, limit);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const func = useCallback(callback, [...deps]);

  const throttledFunc = () => {
    setActive((prev) => prev + 1);
  };

  useEffect(() => {
    if (!func || throttledActive === 0) return;
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledActive]);

  return throttledFunc as T;
}

export default useThrottleCallback;
