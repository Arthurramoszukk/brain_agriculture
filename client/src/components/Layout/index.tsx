import React, { ReactNode, useState } from 'react';
import { Grid } from "@mui/material";
import Topbar from '../Topbar';
import SidebarMenu from '../SidebarMenu';
import { Content } from '../Content';

type LayoutProps = {
  readonly children: ReactNode;
  readonly marginLayout?: true | false;
  readonly sidebar?: true | false;
}

export default function Layout({ children, marginLayout = false, sidebar = true }: LayoutProps) {
  return (
    <Grid container xs={12} sx={{ width: '100vw' }}>
      <Grid item >
        {sidebar ? <SidebarMenu /> : null}
      </Grid>
      <Content marginLayout={marginLayout}>
        {children}
      </Content>
    </Grid>
  );
}