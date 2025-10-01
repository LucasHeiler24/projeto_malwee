import { getRegistrosHistoricoMesEscolhido, formater } from "./helpers.js"

window.onload = function(){


    const cardsHistoricos = $('#cardsHistoricos');

    function construirCardsHistoricos(arrayRegistros){

        cardsHistoricos.empty();

        let vetTiposTecidos =
        [
            'Meia Malha', 'Cotton', 'Punho Pun',
            'Punho New', 'Punho San', 'Punho Elan'
        ];

        arrayRegistros.forEach(registros => {
                        

            cardsHistoricos.append(`
            
                <div class="card">

                    <div class="card-header">
                        <h1>Número tarefa: ${registros.numero_da_tarefa}</h1>
                        <h1>Id tarefa: #${registros.id_dados}</h1>
                    </div>

                    <div class="card-body">
                        <h1>Data produzida: ${new Date(registros.data_historico).toLocaleString()}</h1>
                        <h1>Tipo tecido: ${vetTiposTecidos[registros.tipo_tecido]}</h1>
                        <h1>Metros produzidos: ${formater.format(registros.metros_produzidos)}</h1>
                        <h1>Tempo de produção: ${formater.format(registros.tempo_de_producao)}</h1>
                    </div>

                    <div>
                        <button value="${registros.id_dado}">Ver mais</button>
                    </div>

                </div>

            `);

        });

    }

    (async () =>{
        const todosRegistrosHistoricos = await getRegistrosHistoricoMesEscolhido("2025", "08");

        construirCardsHistoricos(todosRegistrosHistoricos);
    })()


}