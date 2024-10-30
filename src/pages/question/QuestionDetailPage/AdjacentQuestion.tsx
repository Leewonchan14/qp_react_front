import { Link } from 'react-router-dom';
import useFetchAdjacentQuestion from '../../../hooks/questions/useFetchAdjacentQuestion';

export default function AdjacentQuestion({
  questionId,
}: {
  questionId: number;
}) {
  const { data, isLoading, isSuccess } = useFetchAdjacentQuestion(questionId);

  function render() {
    if (!data || isLoading || !isSuccess) return null;
    const { preQuestion, nextQuestion } = data.result;
    return (
      <div className="flex justify-between font-bold">
        <Link
          className={`flex gap-2 max-w-[50%] ${!nextQuestion && 'invisible'}`}
          to={`/questions/${nextQuestion?.questionId}`}
        >
          <span>{'◀'}</span>
          <span className="truncate">{nextQuestion?.title}</span>
        </Link>
        <Link
          className={`flex gap-2 max-w-[50%] ${!preQuestion && 'invisible'}`}
          to={`/questions/${preQuestion?.questionId}`}
        >
          <span className="truncate">{preQuestion?.title}</span>
          <span>{'▶'}</span>
        </Link>
      </div>
    );
  }

  return <div className="mb-10">{render()}</div>;
}
