import { useMutation, useQueryClient } from '@tanstack/react-query';
import answerApi, { AnswersResponse } from '../../../apis/answers.api';
import { PaginateResponse } from '../../../types/paginate.response';
import { CHILD_ANSWER_QUERY_KEY } from '../useFetchChildAnswers';
import { ROOT_ANSWERS_QUERY_KEY } from '../useFetchRootAnswers';

export const ANSWER_MUTATION_KEY = ['answers', 'post'];

export default function useMutateAnswer(questionId: number, answerId?: number) {
  const queryClient = useQueryClient();
  const INVALID_QUERY_KEY = !!answerId
    ? CHILD_ANSWER_QUERY_KEY(questionId, answerId)
    : ROOT_ANSWERS_QUERY_KEY(questionId);

  const { mutate, isPending } = useMutation({
    mutationKey: ANSWER_MUTATION_KEY,
    mutationFn: async (text: string) => {
      console.log('INVALID_QUERY_KEY: ', INVALID_QUERY_KEY);
      const response = await answerApi.create(questionId, text, answerId);
      return response.data.result;
    },
    onMutate: async () => {
      // Cancel any outgoing
      // await queryClient.cancelQueries({
      //   queryKey: INVALID_QUERY_KEY,
      // });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<{
        pages: PaginateResponse<AnswersResponse>[];
      }>(INVALID_QUERY_KEY);

      // await queryClient.setQueryData(
      //   INVALID_QUERY_KEY,
      //   (oldData: { pages: PaginateResponse<AnswersResponse>[] }) => {
      //     const newPage: PaginateResponse<AnswersResponse> = {
      //       lastPage: oldData.pages.length,
      //       total: oldData.pages[0].total + 1,
      //       data: [createNewUser(user!, 0, text)],
      //     };
      //     return {
      //       ...oldData,
      //       pages: [newPage, ...oldData.pages],
      //     };
      //   },
      // );

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(INVALID_QUERY_KEY, context.previousData);
      }
    },

    // onSuccess: () => {
    //   queryClient.setQueryData(
    //     ROOT_ANSWERS_QUERY_KEY(questionId),
    //     (data: {
    //       pageParam: number[];
    //       pages: PaginateResponse<AnswersResponse>[];
    //     }) => {
    //       const pageIndex = data.pages.findIndex((page) =>
    //         page.data.find((answer) => answer.answerId === answerId),
    //       );

    //       if (pageIndex === -1) return data;

    //       const answerIndex = data.pages[pageIndex].data.findIndex(
    //         (answer) => answer.answerId === answerId,
    //       );

    //       if (answerIndex === -1) return data;

    //       return {
    //         ...data,
    //         pages: data.pages.map((p, index) => {
    //           if (index !== pageIndex) return p;

    //           return {
    //             ...p,
    //             data: p.data.map((a, index) => {
    //               if (index !== answerIndex) return a;
    //               return {
    //                 ...a,
    //                 childrenCount: +a.childrenCount + 1,
    //               };
    //             }),
    //           };
    //         }),
    //       };
    //     },
    //   );
    // },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: INVALID_QUERY_KEY.slice(0, 2),
      });
    },
  });

  return { mutate, isPending };
}
