const TemplateMaster = ({header, headerInfoPage, pageChildren}) => {
    return (

        <>
            {header}
            <main style={{background: '#e7e7e7', width:'100%', height: "auto", paddingLeft: "70px", paddingRight:"10px", paddingTop:"10px", paddingBottom: "10px"}}>
                {headerInfoPage}
                {pageChildren}
            </main>
        </>

    )
}

export default TemplateMaster