import HeaderInfoPage from "../components/components_templates/HeaderInfoPage";
import SideBar from "../components/components_templates/SideBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TemplateMaster from "../templates/TemplateMaster";
import validToken from "../requests/usuario/validToken";
import { useEffect, useState } from "react";
import HeaderSelecionarDatas from "../components/components_comparacao/HeaderSelecionarDatas";
import "../css/comparacao.css"
import contextGraficosComparacao from "../context/dadosGraficoComparacao";

const ComparacaoPage = () => {
    const navegate = useNavigate();
    const [dadosGraficosComparacao, setDadosGraficosComparacao] = useState();

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    console.log(dadosGraficosComparacao);
    return (
        <TemplateMaster 
            header={<SideBar />}
            headerInfoPage={<HeaderInfoPage nomePage={"Comparação"} nomeUser={Cookies.get('nome')} />}
            pageChildren=
            {
                <div className="div-content-comparacao">
                    <contextGraficosComparacao.Provider value={{setDadosGraficosComparacao}}>
                        <HeaderSelecionarDatas />
                    </contextGraficosComparacao.Provider>
                </div>
            }
        />
    )

}

export default ComparacaoPage;