import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosHoje = async (data) => {
    
    const hoje = (data) ? formatarDatasParaAmericanas(new Date(`${data} 00:00:00`).toLocaleDateString().split('/')) :
    '2025-07-15'

    try{

        const response = await fetch(`http://localhost:8000/dados/diario/data/${hoje}`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosHoje;