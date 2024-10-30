import { ErrorMessage } from '@hookform/error-message';
import React, { useContext, useState } from 'react';
import AutoResizeTextArea from '../../../components/common/AutoResizeTextArea';

import MakeQuestionState from '../../../hooks/questions/make/types';
import useMakeQuestion, {
  MakeQuestionContext,
} from '../../../hooks/questions/make/useMakeQuestion';
import WhiteBoxSection from '../WhiteBoxSection';

export default React.memo(function MakeQuestionPage() {
  const { value, handleOnSubmit } = useMakeQuestion();

  return (
    <MakeQuestionContext.Provider value={value}>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-8 w-full max-w-[800px] mx-auto"
      >
        {/* 1 ~ 100 */}
        <TitleInput />

        {/* 1 ~ 1000 */}
        <ContentInput />

        {/* 각 20글자 안으로 10개 이하의 태그 */}
        <HashTagInput />

        {/* isChild true 이거나 false */}
        <LevelCheck />

        <CheckList />
        <div className="flex justify-center">
          <button
            type="submit"
            // onClick={handleOnSubmit}
            className="bg-orange-400 text-white rounded-2xl p-4 font-bold"
          >
            질문 등록하기
          </button>
        </div>
      </form>
    </MakeQuestionContext.Provider>
  );
});

function TitleInput() {
  const context = useContext(MakeQuestionContext);
  const [titleState, setTitleState] = useState({
    isFocus: false,
    value: '',
  });
  if (!context) return null;

  const { register } = context;

  const titleRegister = register('title', {
    required: { value: true, message: '제목을 입력해주세요' },
    minLength: { value: 3, message: '제목은 2글자 이상 입력해주세요' },
    onBlur: () => {
      // focus인지 확인
      setTitleState({ ...titleState, isFocus: false });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">제목</div>
      <WhiteBoxSection
        className={`shadow-none border-2 !p-0 overflow-hidden ${titleState.isFocus && 'border-blue-600'}`}
      >
        <AutoResizeTextArea
          rows={2}
          className="outline-none p-2"
          {...titleRegister}
          value={titleState.value}
          onFocus={() => setTitleState({ ...titleState, isFocus: true })}
          onChange={(e) => {
            if (e.target.value.length > 100) return;
            setTitleState({ ...titleState, value: e.target.value });
            titleRegister.onChange(e);
          }}
        />
      </WhiteBoxSection>
      <div className="text-end text-gray-400">
        {titleState.value.length}/100
      </div>
      <ErrorComp name={'title'} />
    </div>
  );
}

function ContentInput() {
  const context = useContext(MakeQuestionContext);
  const [contentState, setContentState] = useState({
    isFocus: false,
    value: '',
  });
  if (!context) return null;

  const { register } = context;

  const contentRegister = register('content', {
    required: '내용을 입력해주세요',
    minLength: { value: 1, message: '내용은 1글자 이상 입력해주세요' },
    maxLength: {
      value: 1000,
      message: '내용은 1000글자 이하로 입력해주세요',
    },
    onBlur: () => {
      // focus인지 확인
      setContentState({ ...contentState, isFocus: false });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">본문</div>
      <WhiteBoxSection
        className={`shadow-none border-2 !p-0 overflow-hidden ${contentState.isFocus && 'border-blue-600'}`}
      >
        <AutoResizeTextArea
          rows={4}
          value={contentState.value}
          className="outline-none p-2"
          {...contentRegister}
          onFocus={() => setContentState({ ...contentState, isFocus: true })}
          onChange={(e) => {
            setContentState({ ...contentState, value: e.target.value });
            contentRegister.onChange(e);
          }}
        />
      </WhiteBoxSection>
      <ErrorComp name={'content'} />
    </div>
  );
}

const HashTagInput = React.memo(function HashTagInput() {
  const context = useContext(MakeQuestionContext);
  if (!context) return null;

  const { fields, remove, handleOnEnter } = context;
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="font-bold">해시태그 (최대 10개)</div>
      <div className="flex gap2 border-b-2">
        <input
          // value={value}
          name="hashTag"
          onKeyDown={handleOnEnter}
          type="text"
          className="outline-none"
        />
        <button className="text-gray-400">X</button>
      </div>
      <div className="flex flex-wrap gap-4">
        {fields.map(({ value }, index) => (
          <div
            key={value}
            className="flex gap-2 rounded-2xl border-2 border-orange-400 px-4 py-2"
          >
            {value}
            <button onClick={() => remove(index)}>X</button>
          </div>
        ))}
      </div>
      <ErrorComp name={'hashTags'} />
    </div>
  );
});

function LevelCheck() {
  const selectClass = 'bg-orange-400 text-white';

  const context = useContext(MakeQuestionContext);

  const { register, watch } = context!;

  const level = watch('level', '어린이');

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="font-bold">난이도</div>
      <div className="flex gap-2">
        {MakeQuestionState.LEVELS.map((le) => (
          <label
            htmlFor={le}
            key={le}
            className={`border-2 px-4 py-2 rounded-2xl font-bold cursor-pointer ${level === le && selectClass}`}
          >
            <input
              id={le}
              checked={level === le}
              className="absolute w-0 h-0"
              type="radio"
              value={le}
              {...register('level')}
            />
            {le}
          </label>
        ))}
      </div>
      <span className="bg-orange-400 rounded-xl text-white whitespace-pre inline-block p-4">
        {"'어린이'를 활성화 시키면\n 어린이 수준에 맞는 답변을 해줍니다."}
      </span>
    </div>
  );
}

const CheckList = function CheckList() {
  const context = useContext(MakeQuestionContext);
  if (!context) return null;

  const { register, watch } = context;
  const isCheck = watch('isCheck', false);
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-xl">질문 등록 시 유의 사항(필수)</div>
      <div className="border-2 rounded-xl p-4 whitespace-pre-wrap py-8">
        {`작성자님께서 궁금해하고 등록한 질문은 다른 사람들도 궁금해할 만한 질문들입니다.\n
질문에 대한 답변을 구매하는 형식이기에 `}
        <span className="text-orange-400 font-bold underline">
          한 사람이라도 답변을 한다면 질문을 수정하거나 삭제할 수 없습니다.
        </span>{' '}
        {`\n
이와 같은 이유로 작성하실 때 신중히 작성해주세요.`}
      </div>
      <div className="flex items-center gap-4 font-bold">
        <label
          htmlFor="isCheck"
          className={`aspect-square w-6 h-6 border-2 rounded-lg ${isCheck && 'bg-orange-400'}`}
        >
          <input
            className="absolute w-0 h-0"
            id="isCheck"
            type="checkbox"
            {...register('isCheck', {
              required: '유의 사항을 읽고 동의해주세요',
            })}
          />
        </label>
        <span>유의 사항을 모두 읽고 동의합니다.</span>
      </div>
      <ErrorComp name={'isCheck'} />
    </div>
  );
};

function ErrorComp({ name }: { name: keyof MakeQuestionState }) {
  const context = useContext(MakeQuestionContext);
  if (!context) return null;

  const { errors } = context;
  return (
    <div className="flex flex-col items-end text-red-600">
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages, message }) => {
          console.log({ name, messages, message });
          return (
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          );
        }}
      />
    </div>
  );
}
