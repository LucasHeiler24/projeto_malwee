import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosHoje = async () => {
    const hoje = formatarDatasParaAmericanas(new Date("2025-07-15 00:00:00").toLocaleDateString().split('/'));

    try{

        const response = await fetch(`http://localhost:8000/dados/diario/data/${hoje}`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosHoje;