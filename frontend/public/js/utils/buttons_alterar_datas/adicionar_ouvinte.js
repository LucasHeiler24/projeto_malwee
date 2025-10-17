import getDadosPelasDatasEscolhidasHoje from "./buttons_alterar_datas.js";

export default function addOuvinteNosButtonsAlterarData(vetBtnsData, htmlCheckboxTipoTempo) {
    let vetDados;
    vetBtnsData.forEach(button => {
        button.addEventListener('click', async function () {
            let tipoTempo;
            htmlCheckboxTipoTempo.checked ? tipoTempo = "posterior" : tipoTempo = "anterior"
            vetDados = await getDadosPelasDatasEscolhidasHoje(this.value, tipoTempo);
            console.log(vetDados);
        })
    });

}
