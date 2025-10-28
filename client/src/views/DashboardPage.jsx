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
                        
                        {dadosGraficos && <article className="primeira-aba-graficos-dashboard">
                            <section className="section-cards-com-grafico-pizza-dashboard">
                                <div className="div-cards-dashboard">
                                    {dadosGraficos && <CardsDashboard 
                                        dadosSobraDeRolo={dadosGraficos.dadosSobraDeRolo}
                                        dadosTotais={dadosGraficos.dadosTotais}
                                        dadosVMP={dadosGraficos.vetTotalMVPNoPeriodoEscolhido}
                                    />}
                                </div>
                                <div className="div-grafico-pizza">
                                    {dadosGraficos && <GraficoMediaPizza dados={dadosGraficos.dadosTotais}/>}
                                    {dadosGraficos && <GraficoTotalPizza dados={dadosGraficos.dadosTotais}/>}
                                </div>
                            </section>

                            <section className="section-graficos-mvp-dashboard">
                                <div className="div-grafico-mvp">
                                    {dadosGraficos && <GraficoLinhaTendenciaMvp dados={dadosGraficos.vetTotalMVPPorDia}/>}
                                </div>
                                <div className="div-grafico-mvp">
                                    {dadosGraficos && <GraficoPorTecidoMvp dados={dadosGraficos.vetorSepararPorDatasMVP}/>}
                                </div>
                            </section>
                        </article>}
                        
                        <article className="segunda-aba-graficos-dashboard">
                            <section className="section-grafico-media-setup-sobra-de-rolo">
                                <div className="div-grafico-media-setup">
                                    {dadosGraficos && <GraficoBarraMediaSetup dados={dadosGraficos.dadosMediaTempoSetup} />}
                                </div>
                                <div className="div-grafico-menor-barra">
                                    {dadosGraficos && <GraficoSobraDeRolo dados={dadosGraficos.dadosSobraDeRolo}/>}
                                </div>
                            </section>
                            <section className="section-grafico-produtividade-tipo-saida">
                                <div className="div-grafico-tipo-saida">
                                    {dadosGraficos && <GraficoAreaTiposSaida dados={dadosGraficos.dadosTotaisTipoSaida} />}
                                </div>
                                <div className="div-grafico-produtividade">
                                    {dadosGraficos && <GraficoBarraProdutividade dados={dadosGraficos.dadosProdutividade}/>}
                                </div>
                            </section>
                        </article>

                        <article className="terceita-aba-graficos-dashboard">
                            <section className="section-grafico-variantes-metros-vs-setup">
                                <div className="div-grafico-variantes">
                                    {dadosGraficos && <GraficoBarraVariantesPorTecido dados={dadosGraficos.variantesPorTipoTecido}/>}
                                </div>
                                <div className="div-grafico-metros-vs-setup">
                                    {dadosGraficos && <GraficoBarraMetrosVsSetup dados={dadosGraficos.dadosMetrosVsSetup} />}
                                </div>
                            </section>
                            <section className="section-grafico-tarefas-barra-mmt">
                                <div className="div-grafico-menor-barra">
                                    {dadosGraficos && <GraficoBarraTarefasCompletas dados={dadosGraficos.dadosTotaisTarefasCompletasOuNao} />}
                                </div>
                                <div className="div-grafico-mmt">
                                    {dadosGraficos && <GraficoBarraMMT dados={dadosGraficos.dadosMetrosMediosPorTira} />}
                                </div>
                            </section>
                        </article>
                    
                    </dadosGraficosDashboardContext.Provider>
                </div>
            }
        />
    )
}

export default DashboardPage;