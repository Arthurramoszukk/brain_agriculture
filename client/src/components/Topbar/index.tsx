import React, { useEffect } from 'react';
import { AppBar, Box, Toolbar, Link, Grid } from '@mui/material';
import './styles.scss';
import IconMainMenu from '../Icons/dashboard';

interface TopbarProps {
  readonly draggableComponents?: boolean;
  readonly mapViewPort?: boolean;
}

export default function Topbar({ draggableComponents = false, mapViewPort = false }: TopbarProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static" color="transparent" enableColorOnDark={true}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0px',
          }}
        >
          <Grid container xs={12}>
            <Grid container xs={4}>
              <Grid item xs={6} maxHeight={'65px'}>
                <Link href='/'>
                  <IconMainMenu />
                </Link>
              </Grid>
            </Grid>

            <Grid container xs={8} direction="row" alignItems="center" spacing={2}>
              <Grid
                container
                item
                xs={6}
                justifyContent="flex-start"
                alignItems="center"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box >
  )
}
