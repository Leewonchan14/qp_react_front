import React from 'react';
import useFetchChildAnswers from '../../../hooks/answers/useFetchChildAnswers';
import Answer from './Answer';

export default function ChildAnswerList({
  questionId,
  answerId,
  closeCallback,
}: {
  questionId: number;
  answerId: number;
  closeCallback: () => void;
}) {
  const { data, hasNextPage, fetchNextPage } = useFetchChildAnswers(
    questionId,
    answerId,
    5,
  );
  const answers = data?.pages.flatMap((a) => a.data) ?? [];
  return (
    <React.Fragment>
      {answers.map((answer) => (
        <Answer key={answer.answerId} answer={answer} parentId={answerId} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (hasNextPage) fetchNextPage();
              else closeCallback?.();
            }}
            className="text-blue-600 text-opacity-80 font-bold"
          >
            {hasNextPage ? '댓글 더보기' : '접기'}
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export function AnswerMoreButton({
  hasNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) {
  if (!hasNextPage) return null;
  return (
    <div className="flex justify-center">
      <button
        onClick={fetchNextPage}
        className="text-blue-600 text-opacity-80 font-bold"
      >
        댓글 더보기
      </button>
    </div>
  );
}
