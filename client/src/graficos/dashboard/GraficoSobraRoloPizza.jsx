import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import "../../css/graficoMediaPizzaDashboard.css"
import Button from '../../components/components_gerais/Button';
import Select from '../../components/components_gerais/Select';
import { coresGraficoPizza, removerDuplicados } from '../../helpers/funcoes';
import imgMenu from "../../images/menu.png"
import extrairDadosGraficoSobraRolo from '../../extrair_dados/dashboard/extrairDadosGraficoSobraRolo';
import LegendGraficoSobraRoloPizza from '../../components/components_graficos/LegendGraficoSobraDeRolo';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const functionData = (dados) => {
    return {
        labels: ["Sobra de rolo", "Não sobra de rolo"],
        datasets: [
            {
                label: 'Total: ',
                data: [dados[0].sobra_de_rolo, dados[0].nao_sobra_de_rolo],
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

const GraficoSobraDeRolo = ({dados}) => {

    const datas = removerDuplicados(dados.map((dados) => dados.data_historico));
    const datasSelectMedia = datas.map((dados) => {
        return { value: dados, text: new Date(`${dados} 00:00:00`).toLocaleDateString()}
    });

    const headerGraficoPizzaMedia = useRef();
    const [openHeaderGraficoPizza, setOpenHeaderGraficoPizza] = useState(false);
    const [tipoDataSobraRolo, setTipoDataSobraRolo] = useState(datas[0]);
    const [tipoTecidoSobraRolo, setTipoTecidoSobraRolo] = useState("Meia Malha");
    const [tipoTurnoSobraRolo, setTipoTurnoSobraRolo] = useState("0");
    const [dadosGraficos, setDadosGrafico] = useState();
    const [dadosLegend, setDadosLegend] = useState();

    useEffect(() => {
        (openHeaderGraficoPizza) ? headerGraficoPizzaMedia.current.style.display = 'flex' : headerGraficoPizzaMedia.current.style.display = 'none';
    }, [openHeaderGraficoPizza]);
    
    useEffect(() =>{
        setTipoDataSobraRolo(dados[0].data_historico);
        setTipoTurnoSobraRolo("0");
    }, [dados]);

    useEffect(() =>{
        let dadosFiltrados = extrairDadosGraficoSobraRolo(dados, tipoTecidoSobraRolo, tipoDataSobraRolo, tipoTurnoSobraRolo);
        let data = functionData(dadosFiltrados);
        setDadosLegend(dadosFiltrados);
        setDadosGrafico(data);
    }, [tipoDataSobraRolo, tipoTurnoSobraRolo, tipoTecidoSobraRolo]);

    return (
        <div className='grafico-pizza-dados-totais-media'>
            {!openHeaderGraficoPizza && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoPizza(true)}/>}

            <div ref={headerGraficoPizzaMedia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoPizza(false)}/>
                </div>
                <div className='header-content-filtro'>
                    <label>Selecionar por tecido</label>
                    <Select
                        onChange={setTipoTecidoSobraRolo}
                        opcoes={[
                            {value: "Meia Malha", text: "Meia Malha"},
                            {value: "Cotton", text: "Cotton"},
                            {value: "Punho Pan", text: "Punho Pan"},
                            {value: "Punho New", text: "Punho New"},
                            {value: "Punho San", text: "Punho San"},
                            {value: "Punho Elan", text: "Punho Elan"}
                        ]}
                    />
                    <label>Selecionar data</label>
                    <Select
                        onChange={setTipoDataSobraRolo}
                        opcoes={datasSelectMedia} />
                    <label>Selecionar turno</label>
                    <Select
                        onChange={setTipoTurnoSobraRolo}
                        opcoes={[
                            {value: "0", text: "Todos"},
                            {value: "1", text: "1° Turno"},
                            {value: "2", text: "2° Turno"}
                        ]} />
                </div>
            </div>

            <h1>Quantidade de sobra de rolo de {tipoTecidoSobraRolo}</h1>
            <div className="grafico-media-totais">
                {dadosGraficos && <Bar options={options} data={dadosGraficos}/>}
            </div>
            {dadosLegend && <LegendGraficoSobraRoloPizza dados={dadosLegend} />}
        </div>
    )

}

export default GraficoSobraDeRolo;