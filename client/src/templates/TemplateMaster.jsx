const TemplateMaster = ({header, headerInfoPage, pageChildren}) => {
    return (
        <>
            {header}
            <main style={{
                    width: '100%',
                    height: 'auto',
                    background: '#11181c',
                    paddingLeft: '60px',
                    color: '#fff'
                }}>
                {headerInfoPage}
                {pageChildren}
            </main>
        </>

    )
}

export default TemplateMaster