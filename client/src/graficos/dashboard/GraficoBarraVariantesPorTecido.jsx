import { useEffect, useRef, useState } from "react";
import { coresGraficoPizza, separarDadosPorVetores } from "../../helpers/funcoes";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import Select from "../../components/components_gerais/Select";
import SelectDataComplexas from "../../components/components_gerais/SelectsDataComplexas";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";
import extrairDadoGraficoVariantes from "../../extrair_dados/dashboard/extrairDadoGraficoVariantes";

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

const opcoesTecidos =  [
    {value: 0, text: 'Meia Malha'},
    {value: 1, text: 'Cotton'},
    {value: 2, text: 'Punho Pan'},
    {value: 3, text: 'Punho New'},
    {value: 4, text: 'Punho San'},
    {value: 5, text: 'Punho Elan'}
];

const funcaoData = ({dados1, tecido1, dados2, tecido2}) => {
    return {
        labels: [tecido1, tecido2],
        datasets: [
            {
                label: 'Total variante m/s',
                data: [dados1, dados2],
                backgroundColor: coresGraficoPizza
            }
        ]
    }
}

const GraficoBarraVariantesPorTecido = ({dados}) => {
    const arrayDadosVariantes = dados.map((dados) => dados.vetVariantesPorTecido);
    const arrayDadosTempoProducao = dados.map((dados) => dados.tempo_producao_no_dia);
    const arrayDatas = arrayDadosVariantes.map((dados, index) => {
        return {value: index, text: new Date(`${dados[0].data_historico} 00:00:00`).toLocaleDateString()}
    });

    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosVariante, setSelectDataDadosVariante] = useState(0);
    const [selectTipoTecidoDadosVariantes1, setSelectTipoTecidoDadosVariantes1] = useState('0');
    const [selectTipoTecidoDadosVariantes2, setSelectTipoTecidoDadosVariantes2] = useState('1');
    const [selectTipoTurnoDadosVariantes, setSelectTipoTurnoDadosVariantes] = useState('0');
    const [diferencaBruta, setDiferencaBruta] = useState(false);

    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setSelectDataDadosVariante(0)
        setSelectTipoTecidoDadosVariantes1('0');
        setSelectTipoTecidoDadosVariantes2('1');
        setSelectTipoTurnoDadosVariantes('0');
    }, [dados]);

    useEffect(() => {
        let {diferencaBruta, varianteTecido1, varianteTecido2} = extrairDadoGraficoVariantes(
            {
                dados: arrayDadosVariantes,
                total_producao: arrayDadosTempoProducao,
                tipoData: selectDataDadosVariante,
                tipoTecido1: selectTipoTecidoDadosVariantes1,
                tipoTecido2: selectTipoTecidoDadosVariantes2,
                tipoTurno: selectTipoTurnoDadosVariantes
            });
        setDadosGraficos(funcaoData({
            dados1: varianteTecido1,
            dados2: varianteTecido2,
            tecido1: opcoesTecidos[parseInt(selectTipoTecidoDadosVariantes1)].text,
            tecido2: opcoesTecidos[parseInt(selectTipoTecidoDadosVariantes2)].text,
        }));
        setDiferencaBruta(diferencaBruta);
    }, [dados, selectDataDadosVariante, selectTipoTecidoDadosVariantes1, selectTipoTecidoDadosVariantes2, selectTipoTurnoDadosVariantes]);

    return (
        <div className='grafico-linha-dados-mvp' style={{background:'#fff', height: '100%', width: '50%', borderRadius: '10px', padding: '10px'}}>
            {!openHeaderGraficoTendencia && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoTendencia(true)}/>}
            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoTendencia(false)}/>
                </div>
                <div className='header-content-filtro'>                
                    <label>Selecionar data</label>
                    {dados && <Select
                        onChange={setSelectDataDadosVariante}
                        opcoes={arrayDatas} />}
                    <Select
                    onChange={setSelectTipoTurnoDadosVariantes}
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

            <h1>Variantes entre dois tecidos</h1>
            <div style={{width: '100%', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{width: '50%',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <label>Selecionar primeiro tecido</label>
                    <select onChange={(e) => setSelectTipoTecidoDadosVariantes1(e.target.value)} value={selectTipoTecidoDadosVariantes1} style={{width: '100%', padding: '10px', borderRadius: '5px', background: '#a2a2a2'}}>
                        {opcoesTecidos.map((dados, index) =>
                            <option key={index} value={dados.value}>{dados.text}</option>
                        )}
                    </select>
                </div>
                <div style={{width: '50%',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <label>Selecionar segundo tecido</label>
                    <select onChange={(e) => setSelectTipoTecidoDadosVariantes2(e.target.value)} value={selectTipoTecidoDadosVariantes2} style={{width: '100%', padding: '10px', borderRadius: '5px', background: '#a2a2a2'}}>
                        {opcoesTecidos.map((dados, index) =>
                            <option key={index} value={dados.value}>{dados.text}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="grafico-linha-mvp" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {dadosGraficos && <Bar data={dadosGraficos}/>}
            </div>
            {diferencaBruta &&<div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{padding: '10px', width: '50%', background: '#a2a2a2', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <h1>Diferença bruta entre os tecidos</h1>
                    <p>{(diferencaBruta).toFixed(2)} m/s</p>
                </div>
            </div>}
        </div>
    )
}

export default GraficoBarraVariantesPorTecido