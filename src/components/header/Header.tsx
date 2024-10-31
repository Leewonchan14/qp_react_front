import React from 'react';
import Logo from '../../assets/logo.png';
import useGoHome from '../../hooks/navigate/useGoHome';
import SearchBar from './SearchBar';
import UserProfileWithLoginButton from './UserProfileWithLogin';

export default function Header() {
  const goHome = useGoHome();
  return (
    <div className="relative top-0 h-28 w-full flex justify-between items-center mb-10 mobile:mb-0">
      <button
        onClick={goHome}
        className={
          'pc:absolute pc:right-full top-0 text-orange-400 text-4xl font-bold w-24 h-24 mobile:w-16 mobile:h-16 mr-4 flex justify-center items-center'
        }
      >
        <img className="w-full h-full" src={Logo} alt="" />
      </button>

      <SearchBar />
      <UserProfileWithLoginButton />
    </div>
  );
}
