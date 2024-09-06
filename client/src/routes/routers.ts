import React from 'react';
import mainView from '../features/MainView/routes'
import dashboardRoutes from '../features/Dashboard/routes';
import entryFarmsRoutes from '../features/EntryFarms/routes';

type RouteConfig = {
  path: string;
  component: React.ComponentType<any>;
};

const routers: RouteConfig[] = [
  ...mainView(),
  ...dashboardRoutes(),
  ...entryFarmsRoutes(),
];

export default routers;