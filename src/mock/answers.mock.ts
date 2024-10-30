import { AnswersResponse } from '../apis/answers.api';
import { Gender, Role } from '../apis/users.api';

export default function getRootAnswer(n: number): AnswersResponse[] {
  return [...new Array(n)].map((_, i) => ({
    answerId: new Date().getTime() + i,
    content: `content + ${i}`,
    isRootAnswer: true,
    childrenCount: i,
    createdAt: new Date().toISOString(),
    likeCount: i,
    isUpdated: false,
    user: {
      userId: i,
      username: `username + ${i}`,
      email: `email + ${i}`,
      role: Role.USER,
      isDeleted: false,
      point: i,
      profileImage:
        'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
      gender: Gender.DEFAULT,
    },
    isLike: false,
  }));
}

export function getChildAnswer(n: number): AnswersResponse[] {
  return [...new Array(n)].map((_, i) => ({
    answerId: (new Date().toISOString() + i) as unknown as number,
    content: `content + ${i}`,
    isRootAnswer: false,
    childrenCount: 0,
    createdAt: new Date().toISOString(),
    likeCount: i,
    isUpdated: false,
    isLike: false,
    user: {
      userId: i,
      username: `username + ${i}`,
      email: `email + ${i}`,
      role: Role.USER,
      isDeleted: false,
      point: i,
      profileImage:
        'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
      gender: Gender.DEFAULT,
    },
  }));
}
