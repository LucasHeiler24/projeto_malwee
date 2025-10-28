const Select = ({opcoes, onChange}) => {

    return (
        <select style={{width: '100%', padding: '5px', height: '6vh', background: '#fff', color: '#000', borderRadius: '10px'}} onChange={(e) => onChange(e.target.value)}>
            {opcoes.map((dados, index) => (
                <option key={index} value={dados.value}>{dados.text}</option>
            ))}
        </select>
    )

}

export default Select;