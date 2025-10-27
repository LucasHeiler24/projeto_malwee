const formatarDatasParaAmericanas = (data) => {
    return data[2] + '-' + data[1] + '-' + data[0]
}

const removerDuplicados = (arrayDados) => {
    return arrayDados.filter((dados, index) => arrayDados.indexOf(dados) == index);
}

const formatarValores = new Intl.NumberFormat('pt-BR', {
    style: 'decimal'
})

const removerDadosUndefined = (dados) => {
    return dados.filter((dados) => dados);
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

const formatarDatasParaMeses = (data) => {
    return data[0] + '-' + data[1];
}

const separarDadosPorVetores = (dadosFiltrados) => {
    const vet = [];
    let periodo = 5;
    let periodoParaDividir = parseInt(dadosFiltrados.length / 5);
    let cont = 0;
    for(let i=0; i<periodoParaDividir; i++){
        let vet2 = [];
        for(let j=cont; j<periodo; j++){
            vet2.push(dadosFiltrados[j]);
            cont++;
        }
        vet.push(vet2);
        periodo += 5;
    }

    if(!dadosFiltrados[cont]) return vet;

    let vet3 = [];
    for(let i=cont; i<dadosFiltrados.length; i++){
        vet3.push(dadosFiltrados[i]);
    }
    
    vet.push(vet3);
    return vet;
}

export {
    formatarDatasParaAmericanas,
    removerDuplicados,
    coresGraficoPizza,
    formatarValores,
    removerDadosUndefined,
    separarDadosPorVetores,
    formatarDatasParaMeses
}