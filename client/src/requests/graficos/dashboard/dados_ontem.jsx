import { formatarDatasParaAmericanas } from "../../../helpers/funcoes";

const dadosOntem = async () => {
    const hoje = new Date("2025-07-15 00:00:00");
    const ontem = new Date(hoje.setDate(hoje.getDate() - 1)).toLocaleDateString();

    try{

        const response = await fetch(`http://localhost:8000/dados/diario/data/${formatarDatasParaAmericanas(ontem.split('/'))}`)
        return await response.json();
    }
    catch(e){
        return e;
    }
}

export default dadosOntem;