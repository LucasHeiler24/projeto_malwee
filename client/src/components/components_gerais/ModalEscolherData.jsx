import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import dadosGraficosDashboardContext from "../../context/dadosGraficosDashboard";
import dadosHoje from "../../requests/graficos/dashboard/dados_hoje";
import dadosSemanais from "../../requests/graficos/dashboard/dados_semanais";
import dadosQuinzenais from "../../requests/graficos/dashboard/dados_quinzenais";
import dadosMensais from "../../requests/graficos/dashboard/dados_mensais";
import "../../css/modalpersonalizardata.css";
import contextHistoricoRegistros from "../../context/dadosRegistrosHistorico";
import dadosHojeHistorico from "../../requests/graficos/historico/dados_hoje";
import dadosSemanaisHistorico from "../../requests/graficos/historico/dados_semanais";
import dadosQuinzenaisHistorico from "../../requests/graficos/historico/dados_quinzenais";
import dadosMensaisHistorico from "../../requests/graficos/historico/dados_mensais";

const ModalEscolherData = ({setLoading, setVisibleModal}) => {
    const [periodoPersonalizar, setPeriodoPersonalizar] = useState('0');
    const [dataPersonalizar, setDataPeriodoPersonalizar] = useState();
    const [valueCheckBox, setValueCheckBox] = useState(false);

    const {setDadosGraficos} = useContext(dadosGraficosDashboardContext);
    const {setDadosHistorico} = useContext(contextHistoricoRegistros);

    const dataPersonalizarDiario = async (data) => {
        setLoading(true);

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
            } = await dadosHoje(data);
        setLoading(false);

        if(setDadosGraficos){
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
            const dadosHistorico = await dadosHojeHistorico(data);
            setLoading(false);

            setDadosHistorico({
                dadosHistorico
            });
        }
    }

    const dataPersonalizarSemanal = async (periodo, data) => {
        setLoading(true);

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
            } = await dadosSemanais(periodo, data);
        setLoading(false);

        if(setDadosGraficos){
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
            const dadosHistorico = await dadosSemanaisHistorico(periodo, data);
            setLoading(false);
            setDadosHistorico({
                dadosHistorico
            })
        }
    }

    const dataPersonalizarQuinzenal = async (periodo, data) => {
        setLoading(true);

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
        } = await dadosQuinzenais(periodo, data);
        setLoading(false);

        if(setDadosGraficos){

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
            const dadosHistorico = await dadosQuinzenaisHistorico(periodo, data);
            setLoading(false);

            setDadosHistorico({
                dadosHistorico
            });
        }
    }

    const dataPersonalizarMensal = async (data) => {
        setLoading(true);

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
            } = await dadosMensais(data);
        setLoading(false);

        if(setDadosGraficos){
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
            const dadosHistorico = await dadosMensaisHistorico(data);
            setLoading(false);

            setDadosHistorico({
                dadosHistorico
            });
        }
        
    }

    const onFunctionGetDataPersonalizar = async (data, periodo, valueAnteriorOuPosterior) => {
        setVisibleModal(false);
        let periodoAnteriorOuPosterior;
        switch(periodo){
            case '0':
                dataPersonalizarDiario(data);
                break;
            case '1':
                periodoAnteriorOuPosterior = (valueAnteriorOuPosterior) ? 'posterior' : 'anterior'
                dataPersonalizarSemanal(periodoAnteriorOuPosterior, data)
                break;
            case '2':
                periodoAnteriorOuPosterior = (valueAnteriorOuPosterior) ? 'posterior' : 'anterior'
                dataPersonalizarQuinzenal(periodoAnteriorOuPosterior, data)
                break;
            case '3':
                dataPersonalizarMensal(data)
                break;
        }
    }

    const [mostrarCheckBoxAnteriorOuPosterior, setMostrarCheckBoxAnteriorOuPosterior] = useState(false);
    useEffect(() => {
        (periodoPersonalizar == '1' || periodoPersonalizar == '2') ?
        setMostrarCheckBoxAnteriorOuPosterior(true) : setMostrarCheckBoxAnteriorOuPosterior(false);
    }, [periodoPersonalizar])

    return (
        <div className="content-modal-escolher-data">
            <div className="modal-data">
                <div className="modal-header-data">
                    <h1>Personalizar seu período</h1>
                    <Button text={'X'} onClick={() => setVisibleModal(false)} />
                </div>
                <div className="content-modal-data">
                    <label>Informe sua data</label>
                    <Input
                        onChange={(e) => {setDataPeriodoPersonalizar(e.target.value)}}
                        placheolder={"Informe sua data"}
                        type={"date"}
                    />
                    <label>Como podemos analisar?</label>
                    <Select
                        onChange={setPeriodoPersonalizar} 
                        opcoes={
                            [
                                {value: '0', text:"Diário"},
                                {value: '1', text:"Semanal"},
                                {value: '2', text:"Quinzenal"},
                                {value: '3', text:"Mensal"},
                            ]
                        }
                    />
                    {mostrarCheckBoxAnteriorOuPosterior && <div className="div-checkbox">
                        <p>Deseja o período posterior ou anterior a essa data?</p>
                        <Input type={'checkbox'} checked={valueCheckBox} onChange={() => setValueCheckBox(!valueCheckBox)} />
                    </div>}
                    <Button
                        text={"Personalizar"}
                        onClick={() => onFunctionGetDataPersonalizar(dataPersonalizar, periodoPersonalizar, valueCheckBox)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalEscolherData;