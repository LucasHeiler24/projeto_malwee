import { useContext, useEffect, useState } from "react"
import Input from "../components_gerais/Input";
import Select from "../components_gerais/Select";
import contextGraficosComparacao from "../../context/dadosGraficoComparacao";
import dadosDiarios from "../../requests/graficos/comparacao/dadosDiarios";

const HeaderSelecionarDatas = () => {
    const {setDadosGraficosComparacao} = useContext(contextGraficosComparacao);

    const [onChangeFirstDate, setOnChangeFirstDate] = useState();
    const [onChangeSecoundDate, setOnChangeSecoundDate] = useState();
    const [onChangePeriodoDate, setOnChangePeriodoDate] = useState('0');

    useEffect(() => {
        if(!onChangeFirstDate || !onChangeSecoundDate) return;
        if(onChangeFirstDate == onChangeSecoundDate) return;

        (async () => {
            switch(onChangePeriodoDate){
                case '0':
                    return setDadosGraficosComparacao(await dadosDiarios(onChangeFirstDate, onChangeSecoundDate)) 
            }
        })()

    }, [onChangeFirstDate, onChangeSecoundDate, onChangePeriodoDate])

    return (
        <section className="section-header-selecionar-datas">
            <div className="content-header-date">
                <label>Selecionar a primeira data</label>
                <Input type={'date'} onChange={(e) => setOnChangeFirstDate(e.target.value)} />
            </div>

            <div className="content-header-date">
                <label>Selecionar a segunda data</label>
                <Input type={'date'} onChange={(e) => setOnChangeSecoundDate(e.target.value)} />
            </div>

            <div className="content-header-date">
                <label>Selecionar o período de análise</label>
                <Select onChange={setOnChangePeriodoDate} opcoes={[
                    {value: '0', text: 'Diário'},
                    {value: '1', text: 'Semanal'},
                    {value: '2', text: 'Quinzenal'},
                    {value: '3', text: 'Mensal'},
                ]} />
            </div>
        </section>
    )

}

export default HeaderSelecionarDatas;