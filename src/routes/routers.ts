import React from 'react';
import mainView from '../features/MainView/routes'
import dashboardRoutes from '../features/Dashboard/routes';
import entryFarmsRoutes from '../features/EntryFarms/routes';

const routers = [
  ...mainView(),
  ...dashboardRoutes(),
  ...entryFarmsRoutes(),
];

export default routers;