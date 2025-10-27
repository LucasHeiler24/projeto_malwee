import {Router} from "express";
import { 
    todosRegistrosDiario,
    todosRegistrosMensal,
    todosRegistrosSemanaisOuQuinzenaisAnteriores,
    todosRegistrosSemanaisOuQuinzenaisPosterior
} from "../controllers/HistoricoController.js";

const routerHistorico = Router();

routerHistorico.get('/diario/todos/data/:data', todosRegistrosDiario);
routerHistorico.get('/anterior/todos/data/:data/type/:type', todosRegistrosSemanaisOuQuinzenaisAnteriores);
routerHistorico.get('/posterior/todos/data/:data/type/:type', todosRegistrosSemanaisOuQuinzenaisPosterior);
routerHistorico.get('/mensal/todos/data/:data', todosRegistrosMensal);

export default routerHistorico;