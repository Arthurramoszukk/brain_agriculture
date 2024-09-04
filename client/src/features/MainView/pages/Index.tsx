import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Layout from "../../../components/Layout";
import InternalHeader from "../../../components/Layout/components/InternalHeader";

export default function MainView() {
  return (
    <Layout marginLayout={true}>
      <InternalHeader subheader={
        <Typography sx={{ color: 'orange' }}>
          {'Seja bem vindo'}
        </Typography>}
        title={'Brain Agriculture'}
      />
    </Layout>
  );
}