import conectarBd from "./conexao.js";

async function createUsuario(objetoDados){

    try{

        const conexao = await conectarBd();

        const [rows] = await conexao.query(
            `INSERT INTO usuario (id_matricula, nome_usuario, senha_usuario) VALUES (?, ?, ?)`,
            [objetoDados.id_matricula, objetoDados.nome_usuario, objetoDados.senha_usuario]
        );

        return rows;

    }
    catch(erro){
        return erro;
    }

}

export {createUsuario}