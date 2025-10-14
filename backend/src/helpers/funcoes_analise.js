import { removerDupliados, formatarValor } from "./funcoes.js";

//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

function funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dados) {
    const somaDeMetrosProduzidosPorTipoTecido = [];

    //Faço um for para cada tipo de tecido
    for (let i = 0; i < 6; i++) {

        /**
         * Faço um reduce aonde eu pego pelo tipo de tecido vindos do banco com o índice de cada
         * tipo de tecido do vetor que estou iterando, onde verefica se o índice é igual e somo
         * os metros produzidos por esse tipo de tecido
         */

        let qtdMetrosProduzidosPorTiposTecidos = dados.reduce((somaMetrosPorTecido, regitros) => {

            if (regitros.tipo_tecido == i && regitros.tarefa_completa == 'TRUE') {
                somaMetrosPorTecido.total_metros_por_tipo_tecido += regitros.metros_produzidos;
                somaMetrosPorTecido.data_metros_por_tecido.push(regitros.data_historico.split(' ')[0]);
            }

            return somaMetrosPorTecido;
        }, {
            total_metros_por_tipo_tecido: 0,
            data_metros_por_tecido: [],
            total_por_dia: []
        });

        let removerDuplicatosDatas = removerDupliados(qtdMetrosProduzidosPorTiposTecidos.data_metros_por_tecido);

        let totalMetrosPorTecidoPorDia = [];
        let maiorMetrosPorDia = 0;
        let menorMetrosPorDia = Number.MAX_SAFE_INTEGER;
        let dataMaior;
        let dataMenor;

        for (let j = 0; j < removerDuplicatosDatas.length; j++) {
            totalMetrosPorTecidoPorDia.push(
                dados.reduce((somaTotalPorTipoTecido, registros) => {
                    if (registros.tipo_tecido == i
                        && registros.data_historico.split(' ')[0] == removerDuplicatosDatas[j]
                        && registros.tarefa_completa == 'TRUE') {
                        somaTotalPorTipoTecido += registros.metros_produzidos
                    }

                    return somaTotalPorTipoTecido;
                }, 0)
            )

            if (totalMetrosPorTecidoPorDia[j] > maiorMetrosPorDia) {
                maiorMetrosPorDia = totalMetrosPorTecidoPorDia[j];
                dataMaior = removerDuplicatosDatas[j]
            };

            if (totalMetrosPorTecidoPorDia[j] < menorMetrosPorDia) {
                menorMetrosPorDia = totalMetrosPorTecidoPorDia[j];
                dataMenor = removerDuplicatosDatas[j]
            }
        }

        somaDeMetrosProduzidosPorTipoTecido.push(
            {
                tipo_tecido: vetTiposTecidos[i],
                qtd_metros_produzidos: qtdMetrosProduzidosPorTiposTecidos.total_metros_por_tipo_tecido,
                data_metros: removerDuplicatosDatas,
                total_por_dia: totalMetrosPorTecidoPorDia,
                data_maior_valor: dataMaior,
                total_metros_maior: (maiorMetrosPorDia == 0) ? 0 : formatarValor.format(maiorMetrosPorDia),
                data_menor_valor: dataMenor,
                total_metros_menor: (menorMetrosPorDia == Number.MAX_SAFE_INTEGER) ? 0 : formatarValor.format(menorMetrosPorDia),
                media_diaria: (qtdMetrosProduzidosPorTiposTecidos.total_metros_por_tipo_tecido == 0) ? 0 : formatarValor.format(qtdMetrosProduzidosPorTiposTecidos.total_metros_por_tipo_tecido / removerDuplicatosDatas.length)
            }
        );
    }

    return somaDeMetrosProduzidosPorTipoTecido;
}

function funcaoAnaliseTotalMetrosNosDias(vetDados, vetDatas){

    let vet = [];


    for(let i=0; i<vetDatas.length; i++){

        let dados = vetDados.reduce((soma, dados) => {
            if(dados.data_historico.split(' ')[0] == vetDatas[i] && dados.tarefa_completa == 'TRUE'){
                soma.total_metros_no_dia += dados.metros_produzidos;
                soma.numeros_tarefas_no_dia.push(dados.metros_produzidos);
            }
            
            return soma;
        }, {
            total_metros_no_dia: 0,
            numeros_tarefas_no_dia: []
        });

        vet.push(
            {
                data: vetDatas[i],
                total_metros: dados.total_metros_no_dia,
                media_total_metros_no_dia: (dados.total_metros_no_dia == 0) ? 0 : (dados.total_metros_no_dia / dados.numeros_tarefas_no_dia.length).toFixed(2)
            }
        )

    }
    
    return vet;

}

function funcaoAnaliseDiferencasEntreDatasMetrosTotais(arrayDados){
    let vetDiffMetros = [];
    for(let i=0; i<arrayDados.length - 1; i++){
        vetDiffMetros.push(Math.abs(arrayDados[i].total_metros - arrayDados[i + 1].total_metros));
    }
    return vetDiffMetros
}

function funcaoAnaliseDiferencasEntreDatasTotalProducao(arrayDados){
    let vetDiffMetros = [];
    for(let i=0; i<arrayDados.length - 1; i++){
        vetDiffMetros.push(Math.abs(arrayDados[i].tempo_producao - arrayDados[i + 1].tempo_producao));
    }
    return vetDiffMetros
}


function funcaoAnaliseDiferencasEntreDatasTotalSetup(arrayDados){
    let vetDiffMetros = [];
    for(let i=0; i<arrayDados.length - 1; i++){
        vetDiffMetros.push(Math.abs(arrayDados[i].total_tempo_setup - arrayDados[i + 1].total_tempo_setup));
    }
    return vetDiffMetros
}


export {
    funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes,
    funcaoAnaliseTotalMetrosNosDias,
    funcaoAnaliseDiferencasEntreDatasMetrosTotais,
    funcaoAnaliseDiferencasEntreDatasTotalProducao,
    funcaoAnaliseDiferencasEntreDatasTotalSetup
}