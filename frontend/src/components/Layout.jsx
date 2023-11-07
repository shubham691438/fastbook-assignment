import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {

  return (
    <Box sx={{m: 5,}}>
        {/* <Navbar /> */}
        <Outlet />
        {/* <BottomNav /> */}
   
    </Box>
  );
};

export default Layout;
