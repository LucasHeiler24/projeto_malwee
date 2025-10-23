import Button from "./Button";
import "../css/headerbuttonsdata.css"
import dadosOntem from "../requests/graficos/dashboard/dados_ontem";
import { useContext } from "react";
import dadosGraficosDashboardContext from "../context/dadosGraficosDashboard";
import dadosHoje from "../requests/graficos/dashboard/dados_hoje";
import dadosSemanais from "../requests/graficos/dashboard/dados_semanais";
import dadosQuinzenais from "../requests/graficos/dashboard/dados_quinzenais";
import dadosMensais from "../requests/graficos/dashboard/dados_mensais";

const HeaderButtonsData = () => {
    const {setDadosGraficos} = useContext(dadosGraficosDashboardContext);

    const onClickButtonOntem = async () => {
        const {dadosTotais} = await dadosOntem();
        setDadosGraficos(dadosTotais);
    }

    const onClickButtonHoje = async () => {
        const {dadosTotais} = await dadosHoje();
        setDadosGraficos(dadosTotais);
    }

    const onClickButtonSemanal = async () => {
        const {dadosTotais} = await dadosSemanais('anterior');
        setDadosGraficos(dadosTotais);
    }

    const onClickButtonQuinzenal = async () => {
        const {dadosTotais} = await dadosQuinzenais('anterior');
        setDadosGraficos(dadosTotais);
    }

    const onClickButtonMensal = async () => {
        const {dadosTotais} = await dadosMensais();
        setDadosGraficos(dadosTotais);
    }

    return (
        <section className="section-header-alterar-datas-buttons">

            <div className="datas-pre-definidas">
                <Button
                    onClick={onClickButtonOntem}
                    text="Ontem"
                />
                <Button
                    onClick={onClickButtonHoje}
                    text="Hoje"
                />
                <Button
                    onClick={onClickButtonSemanal}
                    text="Semanal"
                />
                <Button
                    onClick={onClickButtonQuinzenal}
                    text="Quinzenal"
                />
                <Button
                    onClick={onClickButtonMensal}
                    text="Mensal"
                />
            </div>

            <div className="data-personalizar">
                <Button
                    onClick={() => onClickButtonOntem}
                    text="Personalizar"
                />
            </div>

        </section>
    )   
}

export default HeaderButtonsData;