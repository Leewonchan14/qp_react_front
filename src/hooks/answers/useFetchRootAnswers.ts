import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import answersApiInstance from '../../apis/answers.api';
import useUserStore from '../../stores/userStore';
import useDebounce from '../common/useDebounce';
import useScreenOn from '../common/useScreenOn';

export function ROOT_ANSWERS_QUERY_KEY(
  questionId: number,
): ['answers', 'questions', number] {
  return ['answers', 'questions', questionId];
}

export default function useFetchRootAnswers(questionId: number) {
  const userId = useStore(useUserStore, (state) => state.userId);
  const {
    isFetching: isF,
    data,
    isError,
    fetchNextPage,
    isSuccess,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ROOT_ANSWERS_QUERY_KEY(questionId),
    async queryFn({ pageParam }) {
      const { data } = await answersApiInstance.findByQuestion(
        questionId,
        pageParam,
        10,
        userId ?? undefined,
      );

      return data.result;
    },
    initialPageParam: 0,
    getNextPageParam(lastPage, _, lastPageParam) {
      return lastPage.lastPage >= lastPageParam ? undefined : lastPageParam + 1;
    },
    staleTime: 1000 * 60 * 1,
  });

  const { isOnScreen, targetRef } = useScreenOn(0);
  const isFetching = useDebounce(isF, 0);

  useEffect(() => {
    if (isOnScreen && !isFetching && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching, isOnScreen]);

  return { isFetching, data, isError, targetRef, isSuccess, isLoading };
}
