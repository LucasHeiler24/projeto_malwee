import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosHojeHistorico = async () => {
    const data = formatarDatasParaAmericanas(new Date(`2025-07-15 00:00:00`).toLocaleDateString().split('/'))

    try{
        const response = await fetch(`http://localhost:8000/historico/diario/todos/data/${data}`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosHojeHistorico