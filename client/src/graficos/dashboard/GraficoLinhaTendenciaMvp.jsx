import { coresGraficoPizza, separarDadosPorVetores } from "../../helpers/funcoes";

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useRef, useState } from "react";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const funcaoData = (data) => {
    return {
        labels: data.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        datasets: [
          {
            label: 'Total MVP',
            data: data.map((dados) => parseFloat(dados.mvp_no_dia)),
            borderColor: coresGraficoPizza[3],
            backgroundColor: coresGraficoPizza[3],
          },
          
        ],
    }
}

const GraficoLinhaTendenciaMvp = ({dados}) => {
    const arrayDatas = separarDadosPorVetores(dados.map((dados) => dados.data_historico));

    const headerGraficoTendencia = useRef('');
    const [filtrarDados, setFiltrarDados] = useState(separarDadosPorVetores(dados));
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosTendencia, setSelectDataDadosTendencia] = useState(0);
    
    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setFiltrarDados(separarDadosPorVetores(dados));
        setSelectDataDadosTendencia(0);
    }, [dados]);

    useEffect(() => {
        let data = funcaoData(filtrarDados[selectDataDadosTendencia]);
        setDadosGraficos(data);
    }, [filtrarDados, selectDataDadosTendencia]);

    return (
        <div className='layout-grafico-maiores'>
            {!openHeaderGraficoTendencia && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoTendencia(true)}/>}
            
            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoTendencia(false)}/>
                </div>
                <div className='header-content-filtro'>                
                    <label>Selecionar data</label>
                    {arrayDatas && <SelectDataFixas
                        onChange={setSelectDataDadosTendencia}
                        opcoes={arrayDatas} />}    
                </div>
            </div>

            <h1>Tendência VMP em cada dia</h1>
            <div className="grafico-maiores">
                {dadosGraficos && <Line data={dadosGraficos}/>}
            </div>
        </div>
    )
}

export default GraficoLinhaTendenciaMvp;