import React from 'react';
import { withRouter, matchPath } from "react-router-dom";
import NotFound404 from "../features/MainView/pages/notFaound404";
import routers from './routers';

const ProviderHOC = (NotFoundRoute: any) => {
  const RouteProvider = (props: any) => {
      const currentLocation = props.location.pathname;
      const routeExists = routers.find((item) => matchPath(currentLocation, {
          path: item.path,
          exact: true,
          strict: false
      }));
      
      if(!routeExists && currentLocation != '/') {
         return <NotFoundRoute {...props}/>
      }
      return props.children;
  }
  return withRouter(RouteProvider)
}

export default ProviderHOC(NotFound404);