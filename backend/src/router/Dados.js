import { Router } from "express";
import {
    dadosMesEscolhido,
    dadosDeCadaDiaDoMesQtdProduzida,
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorNumeroTarefaPorMes
} from "../controllers/DadosController.js";

const router = Router();
router.get('/dados-total-metros-por-mes-produzidos/mes/:mes/ano/:ano', dadosMesEscolhido);
router.get('/dados-total-metros-por-dia-do-mes/mes/:mes/ano/:ano', dadosDeCadaDiaDoMesQtdProduzida);
router.get('/dados-total-metros-por-tarefa-por-dia/mes/:mes/ano/:ano', totalMetrosPorNumeroTarefaPorMesPorDia);
router.get('/dados-total-metros-por-tarefa-do-mes/mes/:mes/ano/:ano', totalMetrosPorNumeroTarefaPorMes);


export default router;