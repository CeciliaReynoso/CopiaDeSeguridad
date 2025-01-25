import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const AdministratorLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default AdministratorLayout;