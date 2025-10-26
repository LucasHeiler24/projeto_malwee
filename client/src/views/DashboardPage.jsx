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

const DashboardPage = () => {
    const navegate = useNavigate();
    const [dadosGraficos, setDadosGraficos] = useState();

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
                <dadosGraficosDashboardContext.Provider value={{setDadosGraficos}}>
                    <section className="section-selecionar-datas">
                        <HeaderButtonsData />
                    </section>
                    <section className="section-cards-dashboard">
                        {dadosGraficos && <CardsDashboard 
                            dadosSobraDeRolo={dadosGraficos.dadosSobraDeRolo}
                            dadosTotais={dadosGraficos.dadosTotais}
                            dadosVMP={dadosGraficos.vetTotalMVPNoPeriodoEscolhido}
                        />}
                    </section>
                    <section className="section-graficos-pizza">
                        {dadosGraficos && <GraficoMediaPizza dados={dadosGraficos.dadosTotais}/>}
                        {dadosGraficos && <GraficoSobraDeRolo dados={dadosGraficos.dadosSobraDeRolo}/>}
                        {dadosGraficos && <GraficoTotalPizza dados={dadosGraficos.dadosTotais}/>}
                    </section>
                    <section className="section-graficos-mvp">
                        {dadosGraficos && <GraficoLinhaTendenciaMvp dados={dadosGraficos.vetTotalMVPPorDia}/>}
                        {dadosGraficos && <GraficoPorTecidoMvp dados={dadosGraficos.vetorSepararPorDatasMVP}/>}
                    </section>
                    <section className="section-graficos-media-setup-metros-vs-setup">
                        {dadosGraficos && <GraficoBarraMediaSetup dados={dadosGraficos.dadosMediaTempoSetup} />}
                        {dadosGraficos && <GraficoBarraMetrosVsSetup dados={dadosGraficos.dadosMetrosVsSetup} />}
                    </section>
                    <section className="section-graficos-produtividade-variantes">
                        {dadosGraficos && <GraficoBarraProdutividade dados={dadosGraficos.dadosProdutividade}/>}
                        {dadosGraficos && <GraficoBarraVariantesPorTecido dados={dadosGraficos.variantesPorTipoTecido}/>}
                    </section>
                    <section className="section-graficos-tipo-saida-mtt-tarefas-completas">
                        <div className="div-grafico-tipo-saida-mtt">
                            {dadosGraficos && <GraficoAreaTiposSaida dados={dadosGraficos.dadosTotaisTipoSaida} />}
                        </div>
                            {dadosGraficos && <GraficoBarraTarefasCompletas dados={dadosGraficos.dadosTotaisTarefasCompletasOuNao} />}
                    </section>
                </dadosGraficosDashboardContext.Provider>
            }
        />
    )
}

export default DashboardPage;