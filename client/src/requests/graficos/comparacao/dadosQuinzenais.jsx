const dadosQuinzenais = async (firstDate, secoundDate) => {

    try{

        const response = await fetch(`http://localhost:8000/comparacao/anterior/type/quinzenal/${firstDate}/${secoundDate}`)
        return await response.json();

    }
    catch(e){
        return e;
    }

}

export default dadosQuinzenais;