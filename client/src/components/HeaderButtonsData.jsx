import Button from "./Button";
import "../css/headerbuttonsdata.css"
import dadosOntem from "../requests/graficos/dashboard/dados_ontem";
import { useContext } from "react";
import dadosGraficosDashboardContext from "../context/dadosGraficosDashboard";

const HeaderButtonsData = () => {
    const {setDadosGraficos} = useContext(dadosGraficosDashboardContext);

    const onClickButtonOntem = async () => {
        const {dadosTotais} = await dadosOntem();
        setDadosGraficos(dadosTotais);
    }

    const onClickButtonHoje = () => {
        console.log("Olá hoje");
    }

    const onClickButtonSemanal = () => {
        console.log("Olá");
    }

    const onClickButtonQuinzenal = () => {
        console.log("Olá");
    }

    const onClickButtonMensal = () => {
        console.log("Olá");
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