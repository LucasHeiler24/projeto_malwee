const SelectDataComplexas = ({opcoes, onChange}) => {

    console.log(opcoes)
    return (
        <select style={{width: '100%', padding: '5px', height: '6vh', background: '#585858', color: '#fff', borderRadius: '10px'}} onChange={(e) => onChange(e.target.value)}>
            {opcoes.map((dados, index) => (
                console.log(index)
                //<option key={index} value={index}>{dados[index][0].data_historico} até {dados[index][dados[index].length - 1].data_historico}</option>
            ))}
        </select>
    )
}

export default SelectDataComplexas;