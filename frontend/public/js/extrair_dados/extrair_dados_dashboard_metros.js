import { dashboardConstruirGraficoMediaMetrosProduzidos } from "../dashboard_metros.js";
import { removerDuplicados } from "../helpers/funcoes_gerais/funcoes.js";

function extratDadosGraficoMediaMetrosProduzidos(
    arrayDados,
    arrayDatas,
    filtroTurno,
    filtroCompletos
){

    let vet = [];
    if(filtroCompletos){
        if(filtroTurno == "0"){
            for(let i=0; i<arrayDatas.length; i++){
                let objectDados = arrayDados.reduce((soma, dados) => {
                    if(dados.data_historico == arrayDatas[i])
                        soma += parseFloat(dados.media_totais_metros_completos);
                    return soma
                }, 0);
                vet.push({
                    data_historico: arrayDatas[i],
                    total_media: objectDados
                })
            }
        }
        if(filtroTurno == "1"){
            for(let i=0; i<arrayDatas.length; i++){
                let objectDados = arrayDados.reduce((soma, dados) => {
                    if(dados.data_historico == arrayDatas[i])
                     soma += parseFloat(dados.media_totais_metros_completos_primeiro_turno);
                     return soma

                }, 0);
                vet.push({
                    data_historico: arrayDatas[i],
                    total_media: objectDados
                })
            }
        }
        if(filtroTurno == "2"){
            for(let i=0; i<arrayDatas.length; i++){
                let objectDados = arrayDados.reduce((soma, dados) => {
                    if(dados.data_historico == arrayDatas[i])
                     soma += parseFloat(dados.media_totais_metros_completos_segundo_turno)
                     return soma

                }, 0);
                vet.push({
                    data_historico: arrayDatas[i],
                    total_media: objectDados
                })
            }
        }
    }
    if(!filtroCompletos){
        if(filtroTurno == "0"){
            for(let i=0; i<arrayDatas.length; i++){
                let objectDados = arrayDados.reduce((soma, dados) => {
                    if(dados.data_historico == arrayDatas[i])
                     soma += parseFloat(dados.media_totais_metros_nao_completos)
                     return soma
                }, 0);
                vet.push({
                    data_historico: arrayDatas[i],
                    total_media: objectDados
                })
            }
        }
        if(filtroTurno == "1"){
            for(let i=0; i<arrayDatas.length; i++){
                let objectDados = arrayDados.reduce((soma, dados) => {
                    if(dados.data_historico == arrayDatas[i])
                     soma += parseFloat(dados.media_totais_metros_nao_completos_primeiro_turno)
                     return soma

                }, 0);
                vet.push({
                    data_historico: arrayDatas[i],
                    total_media: objectDados
                })
            }
        }
        if(filtroTurno == "2"){
            for(let i=0; i<arrayDatas.length; i++){
                let objectDados = arrayDados.reduce((soma, dados) => {
                    if(dados.data_historico == arrayDatas[i])
                     soma += parseFloat(dados.media_totais_metros_nao_completos_segundo_turno)
                     return soma
                }, 0);
                vet.push({
                    data_historico: arrayDatas[i],
                    total_media: objectDados
                })
            }
        }
    }

    dashboardConstruirGraficoMediaMetrosProduzidos(vet);
}

export{
    extratDadosGraficoMediaMetrosProduzidos
}