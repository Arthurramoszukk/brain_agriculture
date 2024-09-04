import React from 'react';
import { Box, Button, Card, Tooltip, Typography, ListItemButton, ListItemText } from '@mui/material';
import { useHistory } from 'react-router-dom';
import IconEntryMenu from '../../../Icons/entry';

export type MenuProps = {
  readonly activeMenu: string;
  readonly handleMenuClick: (menuItem: string) => void;
}

export default function EntryMenu({ activeMenu, handleMenuClick }: MenuProps) {
  const history = useHistory();

  return(
    <>
      <Box>
        <Tooltip title={'Adicionar Fazendas'} placement="bottom">
          <Button className={`main-menu ${ activeMenu == 'farms' ? 'active' : '' }`} onClick={() => handleMenuClick('farms')}>
            <IconEntryMenu />
          </Button>
        </Tooltip>
        <Card className='submenu-box' sx={{ borderRadius:0,display: activeMenu == 'farms' ? 'block' : 'none'}}>
          <Typography variant='h4'>
            <IconEntryMenu />
              {'Fazendas'}
          </Typography>

          <Tooltip title={'Listar, adicionar e apagar fazendas'} placement="right">
            <ListItemButton onClick={ () => history.push("/entry-farms") }>
              <ListItemText primary={'Listagem de fazendas'} />
            </ListItemButton>
          </Tooltip>
        </Card>
      </Box>
    </>
  );
}