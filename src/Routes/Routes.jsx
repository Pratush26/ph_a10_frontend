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
            loader: () => axios(`${import.meta.env.VITE_SERVER}/foods`),
            element: <PrivateRoute><AllFoodsPage /></PrivateRoute>
        },
        {
            path: '/my-foods',
            element: <PrivateRoute><MyFoodsPage /></PrivateRoute>
        },
        {
            path: '/add-food',
            element: <PrivateRoute><AddFoodForm /></PrivateRoute>
        },
        {
            path: '/food/details/:id',
            loader: async ({params}) => {
                const food = await axios(`${import.meta.env.VITE_SERVER}/foods/${params.id}`)
                const requests = await axios(`${import.meta.env.VITE_SERVER}/food-requests/${params.id}`)
                return {data: food.data, requests: requests.data}
            },
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
        {
            path: '*',
            Component: NotFoundPage
        }
    ]
  },
]);