import { formatarDatasParaMeses } from "../../../helpers/funcoes";

const dadosMensaisHistorico = async () => {
    const data = '2025-07';

    console.log(data)
    try{
        const response = await fetch(`http://localhost:8000/historico/mensal/todos/data/${data}`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosMensaisHistorico