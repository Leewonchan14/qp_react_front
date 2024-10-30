import { useMutation, useQueryClient } from '@tanstack/react-query';
import answerApi, { AnswersResponse } from '../../../apis/answers.api';
import { CHILD_ANSWER_QUERY_KEY } from '../useFetchChildAnswers';
import { ROOT_ANSWERS_QUERY_KEY } from '../useFetchRootAnswers';
import { PaginateResponse } from '../../../types/paginate.response';
export function ANSWER_LIKE_MUTATE_KEY(
  answerId: number,
): ['answers', 'like', number] {
  return ['answers', 'like', answerId];
}

export default function useMutateAnswerLike(
  questionId: number,
  answerId: number,
  isRootAnswer: boolean,
  parentId?: number,
) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ANSWER_LIKE_MUTATE_KEY(answerId),
    mutationFn: async (answerId: number) => {
      return answerApi.like(answerId);
    },
    onMutate(answerId: number) {
      const key = isRootAnswer
        ? ROOT_ANSWERS_QUERY_KEY(questionId)
        : CHILD_ANSWER_QUERY_KEY(questionId, parentId!);

      queryClient.setQueryData(
        key,
        (data: {
          pageParam: number[];
          pages: PaginateResponse<AnswersResponse>[];
        }) => {
          const pageIndex = data.pages.findIndex((page) =>
            page.data.find((answer) => answer.answerId === answerId),
          );

          if (pageIndex === -1) return data;

          const answerIndex = data.pages[pageIndex].data.findIndex(
            (answer) => answer.answerId === answerId,
          );

          if (answerIndex === -1) return data;

          return {
            ...data,
            pages: data.pages.map((p, index) => {
              if (index !== pageIndex) return p;

              return {
                ...p,
                data: p.data.map((a, index) => {
                  if (index !== answerIndex) return a;
                  return {
                    ...a,
                    isLike: !a.isLike,
                    likeCount: a.isLike ? +a.likeCount - 1 : +a.likeCount + 1,
                  };
                }),
              };
            }),
          };
        },
      );
    },
    // onSuccess: () => {
    //   const key = isRootAnswer
    //     ? ROOT_ANSWERS_QUERY_KEY(questionId)
    //     : CHILD_ANSWER_QUERY_KEY(questionId, parentId!);

    //   queryClient.invalidateQueries({
    //     queryKey: key,
    //   });
    // },
  });

  return { mutate, isPending };
}
