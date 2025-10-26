const extrairDadoGraficoVariantes = ({dados, total_producao, tipoData, tipoTecido1, tipoTecido2, tipoTurno}) => {
    const dadosFiltradosPorData = dados[parseInt(tipoData)];
    const tempoProducao = total_producao[parseInt(tipoData)];
    console.log(dadosFiltradosPorData[parseInt(tipoTecido1)].total_metros_tecidos_dois_turnos);
    console.log(dadosFiltradosPorData[parseInt(tipoTecido2)].total_metros_tecidos_dois_turnos);

    let metrosTecido1;
    let metrosTecido2;
    switch(tipoTurno){
        case '0':
            metrosTecido1 = dadosFiltradosPorData[parseInt(tipoTecido1)].total_metros_tecidos_dois_turnos;
            metrosTecido2 = dadosFiltradosPorData[parseInt(tipoTecido2)].total_metros_tecidos_dois_turnos;
            break;
        case '1':
            metrosTecido1 = dadosFiltradosPorData[parseInt(tipoTecido1)].total_metros_tecidos_primeiro_turno;
            metrosTecido2 = dadosFiltradosPorData[parseInt(tipoTecido2)].total_metros_tecidos_primeiro_turno;
            break;
        case '2': 
            metrosTecido1 = dadosFiltradosPorData[parseInt(tipoTecido1)].total_metros_tecido_segundo_turno;
            metrosTecido2 = dadosFiltradosPorData[parseInt(tipoTecido2)].total_metros_tecido_segundo_turno;
            break;
    }

    const varianteTecido1 = metrosTecido1 / tempoProducao;
    const varianteTecido2 = metrosTecido2 / tempoProducao;

    let diferencaBruta;
    diferencaBruta = (varianteTecido1 > varianteTecido2) ? varianteTecido1 - varianteTecido2 :
    varianteTecido2 - varianteTecido1;

    return {varianteTecido1, varianteTecido2, diferencaBruta}
}

export default extrairDadoGraficoVariantes;