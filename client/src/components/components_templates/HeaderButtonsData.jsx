import Button from "../components_gerais/Button";
import "../../css/headerbuttonsdata.css"
import dadosOntem from "../../requests/graficos/dashboard/dados_ontem";
import { useContext } from "react";
import dadosGraficosDashboardContext from "../../context/dadosGraficosDashboard";
import dadosHoje from "../../requests/graficos/dashboard/dados_hoje";
import dadosSemanais from "../../requests/graficos/dashboard/dados_semanais";
import dadosQuinzenais from "../../requests/graficos/dashboard/dados_quinzenais";
import dadosMensais from "../../requests/graficos/dashboard/dados_mensais";

const HeaderButtonsData = () => {
    const {setDadosGraficos} = useContext(dadosGraficosDashboardContext);

    const onClickButtonOntem = async () => {
        const {
            dadosTotais,
            dadosSobraDeRolo,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
        } = await dadosOntem();

        setDadosGraficos({
            dadosTotais,
            dadosSobraDeRolo,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
        });
    }

    const onClickButtonHoje = async () => {
        const {
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
            } = await dadosHoje();
        setDadosGraficos({
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
        });
    }

    const onClickButtonSemanal = async () => {
        const {
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
            } = await dadosSemanais('anterior');
        setDadosGraficos({
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
        });
    }

    const onClickButtonQuinzenal = async () => {
        const {
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
        } = await dadosQuinzenais('anterior');
        setDadosGraficos({
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
            });
    }

    const onClickButtonMensal = async () => {
        const {
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
            } = await dadosMensais();
        setDadosGraficos({
            dadosTotais,
            dadosSobraDeRolo,
            dadosVMPPorTecido,
            vetorSepararPorDatasMVP,
            vetTotalMVPNoPeriodoEscolhido,
            vetTotalMVPPorDia,
            dadosMediaTempoSetup,
            dadosMetrosVsSetup,
            dadosProdutividade,
            variantesPorTipoTecido,
            dadosTotaisTarefasCompletasOuNao,
            dadosTotaisTipoSaida
            });
    }

    return (
        <section className="section-header-alterar-datas-buttons">

            <div className="datas-pre-definidas">
                <Button
                    onClick={onClickButtonOntem}
                    text="Ontem"
                />
                <Button
                    onClick={onClickButtonHoje}
                    text="Hoje"
                />
                <Button
                    onClick={onClickButtonSemanal}
                    text="Semanal"
                />
                <Button
                    onClick={onClickButtonQuinzenal}
                    text="Quinzenal"
                />
                <Button
                    onClick={onClickButtonMensal}
                    text="Mensal"
                />
            </div>

            <div className="data-personalizar">
                <Button
                    onClick={() => onClickButtonOntem}
                    text="Personalizar"
                />
            </div>

        </section>
    )   
}

export default HeaderButtonsData;