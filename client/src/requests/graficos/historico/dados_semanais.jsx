import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosSemanaisHistorico = async (periodo, dataUser) => {
    console.log(periodo, dataUser);
    const dataPeriodo = (dataUser) ? formatarDatasParaAmericanas(new Date(`${dataUser} 00:00:00`).toLocaleDateString().split('/')) :
     `2025-07-15`

    try{
        const response = await fetch(`http://localhost:8000/historico/${periodo}/todos/data/${dataPeriodo}/type/semanal`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosSemanaisHistorico