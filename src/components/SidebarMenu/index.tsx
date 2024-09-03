import React, { useState } from 'react';
import { Box } from '@mui/material';

import './styles.scss';

export default function SidebarMenu() {
  const [activeMenu, setMenuItem] = useState<string>('');

  const handleMenuClick = (menuItem: string) => {
    setMenuItem(activeMenu != menuItem ? menuItem : '');
  }

  return (
    <Box className="sidebar-menu">
      
    </Box>
  );
}