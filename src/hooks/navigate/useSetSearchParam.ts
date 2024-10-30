import { useCallback } from 'react';
import {
  NavigateOptions,
  URLSearchParamsInit,
  useSearchParams,
} from 'react-router-dom';

export default function useSetSearchParam() {
  const [, set] = useSearchParams();

  const setSearchParam = useCallback(
    (
      nextInit?:
        | URLSearchParamsInit
        | ((prev: URLSearchParams) => URLSearchParamsInit),
      b?: NavigateOptions,
    ) => {
      set(nextInit, { ...b, replace: true });
    },
    [set],
  );

  return { setSearchParam };
}
