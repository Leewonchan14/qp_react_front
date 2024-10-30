import React, { useState } from 'react';
import { AnswersResponse } from '../../../apis/answers.api';
import { Role } from '../../../apis/users.api';
import AnswerLike from '../../../assets/AnswerLike';
import useGetQuestionId from '../../../hooks/questions/useGetQuestionId';
import { timeToString, UTCtoLocalDate } from '../../../utils/timeConverter';
import UserProfileImage from '../UserProfileImage';
import WhiteBoxSection from '../WhiteBoxSection';
import AnswerInput from './AnswerInput';
import ChildAnswerList from './ChildAnswerList';

interface AnswerProps {
  answer: AnswersResponse;
  parentId?: number;
}

export const AnswerContext = React.createContext<AnswerProps | null>(null);

export default React.memo(function Answer({
  answer,
  parentId,
}: {
  answer: AnswersResponse;
  parentId?: number;
}) {
  const questionId = useGetQuestionId();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = answer;
  return (
    <AnswerContext.Provider value={{ answer, parentId }}>
      <WhiteBoxSection className={`${!answer.isRootAnswer && 'border-2'}`}>
        <div className="flex gap-4 items-center mobile:scale-90">
          <UserProfileImage user={user} />
          <div className="flex flex-col">
            {user.role === Role.EXPERT && (
              <div className="text-orange-400 text-xl font-bold">전문가</div>
            )}
            <div className="font-bold text-2xl">{user.username}</div>
            <div>{timeToString(UTCtoLocalDate(answer.createdAt))}</div>
          </div>
        </div>
        <div className="whitespace-pre-wrap pl-1">{answer.content}</div>

        <div className="w-full flex justify-start flex-wrap items-center gap-4">
          <AnswerLike className="cursor-pointer" />
          <AnswerInput />
        </div>
        {answer.childrenCount > 0 && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-blue-600 text-opacity-80 font-bold"
            >
              {!isOpen ? `답글 ${answer.childrenCount}개 보기` : '접기'}
            </button>
          </div>
        )}

        {isOpen && (
          <ChildAnswerList
            closeCallback={() => setIsOpen(false)}
            questionId={questionId}
            answerId={answer.answerId}
          />
        )}
      </WhiteBoxSection>
    </AnswerContext.Provider>
  );
});
