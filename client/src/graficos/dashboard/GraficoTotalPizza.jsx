import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Button from '../../components/components_gerais/Button';
import Select from '../../components/components_gerais/Select';
import { coresGraficoPizza, removerDuplicados } from '../../helpers/funcoes';
import imgMenu from "../../images/menu.png"
import extrairDadosGraficoTotalPizza from '../../extrair_dados/dashboard/extrairDadosGraficoTotalPizza';
import LegendGraficoTotalPizza from '../../components/components_graficos/LegendGraficoTotalPizza';

ChartJS.register(ArcElement, Tooltip, Legend);

const functionData = (dados) => {
    return {
        labels: dados.map((dados) => dados.tipo_tecido),
        datasets: [
            {
                label: 'Total: ',
                data: dados.map((dados) => parseFloat(dados.total)),
                backgroundColor: coresGraficoPizza
            }
        ]
    } 
}

const options = {
    plugins: {
        legend: {
            display: false
        }
    }
}

let titleTipoDado = ['Metros Produzidos', 'Tempo Produção', 'Tempo Setup'];
const GraficoTotalPizza = ({dados}) => {

    const datas = removerDuplicados(dados.map((dados) => dados.data_historico));
    const datasSelectMedia = datas.map((dados) => {
        return { value: dados, text: new Date(`${dados} 00:00:00`).toLocaleDateString()}
    });

    const headerGraficoPizzaMedia = useRef();
    const [openHeaderGraficoPizza, setOpenHeaderGraficoPizza] = useState(false);
    const [tipoTotal, setTipoTotal] = useState("0");
    const [tipoDataTotal, setTipoDataTotal] = useState(datas[0]);
    const [tipoTurnoTotal, setTipoTurnoTotal] = useState("0");
    const [dadosGraficos, setDadosGrafico] = useState();
    const [dadosLegend, setDadosLegend] = useState();

    useEffect(() => {
        (openHeaderGraficoPizza) ? headerGraficoPizzaMedia.current.style.display = 'flex' : headerGraficoPizzaMedia.current.style.display = 'none';
    }, [openHeaderGraficoPizza]);
    
    useEffect(() =>{
        setTipoDataTotal(dados[0].data_historico);
        setTipoTurnoTotal("0");
        setTipoTotal("0");
    }, [dados]);

    useEffect(() =>{
        let dadosFiltrados = extrairDadosGraficoTotalPizza(dados, tipoDataTotal, tipoTotal, tipoTurnoTotal);
        let data = functionData(dadosFiltrados);
        setDadosLegend(dadosFiltrados);
        setDadosGrafico(data);
    }, [tipoTotal, tipoDataTotal, tipoTurnoTotal]);

    return (
        <div className='layout-grafico-menores'>
            {!openHeaderGraficoPizza && <Button text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoPizza(true)}/>}

            <div ref={headerGraficoPizzaMedia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoPizza(false)}/>
                </div>
                <div className='header-content-filtro'>
                    <label>Selecionar tipo de análise</label>
                    <Select
                        onChange={setTipoTotal}
                        opcoes={[
                            {value: "0", text: "Metros Produzidos"},
                            {value: "1", text: "Tempo Produção"},
                            {value: "2", text: "Tempo Setup"}
                        ]} />
                    <label>Selecionar data</label>
                    <Select
                        onChange={setTipoDataTotal}
                        opcoes={datasSelectMedia} />
                    
                    <label>Selecionar turno</label>
                    <Select
                        onChange={setTipoTurnoTotal}
                        opcoes={[
                            {value: "0", text: "Todos"},
                            {value: "1", text: "1° Turno"},
                            {value: "2", text: "2° Turno"}
                        ]} />
                </div>
            </div>

            <h1>Total {titleTipoDado[parseInt(tipoTotal)]} sobre os tecidos</h1>
            <div className="layout-grafico-pizza">
                <div className='grafico-pizza'>
                    {dadosGraficos && <Pie options={options} data={dadosGraficos}/>}
                </div>
                {dadosLegend && <LegendGraficoTotalPizza dados={dadosLegend} />}
            </div>
        </div>
    )

}

export default GraficoTotalPizza;