import { coresGraficoPizza } from "../../helpers/funcoes";

const LegendGraficoSobraRoloPizza = ({dados}) => {

    const somaSobraDeRolo = dados[0].sobra_de_rolo + dados[0].nao_sobra_de_rolo;

    return (
        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', alignItems: 'center', padding: '5px'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{background: coresGraficoPizza[0], width: '70px', borderRadius: '10px', textAlign: 'center'}}>
                    <p>{((dados[0].sobra_de_rolo * 100) / somaSobraDeRolo).toFixed(2)} %</p>
                </div>
                <h4>Sobrou: {dados[0].sobra_de_rolo}</h4>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{background: coresGraficoPizza[1], width: '70px', borderRadius: '10px', textAlign: 'center'}}>
                    <p>{((dados[0].nao_sobra_de_rolo * 100) / somaSobraDeRolo).toFixed(2)} %</p>
                </div>
                <h4>Não sobrou: {dados[0].nao_sobra_de_rolo}</h4>
            </div>
        </div>
    )
}

export default LegendGraficoSobraRoloPizza;