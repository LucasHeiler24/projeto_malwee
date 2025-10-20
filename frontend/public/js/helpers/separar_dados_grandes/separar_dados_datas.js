import { removerDuplicados } from "../funcoes_gerais/funcoes.js";

export default function separarDatasNosDados(arrayDados) {
    return removerDuplicados(arrayDados.map((dados) => dados.data_historico));
}