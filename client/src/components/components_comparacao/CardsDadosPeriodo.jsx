const CardsDadosPeriodo = ({dados}) => {
    console.log(dados)
    return (
        <div className="div-cards-comparacao-variacao">
            <div className="card-comparacao-variacao">
                <h3>{dados[0].textVariacaoPeriodoSetup}</h3>
                <h1>{dados[0].porcentagem_da_variacao_setup} %</h1>
            </div>
            <div className="card-comparacao-variacao">
                <h3>{dados[0].textVariacaoPeriodoProducao}</h3>
                <h1>{dados[0].porcentagem_da_variacao_producao} %</h1>
            </div>
        </div>
    )

}

export default CardsDadosPeriodo;