import { useContext, useEffect, useState } from "react"
import Input from "../components_gerais/Input";
import Select from "../components_gerais/Select";
import contextGraficosComparacao from "../../context/dadosGraficoComparacao";
import dadosDiarios from "../../requests/graficos/comparacao/dadosDiarios";
import dadosSemanais from "../../requests/graficos/comparacao/dadosSemanais";
import dadosQuinzenais from "../../requests/graficos/comparacao/dadosQuinzenais";
import dadosMensais from "../../requests/graficos/comparacao/dadosMensais";

const HeaderSelecionarDatas = () => {
    const {setDadosGraficosComparacao} = useContext(contextGraficosComparacao);

    const [onChangeFirstDate, setOnChangeFirstDate] = useState();
    const [onChangeSecoundDate, setOnChangeSecoundDate] = useState();
    const [onChangePeriodoDate, setOnChangePeriodoDate] = useState();

    useEffect(() => {
        if(onChangePeriodoDate == '-1') return;
        if(!onChangeFirstDate || !onChangeSecoundDate) return;
        if(onChangeFirstDate == onChangeSecoundDate) return;

        (async () => {
            switch(onChangePeriodoDate){
                case '0':
                    setDadosGraficosComparacao(await dadosDiarios(onChangeFirstDate, onChangeSecoundDate))
                    break;
                case '1':
                    setDadosGraficosComparacao(await dadosSemanais(onChangeFirstDate, onChangeSecoundDate))
                    break;
                case '2':
                    setDadosGraficosComparacao(await dadosQuinzenais(onChangeFirstDate, onChangeSecoundDate)) 
                    break;
                case '3':
                    setDadosGraficosComparacao(await dadosMensais(onChangeFirstDate, onChangeSecoundDate))
                    break;
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
                    {value: '-1', text: 'Selecionar o período'},
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