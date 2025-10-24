const TemplateMaster = ({header, headerInfoPage, pageChildren}) => {
    return (

        <>
            {header}
            <main style={{
                background: '#e7e7e7',
                height: 'auto',
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexDirection: 'column',
                paddingLeft: '65px',
                gap: '10px'
            }}>
                {headerInfoPage}
                {pageChildren}
            </main>
        </>

    )
}

export default TemplateMaster