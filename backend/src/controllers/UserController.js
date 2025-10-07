import { createUsuario } from "../database/EntidadeUsuario.js";

const create = async function (request, response) {

    const { id_matricula, nome_usuario, senha_usuario } = request.body;

    try {

        const status = await createUsuario({ id_matricula, nome_usuario, senha_usuario });

        console.log(status);
        return (status.affectedRows == 1) ? response.status(200).json(
            { status: 201, message: "Usuário criado com sucesso!" }) :
            { status: 400, message: "Erro ao cadastar o usuário!" }

    }
    catch (e) {
        return response.json(e);
    }

}

export { create };