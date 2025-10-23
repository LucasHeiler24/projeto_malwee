<<<<<<< HEAD
const TemplateMaster = ({header, headerInfoPage}) => {
    return (
        <>
        
        </>
=======
const TemplateMaster = ({header, headerInfoPage, pageChildren}) => {
    return (

        <>
            {header}
            <main style={{background: '#e7e7e7', width:'100%', height: "auto", paddingLeft: "70px", paddingRight:"10px", paddingTop:"10px", paddingBottom: "10px"}}>
                {headerInfoPage}
                {pageChildren}
            </main>
        </>

>>>>>>> 878edca882c464604e94109835b7af12ecc72958
    )
}

export default TemplateMaster