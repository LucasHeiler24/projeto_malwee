export default function extrairDadosGraficoPizza(dados, tipoTurno) {

    let dadosFiltrados;
    switch(tipoTurno){
        case '0':
            return dadosFiltrados = dados.reduce((object, dados) => {
                object.metros += dados.metros_produzidos_dois_turno
                object.producao += dados.tempo_producao_dois_turnos
                object.setup += dados.tempo_setup_dois_turnos

                return object;
            }, {
                metros: 0,
                producao: 0,
                setup: 0
            })
        case '1':
            return dadosFiltrados = dados.reduce((object, dados) => {
                object.metros += dados.metros_produzidos_primeiro_turno
                object.producao += dados.tempo_producao_primeiro_turno
                object.setup += dados.tempo_setup_primeiro_turno

                return object;
            }, {
                metros: 0,
                producao: 0,
                setup: 0
            })
        case '2':
            return dadosFiltrados = dados.reduce((object, dados) => {
                object.metros += dados.metros_produzidos_segundo_turnos
                object.producao += dados.tempo_producao_segundo_turno
                object.setup += dados.tempo_setup_segundo_turno

                return object;
            }, {
                metros: 0,
                producao: 0,
                setup: 0
            })
    }
}