import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";
import {
    separarDiasDifrentesEntreDatasVetor,
    pegarTotalDeMetrosPorDiaPeloMes,
    pegarTotalDeMetrosPorDiaEProduPeloMes,
    removerDupliados
} from "../helpers/funcoes.js";

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

            let existe = vetDadosMetrosPorDia.find((dados, j) => {
                return dados.diaDoMes == vetDadosDeCadaDiaDoMes[i][j].data_historico.split(' ')[0];
            });

            if (!existe) {
                let diaDoMes;
                let somaPorDia = vetDadosDeCadaDiaDoMes[i].reduce((somaDeCadaDia, dados) => {
                    diaDoMes = dados.data_historico.split(' ')[0];

                    if (dados.tarefa_completa == 'TRUE')
                        somaDeCadaDia += dados.metros_produzidos;

                    return somaDeCadaDia;
                }, 0);

                vetDadosMetrosPorDia.push({ diaDoMes, somaPorDia })
            }
        }

        return response.json({ vetDadosMetrosPorDia });

    }
    catch (e) {
        return response.json(e);
    }

}

//Primeiro gráfico do front
const totalMetrosPorNumeroTarefaPorMesPorDia = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = separarDiasDifrentesEntreDatasVetor(dados);

        let vetTotalMetrosPorDiaTempoProduzido = pegarTotalDeMetrosPorDiaPeloMes(vetDadosDeCadaDiaDoMes);

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
        // let numeroTarefas = [];
        // for (let i = 0; i < vetNumTarefaEValorDeCadaTarefa.length; i++) {
        //     vetNumTarefaEValorDeCadaTarefa[i].forEach(numero => {
        //         numeroTarefas.push(numero);
        //     });
        // }

        // let semDuplicados = removerDupliados(numeroTarefas);

        // let totalNumeroTarefaPorMes = [];
        // for (let i = 0; i < semDuplicados.length; i++) {
        //     let total = 0;
        //     let totalTempoProducao = 0;




        //     totalNumeroTarefaPorMes.push({
        //         numero_tarefa: semDuplicados[i],
        //         total_metros_mes: total,
        //         total_tempo_producao: totalTempoProducao
        //     });

        // }

        // return response.json(totalNumeroTarefaPorMes);
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

export {
    dadosMesEscolhido,
    dadosDeCadaDiaDoMesQtdProduzida,
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorNumeroTarefaPorMes,
    pegarTodosOsDadosDoMesSelecionado
};