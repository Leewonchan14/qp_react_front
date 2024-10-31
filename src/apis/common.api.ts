import axios from 'axios';
import { SuccessResponse } from '../types/success.response';
import RefreshManager from './refresh.manager.api';
import userApi from './users.api';
import { getLocalToken, setLocalToken } from '../utils/tokenManager';

const base_url = import.meta.env.VITE_API_BASE_URL;

const refreshManager = RefreshManager.getInstance();

const api = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 액세스 토큰을 헤더에 추가
api.interceptors.request.use(
  (config) => {
    const { accessToken } = getLocalToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 응답 에러가 401이고 대기열에 추가되지 않은 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      // 토큰이 갱신중이라면 (토큰이 필요하므로 대기열에 추가후 종료)
      if (refreshManager.isRefreshing) {
        return refreshManager.addSubscribers(() => {
          api.request(originalRequest);
        });
      }

      // 토큰 갱신 중인 아닌 경우 토큰이 필요하니 refresh 요청으로 accessToken 재발급
      refreshManager.isRefreshing = true;
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const { data } =
          await userApi.refresh<SuccessResponse<{ accessToken: string }>>(
            refreshToken,
          );

        setLocalToken(data.result.accessToken);
        refreshManager.excuteSubscribers();

        return api.request(originalRequest);
      } catch (err) {
        // 토큰 갱신 실패 시 로그아웃 처리
        refreshManager.clearSubscribers();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
