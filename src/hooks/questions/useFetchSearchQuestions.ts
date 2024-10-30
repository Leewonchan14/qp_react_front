import useFetchQuestions from './useFetchQuestions';

export default function useFetchSearchQuestions(q: string) {
  return useFetchQuestions(10, q);
}
