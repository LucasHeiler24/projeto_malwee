import { removerDadosUndefined, removerDuplicados, separarDadosPorVetores } from "../../helpers/funcoes";

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
import extrairDadosGraficoLinhaMvp from "../../extrair_dados/dashboard/extrairDadosGraficosLinhaMvp";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import Select from "../../components/components_gerais/Select";
import SelectDataComplexas from "../../components/components_gerais/SelectsDataComplexas";

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
        labels: data,
        datasets: [
          {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    }
}

const GraficoLinhaTendenciaMvp = ({dados}) => {
    
    const arrayDatas = removerDadosUndefined(removerDuplicados(dados.map((dados) => dados.data_historico)));
    let dadosTendencia = [];
    for(let i=0; i<arrayDatas.length; i++){
        dadosTendencia.push(dados.filter((dados) => dados.data_historico == arrayDatas[i]));
    }

    let dadosFiltrados = [];
    for(let i=0; i<dadosTendencia.length; i++){
        dadosFiltrados.push(dadosTendencia[i][dadosTendencia[i].length - 1]);
    }
    
    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosTendencia, setSelectDataDadosTendencia] = useState('');
    const [selectTurnoDadosTendencia, setSelectTurnoDadosTendencia] = useState('');
    const [selectTipoTecidoDadosTendencia, setSelectTipoTecidoDadosTendencia] = useState('');
    
    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setSelectDataDadosTendencia(separarDadosPorVetores(dadosFiltrados));
        setSelectTurnoDadosTendencia("0");
        setSelectTipoTecidoDadosTendencia("Meia Malha");
    }, [dados])

    // useEffect(() => {
    //     extrairDadosGraficoLinhaMvp({dadosData: arrayDatas, dadosMVP: arrayTendenciaMvp, tipoData: selectDataDadosTendencia, tipoTurno: selectTurnoDadosTendencia});
    // }, [selectDataDadosTendencia, selectTurnoDadosTendencia]);

    console.log(selectDataDadosTendencia);
    return (
        <div className='grafico-pizza-dados-totais-media'>
            {!openHeaderGraficoTendencia && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoTendencia(true)}/>}

            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoTendencia(false)}/>
                </div>
                <div className='header-content-filtro'>
                    <label>Selecionar por tecido</label>
                    <Select
                        onChange={setSelectTipoTecidoDadosTendencia}
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
                    <SelectDataComplexas
                        onChange={setSelectDataDadosTendencia}
                        opcoes={selectDataDadosTendencia} />
                    <label>Selecionar turno</label>
                    <Select
                        onChange={setSelectTurnoDadosTendencia}
                        opcoes={[
                            {value: "0", text: "Todos"},
                            {value: "1", text: "1° Turno"},
                            {value: "2", text: "2° Turno"}
                        ]} />
                </div>
            </div>

            <h1>Tendência</h1>
            <div style={{width: 'auto', background: '#fff'}}>
                {/* {dadosGraficos && <Pie options={options} data={dadosGraficos}/>}
                {dadosLegend && <LegendGraficoSobraRoloPizza dados={dadosLegend} />} */}
            </div>
        </div>
    )
}

export default GraficoLinhaTendenciaMvp;