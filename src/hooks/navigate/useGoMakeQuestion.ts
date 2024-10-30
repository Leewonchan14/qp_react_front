import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useGoMakeQuestion() {
  const navigate = useNavigate();
  const goQuestion = useCallback(() => {
    navigate('/questions');
  }, [navigate]);

  return goQuestion;
}
