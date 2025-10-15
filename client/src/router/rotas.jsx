import {createBrowserRouter} from 'react-router-dom';
import GraphicsPage from '../views/GraphicsPage';
import HomePage from '../views/HomePage';
import DashboardPage from '../views/DashboardPage';
import HistoricoPage from '../views/HistoricoPage';
import LoginPage from '../views/LoginPage';
import AnalisePage from '../views/AnalisePage';
import CadastroPage from '../views/CadastroPage';

const routes = createBrowserRouter
(
    [
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/dashboard',
            element: <DashboardPage />
        },
        {
            path: '/graficos',
            element: <GraphicsPage />
        },
        {
            path: '/historico',
            element: <HistoricoPage />
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/cadastro',
            element: <CadastroPage />
        },
        {
            path: '/analise-periodo',
            element: <AnalisePage />
        },
    ]
);

export default routes;