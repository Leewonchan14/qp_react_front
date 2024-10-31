import { createContext, useCallback, useMemo } from 'react';
import {
  FieldErrors,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import MakeQuestionState from './types';
import useMutateMakeQuestion from './useMutateMakeQuestion';

type MakeQuestionContextValue =
  | ({
      errors: FieldErrors<MakeQuestionState>;
      register: UseFormRegister<MakeQuestionState>;
      handleOnEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
      setValue: UseFormSetValue<MakeQuestionState>;
      watch: UseFormWatch<MakeQuestionState>;
    } & Pick<
      UseFieldArrayReturn<MakeQuestionState, 'hashTags', 'id'>,
      'fields' | 'remove'
    >)
  | null;

export const MakeQuestionContext =
  createContext<MakeQuestionContextValue>(null);

export default function useMakeQuestion() {
  const {
    formState: { errors },
    control,
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
  } = useForm<MakeQuestionState>({
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'hashTags',
    rules: {
      validate: (value) => {
        if (value.length > 10) {
          return '해시태그는 10개 이하로 입력해주세요.';
        }
      },
    },
  });

  const handleOnEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        e.preventDefault();
        if (
          getValues().hashTags.find(
            ({ value }) => value === e.currentTarget.value,
          )
        )
          return;

        if (getValues().hashTags.length >= 10) return;
        if (e.currentTarget.value === '') return;
        append({ value: e.currentTarget.value });
        e.currentTarget.value = '';
        return;
      }
    },
    [append, getValues],
  );

  const value: MakeQuestionContextValue = useMemo(
    () => ({
      errors,
      register,
      handleOnEnter,
      remove,
      fields,
      setValue,
      watch,
    }),
    [errors, fields, handleOnEnter, register, remove, setValue, watch],
  );

  const { mutate } = useMutateMakeQuestion();

  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      handleSubmit((data) => {
        // console.log(data);
        mutate(data);
      })(e);
    },
    [handleSubmit, mutate],
  );

  return { value, handleOnSubmit };
}
