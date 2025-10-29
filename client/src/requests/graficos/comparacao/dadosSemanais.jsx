const dadosSemanais = async (firstDate, secoundDate) => {

    try{

        const response = await fetch(`http://localhost:8000/comparacao/anterior/type/semanal/${firstDate}/${secoundDate}`)
        return await response.json();

    }
    catch(e){
        return e;
    }

}

export default dadosSemanais