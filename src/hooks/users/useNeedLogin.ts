import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import useUserStore from '../../stores/userStore';

const useNeedLogin = (): number => {
  const navigate = useNavigate();
  const isLogin = useStore(useUserStore, (state) => state.isLogin);
  const userId = useStore(useUserStore, (state) => state.userId);

  useEffect(() => {
    if (!isLogin) {
      navigate('/auth/login', { replace: true });
    }
  }, [isLogin, navigate]);

  return userId!;
};

export default useNeedLogin;
