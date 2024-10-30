import React from 'react';
import { QuestionResponse } from '../../apis/questions.api';
import QuestionsList from '../../components/questions/QuestionsList';
import useGetSearchParam from '../../hooks/navigate/useGetSearchParam';
import useGoMakeQuestion from '../../hooks/navigate/useGoMakeQuestion';
import useFetchSearchQuestions from '../../hooks/questions/useFetchSearchQuestions';

export default function SearchPage() {
  const { q } = useGetSearchParam();

  const { data, hasNextPage, targetRef } = useFetchSearchQuestions(q);

  const questions: QuestionResponse[] =
    data?.pages.flatMap((p) => p.data) ?? [];

  const goQuestion = useGoMakeQuestion();

  if (typeof q === 'undefined' || !data) return null;

  return (
    <>
      <TotalHeader total={data.pages[0].total} />
      <QuestionsList
        questions={questions}
        hasNextPage={hasNextPage}
        targetRef={targetRef}
      />
      <div className="h-[30vh] flex flex-col justify-center items-center gap-4">
        <div className="text-2xl font-bold text-orange-400">
          원하는 질문이 없으세요?
        </div>
        <button
          onClick={goQuestion}
          className="bg-orange-400 rounded-3xl p-2 px-4 font-bold text-white"
        >
          질문 하러 가기
        </button>
      </div>
    </>
  );
}

function TotalHeader({ total }: { total: number }) {
  return (
    <div className="flex justify-center my-4 font-bold">
      총{total}개의 질문을 찾았습니다.
    </div>
  );
}
