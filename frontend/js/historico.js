import {
    formater,
    anoAtual,
    proximoMesAtual,
    anteriorMesAtual,
    mesAtual,
    encontrarIndexRegistrosPeloTipoTecido,
    filterRegistrosPeloTipoTecido,
    filterRegistrosPeloNumeroTarefa
} from "./helpers/helpers.js";

import { getRegistrosHistoricoMesEscolhido } from "./requests/fetch_para_o_backend.js"

import {
    aumentarAno,
    diminuirAno,
    operandoMes,
    operacaoDiminuirMes,
    operacaoAumentarMes
} from "./helpers/funcoes_alterar_mes_ano.js";


window.onload = function () {

    let dadosRegistros;

    let vetTiposTecidos = [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

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
        dadosRegistros = await getRegistrosHistoricoMesEscolhido(
            anoAtualUser,
            (mesSelecionadoUser + 1).toString().padStart(2, 0)
        );
        construirCardsHistoricos(dadosRegistros);
    });


    btnDiminuirAno.click(async function () {
        anoAtualUser = diminuirAno(anoAtualUser, anoSelecionado);
        dadosRegistros = await getRegistrosHistoricoMesEscolhido(
            anoAtualUser,
            (mesSelecionadoUser + 1).toString().padStart(2, 0)
        );
        construirCardsHistoricos(dadosRegistros);
    })

    const mesSelecionado = $('#mesSelecionado');

    async function mudarMesSelecionado(operacao) {
        let meses = operandoMes(mesAnteriorUser, mesSelecionadoUser, mesProximoUser, mesSelecionado, operacao);

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        return await getRegistrosHistoricoMesEscolhido(
            anoAtualUser,
            (mesSelecionadoUser + 1).toString().padStart(2, 0)
        );
    }

    btnDiminuirMes.click(async function () {
        let meses = operacaoDiminuirMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser })

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        dadosRegistros = await mudarMesSelecionado('-')
        construirCardsHistoricos(dadosRegistros);
    });

    btnAumentarMes.click(async function () {
        let meses = operacaoAumentarMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser })

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        dadosRegistros = await mudarMesSelecionado('+')
        construirCardsHistoricos(dadosRegistros);
    });

    function construirCardsHistoricos(arrayDados) {

        cardsHistoricos.empty();

        if (arrayDados.length == 0) cardsHistoricos.append(`<h1>Sem registros para esse mês!</h1>`);


        arrayDados.forEach(registros => {

            cardsHistoricos.append(`
            
                <div class="card">

                    <div class="card-header">
                        <h1>Número tarefa: ${registros.numero_da_tarefa}</h1>
                        <h1>Id tarefa: #${registros.id_dado}</h1>
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

    function filterPeloTipoTecido(filterTextoUsuario) {
        return (filterTextoUsuario == "") ? dadosRegistros :
            filterRegistrosPeloTipoTecido(
                dadosRegistros,
                encontrarIndexRegistrosPeloTipoTecido(vetTiposTecidos, filterTextoUsuario)
            );
    }

    function filterPeloNumeroTarefa(filterTextoUsuario) {
        return (filterTextoUsuario.length == "") ?
            dadosRegistros :
            filterRegistrosPeloNumeroTarefa(dadosRegistros, filterTextoUsuario);
    }

    function tipoFilterSelecionado(filterTextoUsuario) {
        let filtroSelecionado = parseInt(document.getElementById('inSelectFiltro').value);

        switch (filtroSelecionado) {
            case -1:
                return;
            case 0:
                return construirCardsHistoricos(filterPeloNumeroTarefa(filterTextoUsuario));
            case 1:
                return construirCardsHistoricos(filterPeloTipoTecido(filterTextoUsuario));
        }
    }

    (async () => {
        dadosRegistros = await mudarMesSelecionado();
        construirCardsHistoricos(dadosRegistros);
        anoSelecionado.text(anoAtualUser);

        document.getElementById('inFiltro').addEventListener('keyup', async function () {
            tipoFilterSelecionado(this.value);
        });
    })()


}