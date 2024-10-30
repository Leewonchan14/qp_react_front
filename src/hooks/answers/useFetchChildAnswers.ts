import { useInfiniteQuery } from '@tanstack/react-query';
import { useStore } from 'zustand';
import answerApi from '../../apis/answers.api';
import useUserStore from '../../stores/userStore';

export function CHILD_ANSWER_QUERY_KEY(
  questionId: number,
  answerId: number,
): ['answers', 'questions', number, number] {
  return ['answers', 'questions', questionId, answerId];
}

export default function useFetchChildAnswers(
  questionId: number,
  answerId: number,
  pageSize: number,
) {
  const userId = useStore(useUserStore, (state) => state.userId);
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: CHILD_ANSWER_QUERY_KEY(questionId, answerId),
    queryFn: async ({ pageParam }) => {
      const { data } = await answerApi.findByParents(
        answerId,
        pageParam,
        pageSize,
        userId ?? undefined,
      );
      return data.result;
    },
    initialPageParam: 0,
    getNextPageParam(lastPage, allPages, lastPageParam) {
      return lastPage.lastPage > lastPageParam ? lastPageParam + 1 : undefined;
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  return { isFetching, fetchNextPage, data, hasNextPage };
}
