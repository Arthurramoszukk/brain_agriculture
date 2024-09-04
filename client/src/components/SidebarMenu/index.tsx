import React, { useState } from 'react';
import { Box } from '@mui/material';
import MainMenu from './components/MainMenu';
import EntryMenu from './components/EntryMenu';

import './styles.scss';

export default function SidebarMenu() {
  const [activeMenu, setMenuItem] = useState<string>('');

  const handleMenuClick = (menuItem: string) => {
    setMenuItem(activeMenu != menuItem ? menuItem : '');
  }

  return (
    <Box className="sidebar-menu">
        <MainMenu activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        <EntryMenu activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
    </Box>
  );
}