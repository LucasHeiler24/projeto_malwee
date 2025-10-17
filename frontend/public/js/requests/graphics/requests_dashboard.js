const getDadosDiasPosterioresSemanalQuinzenal = async (sData, tipoPeriodo) => {
    try {

        const response = await fetch(`http://localhost:8000/dados/posterior/data/${sData}/type/${tipoPeriodo}`);
        return await response.json();

    }
    catch (e) {
        return e;
    }
}

export {
    getDadosDiasPosterioresSemanalQuinzenal
}