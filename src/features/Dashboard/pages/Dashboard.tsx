import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Layout from "../../../components/Layout";
import InternalHeader from "../../../components/Layout/components/InternalHeader";

export default function Dashboard() {
  return (
    <Layout marginLayout={true}>
      <InternalHeader 
        title={'Dashboard'}
      />
    </Layout>
  );
}