import { PaginateResponse } from '../types/paginate.response';
import { SuccessResponse } from '../types/success.response';
import api from './common.api';
import { UsersResponse } from './users.api';

const answerApi = {
  findByQuestion: (
    questionId: number,
    page: number,
    pageSize: number,
    userId?: number,
  ) => {
    return api.request<SuccessResponse<PaginateResponse<AnswersResponse>>>({
      url: `api/answers/questions/${questionId}`,
      params: { page, pageSize, userId },
    });
  },

  findByParents: (
    answerId: number,
    page: number,
    pageSize: number,
    userId?: number,
  ) => {
    return api.request<SuccessResponse<PaginateResponse<AnswersResponse>>>({
      url: `api/answers/parent/${answerId}`,
      params: { page, pageSize, userId },
    });
  },

  create: (questionId: number, content: string, parentAnswerId?: number) => {
    return api.request<SuccessResponse<{ answerId: number }>>({
      url: `api/answers/questions/${questionId}`,
      method: 'POST',
      data: {
        content,
        isRootAnswer: !!!parentAnswerId,
        ...(parentAnswerId ? { parentAnswerId } : {}),
      },
    });
  },

  like: (answerId: number) => {
    return api.request<SuccessResponse<null>>({
      method: 'POST',
      url: `api/answers/${answerId}/like`,
    });
  },

  // likeAnswer: <T>(answerId: number) => {
  //   return api.request<T>({
  //     url: `:answerId/like/${userId}`,
  //     method: 'POST',
  //   });
  // },
};

export interface AnswersResponse {
  answerId: number;

  content: string;

  isRootAnswer: boolean;

  isUpdated: boolean;

  createdAt: string;

  user: UsersResponse;
  childrenCount: number;
  likeCount: number;
  isLike: boolean;
}

export function createNewUser(
  user: UsersResponse,
  answerId: number,
  content: string,
): AnswersResponse {
  return {
    answerId,
    content,
    isRootAnswer: true,
    isUpdated: true,
    createdAt: new Date().toISOString(),
    user,
    childrenCount: 0,
    likeCount: 0,
    isLike: false,
  };
}

export default answerApi;
