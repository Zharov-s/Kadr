import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Layout/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [{}],
  },
]);
