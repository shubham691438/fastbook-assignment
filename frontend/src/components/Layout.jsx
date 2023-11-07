import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {

  return (
    <>
         
        {/* <Navbar /> */}
        <Outlet />
        {/* <BottomNav /> */}
   
    </>
  );
};

export default Layout;
