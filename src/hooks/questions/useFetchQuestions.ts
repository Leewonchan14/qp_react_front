import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import questionApi, { QuestionResponse } from '../../apis/questions.api';
import { PaginateResponse } from '../../types/paginate.response';
import { SuccessResponse } from '../../types/success.response';
import useDebounce from '../common/useDebounce';
import useScreenOn from '../common/useScreenOn';

export function QUESTIONS_QUERY_KEY(
  search: string,
): ['questions', 'search', string] {
  return ['questions', 'search', search];
}

export default function useFetchQuestions(pageSize: number, search?: string) {
  const {
    isFetching: isF,
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: QUESTIONS_QUERY_KEY(search || ''),
    async queryFn({ pageParam }) {
      const response = await questionApi.findAll<
        SuccessResponse<PaginateResponse<QuestionResponse>>
      >(pageParam, pageSize, search);
      return response.data.result;
    },
    initialPageParam: 0,
    getNextPageParam(lastPage, allPages, lastPageParam) {
      return lastPage.lastPage > lastPageParam ? lastPageParam + 1 : undefined;
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  const { targetRef, isOnScreen } = useScreenOn(100);

  const isFetching = useDebounce(isF, 0);

  useEffect(() => {
    if (!isOnScreen || isFetching || !hasNextPage || !isSuccess) return;
    fetchNextPage();
  }, [isOnScreen, isFetching, hasNextPage, isSuccess, fetchNextPage]);

  return { isFetching, targetRef, data, hasNextPage };
}
