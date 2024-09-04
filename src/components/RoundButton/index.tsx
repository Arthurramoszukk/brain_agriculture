import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

export default function ButtonRound(props: any) {    
  return (
    <Button 
      {...props}
      type="button"
      color="primary"
      sx={{  
        borderRadius: '50%', 
        width: '40px',
        height:'40px',
        minWidth: '40px',
      }}>
      { props.children }
    </Button>
  );
}