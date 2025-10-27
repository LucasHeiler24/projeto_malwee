import { formatarDatasParaAmericanas, formatarDatasParaMeses } from "../../../helpers/funcoes";

const dadosSemanaisHistorico = async (periodo) => {
    const data = formatarDatasParaAmericanas(new Date(`2025-07-15 00:00:00`).toLocaleDateString().split('/'))

    try{
        const response = await fetch(`http://localhost:8000/historico/${periodo}/todos/data/${data}/type/semanal`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosSemanaisHistorico