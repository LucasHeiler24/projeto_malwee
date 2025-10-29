import { formatarDatasAmericanas } from "../../../../../backend/src/helpers/funcoes_gerais/helpers";
import { formatarDatasParaMeses } from "../../../helpers/funcoes";

const dadosMensais = async (firstDate, secoundDate) => {

    try{

        const response = await fetch(`http://localhost:8000/comparacao/mensal/${formatarDatasParaMeses(firstDate.split('-'))}/${formatarDatasParaMeses(secoundDate.split('-'))}`)
        return await response.json()

    }
    catch(e){
        return e;
    }

}

export default dadosMensais;