import { useEffect, useRef, useState } from "react";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import SelectDataComplexas from "../../components/components_gerais/SelectsDataComplexas";
import { coresGraficoPizza, removerDuplicados, separarDadosPorVetores } from "../../helpers/funcoes";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import extrairDadosTiposSaida from "../../extrair_dados/dashboard/extrairDadosTiposSaida";
import Select from "../../components/components_gerais/Select";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const funcaoData = (dados) => {
    return {
        labels: dados.map((dados) => dados.data_historico),
        datasets: [
            {
                fill: true,
                label: 'Total tipo rolinho',
                data: dados.map((dados) => dados.qtd_rolinho),
                borderColor: coresGraficoPizza[1],
                backgroundColor: coresGraficoPizza[1],
            },
            {
                fill: true,
                label: 'Total tipo fraldado',
                data: dados.map((dados) => dados.qtd_fraldado),
                borderColor: coresGraficoPizza[4],
                backgroundColor: coresGraficoPizza[4],
            },
        ],
    }
}

const GraficoAreaTiposSaida = ({dados}) => {
    const arrayDatas = separarDadosPorVetores(dados[0].map((dados) => dados.data_historico));

    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosTipoSaida, setSelectDataDadosTipoSaida] = useState(0);
    const [selectDataTipoTecidoTipoSaida, setSelectTipoTecidoTipoSaida] = useState(0);
    const [selectTurnoDadosTipoSaida, setSelectTurnoDadosTipoSaida] = useState('0');

    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setSelectDataDadosTipoSaida(0);
        setSelectTipoTecidoTipoSaida(0);
        setSelectTurnoDadosTipoSaida('0');
    }, [dados]);

    useEffect(() => {
        let dadosFiltrados = extrairDadosTiposSaida({dados: dados, tipoData: selectDataDadosTipoSaida, tipoTecido: selectDataTipoTecidoTipoSaida, tipoTurno: selectTurnoDadosTipoSaida});
        setDadosGraficos(funcaoData(dadosFiltrados));
    }, [selectDataDadosTipoSaida, selectDataTipoTecidoTipoSaida, selectTurnoDadosTipoSaida]);

    return (
        <div className='grafico-linha-dados-mvp' style={{background:'#fff', height: '100%', width: '100%', borderRadius: '10px', padding: '10px'}}>
            {!openHeaderGraficoTendencia && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGraficoTendencia(true)}/>}
            
            <div ref={headerGraficoTendencia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGraficoTendencia(false)}/>
                </div>
                <div className='header-content-filtro'>                
                    <label>Selecionar data</label>
                    {arrayDatas && <SelectDataFixas
                        onChange={setSelectDataDadosTipoSaida}
                        opcoes={arrayDatas} />}
                    <label>Selecionar por tecido</label>
                    <Select
                        onChange={setSelectTipoTecidoTipoSaida}
                        opcoes={[
                            {value: 0, text: "Meia Malha"},
                            {value: 1, text: "Cotton"},
                            {value: 2, text: "Punho Pan"},
                            {value: 3, text: "Punho New"},
                            {value: 4, text: "Punho San"},
                            {value: 6, text: "Punho Elan"}
                        ]}
                    />
                    <label>Selecionar turno</label>
                     <Select
                        onChange={setSelectTurnoDadosTipoSaida}
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

            <h1>Tendência VMP em cada dia</h1>
            <div className="grafico-linha-mvp" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {dadosGraficos && <Line data={dadosGraficos}/>}
            </div>
        </div>
    )
}

export default GraficoAreaTiposSaida;