import "../../css/headerinfopage.css";

const HeaderInfoPage = ({nomeUser, nomePage}) => {

    return (
        <section className="header-info-page">
            <h1 className="title-page">{nomePage}</h1>
            <h1>Olá {nomeUser}</h1>
        </section>
    )

}

export default HeaderInfoPage;