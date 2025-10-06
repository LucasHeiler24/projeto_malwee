import { createUsuario } from "../database/EntidadeUsuario.js";

const create = async function(request, response){

    const {id_matricula, nome_usuario, senha_usuario} = request.body;

    try{

        const status = await createUsuario({id_matricula, nome_usuario, senha_usuario});

        return response.status(201);
    }
    catch(e){
        return response.json(e);
    }

}

export {create};