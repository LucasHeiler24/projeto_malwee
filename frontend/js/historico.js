import {
    getRegistrosHistoricoMesEscolhido,
    formater,
    anoAtual,
    proximoMesAtual,
    anteriorMesAtual,
    mesAtual
} from "./helpers.js";

import {
    aumentarAno,
    diminuirAno,
    operandoMes,
    operacaoDiminuirMes,
    operacaoAumentarMes
} from "./helpers/funcoes_alterar_mes_ano.js";


window.onload = function () {

    let dadosRegistrosNoBanco;

    let mesSelecionadoUser = mesAtual;
    let mesAnteriorUser = anteriorMesAtual;
    let mesProximoUser = proximoMesAtual;
    let anoAtualUser = anoAtual;

    const cardsHistoricos = $('#cardsHistoricos');
    const btnDiminuirMes = $('#btnDiminuirMes');
    const btnAumentarMes = $('#btnAumentarMes');
    const btnDiminuirAno = $('#btnDiminuirAno');
    const btnAumentarAno = $('#btnAumentarAno');

    const anoSelecionado = $('#anoSelecionado');

    btnAumentarAno.click(async function () {
        anoAtualUser = aumentarAno(anoAtualUser, anoSelecionado);
        dadosRegistrosNoBanco = await getRegistrosHistoricoMesEscolhido(anoAtualUser, (mesSelecionadoUser + 1).toString().padStart(2, 0));
        construirCardsHistoricos();
    });


    btnDiminuirAno.click(async function () {
        anoAtualUser = diminuirAno(anoAtualUser, anoSelecionado);
        dadosRegistrosNoBanco = await getRegistrosHistoricoMesEscolhido(anoAtualUser, (mesSelecionadoUser + 1).toString().padStart(2, 0));
        construirCardsHistoricos();
    })

    const mesSelecionado = $('#mesSelecionado');

    async function mudarMesSelecionado(operacao) {
        let meses = operandoMes(mesAnteriorUser, mesSelecionadoUser, mesProximoUser, mesSelecionado, operacao);

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        dadosRegistrosNoBanco = await getRegistrosHistoricoMesEscolhido(anoAtualUser, (mesSelecionadoUser + 1).toString().padStart(2, 0));
    }

    btnDiminuirMes.click(async function () {
        let meses = operacaoDiminuirMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser })

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        construirCardsHistoricos(await mudarMesSelecionado('-'));
    });

    btnAumentarMes.click(async function () {
        let meses = operacaoAumentarMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser })

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        construirCardsHistoricos(await mudarMesSelecionado('+'));
    });

    function construirCardsHistoricos() {

        cardsHistoricos.empty();

        if (dadosRegistrosNoBanco.length == 0) cardsHistoricos.append(`<h1>Sem registros para esse mês!</h1>`);

        let vetTiposTecidos = [
            'Meia Malha', 'Cotton', 'Punho Pun',
            'Punho New', 'Punho San', 'Punho Elan'
        ];

        dadosRegistrosNoBanco.forEach(registros => {

            cardsHistoricos.append(`
            
                <div class="card">

                    <div class="card-header">
                        <h1>Número tarefa: ${registros.numero_da_tarefa}</h1>
                        <h1>Id tarefa: #${registros.id_dados}</h1>
                    </div>

                    <div class="card-body">
                        <h1>${new Date(registros.data_historico).toLocaleString()}</h1>
                        <h1>Tipo tecido: ${vetTiposTecidos[registros.tipo_tecido]}</h1>
                        <h1>Metros produzidos: ${formater.format(registros.metros_produzidos)}</h1>
                        <h1>Tempo de produção: ${formater.format(registros.tempo_de_producao)}</h1>
                    </div>

                    <div class="card-footer">
                        <button value="${registros.id_dado}">Ver mais</button>
                    </div>

                </div>

            `);

        });

    }

    (async () => {
        construirCardsHistoricos(await mudarMesSelecionado());
        anoSelecionado.text(anoAtualUser);

    })()


}