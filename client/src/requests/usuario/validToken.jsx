const validToken = async ({token}) => {

    try{
        const response = await fetch(`http://localhost:8000/user/token/${token}`);
        const status = await response.json();

        return (status.status != 200) ? false : {id: status.id, nome: status.nome};
    }
    catch(e){
        return e;
    }

}

export default validToken;