import { receberDadosSelecionadosPorDataGraficoEficienciaSetup, receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup, receberDadosSelecionadosPorDataGraficoProdutividade, receberDadosSelecionadosPorDataGraficoSobraDeRolo, receberDadosSelecionadosPorDataGraficoTarefasCompletas, receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido, receberDadosSelecionadosPorDataGraficoTotaisProducao } from "../../dashboard.js";
import { receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos } from "../../dashboard_metros.js";
import getDadosPelasDatasEscolhidasHoje from "./buttons_alterar_datas.js";

export default function addOuvinteNosButtonsAlterarData(vetBtnsData, divTempoDatas, htmlCheckboxTipoTempo, spinner) {
    vetBtnsData.forEach(button => {
        button.addEventListener('click', async function () {
            spinner.style.display = 'flex';

            if (this.value == 'semanal' || this.value == 'quinzenal') {

                divTempoDatas.style.display = 'flex';
                let tipoTempo = 'posterior';

                htmlCheckboxTipoTempo.addEventListener('click', async function () {
                    spinner.style.display = 'flex';
                    htmlCheckboxTipoTempo.checked ? tipoTempo = "posterior" : tipoTempo = "anterior";
                    const { dadosTotais, dadosSobraDeRolo, dadosTotaisTarefasCompletasOuNao, dadosTotaisTipoSaida } = await getDadosPelasDatasEscolhidasHoje(button.value, tipoTempo)
                    spinner.style.display = 'none';
                    receberDadosSelecionadosPorDataGraficoTotaisProducao(dadosTotais);
                    receberDadosSelecionadosPorDataGraficoSobraDeRolo(dadosSobraDeRolo);
                    receberDadosSelecionadosPorDataGraficoTarefasCompletas(dadosTotaisTarefasCompletasOuNao);
                    receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido(dadosTotaisTipoSaida);
                    receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup(dadosTotais);
                    receberDadosSelecionadosPorDataGraficoProdutividade(dadosTotais);
                    receberDadosSelecionadosPorDataGraficoEficienciaSetup(dadosTotais);
                    receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(dadosTotais);

                    return;
                });

                const { dadosTotais, dadosSobraDeRolo, dadosTotaisTarefasCompletasOuNao, dadosTotaisTipoSaida } = await getDadosPelasDatasEscolhidasHoje(this.value, tipoTempo);
                spinner.style.display = 'none';
                receberDadosSelecionadosPorDataGraficoTotaisProducao(dadosTotais);
                receberDadosSelecionadosPorDataGraficoSobraDeRolo(dadosSobraDeRolo);
                receberDadosSelecionadosPorDataGraficoTarefasCompletas(dadosTotaisTarefasCompletasOuNao);
                receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido(dadosTotaisTipoSaida);
                receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup(dadosTotais);
                receberDadosSelecionadosPorDataGraficoProdutividade(dadosTotais);
                receberDadosSelecionadosPorDataGraficoEficienciaSetup(dadosTotais);
                receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(dadosTotais);


                return;
            }
            if (this.value == 'hoje' || this.value == 'ontem') {
                divTempoDatas.style.display = 'none';
                htmlCheckboxTipoTempo.checked = false;

                const { dadosTotais, dadosSobraDeRolo, dadosTotaisTarefasCompletasOuNao, dadosTotaisTipoSaida } = await getDadosPelasDatasEscolhidasHoje(this.value);
                spinner.style.display = 'none';
                receberDadosSelecionadosPorDataGraficoTotaisProducao(dadosTotais);
                receberDadosSelecionadosPorDataGraficoSobraDeRolo(dadosSobraDeRolo);
                receberDadosSelecionadosPorDataGraficoTarefasCompletas(dadosTotaisTarefasCompletasOuNao);
                receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido(dadosTotaisTipoSaida);
                receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup(dadosTotais);
                receberDadosSelecionadosPorDataGraficoProdutividade(dadosTotais);
                receberDadosSelecionadosPorDataGraficoEficienciaSetup(dadosTotais);
                receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(dadosTotais);

                return;
            }
            if (this.value == 'mensal') {
                divTempoDatas.style.display = 'none';
                htmlCheckboxTipoTempo.checked = false;

                const { dadosTotais, dadosSobraDeRolo, dadosTotaisTarefasCompletasOuNao, dadosTotaisTipoSaida } = await getDadosPelasDatasEscolhidasHoje(this.value);
                spinner.style.display = 'none';
                receberDadosSelecionadosPorDataGraficoTotaisProducao(dadosTotais);
                receberDadosSelecionadosPorDataGraficoSobraDeRolo(dadosSobraDeRolo);
                receberDadosSelecionadosPorDataGraficoTarefasCompletas(dadosTotaisTarefasCompletasOuNao);
                receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido(dadosTotaisTipoSaida);
                receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup(dadosTotais);
                receberDadosSelecionadosPorDataGraficoProdutividade(dadosTotais);
                receberDadosSelecionadosPorDataGraficoEficienciaSetup(dadosTotais);
                receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(dadosTotais);

                return;
            }
        })
    });
}
