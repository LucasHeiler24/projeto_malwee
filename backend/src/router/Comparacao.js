import { Router } from "express";
import { 
    controllerComparacaoAnterior,
    controllerComparacaoDiaria,
    controllerComparacaoMensal,
    controllerComparacaoPosterior,

} from "../controllers/ComparacaoController.js";

const routerComparacao = Router();

routerComparacao.get('/diario/:data1/:data2', controllerComparacaoDiaria);
routerComparacao.get('/anterior/type/:type/:data1/:data2', controllerComparacaoAnterior);
routerComparacao.get('/posterior/type/:type/:data1/:data2', controllerComparacaoPosterior);
routerComparacao.get('/mensal/:data1/:data2', controllerComparacaoMensal);

export default routerComparacao;