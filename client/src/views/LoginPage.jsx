import {useForm} from "react-hook-form";
import TextField from "../components/components_gerais/TextField";
import Input from "../components/components_gerais/Input";
import Span from "../components/components_gerais/Span";
import { useState } from "react";
import FlashMessage from "../components/components_gerais/FlashMessage";
import {useNavigate} from "react-router-dom"
import store from "../requests/usuario/logar";
import validToken from "../requests/usuario/validToken";
import Cookies from "js-cookie";
import imgLogo from "../images/malwee_logo.png"
import "../css/registro.css"

const LoginPage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [statusRegistro, setStatusRegistro] = useState(false);
    const [styleStatusRegistro, setStyleStatusRegistro] = useState('');
    const [messageStatusRegistro, setMessageStatusRegistro] = useState('');
    const navegate = useNavigate();

    const submittedFormLogin = async ({id_matricula, senha_usuario}) => {
        const {type, message} = await store({id_matricula, senha_usuario});

        if(type == 'error'){
            setStatusRegistro(true);
            setStyleStatusRegistro('bg-red-400 p-5 rounded');
            setMessageStatusRegistro(message);
            return setTimeout(() => {setStatusRegistro(false)}, 5000);
        }

        const {id, nome} = await validToken({token: message});
        Cookies.set('token', message);
        Cookies.set('id', id);
        Cookies.set('nome', nome);

        return navegate('/dashboard');
    }

    return (
        <main className="main-registro">
            <section className="section-logo">
                <div className="logo">
                    <img src={imgLogo} />
                </div>
            </section>
            <section className="section-registro">
                <div className="div-content-form">
                    <form className="form-registro" onSubmit={handleSubmit(submittedFormLogin)}>
                    <div className="div-header-form">
                        <h1>Logar-se</h1>
                        {statusRegistro && <FlashMessage styles={styleStatusRegistro} text={messageStatusRegistro} />}
                    </div>
                        <TextField
                            htmlFor={"id_matricula"}
                            textLabel={"Informe o número da matrícula"}
                            placeholder={"Informe o seu número de matrícula:"}
                            typeInput={"number"}
                            register={register("id_matricula", {
                                required: "O identificador da matrícula é obrigatório",
                            })} 
                        />
                        {errors?.id_matricula?.message && <Span text={errors.id_matricula.message} /> }

                        <TextField 
                            htmlFor={"senha_user"}
                            textLabel={"Informe a sua senha"}
                            placeholder={"Informe sua senha:"}
                            typeInput={"password"}
                            register={register("senha_usuario", {
                                required: "A senha é obrigatória",
                            })} 
                            />
                        {errors?.senha_user?.message && <Span text={errors.senha_user.message} /> }

                        <Input type={"submit"} value={"Logar"} />
                    </form>
                </div>
            </section>

        </main>
    )
}

export default LoginPage;