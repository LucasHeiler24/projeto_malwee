import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";
import {
    pegarTotalDeMetrosPorDiaEProduPeloMes,
    removerDupliados,
    calcularQuantidadeTempoProducaoPorDia,
    somarTotalDeMetrosProduzidosNoMes,
    somarTotalDeTempoProducaoNoMes,
    encontrarNumeroTarefasIguaisEmDoisMeses,
    encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses,
    calcularOTempoDeSetupDasDatasDeUmMes,
    totalTarefasENaoCompletasNoMes,
    calcularTotalTempoSetupDeCadaTarefaNoMes,
    somarTotalMetrosPorTiposDeTecidosNoMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    somarTempoDeSetupPorCadaDiaDoMes,
    somarTotalTempoSetupNoMes,
    encontrarNumeroTarefasIguaisEmDoisMesesEntreTempoSetup
} from "../helpers/funcoes.js";

//Esse controller pega o total de producao feita por cada tipo de tecido
const dadosMesEscolhido = async function (request, response) {

    //aqui guarda os paramêtros passados na url
    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        //faço a conexão com o banco com parâmetros vindos na url
        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        //retorno a soma de metros produzidos por tipo de tecido
        return response.json(somarTotalMetrosPorTiposDeTecidosNoMes(dados));
    }
    catch (e) {
        return response.json(e);
    }

}

const dadosDeCadaDiaDoMesQtdProduzida = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        //pego somente as datas vindos dos dados do banco
        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.data_historico.split(' ')[0]);
    
        //removo as datas duplicadas
        let removerDatasDuplicadas = removerDupliados(vetDadosDeCadaDiaDoMes);

        //retorno o total de metros produzidos pelo dia do mês
        return response.json(pegarTotalDeMetrosPorDiaPeloMes(dados, removerDatasDuplicadas));

    }
    catch (e) {
        return response.json(e);
    }

}

const totalMetrosPorNumeroTarefaPorMesPorDia = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.data_historico.split(' ')[0]);

        let remover = removerDupliados(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorDiaTempoProduzido = calcularQuantidadeTempoProducaoPorDia(dados, remover);

        return response.json(vetTotalMetrosPorDiaTempoProduzido);
    }
    catch (e) {
        response.json(e);
    }

}

const totalMetrosPorNumeroTarefaPorMes = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.numero_da_tarefa);

        let remover = removerDupliados(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorNumTarefa = pegarTotalDeMetrosPorDiaEProduPeloMes(remover, dados);

        return response.json(vetTotalMetrosPorNumTarefa);
    }
    catch (e) {
        return response.json(e);
    }

}


