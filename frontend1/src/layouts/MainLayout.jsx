import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;