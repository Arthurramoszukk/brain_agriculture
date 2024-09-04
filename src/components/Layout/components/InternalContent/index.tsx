import React from 'react';
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { useHookstate } from '@hookstate/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface InternalContentProps {
  readonly title?: string,
  readonly expandButton?: boolean,
  readonly children: React.ReactNode,
}

export default function InternalContent({title, expandButton = true, children}: InternalContentProps){
  const expandContent = useHookstate(true);

  return (
    <Card sx={{ boxShadow: 4, marginBottom: 2 }}>

      { expandButton ? (
      <CardHeader title={`${title ? title : ''}`} avatar={
        <IconButton
            onClick={() => expandContent.set(!expandContent.get())}
            sx={{
                display: 'flex',
                justifyContent: 'end',
                marginRight: 1, padding: 0
            }}>
            {expandContent.get() ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
        </IconButton>} />
      
      ): null }
                
      <CardContent hidden={!expandContent.get()}>
        {children}
      </CardContent>
    </Card>
  );
}