import { useEffect, useRef, useState } from "react";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import Select from "../../components/components_gerais/Select";
import SelectDataComplexas from "../../components/components_gerais/SelectsDataComplexas";
import { coresGraficoPizza, separarDadosPorVetores } from "../../helpers/funcoes";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";
import extrairDadosGraficoMvp from "../../extrair_dados/dashboard/extrairDadosGraficosMvp";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const funcaoData = (dados) => {
    return {
        labels: dados.map((dados) => new Date(`${dados.data} 00:00:00`).toLocaleDateString()),
        datasets: [
            {
                label: 'Tempo Medio de Produção',
                data: dados.map((dados) => dados.mvp),
                backgroundColor: coresGraficoPizza[4],
            }
        ]
    }
}

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

const GraficoPorTecidoMvp = ({dados}) => {
    const arrayDatas = separarDadosPorVetores(dados[0].map((dados) => dados.data_historico).sort());
    
    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosTendencia, setSelectDataDadosMvp] = useState(0);
    const [selectTipoTecidoDadosTendencia, setSelectTipoTecidoDadosMvp] = useState(0);
    const [selectTurnoDadosTendencia, setSelectTurnoDadosMvp] = useState('0');
    
    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setSelectDataDadosMvp(0)
        setSelectTipoTecidoDadosMvp(0);
        setSelectTurnoDadosMvp('0');
    }, [dados]);

    useEffect(() => {
        let dadosFiltrados = extrairDadosGraficoMvp({dadosMVP: dados, tipoData: selectDataDadosTendencia, tipoTecido: selectTipoTecidoDadosTendencia, tipoTurno: selectTurnoDadosTendencia})
        setDadosGraficos(funcaoData(dadosFiltrados));
    }, [selectDataDadosTendencia, selectTipoTecidoDadosTendencia, selectTurnoDadosTendencia]);

    return (
        <div className='grafico-linha-dados-mvp' style={{background:'#fff', height: '100%', width: '50%', borderRadius: '10px', padding: '10px'}}>
            {!openHeaderGraficoTendencia && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoTendencia(true)}/>}
            
            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoTendencia(false)}/>
                </div>
                <div className='header-content-filtro'>                
                    <label>Selecionar data</label>
                    {dados && <SelectDataFixas
                        onChange={setSelectDataDadosMvp}
                        opcoes={arrayDatas} />}
                    <label>Selecionar tecido</label>
                    <Select
                        onChange={setSelectTipoTecidoDadosMvp}
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
                        onChange={setSelectTurnoDadosMvp}
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

            <h1>MVP em cada dia do tecido {vetTiposTecidos[parseInt(selectTipoTecidoDadosTendencia)]}</h1>
            <div className="grafico-linha-mvp" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {dadosGraficos && <Bar data={dadosGraficos}/>}
            </div>
        </div>
    )
}

export default GraficoPorTecidoMvp