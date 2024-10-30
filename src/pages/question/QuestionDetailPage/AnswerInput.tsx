import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from 'zustand';
import { Role } from '../../../apis/users.api';
import AutoResizeTextArea from '../../../components/common/AutoResizeTextArea';
import FormErrorComp from '../../../components/common/FormErrorComp';
import useMutateAnswer from '../../../hooks/answers/mutate/useMutateAnswer';
import useGoLogin from '../../../hooks/navigate/useGoLogin';
import useGetQuestionId from '../../../hooks/questions/useGetQuestionId';
import useFetchUser from '../../../hooks/users/useFetchUser';
import useUserStore from '../../../stores/userStore';
import UserProfileImage from '../UserProfileImage';
import WhiteBoxSection from '../WhiteBoxSection';
import { AnswerContext } from './Answer';

export default React.memo(function AnswerInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const userId = useStore(useUserStore, (state) => state.userId);
  const { data: user } = useFetchUser(userId);

  const questionId = useGetQuestionId();
  const answerContext = useContext(AnswerContext);

  const { isPending, mutate } = useMutateAnswer(
    questionId,
    answerContext?.answer.answerId,
  );

  const goLogin = useGoLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    text: string;
  }>({
    mode: 'onSubmit',
    criteriaMode: 'all',
  });

  if (answerContext?.parentId) return null;

  const answerRegister = register('text', {
    required: '답변을 입력해주세요',
    minLength: {
      value: 5,
      message: '답변은 5자 이상 입력해주세요',
    },
  });

  if (!isOpen) {
    return (
      <button
        className={`inline-block font-bold text-blue-600`}
        onClick={() => {
          if (!user) {
            return goLogin();
          }
          setIsOpen(true);
        }}
      >
        {!answerContext ? '답변 하기' : '댓글 달기'}
      </button>
    );
  }

  if (!user) return null;

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => {
        mutate(data.text, {
          onSuccess: () => {
            setText('');
          },
        });
      })}
    >
      <WhiteBoxSection>
        <div className="flex gap-4 items-center mobile:scale-90">
          <UserProfileImage user={user} />
          <div className="flex flex-col">
            {user.role === Role.EXPERT && (
              <div className="text-orange-400 text-xl font-bold">전문가</div>
            )}
            <div className="font-bold text-2xl">{user.username}</div>
          </div>
        </div>
        <div className="relative border-2 p-6 rounded-xl">
          <AutoResizeTextArea
            readOnly={isPending}
            className="outline-none pb-4 w-full"
            placeholder="답변을 입력해주세요"
            rows={2}
            value={text}
            {...answerRegister}
            onChange={(e) => {
              setText(e.currentTarget.value);
              answerRegister.onChange(e);
            }}
          />
          <span className="absolute right-4 bottom-4 text-black opacity-30">
            {text.length}자
          </span>
        </div>
        <div className="flex justify-end">
          <FormErrorComp name={'text'} errors={errors} />
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="bg-white border-2 rounded-2xl text-black text-opacity-80 px-12 py-1 font-bold"
          >
            취소
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="bg-white border-2 rounded-2xl text-black text-opacity-80 px-12 py-1 font-bold"
          >
            {!isPending ? '등록' : '등록중...'}
          </button>
        </div>
      </WhiteBoxSection>
    </form>
  );
});
