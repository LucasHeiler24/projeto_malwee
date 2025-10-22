function funcoesDashboardMetrosCalcularMediaNasDatas(arrayDados, arrayDatas) {

    let vetMediaMetrosDias = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let objectMediaMetros = arrayDados.reduce((objectDados, dados) => {

            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                objectDados.total_dois_turnos_completos += dados.metros_produzidos;
                objectDados.total_registro_turnos_completos += 1;
            }
            if (parseInt(dados.data_historico.split(' ')[1].split(':')[2]) < 14 && dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                objectDados.total_primeiro_turno_completos += dados.metros_produzidos;
                objectDados.total_registro_primeiro_turno_completos += 1;
            }
            if (parseInt(dados.data_historico.split(' ')[1].split(':')[2]) >= 14 && dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                objectDados.total_segundo_turno_completos += dados.metros_produzidos;
                objectDados.total_registro_segundo_turno_completos += 1;
            }

            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'FALSE') {
                objectDados.total_dois_turnos_nao_completos += dados.metros_produzidos;
                objectDados.total_registro_turnos_nao_completos += 1;
            }
            if (parseInt(dados.data_historico.split(' ')[1].split(':')[2]) < 14 && dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'FALSE') {
                objectDados.total_primeiro_turno_nao_completos += dados.metros_produzidos;
                objectDados.total_registro_primeiro_turno_nao_completos += 1;
            }
            if (parseInt(dados.data_historico.split(' ')[1].split(':')[2]) >= 14 && dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'FALSE') {
                objectDados.total_segundo_turno_nao_completos += dados.metros_produzidos;
                objectDados.total_registro_segundo_turno_nao_completos += 1;
            }

            return objectDados;
        }, {
            total_dois_turnos_completos: 0,
            total_registro_turnos_completos: 0,

            total_primeiro_turno_completos: 0,
            total_registro_primeiro_turno_completos: 0,

            total_segundo_turno_completos: 0,
            total_registro_segundo_turno_completos: 0,

            total_dois_turnos_nao_completos: 0,
            total_registro_turnos_nao_completos: 0,

            total_primeiro_turno_nao_completos: 0,
            total_registro_primeiro_turno_nao_completos: 0,

            total_segundo_turno_nao_completos: 0,
            total_registro_segundo_turno_nao_completos: 0,
        })

        vetMediaMetrosDias.push(
            {
                data_historico: arrayDatas[i],
                total_produzido_dois_turnos_completos: objectMediaMetros.total_dois_turnos_completos,
                media_dois_turnos_completos_completos: (objectMediaMetros.total_dois_turnos_completos == 0) ? 0 : (objectMediaMetros.total_dois_turnos_completos / objectMediaMetros.total_registro_turnos_completos).toFixed(2),

                total_produzido_primeiro_turno_completos: objectMediaMetros.total_primeiro_turno_completos,
                media_produzido_primeiro_turno_completos: (objectMediaMetros.total_primeiro_turno_completos == 0) ? 0 : (objectMediaMetros.total_primeiro_turno_completos / objectMediaMetros.total_registro_primeiro_turno_completos).toFixed(2),

                total_produzido_segundo_turno_completos: objectMediaMetros.total_segundo_turno_completos,
                media_produzido_segundo_turno_completos: (objectMediaMetros.total_segundo_turno_completos == 0) ?
                    0 : (objectMediaMetros.total_segundo_turno_completos / objectMediaMetros.total_registro_segundo_turno_completos).toFixed(2),

                total_dois_turnos_nao_completos: objectMediaMetros.total_dois_turnos_nao_completos,
                media_registro_turnos_nao_completos:
                    (objectMediaMetros.total_dois_turnos_nao_completos == 0) ?
                        0 : (objectMediaMetros.total_dois_turnos_nao_completos / objectMediaMetros.total_registro_turnos_nao_completos).toFixed(2),

                total_primeiro_turno_nao_completos: objectMediaMetros.total_primeiro_turno_nao_completos,
                media_registro_primeiro_turno_nao_completos:
                    (objectMediaMetros.total_primeiro_turno_nao_completos == 0) ?
                        0 : (objectMediaMetros.total_primeiro_turno_nao_completos / objectMediaMetros.total_registro_primeiro_turno_nao_completos).toFixed(2),

                total_segundo_turno_nao_completos: objectMediaMetros.total_segundo_turno_nao_completos,
                media_registro_segundo_turno_nao_completos:
                    (objectMediaMetros.total_segundo_turno_nao_completos == 0) ?
                        0 : (objectMediaMetros.total_segundo_turno_nao_completos / objectMediaMetros.total_registro_segundo_turno_nao_completos).toFixed(2)
            }
        )
    }
    return vetMediaMetrosDias;

}

export {
    funcoesDashboardMetrosCalcularMediaNasDatas
}