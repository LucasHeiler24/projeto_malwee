import { useEffect } from "react";
import Cookies from "js-cookie";
import validToken from "../requests/usuario/validToken";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navegate = useNavigate();
    
    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    return (
        <h1>Dashboard</h1>
    )
}

export default DashboardPage;