import React from 'react';
import Index from "./pages/Index";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

const EntryFarmsRoutes = () => {
  return [
    {path: '/entry-farms', component: Index},
    {path: '/entry-farms/create', component: Create},
    {path: '/entry-farms/:id', component: Edit},
  ];
}

export default EntryFarmsRoutes;