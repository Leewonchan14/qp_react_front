import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import userApi from '../../apis/users.api';
import useUserStore from '../../stores/userStore';
import { getLocalToken } from '../../utils/tokenManager';

export default function useAutoLogin() {
  const login = useStore(useUserStore, (state) => state.login);
  const { accessToken } = getLocalToken();
  const { isFetching, isLoading, data, isSuccess } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const { data } = await userApi.autoLogin();
      return data.result;
    },
    retry: 0,
    enabled: !!accessToken,
  });
  useEffect(() => {
    if (isFetching || isLoading || !isSuccess || !data) return;
    const { accessToken, refreshToken } = getLocalToken();
    login(data.userId, accessToken, refreshToken);
  }, [isFetching, isLoading, data, isSuccess, login]);
  return { isFetching, isLoading, isSuccess, data };
}
