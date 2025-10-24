import { useEffect, useRef, useState } from "react";
import "../../css/sidebar.css";
import logo from "../../images/malwee_logo.png";
import imgDashboard from "../../images/hub-icon.png";
import imgComparacao from "../../images/difference-icon.png";
import imgHistorico from "../../images/history-icon.png";
import imgLogout from "../../images/logout.png";
import {useNavigate} from "react-router-dom";

const SideBar = () => {
    const sideBar = useRef(null);
    const [hoverSideBar, setHoverSideBar] = useState(false);
    const navegate = useNavigate();

    useEffect(() => {
        (hoverSideBar) ? sideBar.current.style.width = '260px' : sideBar.current.style.width = '60px';
    }, [hoverSideBar])

    return (
        <header ref={sideBar} onMouseOver={() => setHoverSideBar(true)} onMouseOut={() => setHoverSideBar(false)}>
            <div className="logo-sidebar">
                <img src={logo} />
            </div>
            <div className="menu-sidebar">
                <div className="link-sidebar" onClick={() => navegate('/dashboard')}>
                    <img src={imgDashboard} />
                    {hoverSideBar && <h1>Dashboard</h1>}
                </div>
                <div className="link-sidebar" onClick={() => navegate('/comparacao')}>
                    <img src={imgComparacao} />
                    {hoverSideBar && <h1>Comparação</h1>}
                </div>
                <div className="link-sidebar" onClick={() => navegate('/historico')}>
                    <img src={imgHistorico} />
                    {hoverSideBar && <h1>Histórico</h1>}
                </div>
                <div className="link-sidebar" onClick={() => navegate('/dashboard')}>
                    <img src={imgLogout} />
                    {hoverSideBar && <h1>Log-out</h1>}
                </div>
            </div>
        </header>
    )

}


export default SideBar;