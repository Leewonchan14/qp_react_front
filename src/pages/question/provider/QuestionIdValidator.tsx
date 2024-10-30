import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../not-found';

export const QuestionIdValidContext = React.createContext<boolean>(false);

export default function QuestionIdValidProvider({
  children,
}: React.PropsWithChildren) {
  const { questionId } = useParams();

  if (!questionId || isNaN(Number(questionId))) {
    return <NotFound />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