const pegarTodosOsDadosDoMesSelecionado = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {
        return response.json(await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`));
    }
    catch (e) {
        return response.json(e);
    }

}



//controller para a diferença mensal
const diferencaMensalEntreDoisMeses = async function (request, response) {

    const date1 = request.params.date1;
    const date2 = request.params.date2;

    try {

        //conecto com meu banco de dados
        const dadosDate1 = await pegarDadosMesEAnoEscolhido(`${date1}`);
        const dadosDate2 = await pegarDadosMesEAnoEscolhido(`${date2}`);

        let numeroTarefaMes1 = dadosDate1.map((dados) => dados.numero_da_tarefa);
        let removerNumerosDuplicados = removerDupliados(numeroTarefaMes1);
        
        let {vetNumeroTarefasETempoSetupMes1, vetNumeroTarefasETempoSetupMes2} = encontrarNumeroTarefasIguaisEmDoisMesesEntreTempoSetup(removerNumerosDuplicados, dadosDate1, dadosDate2);        

        //total soma metros de cada mês
        let totalSomaMetrosMes1 = somarTotalDeMetrosProduzidosNoMes(dadosDate1);
        let totalSomaMetrosMes2 = somarTotalDeMetrosProduzidosNoMes(dadosDate2);
        
        //total soma tempo produção de cada mês
        let totalSomaTempoProducao1 = somarTotalDeTempoProducaoNoMes(dadosDate1);
        let totalSomaTempoProducao2 = somarTotalDeTempoProducaoNoMes(dadosDate2);
        
        let totalSomaTempoSetupMes1 = somarTotalTempoSetupNoMes(dadosDate1);
        let totalSomaTempoSetupMes2 = somarTotalTempoSetupNoMes(dadosDate2);

        //aqui eu pego de cada mês a quantidade de metros produzidos que cada número de tarefa fez 
        let vetDadosDeCadaDiaDoMes1 = dadosDate1.map((registros) => registros.numero_da_tarefa);
        let remover1 = removerDupliados(vetDadosDeCadaDiaDoMes1);
        let vetTotalMetrosPorNumTarefaMes1 = pegarTotalDeMetrosPorDiaEProduPeloMes(remover1, dadosDate1);

        let vetDadosDeCadaDiaDoMes2 = dadosDate2.map((registros) => registros.numero_da_tarefa);
        let remover2 = removerDupliados(vetDadosDeCadaDiaDoMes2);
        let vetTotalMetrosPorNumTarefaMes2 = pegarTotalDeMetrosPorDiaEProduPeloMes(remover2, dadosDate2);

        let { vetNumTarefaMes1, vetNumTarefaMes2 } = encontrarNumeroTarefasIguaisEmDoisMeses(vetTotalMetrosPorNumTarefaMes1, vetTotalMetrosPorNumTarefaMes2);

        //aqui eu pego em cada mês a quantidade de tempo de producao por número de tarefa fez
        let vetDadosDeCadaDiaDoMesPorProducao1 = dadosDate1.map((registros) => registros.data_historico.split(' ')[0]);
        let removerDataHistorico1 = removerDupliados(vetDadosDeCadaDiaDoMesPorProducao1);
        let vetTotalMetrosPorDiaTempoProduzido1 = calcularQuantidadeTempoProducaoPorDia(dadosDate1, removerDataHistorico1);

        let vetDadosDeCadaDiaDoMesPorProducao2 = dadosDate2.map((registros) => registros.data_historico.split(' ')[0]);
        let removerDataHistorico2 = removerDupliados(vetDadosDeCadaDiaDoMesPorProducao2);
        let vetTotalMetrosPorDiaTempoProduzido2 = calcularQuantidadeTempoProducaoPorDia(dadosDate2, removerDataHistorico2);

        let { vetTempoProducao1, vetTempoProducao2 } = encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses(vetTotalMetrosPorDiaTempoProduzido1, vetTotalMetrosPorDiaTempoProduzido2);

        return response.json({
            totalSomaMetrosMes1,
            totalSomaMetrosMes2,
            totalSomaTempoProducao1,
            totalSomaTempoProducao2,
            totalSomaTempoSetupMes1,
            totalSomaTempoSetupMes2,
            vetNumTarefaMes1,
            vetNumTarefaMes2,
            vetTempoProducao1,
            vetTempoProducao2,
            vetNumeroTarefasETempoSetupMes1,
            vetNumeroTarefasETempoSetupMes2
        })
    }
    catch (e) {
        return response.json(e);
    }

}

const totalTempoSetupPorDiaDoMesProduzido = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const vetDatasDoMes = dados.map((dados) => dados.data_historico.split(' ')[0]);
        const removerDatasDuplicadas = removerDupliados(vetDatasDoMes);

        const vetCalcularTempoSetup = calcularOTempoDeSetupDasDatasDeUmMes(dados, removerDatasDuplicadas);

        return response.json(vetCalcularTempoSetup);
    }
    catch (e) {
        return response.json(e);
    }

}

const totalTarefasCompletasENaoCompletasNoMes = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {
        return response.json(totalTarefasENaoCompletasNoMes(await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`)));
    }
    catch (e) {
        return response.json(e);
    }

}

const totalTempoSetupPorNumeroTarefa = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);
        
        const vetNumeroTarefasNoMes = dados.map((dados) => dados.numero_da_tarefa);
        const removerDuplicadosNumeroTarefa = removerDupliados(vetNumeroTarefasNoMes);
        
        return response.json(calcularTotalTempoSetupDeCadaTarefaNoMes(dados, removerDuplicadosNumeroTarefa));
    }
    catch (e) {
        return response.json(e);
    }
    
}

const calcularTempoSetupPorDiaDoMes = async function(request, response){
    
    const mes = request.params.mes;
    const ano = request.params.ano;
    
    try{
        
        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const vetDeCadaDiaDoMes = dados.map((dados) => dados.data_historico.split(' ')[0]);

        const removerDatasDuplicadas = removerDupliados(vetDeCadaDiaDoMes);

        return response.json(somarTempoDeSetupPorCadaDiaDoMes(dados, removerDatasDuplicadas));
    }
    catch(e){
        return response.json(e);
    }

}

export {
    dadosMesEscolhido,
    dadosDeCadaDiaDoMesQtdProduzida,
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorNumeroTarefaPorMes,
    pegarTodosOsDadosDoMesSelecionado,
    diferencaMensalEntreDoisMeses,
    totalTempoSetupPorDiaDoMesProduzido,
    totalTarefasCompletasENaoCompletasNoMes,
    totalTempoSetupPorNumeroTarefa,
    calcularTempoSetupPorDiaDoMes
};