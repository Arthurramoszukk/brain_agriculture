import Dashboard from "./pages/Dashboard";
import { Component } from "react";

export default function DashboardRoutes() {
  const routes = [
    {path: '/dashboard', Component: Dashboard},
  ];

  return routes;
}