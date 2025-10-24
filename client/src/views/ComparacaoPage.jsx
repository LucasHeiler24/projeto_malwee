import HeaderInfoPage from "../components/components_templates/HeaderInfoPage";
import SideBar from "../components/components_templates/SideBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TemplateMaster from "../templates/TemplateMaster";
import validToken from "../requests/usuario/validToken";
import { useEffect } from "react";

const ComparacaoPage = () => {
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
            headerInfoPage={<HeaderInfoPage nomePage={"Comparação"} nomeUser={Cookies.get('nome')} />}
            pageChildren={"Content Comparação"}
        />
    )

}

export default ComparacaoPage;