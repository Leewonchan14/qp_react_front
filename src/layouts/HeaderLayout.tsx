import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import React from 'react';

export default function HeaderLayout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}
