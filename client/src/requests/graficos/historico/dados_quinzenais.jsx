import { formatarDatasParaAmericanas, formatarDatasParaMeses } from "../../../helpers/funcoes";

const dadosQuinzenaisHistorico = async (periodo) => {
    const data = formatarDatasParaAmericanas(new Date(`2025-07-15 00:00:00`).toLocaleDateString().split('/'))

    try{
        const response = await fetch(`http://localhost:8000/historico/${periodo}/todos/data/${data}/type/quinzenal`)
        return response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosQuinzenaisHistorico