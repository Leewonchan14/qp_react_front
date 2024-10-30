import React from 'react';
import useFetchRootAnswers from '../../../hooks/answers/useFetchRootAnswers';
import Answer from './Answer';
import useGetQuestionId from '../../../hooks/questions/useGetQuestionId';

export default function AnswerList() {
  const questionId = useGetQuestionId();
  const { data } = useFetchRootAnswers(questionId);

  const answers = data?.pages.flatMap((a) => a.data) ?? [];

  return (
    <React.Fragment>
      {/* <AnswerInput questionId={questionId} /> */}
      {answers.map((answer) => (
        <Answer key={answer.answerId} answer={answer} />
      ))}
    </React.Fragment>
  );
}
