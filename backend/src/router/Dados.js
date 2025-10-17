import { Router } from "express";
import {
    controllerGetDadosSemanaisOuQuinzenaisPosteriores,
    controllerGetDadosSemanaisOuQuinzenaisAnteriores,
    controllerGetDadosDiario,
    controllerGetDadosMensal
} from "../controllers/DashboardController.js";

const routerDados = Router();

//Rotas para Dashboard
//Rotas para pegar dados semanais ou quinzenais
routerDados.get('/posterior/data/:data/type/:type', controllerGetDadosSemanaisOuQuinzenaisPosteriores);
routerDados.get('/anterior/data/:data/type/:type', controllerGetDadosSemanaisOuQuinzenaisAnteriores);
routerDados.get('/diario/data/:data', controllerGetDadosDiario);
routerDados.get('/mensal/data/:data', controllerGetDadosMensal);

export default routerDados;