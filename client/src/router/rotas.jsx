import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import GraphicsPage from '../views/GraphicsPage';

const routes = createBrowserRouter
(
    [
        {
            path: '/',
            element: <App />
        },
        {
            path: '/graficos',
            element: <GraphicsPage />
        },
        {
            path: '/historico',
            //element: <App />
        },
        {
            path: '/login',
            //: <App />
        },
        {
            path: '/criar-conta',
            //: <App />
        },
        {
            path: '/diferenca-mensal',
            //element: <App />
        },
    ]
);

export default routes;