import { useEffect } from "react";
import HeaderInfoPage from "../components/components_templates/HeaderInfoPage";
import SideBar from "../components/components_templates/SideBar";
import validToken from "../requests/usuario/validToken";
import TemplateMaster from "../templates/TemplateMaster";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HistoricoPage = () => {
     const navegate = useNavigate();

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    return (
        <TemplateMaster 
            header={<SideBar />}
            headerInfoPage={<HeaderInfoPage nomePage={"Histórico"} nomeUser={Cookies.get('nome')} />}
            pageChildren={"Content Histórico"}
        />
    )
}

export default HistoricoPage;