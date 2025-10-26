const TemplateMaster = ({header, headerInfoPage, pageChildren}) => {
    return (
        <>
            {header}
            <main style={{
                    width: '100%',
                    height: 'auto',
                    background: 'rgb(235, 234, 234)',
                    paddingLeft: '60px'
                }}>
                {headerInfoPage}
                {pageChildren}
            </main>
        </>

    )
}

export default TemplateMaster