import conectarBd from "./conexao.js";

async function createUsuario({ id_matricula, nome_usuario, senha_usuario }) {

    try {

        const conexao = await conectarBd();

        const [rows] = await conexao.query(
            `INSERT INTO usuario (id_matricula, nome_usuario, senha_usuario) VALUES (?, ?, ?)`,
            [id_matricula, nome_usuario, senha_usuario]
        );

        return rows;

    }
    catch (erro) {
        return erro;
    }

}

export { createUsuario }