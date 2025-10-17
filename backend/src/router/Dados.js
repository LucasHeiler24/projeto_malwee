import { Router } from "express";
import {
    controllerGetDadosSemanaisOuQuinzenaisPosteriores,
    controllerGetDadosSemanaisOuQuinzenaisAnteriores
} from "../controllers/DashboardController.js";

const routerDados = Router();

//Rotas para Dashboard
//Rotas para pegar dados semanais ou quinzenais
routerDados.get('/posterior/data/:data/type/:type', controllerGetDadosSemanaisOuQuinzenaisPosteriores);
routerDados.get('/anterior/data/:data/type/:type', controllerGetDadosSemanaisOuQuinzenaisAnteriores);

export default routerDados;