import { useSearchParams } from 'react-router-dom';

export default function useGetSearchParam() {
  const [paramObject] = useSearchParams();

  return Object.fromEntries(paramObject.entries());
}
