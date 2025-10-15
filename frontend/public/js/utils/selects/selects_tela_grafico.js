import { formatarDataParaOsGraficos } from "../../helpers/helpers.js";

function utilsSelectNumerosTarefasGraficoTipoTecido(arrayTarefas, selectNumerosTarefaTipoTecido) {
    selectNumerosTarefaTipoTecido.innerHTML = "";
    arrayTarefas.forEach((numeros, index) => {
        selectNumerosTarefaTipoTecido.innerHTML += `
        <option value="${index}">${arrayTarefas[index].join(', ')}</option>
        `;
    });
}

function utilsSelectTiposTecidos(selectTipoDadosTecidos) {
    selectTipoDadosTecidos.innerHTML = `
        <option value="0">Filtrar por metros produzidos</option>
        <option value="1">Filtrar por tempo produção</option>
        <option value="2">Filtrar por tempo setup</option>
    `;
}

function utilsSelectTipos(selectTipoTecido) {
    selectTipoTecido.innerHTML = `
       <option value="Meia Malha">Meia Malha</option>
        <option value="Cotton">Cotton</option>
        <option value="Punho Pun">Punho Pun</option>
        <option value="Punho New">Punho New</option>
        <option value="Punho San">Punho San</option>
        <option value="Punho Elan">Punho Elan</option>
    `;
}

function utilsSelectDosDiasTempoProducao(htmlSelect, arrayDados) {
    htmlSelect.innerHTML = "";
    arrayDados?.forEach((dados) => {
        htmlSelect.innerHTML += `
        <option value="${dados.dia_do_mes}">${formatarDataParaOsGraficos(dados.dia_do_mes)}</option>
      `;
    });
}

function utilsSelectDosNumerosTarefasTempoProducao(htmlSelect, arrayDados) {
    htmlSelect.innerHTML = "";
    arrayDados?.forEach((dados, index) => {
        htmlSelect.innerHTML += `
        <option value="${index}">${arrayDados[index].join(', ')}</option>
      `;
    });
}


function utilsSelectMetrosProduzidos(vetDataMetrosProduzidos, inSelectDatasMetrosProduzidos) {

    inSelectDatasMetrosProduzidos.innerHTML = "";
    vetDataMetrosProduzidos.forEach((datas, index) => {
        inSelectDatasMetrosProduzidos.innerHTML += `
        <option value="${index}">${formatarDataParaOsGraficos(datas)}</option>
      `;
    });

}

function utilsMostrarSelectNumeroTarefaMetrosProduzidos(dadosParaOsGraficos, inSelectFiltroPorNumerosTarefasMetrosProduzidos) {

    inSelectFiltroPorNumerosTarefasMetrosProduzidos.innerHTML = "";
    dadosParaOsGraficos.forEach((numeros, index) => {
        inSelectFiltroPorNumerosTarefasMetrosProduzidos.innerHTML += `
        <option value="${index}">${dadosParaOsGraficos[index].join(', ')}</option>
      `;
    });

}

function utilsSelectsDinamicosPorData(arrayDados, htmlSelect) {
    htmlSelect.innerHTML = "";
    arrayDados.forEach(dados => {
        htmlSelect.innerHTML += `
            <option value="${dados.dia_do_mes}">${formatarDataParaOsGraficos(dados.dia_do_mes)}</option>
        `;
    });
}

function utilsSelectDinamicoPorNumeroTarefa(arrayDados, htmlSelect) {
    htmlSelect.innerHTML = "";
    arrayDados.forEach((dados, index) => {
        htmlSelect.innerHTML += `
          <option value="${index}">${arrayDados[index].join(', ')}</option>
        `;
    })
}

function utilsSelectDataTipoTecido(selectDatasTiposTecido, datasTiposTecidos) {
    selectDatasTiposTecido.innerHTML = "";
    datasTiposTecidos.forEach((datas, index) => {
        selectDatasTiposTecido.innerHTML += `
        <option value="${index}">${formatarDataParaOsGraficos(datas)}</option>
      `;
    });
}

export {
    utilsSelectNumerosTarefasGraficoTipoTecido,
    utilsSelectTiposTecidos,
    utilsSelectTipos,
    utilsSelectDosDiasTempoProducao,
    utilsSelectDosNumerosTarefasTempoProducao,
    utilsSelectMetrosProduzidos,
    utilsMostrarSelectNumeroTarefaMetrosProduzidos,
    utilsSelectsDinamicosPorData,
    utilsSelectDinamicoPorNumeroTarefa,
    utilsSelectDataTipoTecido
}