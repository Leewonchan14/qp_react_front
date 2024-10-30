import QuestionsList from '../../components/questions/QuestionsList';
import useFetchQuestions from '../../hooks/questions/useFetchQuestions';

export default function HomePage() {
  const { data, targetRef, hasNextPage } = useFetchQuestions(10);
  const questions = data?.pages.flatMap((q) => q.data) ?? [];

  return (
    <>
      <QuestionsList
        targetRef={targetRef}
        questions={questions}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
