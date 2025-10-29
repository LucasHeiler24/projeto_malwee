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

const HeaderButtonsData = ({setLoading, setVisibleModal}) => {
    const {setDadosGraficos} = useContext(dadosGraficosDashboardContext);
    const {setDadosHistorico} = useContext(contextHistoricoRegistros)

    const onClickButtonOntem = async () => {
        setLoading(true);
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
            } = await dadosOntem();
            setLoading(false);

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
            setLoading(true);
            const dadosHistorico = await dadosOntemHistorico();
            setLoading(false);

            setDadosHistorico({
                dadosHistorico
            })
        }
    }

    const onClickButtonHoje = async () => {
        setLoading(true);
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
            setLoading(false);

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
            setLoading(true);
            const dadosHistorico = await dadosHojeHistorico();
            setLoading(false);

            setDadosHistorico({
                dadosHistorico
            });
        }
    }

    const onClickButtonSemanal = async () => {
        setLoading(true);

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
            setLoading(false);

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
            setLoading(true);
            const dadosHistorico = await dadosSemanaisHistorico('anterior');
            setLoading(false);
            setDadosHistorico({
                dadosHistorico
            })
        }
    }
    

    const onClickButtonQuinzenal = async () => {
        setLoading(true);
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
            setLoading(false);

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
            setLoading(true);
            const dadosHistorico = await dadosQuinzenaisHistorico('anterior');
            setLoading(false);

            setDadosHistorico({
                dadosHistorico
            });
        }
    }

    const onClickButtonMensal = async () => {
        setLoading(true);
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
            setLoading(false);

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
            setLoading(true);
            const dadosHistorico = await dadosMensaisHistorico();
            setLoading(false);

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