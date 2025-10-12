const URL_API = "http://localhost:8000/dados";

async function getDadosDiarios(sData) {

    try {

        const response = await fetch(`
            ${URL_API}/dados-analise-por-diario/date/${sData} 
        `);

        return await response.json();
    }
    catch (e) {
        return e;
    }

}

async function getDadosSemanal(sData) {
    try {

        const response = await fetch(`
            ${URL_API}/dados-analise-por-semanal/date/${sData} 
        `);

        return await response.json();
    }
    catch (e) {
        return e;
    }
}

async function getDadosQuinzenal(sData) {
    try {

        const response = await fetch(`
            ${URL_API}/dados-analise-por-quinzenal/date/${sData} 
        `);

        return await response.json();
    }
    catch (e) {
        return e;
    }
}

async function getDadosMestral(sData) {
    try {

        const response = await fetch(`
            ${URL_API}/dados-analise-por-mensal/date/${sData} 
        `);

        return await response.json();
    }
    catch (e) {
        return e;
    }
}

export {
    getDadosDiarios,
    getDadosSemanal,
    getDadosQuinzenal,
    getDadosMestral
}