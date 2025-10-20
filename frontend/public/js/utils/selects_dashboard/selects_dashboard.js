const selectsDashboardConstruirSelectDatas = (htmlSelect, vetDatas) => {
    htmlSelect.innerHTML = "";
    vetDatas.forEach(datas => {
        htmlSelect.innerHTML += `
            <option value="${datas}">${new Date(`${datas} 00:00:00`).toLocaleDateString()}</option>
        `
    });
}

const selectsDashboardGraficosGrandesSelectData = (htmlSelect, vetDatas) => {
    htmlSelect.innerHTML = "";
    vetDatas.forEach((datas, index) => {
        htmlSelect.innerHTML += `
            <option value="${index}">
                ${new Date(`${vetDatas[index][0].data_historico} 00:00:00`).toLocaleDateString()} até
                ${new Date(`${vetDatas[index][vetDatas[index].length - 1].data_historico} 00:00:00`).toLocaleDateString()}
            </option>
        `
    });
}

export {
    selectsDashboardConstruirSelectDatas,
    selectsDashboardGraficosGrandesSelectData
}