const dadosDiarios = async (firstDate, secoundDate) => {

    try{
        const response = await fetch(`http://localhost:8000/comparacao/diario/${firstDate}/${secoundDate}`)
        return await response.json();
    }
    catch(e){
        return e;
    }

}

export default dadosDiarios;