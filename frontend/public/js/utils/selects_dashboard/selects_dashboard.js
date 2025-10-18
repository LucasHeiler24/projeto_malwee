const selectsDashboardConstruirSelectDatas = (htmlSelect, vetDatas) => {
    htmlSelect.innerHTML = "";
    vetDatas.forEach(datas => {
        htmlSelect.innerHTML += `
            <option value="${datas}">${new Date(`${datas} 00:00:00`).toLocaleDateString()}</option>
        `
    });
}

export {
    selectsDashboardConstruirSelectDatas,
}