import { formatarDatasAmericanas } from "../funcoes_gerais/helpers.js";

export default function alterarDatasPosteriores(sData, tipoAnalise) {

    let vetDatas = [];
    let periodo;

    (tipoAnalise == 'semanal') ? periodo = 7 : periodo = 15

    for (let i = 0; i < periodo; i++) {
        const dataUser = new Date(sData);
        let date = new Date(dataUser.setDate(dataUser.getDate() + i)).toDateString();

        if (date.split(' ')[0] == 'Sat' || date.split(' ')[0] == 'Sun')
            periodo++;

        vetDatas.push(date);
    }

    const diasUteis = vetDatas.filter((datas) => (datas.split(' ')[0] != 'Sat' && datas.split(' ')[0] != 'Sun'));
    const formatarDatasDiasUteis = diasUteis.map((dados) => formatarDatasAmericanas(new Date(dados).toLocaleDateString().split('/')));
    return formatarDatasDiasUteis;

}