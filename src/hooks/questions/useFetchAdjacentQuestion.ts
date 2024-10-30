import { useQuery } from '@tanstack/react-query';
import questionApi, {
  AdjacentQuestionResponse,
} from '../../apis/questions.api';
import { SuccessResponse } from '../../types/success.response';

export function ADJACENT_QUESTION_QUERY_KEY(
  questionId: number,
): ['questions', 'adjacent', number] {
  return ['questions', 'adjacent', questionId];
}

export default function useFetchAdjacentQuestion(questionId: number) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ADJACENT_QUESTION_QUERY_KEY(questionId),
    async queryFn() {
      const { data } =
        await questionApi.findAdjacent<
          SuccessResponse<AdjacentQuestionResponse>
        >(questionId);
      return data;
    },
    staleTime: 1000 * 60 * 1,
  });

  return { data, isSuccess, isLoading };
}
