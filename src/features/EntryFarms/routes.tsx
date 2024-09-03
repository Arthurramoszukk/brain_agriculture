import Index from "../../features/EntryFarms/pages/Index";
import Create from "../../features/EntryFarms/pages/Create";
import Edit from "../../features/EntryFarms/pages/Edit";
import { Component } from "react";

export default function EntryFarmsRoutes() {
  const routes = [
    {path: '/entry-farms', Component: Index},
    {path: '/entry-farms/create', Component: Create},
    {path: '/entry-farms/:id', Component: Edit},
  ];

  return routes;
}