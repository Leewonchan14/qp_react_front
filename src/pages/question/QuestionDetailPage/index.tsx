import HashTagList from '../../../components/questions/HashTagList';
import useFetchQuestion from '../../../hooks/questions/useFetchQuestion';
import useGetQuestionId from '../../../hooks/questions/useGetQuestionId';
import QuestionIdValidProvider from '../provider/QuestionIdValidator';
import QuestionTitle from '../QuestionTitle';
import WhiteBoxSection from '../WhiteBoxSection';
import AdjacentQuestion from './AdjacentQuestion';
import AnswerInput from './AnswerInput';
import AnswerList from './AnswerList';

export default function QuestionDetailPage() {
  const questionId = useGetQuestionId();
  const { data, isFetching, isLoading } = useFetchQuestion(questionId);

  if (isFetching || isLoading || !data) return null;

  const { hashTags, content, expertCount } = data!;

  return (
    <QuestionIdValidProvider>
      <AdjacentQuestion questionId={Number(questionId)} />
      <div className="flex flex-col gap-6 bg-orange-500 p-10 mobile:p-4 w-full rounded-2xl shadow-[inset_0px_4px_2px_rgba(0,0,0,0.3),0px_4px_4px_rgba(0,0,0,0.3)] whitespace-pre-wrap">
        <WhiteBoxSection className="flex flex-col relative">
          <QuestionTitle />
          <HashTagList hashTags={hashTags} />
          <div className="flex pl-1">{content}</div>
          <AnswerInput />
        </WhiteBoxSection>

        <div className="w-full flex justify-center font-bold text-white">
          <span className="underline">{expertCount}명의 전문가</span>가 답변을
          했어요
        </div>

        <AnswerList />
      </div>
    </QuestionIdValidProvider>
  );
}
