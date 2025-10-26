import { separarDadosPorVetores } from "../../helpers/funcoes";

const extrairDadosGraficoMMT = ({dadosMMT, tipoData, tipoTecido, tipoTurno}) => {
    const dadosFiltradosPorTecido = separarDadosPorVetores(dadosMMT[parseInt(tipoTecido)]);
    const dadosFiltradosPorData = dadosFiltradosPorTecido[parseInt(tipoData)];

    let dadosFiltradosPorTurno;
    switch(tipoTurno){
        case '0':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {data_historico: dados.data_historico, mmt: dados.calc_mmt_dois_turnos}
            });
            break;
        case '1':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {data_historico: dados.data_historico, mmt: dados.calc_mmt_primeiro_turno}
            });
            break;
        case '2':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {data_historico: dados.data_historico, mmt: dados.calc_mmt_segundo_turno}
            });
            break;
    }

    return dadosFiltradosPorTurno;

}

export default extrairDadosGraficoMMT;