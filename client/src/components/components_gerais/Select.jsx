const Select = ({opcoes, onChange}) => {

    return (
        <select style={{width: '100%', padding: '5px', height: '6vh', background: '#585858', color: '#fff', borderRadius: '10px'}} onChange={(e) => onChange(e.target.value)}>
            {opcoes.map((dados, index) => (
                <option key={index} value={dados.value}>{dados.text}</option>
            ))}
        </select>
    )

}

export default Select;