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

const GraficoDisponibilidade = ({dadosPeriodo1, dadosPeriodo2}) => {

    console.log(dadosPeriodo1);
    console.log(dadosPeriodo2);

}

export default GraficoDisponibilidade;