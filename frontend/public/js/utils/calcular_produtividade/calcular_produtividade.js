import { formatarValores } from "../../helpers/funcoes_gerais/funcoes.js";

export default function calcularProdutividade(dados) {
    return dados.map((dados) => {
        return { ...dados, produtividade: dados.metros_totais / dados.producao_totais }
    });
}