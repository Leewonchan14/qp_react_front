import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import questionApi from '../../../apis/questions.api';
import MakeQuestionState from './types';

export const MAKE_QUESTION_MUTATION_KEY = ['questions', 'post'];

export default function useMutateMakeQuestion() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: MAKE_QUESTION_MUTATION_KEY,
    mutationFn: async (data: MakeQuestionState) => {
      const response = await questionApi.create(
        MakeQuestionState.toApiRequest(data),
      );
      return response.data;
    },
    onSuccess: (data) => {
      const questionId = data.result.questionId;
      navigate(`/questions/${questionId}`, { replace: true });
    },
  });

  return { mutate, isPending };
}
