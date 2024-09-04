import React from 'react';
import { Box, Container, ImageListItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function NotFound404() {
  return (
    <Container maxWidth="md" sx={{ height: '95vh', display: 'grid', placeItems: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h1">
            404
          </Typography>
          <Typography variant="h6">
            Página não encontrada
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
