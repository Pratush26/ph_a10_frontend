import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
        {
            index: true,
            Component: HomePage
        }
    ]
  },
]);