const FlashMessage = (props) => {
    return (
        <div className={props.styles}>
            <p>{props.text}</p>
        </div>
    )
}

export default FlashMessage;