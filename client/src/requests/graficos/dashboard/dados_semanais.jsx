import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosSemanais = async (tipoPeriodo, dataUser) => {
    const dataPeriodo = (dataUser) ? formatarDatasParaAmericanas(new Date(`${dataUser} 00:00:00`).toLocaleDateString().split('/')) :
     formatarDatasParaAmericanas(new Date(`2025-07-15 00:00:00`).toLocaleDateString().split('/'));

    try{

        const response = await fetch(`http://localhost:8000/dados/${tipoPeriodo}/data/${dataPeriodo}/type/semanal`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosSemanais;