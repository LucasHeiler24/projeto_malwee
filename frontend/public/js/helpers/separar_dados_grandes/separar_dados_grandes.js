export default function separarDadosGrandesGraficos(dados) {
    const fatorarTamanhoVetor = parseInt(dados.length / 5);
    let posicaoFatorar = 0;
    let vetFatorar2 = [];

    for (let i = 0; i < fatorarTamanhoVetor; i++) {
        let vetFatorar1 = [];
        for (let j = posicaoFatorar; j < posicaoFatorar + 5; j++) {
            vetFatorar1.push(...dados[j]);
        }
        posicaoFatorar += 5;
        vetFatorar2.push(vetFatorar1);
    }
    if (!dados[posicaoFatorar]) return vetFatorar2;

    let vetRestoDados = [];
    for (let i = posicaoFatorar; i < dados.length; i++)
        vetRestoDados.push(...dados[i]);

    vetFatorar2.push(vetRestoDados);

    return vetFatorar2;
}