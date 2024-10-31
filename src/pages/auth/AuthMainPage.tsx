import React from 'react';
import { Link } from 'react-router-dom';
import KakaoLoginButton from '../../assets/kakao_login_button.png';
import Logo from '../../assets/logo.png';
import NaverLoginButton from '../../assets/naver_login.png';

export default function AuthMainPage() {
  return (
    <div className="flex flex-col items-center w-full gap-4 my-auto">
      <Link
        to={'/'}
        className={
          'w-24 h-24 mobile:w-16 mobile:h-16 flex justify-center items-center'
        }
      >
        <img className="w-full h-full" src={Logo} alt="" />
      </Link>
      <Link to={'/'} className="flex justify-center">
        <img className="object-fill h-16" src={NaverLoginButton} alt="" />
      </Link>
      <Link
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}&response_type=code`}
        className="flex justify-center"
      >
        <img className="object-fill h-16" src={KakaoLoginButton} alt="" />
      </Link>
    </div>
  );
}
