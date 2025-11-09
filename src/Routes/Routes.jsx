import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home";
import App from "../App";
import axios from "axios";
import AllFoodsPage from "../Pages/AllFoods";
import RegistrationPage from "../Pages/Register";
import LoginPage from "../Pages/Login";
import MyFoodsPage from "../Pages/MyFoods";
import FoodDetails from "../Pages/Details";
import LoadingPage from "../Layouts/Loading";
import PrivateRoute from "../Utils/PrivateRoute";
import AddFoodForm from "../Pages/AddFoods";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <LoadingPage />,
    Component: App,
    children: [
        {
            index: true,
            loader: () => axios(`${import.meta.env.VITE_SERVER}/featured-foods`),
            Component: HomePage
        },
        {
            path: '/all-foods',
            loader: () => axios(`${import.meta.env.VITE_SERVER}/foods`),
            element: <PrivateRoute><AllFoodsPage /></PrivateRoute>
        },
        {
            path: '/my-foods',
            loader: () => axios(`${import.meta.env.VITE_SERVER}/foods`),
            element: <PrivateRoute><MyFoodsPage /></PrivateRoute>
        },
        {
            path: '/add-food',
            element: <PrivateRoute><AddFoodForm /></PrivateRoute>
        },
        {
            path: '/food/details/:id',
            loader: ({params}) => axios(`${import.meta.env.VITE_SERVER}/foods/${params.id}`),
            element: <PrivateRoute><FoodDetails /></PrivateRoute>
        },
        {
            path: '/register',
            Component: RegistrationPage
        },
        {
            path: '/login',
            Component: LoginPage
        },
    ]
  },
]);