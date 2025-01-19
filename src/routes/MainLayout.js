import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
    <div className='lg:my-20 lg:mx-24 lg:border lg:border-gray-300'>
        <Header />
        <Outlet />
    </div>
);

export default MainLayout;