import { NavigateOptions, useLocation, useNavigate } from 'react-router-dom';

export default function useGoHome(option?: NavigateOptions) {
  const navigate = useNavigate();
  const location = useLocation();
  const goHome = () => {
    if (location.pathname !== '/') {
      navigate('/', option);
    }
  };
  return goHome;
}
