import {useForm} from "react-hook-form" 
import Input from "../components/Input";
import Span from "../components/Span";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Cookies from "js-cookie"

const LoginPage = () => {

    const { register, handleSubmit, formState:{errors}} = useForm()
    let navegate = useNavigate();
    const flashMessage = useRef(null);

    const loginForm = async ({matricula, senha}) => {
        try{

            const response = await fetch('http://localhost:8000/user/store', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    id_matricula: matricula,
                    senha_usuario: senha
                })
            })

            const status = await response.json();

            if(status.status == 400) flashMessage.current.textContent = status.message;

            Cookies.set('token', status.token, {expires: 1});
            navegate('/dashboard');
        }
        catch(e){
            console.log(e);
        }

    }

    return (
        <>
            <main>
                <section>
                    <div className="form-login">
                        <div className="flash-message">
                            <h1 ref={flashMessage}></h1>
                        </div>
                        <form onSubmit={handleSubmit(loginForm)}>
                            <div className="view-form">
                                <label>Informe a sua matrícula</label>
                                <Input
                                    type='text'
                                    placheolder='Informe a sua matrícula'
                                    register={register('matricula', {
                                        required: true
                                    })}
                                    />
                                <Span text="Informe apenas os números!" />
                            </div>
                            {errors?.matricula && <Span text={errors.matricula.type == 'required' && "Preenche a matrícula corretamente!"} />}

                            <div className="view-form">
                                <label>Informe a sua senha</label>
                                <Input
                                    type='text'
                                    placheolder='Informe a sua senha'
                                    register={register('senha', {
                                        required: true
                                    })}
                                    />
                            </div>
                            {errors?.senha && <Span text={errors.senha.type == 'required' && "Preenche a senha corretamente!" } />}
                            <Input type='submit' value='send' />
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default LoginPage