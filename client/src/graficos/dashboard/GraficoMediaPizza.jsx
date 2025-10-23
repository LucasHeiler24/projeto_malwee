import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import "../../css/graficoMediaPizzaDashboard.css"
import Button from '../../components/Button';
import Select from '../../components/Select';
import { coresGraficoPizza, removerDuplicados } from '../../helpers/funcoes';
import extrairDadosGraficoPizzaMedia from '../../extrair_dados/dashboard/extrarDadosGraficoPizzaMedia';
import imgMenu from "../../images/menu.png"

ChartJS.register(ArcElement, Tooltip, Legend);

const functionData = (dados) => {

    return {
        labels: dados.map((dados) => dados.tipo_tecido),
        datasets: [
            {
                label: 'Média: ',
                data: dados.map((dados) => parseFloat(dados.media)),
                backgroundColor: coresGraficoPizza
            }
        ]
    } 

}

let titleTipoDado = ['Metros Produzidos', 'Tempo Produção', 'Tempo Setup'];
const GraficoMediaPizza = ({dados}) => {
    const datas = removerDuplicados(dados.map((dados) => dados.data_historico));
    const datasSelectMedia = datas.map((dados) => {
        return { value: dados, text: new Date(`${dados} 00:00:00`).toLocaleDateString()}
    });

    const headerGraficoPizzaMedia = useRef();
    const [openHeaderGraficoPizza, setOpenHeaderGraficoPizza] = useState(false);
    const [tipoMedia, setTipoMedia] = useState("0");
    const [tipoData, setTipoData] = useState(dados[0].data_historico);
    const [tipoTurno, setTipoTurno] = useState("0");
    const [dadosGraficos, setDadosGrafico] = useState();

    useEffect(() => {
        (openHeaderGraficoPizza) ? headerGraficoPizzaMedia.current.style.display = 'flex' : headerGraficoPizzaMedia.current.style.display = 'none';
    }, [openHeaderGraficoPizza]);

    useEffect(() =>{
        let data = functionData(extrairDadosGraficoPizzaMedia(dados, tipoMedia, tipoData, tipoTurno));
        setDadosGrafico(data);
    }, []);

    useEffect(() =>{
        let data = functionData(extrairDadosGraficoPizzaMedia(dados, tipoMedia, tipoData, tipoTurno));
        setDadosGrafico(data);
    }, [tipoMedia, tipoData, tipoTurno]);

    return (
        <div className='grafico-pizza-dados-totais-media'>
            {!openHeaderGraficoPizza && <Button text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoPizza(true)}/>}

            <div ref={headerGraficoPizzaMedia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoPizza(false)}/>
                </div>
                <div className='header-content-filtro'>
                    <label>Selecionar tipo de análise</label>
                    <Select
                        onChange={setTipoMedia}
                        opcoes={[
                            {value: "0", text: "Metros Produzidos"},
                            {value: "1", text: "Tempo Produção"},
                            {value: "2", text: "Tempo Setup"}
                        ]} />
                    <label>Selecionar data</label>
                    <Select
                        onChange={setTipoData}
                        opcoes={datasSelectMedia} />
                    
                    <label>Selecionar turno</label>
                    <Select
                        onChange={setTipoTurno}
                        opcoes={[
                            {value: "0", text: "Todos"},
                            {value: "1", text: "1° Turno"},
                            {value: "2", text: "2° Turno"}
                        ]} />
                </div>
            </div>

            <h1>Média {titleTipoDado[parseInt(tipoMedia)]} sobre os tecidos</h1>
            <div className="grafico-media-totais">
                {dadosGraficos && <Pie data={dadosGraficos}/>}
            </div>
        </div>
    )

}

export default GraficoMediaPizza;