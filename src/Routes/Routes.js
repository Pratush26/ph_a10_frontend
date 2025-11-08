import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        {
            index: true,
            Component: HomePage
        }
    ]
  },
]);