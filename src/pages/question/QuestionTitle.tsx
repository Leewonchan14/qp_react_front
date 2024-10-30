import useFetchQuestion from '../../hooks/questions/useFetchQuestion';
import useGetQuestionId from '../../hooks/questions/useGetQuestionId';
import { timeToString, UTCtoLocalDate } from '../../utils/timeConverter';
import UserProfileImage from './UserProfileImage';

export default function QuestionTitle() {
  const questionId = useGetQuestionId();
  const { data } = useFetchQuestion(questionId);

  if (!data) return null;

  const { user, title, createdAt, isChild } = data;

  return (
    <div className="w-full flex flex-wrap gap-4 items-center">
      <UserProfileImage user={user} />
      <div className="flex flex-1 w-full flex-col justify-evenly">
        <p className="w-full text-2xl whitespace-pre-wrap break-keep break-words font-bold">
          {title}
        </p>
        <div>{timeToString(UTCtoLocalDate(createdAt))}</div>
      </div>

      {isChild && (
        <div className="absolute right-4 top-4 text-orange-400 text-nowrap">
          어린이
        </div>
      )}
    </div>
  );
}
