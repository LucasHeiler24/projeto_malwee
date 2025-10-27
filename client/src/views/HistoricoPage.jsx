import { useEffect, useState } from "react";
import HeaderInfoPage from "../components/components_templates/HeaderInfoPage";
import SideBar from "../components/components_templates/SideBar";
import validToken from "../requests/usuario/validToken";
import TemplateMaster from "../templates/TemplateMaster";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import contextHistoricoRegistros from "../context/dadosRegistrosHistorico";
import HeaderButtonsData from "../components/components_templates/HeaderButtonsData";

const HistoricoPage = () => {
    const navegate = useNavigate();
    const [dadosHistorico, setDadosHistorico] = useState();

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    console.log(dadosHistorico);
    return (
        <TemplateMaster 
            header={
                <SideBar />
            }
            headerInfoPage={
                <HeaderInfoPage nomePage={"Histórico"} nomeUser={Cookies.get('nome')} />
            }
            pageChildren={
                <contextHistoricoRegistros.Provider value={{setDadosHistorico}}>
                    <HeaderButtonsData />
                    {dadosHistorico && dadosHistorico.dadosHistorico.map((dados) => (
                        <div key={dados.id_dado} className="card-historico">
                            <h1>{dados.data_historico}</h1>
                        </div>
                    ))}
                </contextHistoricoRegistros.Provider>
            }
        />
    )
}

export default HistoricoPage;