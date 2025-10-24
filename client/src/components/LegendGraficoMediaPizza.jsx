import { coresGraficoPizza } from "../helpers/funcoes";

const LegendGraficoMediaPizza = ({dados}) => {

    const arrayDadosValores = dados.map((dados) => parseFloat(dados.media));
    const somaDadosValores = arrayDadosValores.reduce((soma, dados) => {
        return soma += dados;
    }, 0);
    
    return (
        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', alignItems: 'center', padding: '5px'}}>
            {dados.map((dados, index) => (
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{background: coresGraficoPizza[index], width: '70px', borderRadius: '10px', textAlign: 'center'}}>
                        <p>{((parseFloat(dados.media) * 100) / somaDadosValores).toFixed(2)} %</p>
                    </div>
                    <h4>{dados.tipo_tecido}</h4>
                </div>
            ))}
        </div>
    )
}

export default LegendGraficoMediaPizza;