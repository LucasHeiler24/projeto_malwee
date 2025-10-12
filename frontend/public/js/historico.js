import {
    formater,
    anoAtual,
    proximoMesAtual,
    anteriorMesAtual,
    mesAtual,
    encontrarIndexRegistrosPeloTipoTecido,
    filterRegistrosPeloTipoTecido,
    filterRegistrosPeloNumeroTarefa,
    filterRegistrosPorId
} from "./helpers/helpers.js";

import {
    aumentarAno,
    diminuirAno,
    operandoMes,
    operacaoDiminuirMes,
    operacaoAumentarMes
} from "./helpers/funcoes_alterar_mes_ano.js";

import { getRegistrosHistoricoMesEscolhido } from "./requests/fetch_historico.js";

import { getValidToken } from "./requests/fetch_gerais.js";


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

    let btnsRegistrosAbrirModal;

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
                        <button class="btn-open-modal" value="${registros.id_dado}">Ver mais</button>
                    </div>

                </div>

            `);

        });

        btnsRegistrosAbrirModal = document.querySelectorAll('.btn-open-modal');

        console.log(btnsRegistrosAbrirModal);
        addOuvinteBtnsAbrirModal();
    }

    function addOuvinteBtnsAbrirModal() {

        btnsRegistrosAbrirModal.forEach((btns) => {

            btns.addEventListener('click', function () {
                openModalComORegistro(filterRegistrosPorId(dadosRegistros, this.value));
            })

        })

    }

    const divOpenModal = document.getElementById('modalRegistro');
    divOpenModal.style.display = 'none';

    function openModalComORegistro(objetoRegistro) {

        divOpenModal.style.display = 'flex';

        document.getElementById('idDado').textContent = `Id do registro: #${objetoRegistro.id_dado}`;
        document.getElementById('dataHistorico').textContent = `${new Date(objetoRegistro.data_historico).toLocaleString()}`;

        document.getElementById('metros_produzidos').textContent = objetoRegistro.metros_produzidos;
        document.getElementById('numero_da_tarefa').textContent = objetoRegistro.numero_da_tarefa;
        document.getElementById('quantidade_de_tiras').textContent = objetoRegistro.quantidade_de_tiras;
        document.getElementById('sobra_de_rolo').textContent = (objetoRegistro.sobra_de_rolo == 'TRUE') ? "Sobrou" : "Não sobrou";
        document.getElementById('tarefa_completa').textContent = (objetoRegistro.tarefa_completa == 'TRUE') ? "Completada" : "Não completada";
        document.getElementById('tempo_de_producao').textContent = objetoRegistro.tempo_de_producao;
        document.getElementById('tempo_de_setup').textContent = objetoRegistro.tempo_de_setup;
        document.getElementById('tipo_maquina').textContent = (objetoRegistro.tipo_maquina == "") ? "Não específicada" : objetoRegistro.tipo_maquina;
        document.getElementById('tipo_saida').textContent = (objetoRegistro.tipo_saida == 0) ? "Rolinho" : "Fraudado";
        document.getElementById('tipo_tecido').textContent = vetTiposTecidos[objetoRegistro.tipo_tecido];
        document.getElementById('observacoesRegistros').textContent = (objetoRegistro.MyUnknownColumn == "") ? "Sem observações" : objetoRegistro.MyUnknownColumn;

        document.getElementById('btnFecharModal').addEventListener('click', () => {
            divOpenModal.style.display = 'none';
        })
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
        const separarCookie = document.cookie.split(';');
        const separarDadosCookieToken = separarCookie[0].split('=');

        const token = separarDadosCookieToken[1];
        if (!token) return window.location.href = './login.html';

        const situacaoToken = await getValidToken(token);

        if (situacaoToken.status != 200) return window.location.href = './login.html';

        const separarDadosCookieNomeUser = separarCookie[1].split('=');

        document.getElementById('nomeUser').textContent = `Olá ${separarDadosCookieNomeUser[1].split(' ')[0]}`;

        dadosRegistros = await mudarMesSelecionado();
        construirCardsHistoricos(dadosRegistros);
        anoSelecionado.text(anoAtualUser);

        document.getElementById('inFiltro').addEventListener('keyup', async function () {
            tipoFilterSelecionado(this.value);
        });
    })()


}