import "../css/headerinfopage.css";

const HeaderInfoPage = ({nomeUser, nomePage}) => {

    return (
        <section className="header-info-page">
            <h1>Olá {nomeUser}</h1>
            <h1>{nomePage}</h1>
        </section>
    )

}

export default HeaderInfoPage;