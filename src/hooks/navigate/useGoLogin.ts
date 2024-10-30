import { NavigateOptions, useLocation, useNavigate } from 'react-router-dom';

export default function useGoLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const goLoginPage = (option?: NavigateOptions) => {
    if (location.pathname === '/auth/login') return;
    navigate('/auth/login', option);
  };

  return goLoginPage;
}
