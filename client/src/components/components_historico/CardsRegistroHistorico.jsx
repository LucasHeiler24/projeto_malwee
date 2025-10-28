import Button from "../components_gerais/Button";

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

const CardsRegistroHistorico = ({setOpenRegistroModal, dados, setRegistroVerMais}) => {

    const funcaoFindRegistroDado = (idDado) => {
        setRegistroVerMais(dados.find((dados) => dados.id_dado == parseInt(idDado)));
        setOpenRegistroModal(true);
    }

    return (
        <>
            {dados.map((dados, index) => (
                <div key={index} className="registros-historicos">
                    <div style={{
                        background: (dados.data_historico.split(' ')[1].split(':')[0] < 14) ? 'blue' : 'yellow',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%'
                    }}></div>
                    <div className="div-content-dados-historicos">
                        <div className="div-first-dados">
                            <h1>Número da tarefa {dados.numero_da_tarefa}</h1>
                            <h1>{vetTiposTecidos[parseInt(dados.tipo_tecido)]}</h1>
                        </div>
                        <div className="div-secound-dados">
                            <h1>{new Date(dados.data_historico).toLocaleString()}</h1>
                            <button onClick={(e) => funcaoFindRegistroDado(e.target.value)} value={dados.id_dado}>Ver mais</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )

}

export default CardsRegistroHistorico;