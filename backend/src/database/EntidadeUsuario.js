import conectarBd from "./conexao.js";

async function createUsuario({ id_matricula, nome_usuario, senhaBcrypt }) {

    try {

        const conexao = await conectarBd();

        const [rows] = await conexao.query(
            `INSERT INTO usuario (id_matricula, nome_usuario, senha_usuario) VALUES (?, ?, ?)`,
            [id_matricula, nome_usuario, senhaBcrypt]
        );

        return rows;

    }
    catch (erro) {
        return erro;
    }

}

async function storeUsuario({id_matricula}){

    try{

        const conexao = await conectarBd();

        const [rows] = await conexao.query(`
            SELECT * FROM usuario WHERE id_matricula = ?
        `, [id_matricula]);


        return rows;

    }
    catch(e){
        return e;
    }

}

export { createUsuario, storeUsuario }