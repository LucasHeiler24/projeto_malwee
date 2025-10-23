import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosQuinzenais = async (tipoPeriodo) => {
    const dataPeriodo = formatarDatasParaAmericanas(new Date(`2025-07-15 00:00:00`).toLocaleDateString().split('/'));

    try{

        const response = await fetch(`http://localhost:8000/dados/${tipoPeriodo}/data/${dataPeriodo}/type/quinzenal`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosQuinzenais;