const formatarDatasParaAmericanas = (data) => {
    return data[2] + '-' + data[1] + '-' + data[0]
}

const removerDuplicados = (arrayDados) => {
    return arrayDados.filter((dados, index) => arrayDados.indexOf(dados) == index);
}

const coresGraficoPizza = 
[
  "#FF3333",
  "#3366FF",
  "#66FF33",
  "#FFCC33",
  "#CC33FF",
  "#FF9933"
]

export {
    formatarDatasParaAmericanas,
    removerDuplicados,
    coresGraficoPizza
}