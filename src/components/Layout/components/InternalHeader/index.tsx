import React, { ReactElement } from 'react'
import { Card, CardHeader, Grid } from '@mui/material'

interface InternalHeaderProps {
  readonly title: string,
  readonly subheader?: string | ReactElement<any, any>,
  readonly action?: ReactElement<any, any>
}

export default function InternalHeader({title, subheader, action}:InternalHeaderProps){
  return (
    <Card sx={{ boxShadow: 4, marginBottom: 2 }}>
        <Grid container xs={12}>
            <Grid item xs={12}>
            <CardHeader
              title={title}
              subheader={subheader}
              action={action}
            />
            </Grid>
        </Grid>
    </Card>
  );
}