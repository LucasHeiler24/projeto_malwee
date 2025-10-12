function encontrarNumeroTarefasIguaisEmDoisMesesEntreTempoSetup(arrayNumTarefa1, dadosMes1, dadosMes2) {

    let vetNumeroTarefasETempoSetupMes1 = [];
    let vetNumeroTarefasETempoSetupMes2 = [];

    for (let i = 0; i < arrayNumTarefa1.length; i++) {

        let soma1 = dadosMes2.reduce((soma, dados) => {
            if (dados.numero_da_tarefa == arrayNumTarefa1[i] && dados.tarefa_completa == 'TRUE')
                soma += dados.tempo_de_setup;

            return soma;
        }, 0);

        if (soma1 != 0) {
            let soma2 = dadosMes1.reduce((soma, dados) => {
                if (dados.numero_da_tarefa == arrayNumTarefa1[i] && dados.tarefa_completa == 'TRUE')
                    soma += dados.tempo_de_setup;

                return soma;
            }, 0);

            vetNumeroTarefasETempoSetupMes1.push(
                {
                    data_historico: arrayNumTarefa1[i],
                    total_tempo_setup: soma2
                }
            );
            vetNumeroTarefasETempoSetupMes2.push(
                {
                    data_historico: arrayNumTarefa1[i],
                    total_tempo_setup: soma1
                }
            )
        }

    }

    return { vetNumeroTarefasETempoSetupMes1, vetNumeroTarefasETempoSetupMes2 }

}


function encontrarNumeroTarefasIguaisEmDoisMeses(array1, array2) {

    const vetNumTarefaMes1 = [];
    const vetNumTarefaMes2 = []
    for (let i = 0; i < array1.length; i++) {

        /**
         * 
         * Aqui eu faço um for aonde verefico se o número de tarefa dos dados
         * do mês 1 for igual ao mês 2 e adiciono no vetor a quantidade de metros que foi
         * produzida no mês 1 e o número de tarefa desse mês e faço isso também com o
         * 2 mês 
         * 
         */

        array2.filter((dados) => {
            if (dados.numero_tarefa == array1[i].numero_tarefa) {
                vetNumTarefaMes1.push(
                    {
                        numero_tarefa: dados.numero_tarefa,
                        total_metros: dados.total_metros_da_tarefa
                    }
                );
                vetNumTarefaMes2.push(
                    {
                        numero_tarefa: array1[i].numero_tarefa,
                        total_metros: array1[i].total_metros_da_tarefa
                    }
                )
            }
        })

    }

    return { vetNumTarefaMes1, vetNumTarefaMes2 };

}

function encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses(array1, array2) {

    let vetTempoProducao1 = [];
    let vetTempoProducao2 = [];

    for (let i = 0; i < array1.length; i++) {

        array2.filter((dados) => {
            if (dados.data_historico.split('-')[2] === array1[i].data_historico.split('-')[2]) {
                vetTempoProducao1.push(
                    {
                        data_producao: dados.data_historico,
                        tempo_producao: dados.tempo_producao
                    }
                )
                vetTempoProducao2.push(
                    {
                        data_producao: array1[i].data_historico,
                        tempo_producao: array1[i].tempo_producao
                    }
                )
            }
        })
    }

    return { vetTempoProducao1, vetTempoProducao2 }

}

export {
    encontrarNumeroTarefasIguaisEmDoisMesesEntreTempoSetup,
    encontrarNumeroTarefasIguaisEmDoisMeses,
    encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses
}