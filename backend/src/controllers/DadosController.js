import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";
import { 
    separarDiasDifrentesEntreDatasVetor,
    separarPorNumeroTarefaDeCadaDiaDoMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    removerDupliados } from "../helpers/funcoes.js";

//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

//Esse controller pega o total de producao feita por cada tipo de tecido
const dadosMesEscolhido = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const somaDeMetrosProduzidosPorTipoTecido = [];

        for (let i = 0; i < 6; i++) {
            let qtdDeMetrosProduzidos = 0;

            for (let j = 0; j < dados.length; j++) {
                if (dados[j].tipo_tecido == i && dados[j].tarefa_completa == 'TRUE')
                    qtdDeMetrosProduzidos += dados[j].metros_produzidos;
            }

            somaDeMetrosProduzidosPorTipoTecido.push(
                {
                    tipo_tecido: vetTiposTecidos[i],
                    qtd_metros_produzidos: qtdDeMetrosProduzidos
                }
            );
        }

        return response.json(somaDeMetrosProduzidosPorTipoTecido);
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

        let vetDadosDeCadaDiaDoMes = separarDiasDifrentesEntreDatasVetor(dados);

        let vetDadosMetrosPorDia = [];

        for (let i = 0; i < vetDadosDeCadaDiaDoMes.length; i++) {

            let diaDoMes;
            let somaPorDia = vetDadosDeCadaDiaDoMes[i].reduce((somaDeCadaDia, dados) => {
                diaDoMes = dados.data_historico.split(' ')[0];

                if (dados.tarefa_completa == 'TRUE')
                    somaDeCadaDia += dados.metros_produzidos;

                return somaDeCadaDia;
            }, 0);

            vetDadosMetrosPorDia.push({ diaDoMes, somaPorDia })
        }

        return response.json({ vetDadosMetrosPorDia });

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

        let vetDadosDeCadaDiaDoMes = separarDiasDifrentesEntreDatasVetor(dados);

        let vetNumTarefaEValorDeCadaTarefa = separarPorNumeroTarefaDeCadaDiaDoMes(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorNumTarefa = pegarTotalDeMetrosPorDiaPeloMes(vetNumTarefaEValorDeCadaTarefa, vetDadosDeCadaDiaDoMes);

        return response.json({ vetTotalMetrosPorNumTarefa });
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

        let vetDadosDeCadaDiaDoMes = separarDiasDifrentesEntreDatasVetor(dados);

        let vetNumTarefaEValorDeCadaTarefa = separarPorNumeroTarefaDeCadaDiaDoMes(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorNumTarefa = pegarTotalDeMetrosPorDiaPeloMes(vetNumTarefaEValorDeCadaTarefa, vetDadosDeCadaDiaDoMes);

        let numeroTarefas = [];
        for (let i = 0; i < vetNumTarefaEValorDeCadaTarefa.length; i++) {
            vetNumTarefaEValorDeCadaTarefa[i].forEach(numero => {
                numeroTarefas.push(numero);
            });
        }

        let semDuplicados = removerDupliados(numeroTarefas);
        
        let totalNumeroTarefaPorMes = [];
        for (let i = 0; i < semDuplicados.length; i++) {
            let total = 0;
            let totalTempoProducao = 0;

            for (let j = 0; j < vetTotalMetrosPorNumTarefa.length; j++) {
                total += vetTotalMetrosPorNumTarefa[j].reduce((soma, dados) => {
                    if (dados.numero_tarefa == semDuplicados[i])
                        soma += dados.total_metros_da_tarefa;
                    return soma;
                }, 0);
                totalTempoProducao += vetTotalMetrosPorNumTarefa[j].reduce((soma, dados) => {
                    if (dados.numero_tarefa == semDuplicados[i])
                        soma += dados.tempo_producao;
                    return soma;
                }, 0); 
            }
            totalNumeroTarefaPorMes.push({
                numero_tarefa: semDuplicados[i],
                total_metros_mes: total,
                total_tempo_producao: totalTempoProducao
            });
        }

        return response.json(totalNumeroTarefaPorMes);
    }
    catch (e) {
        return response.json(e);
    }

}


const pegarTodosOsDadosDoMesSelecionado = async function(request, response){

    const mes = request.params.mes;
    const ano = request.params.ano;
    
    try{
        return response.json(await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`));
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
    pegarTodosOsDadosDoMesSelecionado
};