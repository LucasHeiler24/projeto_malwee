import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import validToken from "../requests/usuario/validToken";
import { useNavigate } from "react-router-dom";
import TemplateMaster from "../templates/TemplateMaster";
import SideBar from "../components/components_templates/SideBar";
import HeaderInfoPage from "../components/components_templates/HeaderInfoPage";
import HeaderButtonsData from "../components/components_templates/HeaderButtonsData";
import dadosGraficosDashboardContext from "../context/dadosGraficosDashboard";
import "../css/dashboard.css"
import GraficoMediaPizza from "../graficos/dashboard/GraficoMediaPizza";
import GraficoTotalPizza from "../graficos/dashboard/GraficoTotalPizza";
import GraficoSobraDeRolo from "../graficos/dashboard/GraficoSobraRoloPizza";
import CardsDashboard from "../components/components_dashboard/cards_dashboard";
import GraficoLinhaTendenciaMvp from "../graficos/dashboard/GraficoLinhaTendenciaMvp";
import GraficoPorTecidoMvp from "../graficos/dashboard/GraficoPorTecidoMvp";
import GraficoBarraMediaSetup from "../graficos/dashboard/GraficoBarraMedioSetup";
import GraficoBarraMetrosVsSetup from "../graficos/dashboard/GraficoBarraMetrosVsSetup";
import GraficoBarraProdutividade from "../graficos/dashboard/GraficoBarraProdutividade";
import GraficoBarraVariantesPorTecido from "../graficos/dashboard/GraficoBarraVariantesPorTecido";
import GraficoBarraTarefasCompletas from "../graficos/dashboard/GraficoBarraTarefasCompletas";
import GraficoAreaTiposSaida from "../graficos/dashboard/GraficoAreaTiposSaida";
import GraficoBarraMMT from "../graficos/dashboard/GraficoBarraMMT";
import ModalEscolherData from "../components/components_gerais/ModalEscolherData";
import Loading from "../components/components_gerais/Loading";

const DashboardPage = () => {
    const navegate = useNavigate();
    const [dadosGraficos, setDadosGraficos] = useState();
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    return (
        <TemplateMaster 
            header={
                <SideBar />
            }
            headerInfoPage={
                <HeaderInfoPage nomePage={"Dashboard"} nomeUser={Cookies.get('nome')} />
            }
            pageChildren=
            {
                <div className="content-page-dashboard">
                    {loading && <Loading />}
                    <dadosGraficosDashboardContext.Provider value={{setDadosGraficos, setVisibleModal, visibleModal}}>
                    {visibleModal && <ModalEscolherData setLoading={setLoading}/>}
                        <HeaderButtonsData setLoading={setLoading} />
                        <section className="section-cards-dashboard">
                            {dadosGraficos && <CardsDashboard 
                                dadosSobraDeRolo={dadosGraficos.dadosSobraDeRolo}
                                dadosTotais={dadosGraficos.dadosTotais}
                                dadosVMP={dadosGraficos.vetTotalMVPNoPeriodoEscolhido}
                            />}
                        </section>
                        
                        <section className="layout-graficos">
                            <div className="layout-graficos-pizza">
                                {dadosGraficos && <GraficoMediaPizza dados={dadosGraficos.dadosTotais}/>}
                                {dadosGraficos && <GraficoTotalPizza dados={dadosGraficos.dadosTotais}/>}
                            </div>
                            <div className="layout-graficos-barras-com-pizza">
                                {dadosGraficos && <GraficoSobraDeRolo dados={dadosGraficos.dadosSobraDeRolo}/>}
                                {dadosGraficos && <GraficoBarraTarefasCompletas dados={dadosGraficos.dadosTotaisTarefasCompletasOuNao} />}
                            </div>
                        </section>
                        <section className="layout-graficos">
                            {dadosGraficos && <GraficoLinhaTendenciaMvp dados={dadosGraficos.vetTotalMVPPorDia}/>}
                            {dadosGraficos && <GraficoPorTecidoMvp dados={dadosGraficos.vetorSepararPorDatasMVP}/>}
                        </section>
                        <section className="layout-graficos">    
                            {dadosGraficos && <GraficoBarraVariantesPorTecido dados={dadosGraficos.variantesPorTipoTecido}/>}
                            {dadosGraficos && <GraficoAreaTiposSaida dados={dadosGraficos.dadosTotaisTipoSaida} />}
                        </section>
                        <section className="layout-graficos">
                            {dadosGraficos && <GraficoBarraMediaSetup dados={dadosGraficos.dadosMediaTempoSetup} />}
                            {dadosGraficos && <GraficoBarraMetrosVsSetup dados={dadosGraficos.dadosMetrosVsSetup} />}
                        </section>
                        <section className="layout-graficos">
                            {dadosGraficos && <GraficoBarraProdutividade dados={dadosGraficos.dadosProdutividade}/>}
                            {dadosGraficos && <GraficoBarraMMT dados={dadosGraficos.dadosMetrosMediosPorTira} />}
                        </section>
                    </dadosGraficosDashboardContext.Provider>
                </div>
            }
        />
    )
}

export default DashboardPage;