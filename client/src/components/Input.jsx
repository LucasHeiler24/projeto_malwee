const Input = (props) => {

    return (
        <input {...props} {...props.register}></input>
    )

}

export default Input;