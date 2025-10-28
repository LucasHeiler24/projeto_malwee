import {useForm} from "react-hook-form";
import TextField from "../components/components_gerais/TextField";
import Input from "../components/components_gerais/Input";
import Span from "../components/components_gerais/Span";
import formRegistroSubmitted from "../requests/usuario/registro";
import { useState } from "react";
import FlashMessage from "../components/components_gerais/FlashMessage";
import {useNavigate} from "react-router-dom"
import imgLogo from "../images/malwee_logo.png"
import "../css/registro.css"

const RegistroPage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [statusRegistro, setStatusRegistro] = useState(false);
    const [styleStatusRegistro, setStyleStatusRegistro] = useState('');
    const [messageStatusRegistro, setMessageStatusRegistro] = useState('');
    const navegate = useNavigate();

    const submittedFormRegistro = async ({id_matricula, nome_user, senha_user}) => {
        const {type, message} = await formRegistroSubmitted({id_matricula, nome_user, senha_user});
        if(type == 'error'){
            setStatusRegistro(true);
            setStyleStatusRegistro('bg-red-400 p-5 rounded');
            setMessageStatusRegistro(message);
            return setTimeout(() => {setStatusRegistro(false)}, 5000);
        }

        return navegate('/login');
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
                    <form className="form-registro" onSubmit={handleSubmit(submittedFormRegistro)}>
                        <div className="div-header-form">
                            <h1>Registrar-se</h1>
                            {statusRegistro && <FlashMessage styles={styleStatusRegistro} text={messageStatusRegistro} />}
                        </div>
                        <TextField
                            htmlFor={"id_matricula"}
                            textLabel={"Informe o número da matrícula"}
                            placeholder={"Informe o seu número de matrícula:"}
                            typeInput={"number"}
                            register={register("id_matricula", {
                                required: "O identificador da matrícula é obrigatório",
                                validate: (matricula) => matricula.length == 6 || "A matrícula deve ter 6 digitos!"
                            })} 
                        />
                        {errors?.id_matricula?.message && <Span text={errors.id_matricula.message} /> }

                        <TextField 
                            htmlFor={"nome_user"}
                            textLabel={"Informe o seu nome"}
                            placeholder={"Informe o seu nome:"}
                            typeInput={"text"}
                            register={register("nome_user", {
                                required: "O nome do usuário é obrigatório",
                            })} 
                            />
                        {errors?.nome_user?.message && <Span text={errors.nome_user.message} /> }

                        <TextField 
                            htmlFor={"senha_user"}
                            textLabel={"Informe a sua senha"}
                            placeholder={"Informe sua senha:"}
                            typeInput={"password"}
                            register={register("senha_user", {
                                required: "A senha é obrigatória",
                                minLength: {value: 6, message: "A senha deve ter no mínimo 6 digitos!"},
                            })} 
                            />
                        {errors?.senha_user?.message && <Span text={errors.senha_user.message} /> }

                        <Input type={"submit"} value={"Registrar"} />
                    </form>
                    <div className="form-footer">
                        <h1>Já possui conta? Logar-se!</h1>
                        <a href="/login">Logar-se</a>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default RegistroPage;