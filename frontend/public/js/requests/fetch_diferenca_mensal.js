const URL_API = "http://localhost:8000/dados";
async function getDadosDiferencaMensal(dateMes1, dateMes2) {

    try {

        const response = await fetch(`
            ${URL_API}/dados-diferenca-mensal/date1/${dateMes1}/date2/${dateMes2}
        `);

        return await response.json();

    }
    catch (e) {
        return e;
    }

}

export { getDadosDiferencaMensal }