import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home";
import App from "../App";
import axios from "axios";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        {
            index: true,
            loader: () => axios(`${import.meta.env.VITE_SERVER}/featured-foods`),
            Component: HomePage
        }
    ]
  },
]);