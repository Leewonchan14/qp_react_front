import React from 'react';
import { useStore } from 'zustand';
import UserProfileImage from '../../pages/question/UserProfileImage';
import useUserStore from '../../stores/userStore';
import BottomSheet from '../common/BottomSheet';
import { Link } from 'react-router-dom';
import useFetchUser from '../../hooks/users/useFetchUser';

export default function UserProfileWithLoginButton() {
  const isLogin = useStore(useUserStore, (state) => state.isLogin);

  if (!isLogin) return <LoginButton />;

  return <UserProfile />;
}

function UserProfile() {
  const { userId, logout } = useStore(useUserStore, (state) => state);
  const { data, isFetching, isLoading } = useFetchUser(userId);
  if (isFetching || isLoading) return null;
  return (
    <>
      <div
        className={`absolute flex-col gap-4 justify-center py-12 items-center left-full top-0 ml-4 bg-orange-400 rounded-lg w-40 shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3),0px_4px_4px_rgba(0,0,0,0.5)] pc:flex hidden`}
      >
        <button
          onClick={logout}
          className="absolute right-4 top-4 text-white font-bold"
        >
          로그아웃
        </button>
        <UserProfileImage user={data} />
        <span className="text-white font-bold text-xl">{data?.username}</span>
        <span className="text-white font-bold text-xl">{data?.point} P</span>
        {/* <button className="bg-white p-2 rounded-3xl text-orange-400 font-bold">
          충전하러 가기
        </button> */}
      </div>
      <BottomSheet>
        <div
          className={`w-full bg-orange-400 max-w-home-max-width mx-auto h-24 flex p-4 px-8 justify-center items-center rounded-t-3xl shadow-[inset_0px_4px_4px_rgba(0,0,0,0.3)] font-bold text-white text-xl`}
        >
          <div className="flex flex-col">
            <span className="font-bold text-xl">{data?.username}</span>
            <span className="font-bold text-xl">{data?.point} P</span>
          </div>
          <UserProfileImage className="absolute scale-150 z-10" user={data} />
          <div className="ml-auto">
            <button
              onClick={logout}
              className="right-4 top-4 text-white font-bold"
            >
              로그아웃
            </button>
            {/* <button className="p-2 text-white font-bold text-lg">
              충전하러 가기 {'>'}
            </button> */}
          </div>
        </div>
      </BottomSheet>
    </>
  );
}

function LoginButton() {
  return (
    <>
      <Link
        to={'/auth/login'}
        className={`absolute hidden pc:left-full pc:ml-4 rounded-2xl bg-orange-500 text-white font-bold text-2xl justify-center items-center text-nowrap p-4 pc:flex`}
      >
        로그인
      </Link>
      <BottomSheet>
        <Link
          to={'/auth/login'}
          className={`w-full bg-white max-w-home-max-width mx-auto h-24 flex p-4 justify-center items-center rounded-t-3xl shadow-[inset_0px_4px_4px_rgba(0,0,0,0.3)] font-bold text-orange-400 text-xl`}
        >
          로그인
        </Link>
      </BottomSheet>
    </>
  );
}
