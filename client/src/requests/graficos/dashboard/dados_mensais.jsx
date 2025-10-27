import { formatarDatasParaMeses } from "../../../helpers/funcoes";

const dadosMensais = async (dataUser) => {

    let data = (dataUser) ? formatarDatasParaMeses(dataUser.split('-')) : '2025-07';

    try{

        const response = await fetch(`http://localhost:8000/dados/mensal/data/${data}`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosMensais;