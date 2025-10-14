import { formatarValor } from "./funcoes.js";

function totalTarefasENaoCompletasNoMes(arrayDados) {
    return arrayDados.reduce((totalTarefas, dados) => {
        (dados.tarefa_completa == 'TRUE') ? totalTarefas.total_tarefas_completas++ : totalTarefas.total_tarefas_nao_completas++

        return totalTarefas;
    }, {
        total_tarefas_completas: 0,
        total_tarefas_nao_completas: 0
    })

}

function calcularTotalTempoSetupDeCadaTarefaNoMes(arrayDados, arrayNumeroTarefa) {

    let vetTotalTempoSetupDoNumeroTarefa = [];
    for (let i = 0; i < arrayNumeroTarefa.length; i++) {

        let somaTotalSetup = arrayDados.reduce((somaTotalTempoSetup, dados) => {
            if (dados.numero_da_tarefa == arrayNumeroTarefa[i] && dados.tarefa_completa == 'TRUE')
                somaTotalTempoSetup += dados.tempo_de_setup;
            return somaTotalTempoSetup;
        }, 0);

        vetTotalTempoSetupDoNumeroTarefa.push({
            numero_tarefa: arrayNumeroTarefa[i],
            total_tempo_setup: somaTotalSetup
        });

    }

    return vetTotalTempoSetupDoNumeroTarefa;
}

function somarTempoDeSetupPorCadaDiaDoMes(arrayDados, arrayDatas) {


    let vetSomaDeTempoSetupPorDiaDoMes = [];

    for (let i = 0; i < arrayDatas.length; i++) {

        let somaTempoSetup = arrayDados.reduce((somaSetup, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE')
                somaSetup += dados.tempo_de_setup;

            return somaSetup;
        }, 0);

        vetSomaDeTempoSetupPorDiaDoMes.push(
            {
                data_historico: arrayDatas[i],
                tempo_de_setup: somaTempoSetup
            }
        );

    }

    return vetSomaDeTempoSetupPorDiaDoMes;

}

function calcularMediaEVariantesDeTempoSetupPorDia(arrayDados, arrayDatas) {

    let vetCalcularTempoSetup = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let somaTempoSetupDeCadaData = arrayDados.reduce((somaTempoSetup, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                somaTempoSetup.total_tempo_setup += dados.tempo_de_setup;
                somaTempoSetup.total_registros_dia += 1;
                somaTempoSetup.total_por_registro.push(dados.tempo_de_setup);
                somaTempoSetup.numero_da_tarefa.push(dados.numero_da_tarefa);
            }

            return somaTempoSetup;
        }, {
            total_tempo_setup: 0,
            total_registros_dia: 0,
            total_por_registro: [],
            numero_da_tarefa: []
        });

        vetCalcularTempoSetup.push({
            dia_do_mes: arrayDatas[i],
            total_tempo_setup: somaTempoSetupDeCadaData.total_tempo_setup,
            media_tempo_setup_no_dia: (somaTempoSetupDeCadaData.total_tempo_setup == 0) ? 0 : formatarValor.format(somaTempoSetupDeCadaData.total_tempo_setup / somaTempoSetupDeCadaData.total_registros_dia),
            total_por_registro_no_mes: somaTempoSetupDeCadaData.total_por_registro,
            numero_da_tarefa: somaTempoSetupDeCadaData.numero_da_tarefa
        });
    }

    return vetCalcularTempoSetup;
}

function calcularMediaEVariantesDeTempoDeProducao(arrayDados, arrayDatas) {
    let vetCalcularTempoProducao = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let somaTempoProducaoDeCadaData = arrayDados.reduce((somaTempoProducao, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                somaTempoProducao.total_tempo_producao += dados.tempo_de_producao;
                somaTempoProducao.total_registros_dia += 1;
                somaTempoProducao.total_por_registro.push(dados.tempo_de_producao);
                somaTempoProducao.numero_da_tarefa.push(dados.numero_da_tarefa);
            }

            return somaTempoProducao;
        }, {
            total_tempo_producao: 0,
            total_registros_dia: 0,
            total_por_registro: [],
            numero_da_tarefa: []
        });

        vetCalcularTempoProducao.push({
            dia_do_mes: arrayDatas[i],
            total_tempo_producao: somaTempoProducaoDeCadaData.total_tempo_producao,
            media_tempo_setup_no_dia: (somaTempoProducaoDeCadaData.total_tempo_producao == 0) ? 0 : formatarValor.format(somaTempoProducaoDeCadaData.total_tempo_producao / somaTempoProducaoDeCadaData.total_registros_dia),
            total_por_registro_no_mes: somaTempoProducaoDeCadaData.total_por_registro,
            numero_da_tarefa: somaTempoProducaoDeCadaData.numero_da_tarefa
        });
    }

    return vetCalcularTempoProducao;
}

//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

function calcualarTotalMetrosProduzidosPorTipoTecidoPorDia(arrayDados, arrayDatas) {

    let vetMetrosPorTipoTecidos = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let vetDadosTiposTecidos = [];
        for (let j = 0; j < vetTiposTecidos.length; j++) {

            let metrosPorTecido = arrayDados.reduce((somaTiposTecidos, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    somaTiposTecidos.total_metros_por_tecido += dados.metros_produzidos;
                    somaTiposTecidos.total_por_tarefa.push(dados.metros_produzidos);
                    somaTiposTecidos.numero_tarefa.push(dados.numero_da_tarefa);
                    somaTiposTecidos.total_tarefas += 1;
                    somaTiposTecidos.total_tempo_producao += dados.tempo_de_producao;
                    somaTiposTecidos.total_tempo_setup += dados.tempo_de_setup;
                    somaTiposTecidos.total_por_tarefa_tempo_producao.push(dados.tempo_de_producao);
                    somaTiposTecidos.total_por_tarefa_tempo_setup.push(dados.tempo_de_setup);
                }

                return somaTiposTecidos;
            }, {
                total_metros_por_tecido: 0,
                total_tarefas: 0,
                total_por_tarefa: [],
                numero_tarefa: [],
                total_tempo_producao: 0,
                total_tempo_setup: 0,
                total_por_tarefa_tempo_producao: [],
                total_por_tarefa_tempo_setup: []
            });

            vetDadosTiposTecidos.push({
                tipo_tecido: vetTiposTecidos[j],
                data_tipo_tecido: arrayDatas[i],
                total_metros_por_tecido: metrosPorTecido.total_metros_por_tecido,
                total_por_tarefa: metrosPorTecido.total_por_tarefa,
                numero_da_tarefa: metrosPorTecido.numero_tarefa,
                total_tempo_producao: metrosPorTecido.total_tempo_producao,
                total_tempo_setup: metrosPorTecido.total_tempo_setup,
                total_por_tarefa_tempo_producao: metrosPorTecido.total_por_tarefa_tempo_producao,
                total_por_tarefa_tempo_setup: metrosPorTecido.total_por_tarefa_tempo_setup,
                media_total_metros_no_dia_produzido: (metrosPorTecido.total_metros_por_tecido == 0) ? 0 : formatarValor.format(metrosPorTecido.total_metros_por_tecido / metrosPorTecido.total_tarefas),
                media_total_tempo_producao_no_dia: (metrosPorTecido.total_tempo_producao == 0) ? 0 : formatarValor.format(metrosPorTecido.total_tempo_producao / metrosPorTecido.total_por_tarefa_tempo_producao.length),
                media_total_tempo_setup_no_dia: (metrosPorTecido.total_tempo_setup == 0) ? 0 : formatarValor.format(metrosPorTecido.total_tempo_setup / metrosPorTecido.total_por_tarefa_tempo_setup.length)
            })
        }

        vetMetrosPorTipoTecidos.push(vetDadosTiposTecidos);
    }

    return vetMetrosPorTipoTecidos;
}

function separarPorDiaDoMesMetrosProduzidos(arrayDados, arrayDatas) {

    let vetCalcularMetrosProduzidos = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let somaMetrosProduzidosDeCadaData = arrayDados.reduce((somaTempoProducao, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                somaTempoProducao.total_metros_produzidos += dados.metros_produzidos;
                somaTempoProducao.total_registros_dia += 1;
                somaTempoProducao.total_por_registro.push(dados.metros_produzidos);
                somaTempoProducao.numero_da_tarefa.push(dados.numero_da_tarefa);
            }

            return somaTempoProducao;
        }, {
            total_metros_produzidos: 0,
            total_registros_dia: 0,
            total_por_registro: [],
            numero_da_tarefa: []
        });

        let maiorMetrosNoDia = 0;
        let tarefaMaiorMetrosNoDia;
        let menorMetrosNoDia = Number.MAX_SAFE_INTEGER;
        let tarefaMenorMetrosNoDia;

        for (let i = 0; i < somaMetrosProduzidosDeCadaData.total_por_registro.length; i++) {
            if (maiorMetrosNoDia < somaMetrosProduzidosDeCadaData.total_por_registro[i]) {
                maiorMetrosNoDia = somaMetrosProduzidosDeCadaData.total_por_registro[i];
                tarefaMaiorMetrosNoDia = somaMetrosProduzidosDeCadaData.numero_da_tarefa[i];
            }

            if (menorMetrosNoDia > somaMetrosProduzidosDeCadaData.total_por_registro[i]) {
                menorMetrosNoDia = somaMetrosProduzidosDeCadaData.total_por_registro[i];
                tarefaMenorMetrosNoDia = somaMetrosProduzidosDeCadaData.numero_da_tarefa[i];
            }
        }

        vetCalcularMetrosProduzidos.push({
            dia_do_mes: arrayDatas[i],
            total_metros_produzidos: somaMetrosProduzidosDeCadaData.total_metros_produzidos,
            media_tempo_metros_no_dia: (somaMetrosProduzidosDeCadaData.total_metros_produzidos == 0) ? 0 : formatarValor.format(somaMetrosProduzidosDeCadaData.total_metros_produzidos / somaMetrosProduzidosDeCadaData.total_registros_dia),
            total_por_registro_no_mes: somaMetrosProduzidosDeCadaData.total_por_registro,
            numero_da_tarefa: somaMetrosProduzidosDeCadaData.numero_da_tarefa,
            maior_metros_no_dia: maiorMetrosNoDia,
            numero_tarefa_maior_metros: tarefaMaiorMetrosNoDia,
            menor_metros_no_dia: menorMetrosNoDia,
            numero_tarefa_menor_metros: tarefaMenorMetrosNoDia
        });
    }

    return vetCalcularMetrosProduzidos;

}

export {
    totalTarefasENaoCompletasNoMes,
    calcularTotalTempoSetupDeCadaTarefaNoMes,
    somarTempoDeSetupPorCadaDiaDoMes,
    calcularMediaEVariantesDeTempoSetupPorDia,
    calcularMediaEVariantesDeTempoDeProducao,
    calcualarTotalMetrosProduzidosPorTipoTecidoPorDia,
    separarPorDiaDoMesMetrosProduzidos
}