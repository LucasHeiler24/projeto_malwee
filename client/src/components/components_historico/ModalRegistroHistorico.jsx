import { formatarValores } from "../../helpers/funcoes";
import Button from "../components_gerais/Button";


const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

const ModalRegistroHistorico = ({dados, setOpenModalHistorico}) => {
    console.log(dados)
    return (
        <div className="content-modal-historico">
            <div className="modal-historico">
                <div className="modal-historico-header">
                    <h1>Sobre o registro</h1>
                    <button onClick={() => setOpenModalHistorico(false)}>X</button>
                </div>
                <div className="modal-historico-body">
                    <div class="data-item">
                        <span class="data-label">ID do Dado</span>
                        <span class="data-value highlight-value">#{dados.id_dado}</span>
                     </div>
                    <div class="data-item">
                        <span class="data-label">Data Histórico</span>
                        <span class="data-value">{new Date(dados.data_historico).toLocaleDateString()}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Nome da máquina</span>
                        <span class="data-value highlight-value">Debrum</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Metros Produzidos</span>
                        <span class="data-value">{formatarValores.format(dados.metros_produzidos)} m</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Tarefa Completa</span>
                        <span class="data-value">{dados.tarefa_completa == 'TRUE' ? 'Completa' : 'Não completa'}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Sobra de Rolo</span>
                        <span class="data-value">{dados.sobra_de_rolo == 'TRUE' ? 'Sobrou' : 'Não sobrou'}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Tempo de Produção (s)</span>
                        <span class="data-value">{formatarValores.format(dados.tempo_de_producao)} s</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Tempo de Setup (s)</span>
                        <span class="data-value">{formatarValores.format(dados.tempo_de_setup)} s</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Número da Tarefa</span>
                        <span class="data-value">{dados.numero_da_tarefa}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Quantidade de Tiras</span>
                        <span class="data-value">{dados.quantidade_de_tiras}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Tipo de Saída</span>
                        <span class="data-value">{dados.tipo_saida == 0 ? 'Rolinho' : 'Fraldado'}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Tipo de Tecido</span>
                        <span class="data-value">{vetTiposTecidos[parseInt(dados.tipo_tecido)]}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Observações</span>
                        <span class="data-value">{dados.MyUnknownColumn == "" ? "Sem observações" : dados.MyUnknownColumn}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRegistroHistorico;