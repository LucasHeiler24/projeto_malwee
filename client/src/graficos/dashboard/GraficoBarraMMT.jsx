import { useEffect, useRef, useState } from "react";
import extrairDadosGraficoMMT from "../../extrair_dados/dashboard/extrairDadosGraficoMMT";
import { coresGraficoPizza, separarDadosPorVetores } from "../../helpers/funcoes";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import Select from "../../components/components_gerais/Select";
import SelectDataComplexas from "../../components/components_gerais/SelectsDataComplexas";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

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

const options = {
  indexAxis: 'y'
};

const funcaoData = (dados) => {
    return {
        labels: dados.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        datasets: [
            {
                label: 'Metros Médios por tira',
                data: dados.map((dados) => parseFloat(dados.mmt)),
                backgroundColor: coresGraficoPizza[4]
            }
        ]
    }
}

const GraficoBarraMMT = ({dados}) => {
    const arrayDatas = separarDadosPorVetores(dados[0].map((dados) => dados.data_historico).sort());
    
    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoMMT, setOpenHeaderGraficoMMT] = useState(false);
    const [selectDataDadosMMT, setSelectDataDadosMMT] = useState(0);
    const [selectTipoTecidoDadosMMT, setSelectTipoTecidoDadosMMT] = useState(0);
    const [selectTipoTurnoDadosMMT, setSelectTipoTurnoDadosMMT] = useState('0');
    
    useEffect(() => {
        (openHeaderGraficoMMT) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoMMT]);

    useEffect(() => {
        setSelectDataDadosMMT(0)
        setSelectTipoTecidoDadosMMT(0);
        setSelectTipoTurnoDadosMMT('0')
    }, [dados]);

    useEffect(() => {
        let dadosFiltrados = extrairDadosGraficoMMT({dadosMMT: dados, tipoData: selectDataDadosMMT, tipoTecido: selectTipoTecidoDadosMMT, tipoTurno: selectTipoTurnoDadosMMT})
        setDadosGraficos(funcaoData(dadosFiltrados));
    }, [dados, selectTipoTecidoDadosMMT, selectTipoTurnoDadosMMT, selectDataDadosMMT]);

    return (
        <div className='grafico-linha-dados-mvp' style={{background:'#fff', height: '100%', width: '50%', borderRadius: '10px', padding: '10px'}}>
            {!openHeaderGraficoMMT && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoMMT(true)}/>}
            
            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoMMT(false)}/>
                </div>
                <div className='header-content-filtro'>                
                    <label>Selecionar data</label>
                    {dados && <SelectDataFixas
                        onChange={setSelectDataDadosMMT}
                        opcoes={arrayDatas} />}
                    <label>Selecionar tecido</label>
                    <Select
                        onChange={setSelectTipoTecidoDadosMMT}
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
                    <label>Selecione o turno</label>
                    <Select
                        onChange={setSelectTipoTurnoDadosMMT}
                        opcoes={
                            [
                                {value: 0, text: 'Todos'},
                                {value: 1, text: '1° Turno'},
                                {value: 2, text: '2° Turno'}
                            ]
                        }
                    />
                </div>
            </div>

            <h1>Métros Médios por Tira do tecido {vetTiposTecidos[parseInt(selectTipoTecidoDadosMMT)]}</h1>
            <div className="grafico-linha-mvp" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {dadosGraficos && <Bar options={options} data={dadosGraficos}/>}
            </div>
        </div>
    )

}

export default GraficoBarraMMT;