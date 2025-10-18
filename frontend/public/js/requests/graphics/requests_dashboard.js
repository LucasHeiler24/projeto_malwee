const getDadosDiasSemanalQuinzenal = async (sData, tipoPeriodo, tipoTempo) => {
    try {
        const response = await fetch(`http://localhost:8000/dados/${tipoTempo}/data/${sData}/type/${tipoPeriodo}`);
        return await response.json();
    }
    catch (e) {
        return e;
    }
}

const getDadosDiarios = async (sData) => {
    try {
        const response = await fetch(`http://localhost:8000/dados/diario/data/${sData}`);
        return await response.json();
    }
    catch (e) {
        return e;
    }
}

const getDadosMensais = async (sData) => {
    try {
        const response = await fetch(`http://localhost:8000/dados/mensal/data/${sData}`);
        return await response.json();
    }
    catch (e) {
        return e;
    }
}

export {
    getDadosDiasSemanalQuinzenal,
    getDadosDiarios,
    getDadosMensais
}