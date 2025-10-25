const SelectDataComplexas = ({opcoes, onChange}) => {
    return (
        <select style={{width: '100%', padding: '5px', height: '6vh', background: '#585858', color: '#fff', borderRadius: '10px'}} onChange={(e) => onChange(e.target.value)}>
            {opcoes.map((dados, index) => (
                <option key={index} value={index}>{new Date(`${opcoes[index][0].data_historico} 00:00:00`).toLocaleDateString()} até {new Date(`${opcoes[index][opcoes[index].length - 1].data_historico} 00:00:00`).toLocaleDateString()}</option>
            ))}
        </select>
    )
}

export default SelectDataComplexas;