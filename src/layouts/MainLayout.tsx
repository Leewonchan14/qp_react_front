import { Outlet } from 'react-router-dom';
import useAutoLogin from '../hooks/users/useAutoLogin';
import React from 'react';

export default function MainLayout() {
  const { isFetching, isLoading } = useAutoLogin();
  return (
    <div className="w-full flex flex-col max-w-home-max-width mx-auto mt-6 min-h-screen pb-20 px-4 mobile:mt-0">
      {!isFetching && !isLoading && <Outlet />}
    </div>
  );
}
