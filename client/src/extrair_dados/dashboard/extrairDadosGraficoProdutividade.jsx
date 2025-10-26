import { separarDadosPorVetores } from "../../helpers/funcoes";

function extrairDadosGraficoProdutividade({dadosMVP, tipoData, tipoTecido}){
    const dadosFiltradosPorTecido = separarDadosPorVetores(dadosMVP[parseInt(tipoTecido)]);
    const dadosFiltradosPorData = dadosFiltradosPorTecido[parseInt(tipoData)];

    return dadosFiltradosPorData.map((dados) => {
        return {produtividade: parseFloat(dados.produtividade_dois_turnos), metros: parseFloat(dados.total_metros_produzidos_dois_turnos), setup: parseFloat(dados.total_tempo_setup_dois_turnos), data: dados.data_historico}
    })
}

export default extrairDadosGraficoProdutividade;