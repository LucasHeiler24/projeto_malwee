import bcrypt from "bcrypt";
import { createUsuario, storeUsuario } from "../database/EntidadeUsuario.js";
import {validationResult} from "express-validator"
import { SECRET_TOKEN, TAMANHO_SALT_BCRYPT } from "../helpers/configs.js";
import jsonWebToken from "jsonwebtoken";

const create = async function (request, response) {

    const result = validationResult(request);
    if(!result.isEmpty()){
        return response.status(400).json({error: result.array()});
    }

    const { id_matricula, nome_usuario, senha_usuario } = request.body;
    
    try {

        const saltHash = await bcrypt.genSaltSync(TAMANHO_SALT_BCRYPT);
        const senhaBcrypt = await bcrypt.hashSync(senha_usuario, saltHash);
        
        const status = await createUsuario({ id_matricula, nome_usuario, senhaBcrypt });
        
        return (status.affectedRows == 1) ? response.status(200).json(
            { status: 201, message: "Usuário criado com sucesso!" }) :
            { status: 400, message: "Erro ao cadastar o usuário!" }
            
        }
        catch (e) {
            return response.json(e);
    }
    
}

const loginStore = async function(request, response) {
    
    const result = validationResult(request);
    if(!result.isEmpty())
        return response.status(400).json({error: result.array()});
    
    const { id_matricula, senha_usuario } = request.body;
    
    try{

        const status = await storeUsuario({id_matricula});

        if(status.length == 0) return response.status(400).json({status: 400, message: "Credênciais inválidas"});

        const verifySenha = await bcrypt.compareSync(senha_usuario, status[0].senha_usuario);

        if(!verifySenha) return response.status(400).json({status: 400, message: "Credênciais inválidas"});

        const token = jsonWebToken.sign({id: status[0].id_usuario, nome: status[0].nome_usuario}, SECRET_TOKEN, {
            algorithm: 'HS256', expiresIn: '1d'
        });
        
        return response.status(200).json({token});

    }
    catch(e){
        return response.staus(400).json(e);
    }
}

const validandoToken = function(request, response){

    const token = request.params.token;
    try{

        jsonWebToken.verify(token, SECRET_TOKEN);

        return response.status(200).json({status: 200, ...jsonWebToken.decode(token)});
    }
    catch(e){
        return response.status(400).json({status: 400, message: "Token inválido"})
    }


}


export { create, loginStore, validandoToken };