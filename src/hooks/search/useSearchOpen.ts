import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetSearchParam from '../navigate/useGetSearchParam';
import useSetSearchParam from '../navigate/useSetSearchParam';
import useDebounce from '../common/useDebounce';

export default function useSearchOpen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSearchParam } = useSetSearchParam();

  const { q } = useGetSearchParam();
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 600);

  const isSearchPage = location.pathname === '/search';

  useEffect(() => {
    if (!setSearchParam || typeof debouncedSearch === 'undefined') return;
    if (debouncedSearch === '') return;

    setSearchParam({ q: debouncedSearch });
  }, [debouncedSearch, setSearchParam]);

  useEffect(() => {
    if (!isSearchPage) setSearch('');
  }, [isSearchPage]);

  const goSearch = useCallback(() => {
    if (location.pathname === '/search') return;
    navigate('/search');
  }, [location.pathname, navigate]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  return { isSearchPage, goSearch, search, q, handleOnChange };
}
