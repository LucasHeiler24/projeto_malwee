import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import validToken from "../requests/usuario/validToken";
import { useNavigate } from "react-router-dom";
import TemplateMaster from "../templates/TemplateMaster";
import SideBar from "../components/SideBar";
import HeaderInfoPage from "../components/HeaderInfoPage";
import HeaderButtonsData from "../components/HeaderButtonsData";
import dadosGraficosDashboardContext from "../context/dadosGraficosDashboard";
import GraficoMediaPizza from "../graficos/dashboard/GraficoMediaPizza";
import "../css/dashboard.css"
import GraficoTotalPizza from "../graficos/dashboard/GraficoTotalPizza";
import GraficoSobraDeRolo from "../graficos/dashboard/GraficoSobraRoloPizza";

const DashboardPage = () => {
    const navegate = useNavigate();
    const [dadosGraficos, setDadosGraficos] = useState();

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    console.log(dadosGraficos);
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

                    <section className="section-graficos-pizza">
                        {dadosGraficos && <GraficoMediaPizza dados={dadosGraficos.dadosTotais}/>}
                        {dadosGraficos && <GraficoTotalPizza dados={dadosGraficos.dadosTotais}/>}
                        {dadosGraficos && <GraficoSobraDeRolo dados={dadosGraficos.dadosSobraDeRolo}/>}
                    </section>
                </dadosGraficosDashboardContext.Provider>
            }
        />
    )
}

export default DashboardPage;