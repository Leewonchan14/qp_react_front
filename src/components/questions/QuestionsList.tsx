import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionResponse } from '../../apis/questions.api';
import AnswerChildrenIcon from '../../assets/AnswerChildren';
import ExpertIcon from '../../assets/ExpertIcon';
import useOnHover from '../../hooks/common/useOnHover';
import UserProfileImage from '../../pages/question/UserProfileImage';
import { timeToString, UTCtoLocalDate } from '../../utils/timeConverter';
import HashTagList from './HashTagList';

export default React.memo(
  function QuestionsList({
    questions,
    targetRef,
    hasNextPage,
  }: {
    questions: QuestionResponse[];
    targetRef: React.MutableRefObject<null>;
    hasNextPage: boolean;
  }) {
    return (
      <div className="grid grid-cols-3 gap-4 w-full mobile:grid-cols-2 ">
        {questions.map((question) => (
          <Question key={question.questionId} question={question} />
        ))}
        <div
          className={`mx-auto py-4 flex text-center font-bold ${!hasNextPage && 'hidden'}`}
          ref={targetRef}
        >
          가져오는중...
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.questions.length === nextProps.questions.length;
  },
);

const Question = React.memo(function Question({
  question,
}: Readonly<{ question: QuestionResponse }>) {
  const {
    // content,
    user,
    title,
    hashTags,
    // hit,
    isChild,
    // isDeleted,
    answerCount,
    expertCount,
    createdAt,
    questionId,
  } = question;
  const { hoverObserverRef, isHover } = useOnHover<HTMLAnchorElement>();
  return (
    <Link
      className={`w-full rounded-xl p-3 flex flex-col gap-1 h-80 mobile:h-60 shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3),0px_4px_4px_rgba(0,0,0,0.5)] hover:bg-orange-400 hover:text-white`}
      to={`/questions/${questionId}`}
      preventScrollReset
      ref={hoverObserverRef}
    >
      <div className="w-full flex justify-between">
        <UserProfileImage user={user} />
        {isChild && (
          <div className={`text-orange-400 ${isHover && 'text-white'}`}>
            어린이
          </div>
        )}
      </div>
      <div>{timeToString(UTCtoLocalDate(createdAt))}</div>
      <div className="text-3xl mobile:text-xl font-bold mb-auto line-clamp-2 break-keep break-words">
        {title}
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <AnswerChildrenIcon isHover={isHover} />
          <span>{answerCount}</span>
        </div>
        <div className="flex gap-2">
          <ExpertIcon isHover={isHover} />
          <span>{expertCount}</span>
        </div>
      </div>
      <HashTagList hashTags={hashTags} />
    </Link>
  );
});
