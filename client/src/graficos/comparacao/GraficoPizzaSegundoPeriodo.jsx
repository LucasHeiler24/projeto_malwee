import { useEffect, useState } from 'react';
import imgHamburguer from "../../images/menu.png"
import Select from '../../components/components_gerais/Select';
import extrairDadosGraficoPizza from '../../extrair_dados/comparacao/extrairDadosGraficoPizza';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { coresGraficoPizza } from '../../helpers/funcoes';

ChartJS.register(ArcElement, Tooltip, Legend);

const funcaoData = (dados) => {
    return {
        labels: ['Metros produzidos', 'Tempo setup (s)', 'Tempo produção (s)'],
        datasets: [
            {
                label: "Total",
                data: [dados.metros, dados.setup, dados.producao],
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

const GraficoPizzaSegundoPeriodo = ({dados}) => {

    const [data, setData] = useState();
    const [turno, setTurno] = useState('0');
    const [showHeader, setShowHeader] = useState(false)

    useEffect(() => {
        const dadosGraficosFiltrados = funcaoData(extrairDadosGraficoPizza(dados, turno));
        setData(dadosGraficosFiltrados);
    }, [dados, turno]);

    return (
        <div className="grafico-pizza-comparacao">
            <div className="grafico-header">
                {!showHeader && 
                    <button onClick={() => setShowHeader(true)}>
                        <img src={imgHamburguer} />    
                    </button>
                }
                {showHeader &&
                    <div className="header-grafico-pizza">
                        <button onClick={() => setShowHeader(false)}>X</button> 
                        <label>Informe o turno</label>
                        <Select
                            onChange={setTurno}
                            opcoes={[
                                {value: '0', text:"Todos"},
                                {value: '1', text:"1° Turno"},
                                {value: '2', text:"2° Turno"}
                            ]}
                        />
                    </div>
                }
            </div>
            <div className='grafico-pizza'>
                <h1>Totais no segundo período</h1>
                {data && <Pie options={options} data={data} />}
            </div>
        </div>
    )

}

export default GraficoPizzaSegundoPeriodo;