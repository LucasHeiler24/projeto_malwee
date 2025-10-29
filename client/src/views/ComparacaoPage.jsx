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
import CardsDadosPeriodo from "../components/components_comparacao/CardsDadosPeriodo";
import GraficoPizzaPrimeiroPeriodo from "../graficos/comparacao/GraficoPizzaPrimeiroPeriodo";
import GraficoPizzaSegundoPeriodo from "../graficos/comparacao/GraficoPizzaSegundoPeriodo";
import GraficoDisponibilidade from "../graficos/comparacao/GraficoDisponibilidade";

const ComparacaoPage = () => {
    const navegate = useNavigate();
    const [dadosGraficosComparacao, setDadosGraficosComparacao] = useState();

    useEffect(() => {
        (async () =>{
            const cookieToken = Cookies.get('token');
            if(!await validToken({token: cookieToken})) return navegate('/login');
        })()
    }, []);

    console.log(dadosGraficosComparacao)
    return (
        <TemplateMaster 
            header={<SideBar />}
            headerInfoPage={<HeaderInfoPage nomePage={"Comparação"} nomeUser={Cookies.get('nome')} />}
            pageChildren=
            {
                <contextGraficosComparacao.Provider value={{setDadosGraficosComparacao}}>
                    <div className="div-content-comparacao">
                        <HeaderSelecionarDatas />
                        <article className="article-graficos-pizza-com-cards">
                            <section className="section-graficos-pizza-com-cards">
                                {dadosGraficosComparacao && <CardsDadosPeriodo dados={dadosGraficosComparacao.dadosVariacaoEntreOPeriodo}/>}

                                {dadosGraficosComparacao && <GraficoPizzaPrimeiroPeriodo dados={dadosGraficosComparacao.dadosSetupProducao1} />}
                                {dadosGraficosComparacao && <GraficoPizzaSegundoPeriodo dados={dadosGraficosComparacao.dadosSetupProducao2} />}
                            </section>
                        </article>

                        <article className="article-graficos-produtividade-disponibilidade">

                            <section className="section-graficos-produtividade-disponibilidade">
                                {dadosGraficosComparacao && <GraficoDisponibilidade
                                    dadosPeriodo1={dadosGraficosComparacao.dadosDisponibilidade1}
                                    dadosPeriodo2={dadosGraficosComparacao.dadosDisponibilidade2}
                                />}
                            </section>

                        </article>
                    </div>
                </contextGraficosComparacao.Provider>
            }
        />
    )

}

export default ComparacaoPage;