import { useEffect, useState } from "react";
import HeaderInfoPage from "../components/components_templates/HeaderInfoPage";
import SideBar from "../components/components_templates/SideBar";
import validToken from "../requests/usuario/validToken";
import TemplateMaster from "../templates/TemplateMaster";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import contextHistoricoRegistros from "../context/dadosRegistrosHistorico";
import HeaderButtonsData from "../components/components_templates/HeaderButtonsData";
import CardsRegistroHistorico from "../components/components_historico/CardsRegistroHistorico";
import FiltersHistorico from "../components/components_historico/FiltersHistorico";
import "../css/historico.css"
import Button from "../components/components_gerais/Button";
import ModalRegistroHistorico from "../components/components_historico/ModalRegistroHistorico";

const HistoricoPage = () => {
    const navegate = useNavigate();
    const [dadosHistorico, setDadosHistorico] = useState();
    const [dadosFiltrados, setDadosFiltrados] = useState();
    const [openRegistroModal, setOpenRegistroModal] = useState(false);
    const [registroVerMais, setRegistroVerMais] = useState(null);

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    useEffect(() => {
        setDadosFiltrados(dadosHistorico);
    }, [dadosHistorico]);

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
                    {openRegistroModal && <ModalRegistroHistorico dados={registroVerMais} setOpenModalHistorico={setOpenRegistroModal}/>}
                    <HeaderButtonsData />
                    <section className="section-historico-filters">
                        {dadosFiltrados && <FiltersHistorico dados={dadosHistorico.dadosHistorico} setDadosFiltrados={setDadosFiltrados}/>}
                    </section>
                    <section className="section-registros">
                        <div className="title-registros">
                            <div className="legend-historico">
                                <div style={{borderRadius: '50%', background: 'blue', width: '50px', height: '50px'}}></div>
                                <p>1° Turno</p>
                            </div>
                            <div className="legend-historico">
                                <div style={{borderRadius: '50%', background: 'yellow', width: '50px', height: '50px'}}></div>
                                <p>2° Turno</p>
                            </div>
                        </div>
                        {dadosFiltrados && <CardsRegistroHistorico setOpenRegistroModal={setOpenRegistroModal} setRegistroVerMais={setRegistroVerMais} dados={dadosFiltrados.dadosHistorico}/>}
                    </section>
                </contextHistoricoRegistros.Provider>
            }
        />
    )
}

export default HistoricoPage;