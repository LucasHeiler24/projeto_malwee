import { pegarDadosMesEAnoEscolhido } from "../../models/EntidadeDados.js";

export default async function getDadosPelaDataBd(vetDatas) {

    const vetDadosBd = [];
    try {

        for (let i = 0; i < vetDatas.length; i++) {
            vetDadosBd.push(...await pegarDadosMesEAnoEscolhido(vetDatas[i]));
        }

    }
    catch (e) {
        return e;
    }

    return vetDadosBd;
}