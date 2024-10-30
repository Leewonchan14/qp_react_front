import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessResponse } from '../../types/success.response';
import questionApi, { QuestionResponse } from '../../apis/questions.api';

export function QUESTION_QUERY_KEY(questionId: number): ['questions', number] {
  return ['questions', questionId];
}

export default function useFetchQuestion(questionId: number) {
  const navigate = useNavigate();
  const { isSuccess, isFetching, isLoading, data, isError } = useQuery({
    queryKey: QUESTION_QUERY_KEY(questionId),
    async queryFn() {
      const response =
        await questionApi.findById<SuccessResponse<QuestionResponse>>(
          questionId,
        );
      return response.data.result;
    },
    staleTime: 1000 * 60 * 1,
  });

  useEffect(() => {
    if (isFetching || isSuccess) return;
    if (isError) {
      navigate('/');
    }
  }, [isError, isFetching, isSuccess, navigate]);

  return { isSuccess, isFetching, isLoading, data, isError };
}
