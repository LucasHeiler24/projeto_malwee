import {
    vetMeses,
} from "./helpers.js";

function aumentarAno(anoUser, divExibirAno) {
    anoUser++;
    divExibirAno.text(anoUser);
    return anoUser;
}

function diminuirAno(anoUser, divExibirAno) {
    anoUser--;
    divExibirAno.text(anoUser);
    return anoUser;
}

function operandoMes(mesAnteriorUser, mesSelecionadoUser, mesProximoUser, mesSelecionado, operacao) {
    if (!operacao) {
        mesSelecionado.text(`${vetMeses[mesAnteriorUser]}
            - ${vetMeses[mesSelecionadoUser]}
            - ${vetMeses[mesProximoUser]}`);
    }
    if (operacao == '-') {
        mesSelecionado.text(`${vetMeses[mesAnteriorUser -= 1]}
            - ${vetMeses[mesSelecionadoUser -= 1]}
            - ${vetMeses[mesProximoUser -= 1]}`);
    }
    if (operacao == '+') {
        mesSelecionado.text(`${vetMeses[mesAnteriorUser += 1]}
            - ${vetMeses[mesSelecionadoUser += 1]}
            - ${vetMeses[mesProximoUser += 1]}`);
    }

    return { mesAnteriorUser, mesSelecionadoUser, mesProximoUser };
}

function operacaoDiminuirMes(meses) {
    if (meses.mesAnteriorUser - 1 == -1) meses.mesAnteriorUser = 12;
    if (meses.mesSelecionadoUser - 1 == -1) meses.mesSelecionadoUser = 12;
    if (meses.mesProximoUser - 1 == -1) meses.mesProximoUser = 12;

    return meses;
}

function operacaoAumentarMes(meses) {
    if (meses.mesAnteriorUser + 1 == 12) meses.mesAnteriorUser = -1;
    if (meses.mesSelecionadoUser + 1 == 12) meses.mesSelecionadoUser = -1;
    if (meses.mesProximoUser + 1 == 12) meses.mesProximoUser = -1;

    return meses;
}

export { aumentarAno, diminuirAno, operandoMes, operacaoDiminuirMes, operacaoAumentarMes }