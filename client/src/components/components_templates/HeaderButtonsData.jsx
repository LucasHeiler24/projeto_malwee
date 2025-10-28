import Button from "../components_gerais/Button";
import "../../css/headerbuttonsdata.css"
import dadosOntem from "../../requests/graficos/dashboard/dados_ontem";
import { useContext, useState } from "react";
import dadosGraficosDashboardContext from "../../context/dadosGraficosDashboard";
import dadosHoje from "../../requests/graficos/dashboard/dados_hoje";
import dadosSemanais from "../../requests/graficos/dashboard/dados_semanais";
import dadosQuinzenais from "../../requests/graficos/dashboard/dados_quinzenais";
import dadosMensais from "../../requests/graficos/dashboard/dados_mensais";
import contextHistoricoRegistros from "../../context/dadosRegistrosHistorico";
import dadosHojeHistorico from "../../requests/graficos/historico/dados_hoje";
import dadosOntemHistorico from "../../requests/graficos/historico/dados_ontem";
import dadosSemanaisHistorico from "../../requests/graficos/historico/dados_semanais";
import dadosQuinzenaisHistorico from "../../requests/graficos/historico/dados_quinzenais";
import dadosMensaisHistorico from "../../requests/graficos/historico/dados_mensais";

const HeaderButtonsData = () => {
    const {setDadosGraficos, setVisibleModal} = useContext(dadosGraficosDashboardContext);
    const {setDadosHistorico} = useContext(contextHistoricoRegistros)

    const onClickButtonOntem = async () => {
        if(setDadosGraficos){
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
            } = await dadosOntem();

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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
            })
        }

        if(setDadosHistorico){
            const dadosHistorico = await dadosOntemHistorico();

            setDadosHistorico({
                dadosHistorico
            })
        }
    }

    const onClickButtonHoje = async () => {
        if(setDadosGraficos){
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
            });
        }

        if(setDadosHistorico){
            const dadosHistorico = await dadosHojeHistorico();

            setDadosHistorico({
                dadosHistorico
            });
        }
    }

    const onClickButtonSemanal = async () => {
        if(setDadosGraficos){
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
            });
        }

        if(setDadosHistorico){
            const dadosHistorico = await dadosSemanaisHistorico('anterior');

            setDadosHistorico({
                dadosHistorico
            })
        }
    }
    

    const onClickButtonQuinzenal = async () => {
        if(setDadosGraficos){
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
            });
        }

        if(setDadosHistorico){
            const dadosHistorico = await dadosQuinzenaisHistorico('anterior');

            setDadosHistorico({
                dadosHistorico
            });
        }
    }

    const onClickButtonMensal = async () => {
        if(setDadosGraficos){
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
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
                dadosTotaisTipoSaida,
                dadosMetrosMediosPorTira
            });
        }

        if(setDadosHistorico){
            const dadosHistorico = await dadosMensaisHistorico();

            setDadosHistorico({
                dadosHistorico
            });
        }
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
                    onClick={() => setVisibleModal(true)}
                    text="Personalizar"
                />
            </div>

        </section>
    )   
}

export default HeaderButtonsData;