import { separarDadosPorVetores } from "../../helpers/funcoes";

function extrairDadosGraficoMetrosVsSetup({dadosMVP, tipoData, tipoTecido, tipoTurno}){
    const dadosFiltradosPorTecido = separarDadosPorVetores(dadosMVP[parseInt(tipoTecido)]);
    const dadosFiltradosPorData = dadosFiltradosPorTecido[parseInt(tipoData)];

    let dadosFiltradosPorTurno;
    switch(tipoTurno){
        case '0':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {metros: parseFloat(dados.total_metros_produzidos_dois_turnos), setup: parseFloat(dados.total_tempo_setup_dois_turnos), data: dados.data_historico}
            })
            break;
        case '1':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {metros: parseFloat(dados.total_metros_produzidos_primeiro_turno), setup: parseFloat(dados.total_tempo_setup_primeiro_turno), data: dados.data_historico}
            })
            break;
        case '2':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {metros: parseFloat(dados.total_metros_produzidos_segundo_turno), setup: parseFloat(dados.total_tempo_setup_segundo_turno), data: dados.data_historico}
            })
            break;
    }

    return dadosFiltradosPorTurno;
}

export default extrairDadosGraficoMetrosVsSetup;