import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosHojeHistorico = async (data) => {
    const diario =  (data) ?
    formatarDatasParaAmericanas(new Date(`${data} 00:00:00`).toLocaleDateString().split('/')) :
    '2025-07-15'

    try{
        const response = await fetch(`http://localhost:8000/historico/diario/todos/data/${diario}`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosHojeHistorico