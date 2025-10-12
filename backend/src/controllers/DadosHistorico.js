import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";

const pegarTodosOsDadosDoMesSelecionado = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {
        return response.json(await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`));
    }
    catch (e) {
        return response.json(e);
    }

}

export { pegarTodosOsDadosDoMesSelecionado }