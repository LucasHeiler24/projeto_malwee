import { formatarValores } from "../../helpers/funcoes";

const CardsDashboard = (props) => {

    const indicePeriodo = props.dadosSobraDeRolo.map((dados) => {
        return {indice_sobra: dados.indice_sobra_de_rolo}
    });
    const dadosTotais = props.dadosTotais.map((dados) => {
        return {total_metros: dados.total_metros_produzidos_no_periodo, eficiencia: dados.eficiencia_bruta_no_periodo}
    });

    const indiceFiltrado = indicePeriodo.filter((dados) => dados.indice_sobra);
    const dadosTotaisFiltrado = dadosTotais.filter((dados) => dados.total_metros);

    return (
        <>
            <div className="card-dashboard">
                <h1>VMP média atual</h1>
                <h4>{props.dadosVMP[0].vmp_periodo} m/s</h4>
            </div>
            <div className="card-dashboard">
                <h1>Eficiência bruta de máquina</h1>
                <h4>{(dadosTotaisFiltrado[0].eficiencia * 100).toFixed(2)} %</h4>
            </div>
            <div className="card-dashboard">
                <h1>Índice de sobra de rolo</h1>
                <h4>{(indiceFiltrado[0].indice_sobra * 100).toFixed(2)} %</h4>
            </div>
            <div className="card-dashboard">
                <h1>Total de metros produzidos</h1>
                <h4>{formatarValores.format(dadosTotaisFiltrado[0].total_metros)} m</h4>
            </div>
        </>
    )
}

export default CardsDashboard;