import { use, useContext, useEffect, useRef, useState } from "react";
import Input from "../components_gerais/Input"
import Select from "../components_gerais/Select"
import contextHistoricoRegistros from "../../context/dadosRegistrosHistorico";


const typeFilter = ['text', 'date', 'number'];
const opcoesFilters = 
[
    {value: '0', text: 'Filtrar por tipo tecido'},
    {value: '1', text: 'Filtrar por data'},
    {value: '2', text: 'Filtrar pelo número da tarefa'}
];
const opcoesTurno = [
    {value: '0', text: 'Todos'},
    {value: '1', text: '1° Turno'},
    {value: '2', text: '2° Turno'}
]

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];


const FiltersHistorico = ({dados, setDadosFiltrados}) => {

    const filterInputSearch = useRef('');
    const [typeFilterInput, setTypeFilterInput] = useState(0);
    const [selectTurnoHistorico, setSelectTurnoHistorico] = useState('0');
    const [inputSearchHistorico, setInputSearchHistorico] = useState('0');

    useEffect(() => {
        filterInputSearch.current.value = '';
    }, [typeFilterInput])

    useEffect(() => {
        let dadosHistorico;
        if(typeFilterInput == '0'){
            const indexTipoTecidoPesquisado = vetTiposTecidos.findIndex((dados) => {
                return dados.toLocaleLowerCase().includes(filterInputSearch.current.value.toLowerCase());
            });

            dadosHistorico = dados.filter((dados) => {
                return dados.tipo_tecido == indexTipoTecidoPesquisado
            });
        }
        if(typeFilterInput == '1'){
            dadosHistorico = dados.filter((dados) => {
                return dados.data_historico.split(' ')[0] == filterInputSearch.current.value
            })
        }
        if(typeFilterInput == '2'){
            dadosHistorico = dados.filter((dados) => {
                return dados.numero_da_tarefa == filterInputSearch.current.value
            })
        }
        if(selectTurnoHistorico == '1'){
            dadosHistorico = dadosHistorico.filter((dados) => dados.data_historico.split(' ')[1].split(':')[0] < 14);
        }
        if(selectTurnoHistorico == '2'){
            dadosHistorico = dadosHistorico.filter((dados) => dados.data_historico.split(' ')[1].split(':')[0] >= 14);
        }

        setDadosFiltrados({dadosHistorico});
    }, [selectTurnoHistorico, inputSearchHistorico])

    return (
        <div className="content-filter-historico">
            <div className="type-filter-input">
                <div className="filter-historico">
                    <label>Pesquisar seu registro</label>
                    <Input ref={filterInputSearch} onChange={setInputSearchHistorico} type={typeFilter[parseInt(typeFilterInput)]} placeholder="Pesquisar..."/>
                </div>
                <div className="filter-historico">
                    <label>Informe o tipo de filtro</label>
                    <Select onChange={setTypeFilterInput} opcoes={opcoesFilters} />
                </div>
                <div className="filter-historico">
                    <label>Informe o turno</label>
                    <Select onChange={setSelectTurnoHistorico} opcoes={opcoesTurno} />
                </div>
            </div>
        </div>
    )

}

export default FiltersHistorico;