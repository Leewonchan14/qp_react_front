import MakeQuestionState from '../hooks/questions/make/types';
import { SuccessResponse } from '../types/success.response';
import api from './common.api';
import { UsersResponse } from './users.api';

const questionApi = {
  findAll: <T>(page: number, pageSize: number, search?: string) => {
    return api.request<T>({
      url: 'api/questions',
      params: { page, pageSize, search },
    });
  },

  findById: <T>(questionId: number) => {
    return api.request<T>({
      url: `api/questions/${questionId}`,
    });
  },

  findAdjacent: <T>(questionId: number) => {
    return api.request<T>({
      url: `api/questions/adjacent/${questionId}`,
    });
  },

  create: (data: ReturnType<typeof MakeQuestionState.toApiRequest>) => {
    return api.request<
      SuccessResponse<{
        questionId: number;
      }>
    >({
      url: 'api/questions',
      method: 'POST',
      data,
    });
  },
};

export interface QuestionResponse {
  questionId: number;
  title: string;
  content: string;
  hit: number;
  isChild: boolean;
  isDeleted: boolean;
  createdAt: string;

  answerCount: number;
  expertCount: number;

  user: UsersResponse;
  hashTags: HashTagsResponse[];
}

export interface HashTagsResponse {
  hashTagId: number;
  hashTag: string;
}

export interface AdjacentQuestionResponse {
  preQuestion: { title: number; questionId: number } | null;
  nextQuestion: { title: number; questionId: number } | null;
}

export default questionApi;
