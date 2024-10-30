import { create } from 'zustand';
import { removeLocalToken, setLocalToken } from '../utils/tokenManager';

interface UserState {
  isLogin: boolean;
  userId: number | null;
  login: (userId: number, accessToken?: string, refreshToken?: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  isLogin: false,
  userId: null,
  login: (userId: number, accessToken?: string, refreshToken?: string) => {
    set(() => {
      setLocalToken(accessToken, refreshToken);
      return { isLogin: true, userId };
    });
  },
  logout() {
    set(() => {
      removeLocalToken();
      return { isLogin: false, userId: 0 };
    });
  },
}));

export default useUserStore;
