const TextField = (props) => {

    return (
        <>
            <label htmlFor={props.htmlFor}>{props.textLabel}</label>
            <input className={props.styles} placeholder={props.placeholder} type={props.typeInput} {...props.register} />
        </>
    )

}

export default TextField;