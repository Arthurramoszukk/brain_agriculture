import React from 'react';
import { BrowserRouter, Redirect, Switch, Route, RouteProps } from 'react-router-dom';
import RouteManager from './RouteManager';
import routers from './routers';

function MountedRouter() {
  
  return (    
    <RouteManager>
      {routers.map((route, index) => (
        <Route
        key={index}
        path={route.path}
        exact
        render={(props) => {
          const Component = route.component;
          return <Component {...props} />;
        }}
      />
      ))}
    </RouteManager>
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