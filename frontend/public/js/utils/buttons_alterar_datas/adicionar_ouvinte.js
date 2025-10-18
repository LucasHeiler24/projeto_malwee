import { receberDadosSelecionadosPorData } from "../../dashboard.js";
import getDadosPelasDatasEscolhidasHoje from "./buttons_alterar_datas.js";

export default function addOuvinteNosButtonsAlterarData(vetBtnsData, divTempoDatas, htmlCheckboxTipoTempo) {
    vetBtnsData.forEach(button => {
        button.addEventListener('click', async function () {
            if (this.value == 'semanal' || this.value == 'quinzenal') {
                divTempoDatas.style.display = 'flex';
                let tipoTempo = 'posterior';

                htmlCheckboxTipoTempo.addEventListener('click', async function () {
                    htmlCheckboxTipoTempo.checked ? tipoTempo = "posterior" : tipoTempo = "anterior";
                    return receberDadosSelecionadosPorData(await getDadosPelasDatasEscolhidasHoje(button.value, tipoTempo))
                });

                return receberDadosSelecionadosPorData(await getDadosPelasDatasEscolhidasHoje(this.value, tipoTempo))
            }
            if (this.value == 'hoje' || this.value == 'ontem') {
                divTempoDatas.style.display = 'none';
                htmlCheckboxTipoTempo.checked = false;
                return receberDadosSelecionadosPorData(await getDadosPelasDatasEscolhidasHoje(this.value));
            }
            if (this.value == 'mensal') {
                divTempoDatas.style.display = 'none';
                htmlCheckboxTipoTempo.checked = false;
                return receberDadosSelecionadosPorData(await getDadosPelasDatasEscolhidasHoje(this.value));
            }
        })
    });
}
