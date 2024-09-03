import MainView from "./pages/Index";
import { Component } from "react";

export default function EntryFarmsRoutes() {
  const routes = [
    {path: '/', Component: MainView},
  ];

  return routes;
}