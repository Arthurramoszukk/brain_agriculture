import React from 'react';
import { BrowserRouter, Redirect, Switch, Route, RouteProps } from 'react-router-dom';
import RouteManager from './RouteManager';
import routers from './routers';

function MountedRouter() {
  console.log(routers)
  
  return (
    <RouteManager />
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <MountedRouter />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;