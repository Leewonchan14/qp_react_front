import { useParams } from 'react-router-dom';

export default function useGetQuestionId() {
  const { questionId } = useParams() as { questionId: string };
  return Number(questionId);
}
