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
import NotFoundPage from "../Pages/NotFound";
import ErrorPage from "../Layouts/ErrorPage";
import UpdateFoodPage from "../Pages/UpdateFood";
import MyRequestsPage from "../Pages/MyRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <LoadingPage />,
    errorElement: <ErrorPage />,
    Component: App,
    children: [
        {
            index: true,
            loader: () => axios(`${import.meta.env.VITE_SERVER}/featured-foods`),
            Component: HomePage
        },
        {
            path: '/all-foods',
            element: <PrivateRoute><AllFoodsPage /></PrivateRoute>
        },
        {
            path: '/my-foods',
            element: <PrivateRoute><MyFoodsPage /></PrivateRoute>
        },
        {
            path: '/my-requests',
            element: <PrivateRoute><MyRequestsPage /></PrivateRoute>
        },
        {
            path: '/add-food',
            element: <PrivateRoute><AddFoodForm /></PrivateRoute>
        },
        {
            path: '/food/details/:id',
            element: <PrivateRoute><FoodDetails /></PrivateRoute>
        },
        {
            path: '/update-food',
            element: <PrivateRoute><UpdateFoodPage /></PrivateRoute>
        },
        {
            path: '/register',
            Component: RegistrationPage
        },
        {
            path: '/login',
            Component: LoginPage
        },
        {
            path: '*',
            Component: NotFoundPage
        }
    ]
  },
]);