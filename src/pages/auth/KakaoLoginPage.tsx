import React from 'react';
import { useStore } from 'zustand';
import useGetSearchParam from '../../hooks/navigate/useGetSearchParam';
import useGoHome from '../../hooks/navigate/useGoHome';
import useLoginWithKakaoCode from '../../hooks/users/useLoginWithKakaoCode';
import useUserStore from '../../stores/userStore';

export default function KakaoLoginRedirectPage() {
  const { code } = useGetSearchParam();
  const login = useStore(useUserStore, (state) => state.login);
  const goHome = useGoHome({ replace: true });

  useLoginWithKakaoCode({
    code,
    onSuccess: (userId, accessToken, refreshToken) => {
      login(userId, accessToken, refreshToken);
      goHome();
    },
  });

  return <React.Fragment />;
}
