import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './layouts/AuthLayout';
import HeaderLayout from './layouts/HeaderLayout'; // eslint-disable-next-line prettier/prettier
import MainLayout from './layouts/MainLayout';
import AuthMainPage from './pages/auth/AuthMainPage';
import KakaoLoginRedirectPage from './pages/auth/KakaoLoginPage';
import HomePage from './pages/home/HomePage';
import NotFound from './pages/not-found';
import QuestionPage from './pages/question/QuestionDetailPage';
import SearchPage from './pages/search/SearchPage';
import MakeQuestionPage from './pages/question/QuestionMake/MakeQuestionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HeaderLayout />}>
            <Route index element={<HomePage />} />
            <Route path="questions" element={<MakeQuestionPage />} />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="search" element={<SearchPage />} />
            {/* <Route path="/" element={<AuthMainPage />} /> */}
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthMainPage />} />
            <Route path="kakao/login" element={<KakaoLoginRedirectPage />} />
          </Route>

          {/* <Route path="/question" element={<Questions />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
