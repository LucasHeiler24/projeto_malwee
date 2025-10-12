import { Router } from "express";

import {
    analisePorPeriodoSemanal,
    analisePorPeriodoQuinzenal,
    analisePorPeriodoMensal,
    analisePorPeriodoDiario
} from "../controllers/DadosAnaliseController.js";

import {
    dadosDeCadaDiaDoMesQtdProduzida,
    dadosMesEscolhido,
    totalTempoSetupPorDiaDoMesProduzido
} from "../controllers/DadosHomeController.js";

import {
    calcularTempoSetupPorDiaDoMes,
    totalMetrosPorNumeroTarefaPorMes,
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorTipoTecidoNoMes,
    totalTarefasCompletasENaoCompletasNoMes,
    totalTempoSetupPorNumeroTarefa
} from "../controllers/DadosGraficoController.js";

import { pegarTodosOsDadosDoMesSelecionado } from "../controllers/DadosHistorico.js";

import { diferencaMensalEntreDoisMeses } from "../controllers/DadosDiferencaMensalController.js";

const router = Router();

//rota pra home rotas finalizadas
router.get('/dados-total-metros-produzidos-por-tecido/mes/:mes/ano/:ano', dadosMesEscolhido);
router.get('/dados-total-metros-produzidos-por-dia-durante-o-mes/mes/:mes/ano/:ano', dadosDeCadaDiaDoMesQtdProduzida);
router.get('/dados-total-tempo-setup-de-cada-dia-do-mes/mes/:mes/ano/:ano', totalTempoSetupPorDiaDoMesProduzido);

//rota pros gráficos
router.get('/dados-total-tempo-producao-por-dia-durante-o-mes/mes/:mes/ano/:ano', totalMetrosPorNumeroTarefaPorMesPorDia);
router.get('/dados-total-metros-por-numero-da-tarefa-do-mes/mes/:mes/ano/:ano', totalMetrosPorNumeroTarefaPorMes);
router.get('/dados-total-tarefas-completas-e-nao-completas/mes/:mes/ano/:ano', totalTarefasCompletasENaoCompletasNoMes);
router.get('/dados-total-tempo-setup-por-numero-tarefa/mes/:mes/ano/:ano', totalTempoSetupPorNumeroTarefa);
router.get('/dados-total-tempo-setup-por-dia-do-mes/mes/:mes/ano/:ano', calcularTempoSetupPorDiaDoMes);
router.get('/dados-total-metros-produzidos-por-tipo-tecido-no-mes/mes/:mes/ano/:ano', totalMetrosPorTipoTecidoNoMes);

//rota para o historico
router.get('/dados-por-mes/mes/:mes/ano/:ano', pegarTodosOsDadosDoMesSelecionado)

//rota para diferença mensal
router.get('/dados-diferenca-mensal/date1/:date1/date2/:date2', diferencaMensalEntreDoisMeses);

//análise por período
router.get('/dados-analise-por-semanal/date/:date', analisePorPeriodoSemanal);
router.get('/dados-analise-por-diario/date/:date', analisePorPeriodoDiario);
router.get('/dados-analise-por-quinzenal/date/:date', analisePorPeriodoQuinzenal);
router.get('/dados-analise-por-mensal/date/:date', analisePorPeriodoMensal);

export default router;