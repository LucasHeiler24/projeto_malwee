import { Router } from "express";
import { controllerGetMediaPorDiaNoMesPorTecido } from "../controllers/DashboardController.js";

const routerDados = Router();

//Rotas para Dashboard
routerDados.get('/', controllerGetMediaPorDiaNoMesPorTecido);

export default routerDados;