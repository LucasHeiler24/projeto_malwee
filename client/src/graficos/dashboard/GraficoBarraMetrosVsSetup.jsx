import { useEffect, useRef, useState } from "react";
import { coresGraficoPizza, separarDadosPorVetores } from "../../helpers/funcoes";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import Select from "../../components/components_gerais/Select";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import extrairDadosGraficoMetrosVsSetup from "../../extrair_dados/dashboard/extrairDadosGraficoMetrosVsSetup";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const funcaoData = (dados) => {
    return {
        labels: dados.map((dados) => new Date(`${dados.data} 00:00:00`).toLocaleDateString()),
        datasets: [
            {
                type: 'line',
                label: 'Tempo setup',
                data: dados.map((dados) => dados.setup),
                backgroundColor: coresGraficoPizza[0],
                borderColor: coresGraficoPizza[0],
            },
            {
                type: 'bar',
                label: 'Metros produzidos',
                data: dados.map((dados) => dados.metros),
                backgroundColor: coresGraficoPizza[4],
            }
        ]
    }
}

const options = {
    maintainAspectRatio: false
}

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

const GraficoBarraMetrosVsSetup = ({dados}) => {
    const arrayDatas = separarDadosPorVetores(dados[0].map((dados) => dados.data_historico).sort());
    
    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosMetrosVsSetup, setSelectDataDadosMetrosVsSetup] = useState(0);
    const [selectTipoTecidoDadosMetrosVsSetup, setSelectTipoTecidoDadosMetrosVsSetup] = useState(0);
    const [selectTurnoDadosMetrosVsSetup, setSelectTurnoDadosMetrosVsSetup] = useState('0');
    
    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setSelectDataDadosMetrosVsSetup(0)
        setSelectTipoTecidoDadosMetrosVsSetup(0);
        setSelectTurnoDadosMetrosVsSetup('0');
    }, [dados]);

    useEffect(() => {
        let dadosFiltrados = extrairDadosGraficoMetrosVsSetup({dadosMVP: dados,
        tipoData: selectDataDadosMetrosVsSetup,
        tipoTecido: selectTipoTecidoDadosMetrosVsSetup,
        tipoTurno: selectTurnoDadosMetrosVsSetup});

        setDadosGraficos(funcaoData(dadosFiltrados));
    }, [dados, selectDataDadosMetrosVsSetup, selectTipoTecidoDadosMetrosVsSetup, selectTurnoDadosMetrosVsSetup]);

    return (
        <>
            {!openHeaderGraficoTendencia && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoTendencia(true)}/>}
            
            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoTendencia(false)}/>
                </div>
                <div className='header-content-filtro'>                
                    <label>Selecionar data</label>
                    {dados && <SelectDataFixas
                        onChange={setSelectDataDadosMetrosVsSetup}
                        opcoes={arrayDatas} />}
                    <label>Selecionar tecido</label>
                    <Select
                        onChange={setSelectTipoTecidoDadosMetrosVsSetup}
                        opcoes={
                            [
                                {value: 0, text: 'Meia Malha'},
                                {value: 1, text: 'Cotton'},
                                {value: 2, text: 'Punho Pan'},
                                {value: 3, text: 'Punho New'},
                                {value: 4, text: 'Punho San'},
                                {value: 5, text: 'Punho Elan'}
                            ]
                        }
                    />
                    <label>Selecionar turno</label> 
                    <Select
                        onChange={setSelectTurnoDadosMetrosVsSetup}
                        opcoes={
                            [
                                {value:'0', text: 'Todos'},
                                {value: '1', text: '1° Turno'},
                                {value: '2', text: '2° Turno'}
                            ]
                        }
                    />   
                </div>
            </div>

            <h1>Metros Vs Setup do tecido {vetTiposTecidos[parseInt(selectTipoTecidoDadosMetrosVsSetup)]}</h1>
            <div className="grafico-metros-vs-setup">
                {dadosGraficos && <Chart options={options} type='bar' data={dadosGraficos} />}
            </div>
        </>
    )
}

export default GraficoBarraMetrosVsSetup;