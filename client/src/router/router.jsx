import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../views/DashboardPage";
import HomePage from "../views/HomePage";
import RegistroPage from "../views/RegistroPage";
import LoginPage from "../views/LoginPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/dashboard',
        element: <DashboardPage />
    },
    {
        path: '/registro',
        element: <RegistroPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
]);

export default router;