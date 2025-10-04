import { Router } from "express";
import {
    dadosMesEscolhido,
    dadosDeCadaDiaDoMesQtdProduzida,
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorNumeroTarefaPorMes,
    pegarTodosOsDadosDoMesSelecionado,
    diferencaMensalEntreDoisMeses,
    totalTempoSetupPorDiaDoMesProduzido
} from "../controllers/DadosController.js";

const router = Router();

//rota pra home rotas finalizadas
router.get('/dados-total-metros-produzidos-por-tecido/mes/:mes/ano/:ano', dadosMesEscolhido);
router.get('/dados-total-metros-produzidos-por-dia-durante-o-mes/mes/:mes/ano/:ano', dadosDeCadaDiaDoMesQtdProduzida);
router.get('/dados-total-tempo-setup-de-cada-dia-do-mes/mes/:mes/ano/:ano', totalTempoSetupPorDiaDoMesProduzido);

//rota pros gráficos
router.get('/dados-total-tempo-producao-por-dia-durante-o-mes/mes/:mes/ano/:ano', totalMetrosPorNumeroTarefaPorMesPorDia);
router.get('/dados-total-metros-por-numero-da-tarefa-do-mes/mes/:mes/ano/:ano', totalMetrosPorNumeroTarefaPorMes);

//rota para o historico
router.get('/dados-por-mes/mes/:mes/ano/:ano', pegarTodosOsDadosDoMesSelecionado)

//rota para diferença mensal
router.get('/dados-diferenca-mensal/date1/:date1/date2/:date2', diferencaMensalEntreDoisMeses);

export default router;