import { useEffect, useRef, useState } from "react";
import { coresGraficoPizza, separarDadosPorVetores } from "../../helpers/funcoes";
import imgMenu from "../../images/menu.png"
import Button from "../../components/components_gerais/Button";
import Select from "../../components/components_gerais/Select";
import SelectDataComplexas from "../../components/components_gerais/SelectsDataComplexas";
import SelectDataFixas from "../../components/components_gerais/SelectsDatasFixas";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import extrairDadosGraficoProdutividade from "../../extrair_dados/dashboard/extrairDadosGraficoProdutividade";

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
                type: 'line',
                label: 'Produtividade',
                data: dados.map((dados) => dados.produtividade),
                backgroundColor: coresGraficoPizza[1],
                borderColor: coresGraficoPizza[1]
            }
        ]
    }
}

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

const GraficoBarraProdutividade = ({dados}) => {
    const arrayDatas = separarDadosPorVetores(dados[0].map((dados) => dados.data_historico).sort());
    
    const headerGraficoTendencia = useRef('');
    const [dadosGraficos, setDadosGraficos] = useState();
    const [openHeaderGraficoTendencia, setOpenHeaderGraficoTendencia] = useState(false);
    const [selectDataDadosProdutividade, setSelectDataDadosProdutividade] = useState(0);
    const [selectTipoTecidoDadosProdutividade, setSelectTipoTecidoDadosProdutividade] = useState(0);
    
    useEffect(() => {
        (openHeaderGraficoTendencia) ? headerGraficoTendencia.current.style.display = 'flex' : headerGraficoTendencia.current.style.display = 'none';
    }, [openHeaderGraficoTendencia]);

    useEffect(() => {
        setSelectDataDadosProdutividade(0)
        setSelectTipoTecidoDadosProdutividade(0);
    }, [dados]);

    useEffect(() => {
        let dadosFiltrados = extrairDadosGraficoProdutividade({dadosMVP: dados, tipoData: selectDataDadosProdutividade, tipoTecido: selectTipoTecidoDadosProdutividade})
        setDadosGraficos(funcaoData(dadosFiltrados));
    }, [dados, selectDataDadosProdutividade, selectTipoTecidoDadosProdutividade]);

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
                        onChange={setSelectDataDadosProdutividade}
                        opcoes={arrayDatas} />}
                    <label>Selecionar tecido</label>
                    <Select
                        onChange={setSelectTipoTecidoDadosProdutividade}
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
                </div>
            </div>

            <h1>Produtividade do tecido {vetTiposTecidos[parseInt(selectTipoTecidoDadosProdutividade)]}</h1>
            <div className="grafico-linha-mvp" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {dadosGraficos && <Line data={dadosGraficos}/>}
            </div>
        </div>
    )
}

export default GraficoBarraProdutividade;