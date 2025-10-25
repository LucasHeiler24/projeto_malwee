import { separarDadosPorVetores } from "../../helpers/funcoes";

const extrairDadosGraficoMvp = ({dadosMVP, tipoData, tipoTecido, tipoTurno}) => {
    const dadosFiltradosPorTecido = separarDadosPorVetores(dadosMVP[parseInt(tipoTecido)]);
    const dadosFiltradosPorData = dadosFiltradosPorTecido[parseInt(tipoData)];

    console.log(dadosFiltradosPorData);
    let dadosFiltradosPorTurno;
    switch(tipoTurno){
        case '0':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {mvp: parseFloat(dados.total_mvp_no_dia_dois_turnos), metros: parseFloat(dados.total_metros_produzidos), producao: parseFloat(dados.total_tempo_producao), data: dados.data_historico}
            })
            break;
        case '1':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {mvp: parseFloat(dados.total_mvp_no_dia_primeiro_turno), metros: parseFloat(dados.total_metros_produzidos), producao: parseFloat(dados.total_tempo_producao), data: dados.data_historico}
            })
            break;
        case '2':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {mvp: parseFloat(dados.total_mvp_no_dia_segundo_turno), metros: parseFloat(dados.total_metros_produzidos), producao: parseFloat(dados.total_tempo_producao), data: dados.data_historico}
            })
            break;
    }

    return dadosFiltradosPorTurno;

}

export default extrairDadosGraficoMvp;