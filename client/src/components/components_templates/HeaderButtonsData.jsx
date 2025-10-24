import Button from "../components_gerais/Button";
import "../../css/headerbuttonsdata.css"
import dadosOntem from "../../requests/graficos/dashboard/dados_ontem";
import { useContext } from "react";
import dadosGraficosDashboardContext from "../../context/dadosGraficosDashboard";
import dadosHoje from "../../requests/graficos/dashboard/dados_hoje";
import dadosSemanais from "../../requests/graficos/dashboard/dados_semanais";
import dadosQuinzenais from "../../requests/graficos/dashboard/dados_quinzenais";
import dadosMensais from "../../requests/graficos/dashboard/dados_mensais";

const HeaderButtonsData = () => {
    const {setDadosGraficos} = useContext(dadosGraficosDashboardContext);

    const onClickButtonOntem = async () => {
        const {dadosTotais, dadosSobraDeRolo} = await dadosOntem();
        setDadosGraficos({dadosTotais, dadosSobraDeRolo});
    }

    const onClickButtonHoje = async () => {
        const {dadosTotais, dadosSobraDeRolo} = await dadosHoje();
        setDadosGraficos({dadosTotais, dadosSobraDeRolo});
    }

    const onClickButtonSemanal = async () => {
        const {dadosTotais, dadosSobraDeRolo} = await dadosSemanais('anterior');
        setDadosGraficos({dadosTotais, dadosSobraDeRolo});
    }

    const onClickButtonQuinzenal = async () => {
        const {dadosTotais, dadosSobraDeRolo} = await dadosQuinzenais('anterior');
        setDadosGraficos({dadosTotais, dadosSobraDeRolo});
    }

    const onClickButtonMensal = async () => {
        const {dadosTotais, dadosSobraDeRolo} = await dadosMensais();
        setDadosGraficos({dadosTotais, dadosSobraDeRolo});
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