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
import extrairDadosGraficoTarefasCompletas from '../../extrair_dados/dashboard/extrairDadosGraficoTarefasCompletas';


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
        labels: ["Tarefas completas", "Tarefas não completas"],
        datasets: [
            {
                label: 'Total: ',
                data: [dados[0].total_tarefas_completas, dados[0].total_tarefas_nao_completas],
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

const GraficoBarraTarefasCompletas = ({dados}) => {
    const datas = removerDuplicados(dados.map((dados) => dados.data_historico));
    const datasSelectMedia = datas.map((dados) => {
        return { value: dados, text: new Date(`${dados} 00:00:00`).toLocaleDateString()}
    });

    const headerGraficoPizzaMedia = useRef();
    const [openHeaderGrafico, setOpenHeaderGrafico] = useState(false);
    const [tipoDataTarefasCompletas, setTipoDataTarefasCompletas] = useState(datas[0]);
    const [tipoTecidoTarefasCompletas, setTipoTecidoTarefasCompletas] = useState("Meia Malha");
    const [dadosGraficos, setDadosGrafico] = useState();

    useEffect(() => {
        (openHeaderGrafico) ? headerGraficoPizzaMedia.current.style.display = 'flex' : headerGraficoPizzaMedia.current.style.display = 'none';
    }, [openHeaderGrafico]);
    
    useEffect(() =>{
        setTipoDataTarefasCompletas(dados[0].data_historico);
        setTipoTecidoTarefasCompletas("Meia Malha");
    }, [dados]);

    useEffect(() =>{
        let dadosFiltrados = extrairDadosGraficoTarefasCompletas({dados: dados, tipoData: tipoDataTarefasCompletas, tipoTecido: tipoTecidoTarefasCompletas});
        let data = functionData(dadosFiltrados);
        setDadosGrafico(data);
    }, [tipoDataTarefasCompletas, tipoTecidoTarefasCompletas]);

    return (
        <div className='grafico-pizza-dados-totais-media'>
            {!openHeaderGrafico && <Button className="btn-abrir-header-grafico-pizza" text={<img src={imgMenu}></img>} onClick={() => setOpenHeaderGrafico(true)}/>}

            <div ref={headerGraficoPizzaMedia} className="grafico-header-media-totais">
                <div className='header-media-grafico'>
                    <Button text="X" onClick={() => setOpenHeaderGrafico(false)}/>
                </div>
                <div className='header-content-filtro'>
                    <label>Selecionar por tecido</label>
                    <Select
                        onChange={setTipoTecidoTarefasCompletas}
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
                        onChange={setTipoDataTarefasCompletas}
                        opcoes={datasSelectMedia} />
                </div>
            </div>

            <h1>Quantidade de tarefas completas do tecido {setTipoTecidoTarefasCompletas}</h1>
            <div className="grafico-media-totais">
                {dadosGraficos && <Bar options={options} data={dadosGraficos}/>}
            </div>
        </div>
    )
}

export default GraficoBarraTarefasCompletas;