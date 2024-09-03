import React, { ReactNode } from 'react';
import { Container } from "@mui/material";
import './styles.scss';

type ContentProps = {
  children: ReactNode;
  marginLayout?: boolean;
}

export function Content(props: ContentProps) {
  let marginTop = 3;
  let marginBottom = 2 ;

  if(!props.marginLayout){
      marginTop = 0;
      marginBottom = 0 ;
  }

  return (
    <Container className="contentDiv" maxWidth={false} disableGutters={!props.marginLayout} sx={{ mt: marginTop, mb: marginBottom }}>
      {props.children}
    </Container>
  )
}