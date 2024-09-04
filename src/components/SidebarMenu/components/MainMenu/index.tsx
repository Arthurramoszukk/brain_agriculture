import React from 'react';
import { Box, Button, Card, Tooltip, Typography, ListItemButton, ListItemText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DashboardMenu from '../../../Icons/dashboard';

export type MenuProps = {
  readonly activeMenu: string;
  readonly handleMenuClick: (menuItem: string) => void;
}

export default function MainMenu({ activeMenu, handleMenuClick }: MenuProps) {
  const history = useHistory();

  return(
    <>
      <Box>
        <Tooltip title={'Menu Principal'} placement="bottom">
          <Button className={`main-menu ${ activeMenu == 'dashboard' ? 'active' : '' }`} onClick={() => handleMenuClick('dashboard')}>
            <DashboardMenu />
          </Button>
        </Tooltip>
        <Card className='submenu-box' sx={{ borderRadius:0,display: activeMenu == 'dashboard' ? 'block' : 'none'}}>
          <Typography variant='h4'>
            <DashboardMenu />
              {'Menu Principal'}
          </Typography>

          <Tooltip title={'Dashboard'} placement="right">
            <ListItemButton onClick={ () => history.push("/dashboard") }>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </Tooltip>
        </Card>
      </Box>
    </>
  );
}