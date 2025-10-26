import { separarDadosPorVetores } from "../../helpers/funcoes";

const extrairDadosGraficoMediaSetup = ({dadosMVP, tipoData, tipoTecido, tipoTurno}) => {
    const dadosFiltradosPorTecido = separarDadosPorVetores(dadosMVP[parseInt(tipoTecido)]);
    const dadosFiltradosPorData = dadosFiltradosPorTecido[parseInt(tipoData)];

    let dadosFiltradosPorTurno;
    switch(tipoTurno){
        case '0':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {mvp: parseFloat(dados.media_setup_dois_turnos), data: dados.data_historico}
            })
            break;
        case '1':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {mvp: parseFloat(dados.media_setup_primeiro_turno), data: dados.data_historico}
            })
            break;
        case '2':
            dadosFiltradosPorTurno = dadosFiltradosPorData.map((dados) => {
                return {mvp: parseFloat(dados.media_setup_segundo_turno), metros: parseFloat(dados.total_metros_produzidos), producao: parseFloat(dados.total_tempo_producao), data: dados.data_historico}
            })
            break;
    }

    return dadosFiltradosPorTurno;

}

export default extrairDadosGraficoMediaSetup;