import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosOntemHistorico = async () => {
    const dataHoje = new Date(`2025-07-15 00:00:00`);
    const data = formatarDatasParaAmericanas(new Date(dataHoje.setDate(dataHoje.getDate() - 1)).toLocaleDateString().split('/'));

    console.log(data)
    try{
        const response = await fetch(`http://localhost:8000/historico/diario/todos/data/${data}`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosOntemHistorico