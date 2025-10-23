import {useForm} from "react-hook-form";
import TextField from "../components/TextField";
import Input from "../components/Input";
import Span from "../components/Span";
import { useEffect, useState } from "react";
import FlashMessage from "../components/FlashMessage";
import {useNavigate} from "react-router-dom"
import store from "../requests/usuario/logar";
import validToken from "../requests/usuario/validToken";
import Cookies from "js-cookie";

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
        <main className="h-screen w-screen flex">
            <section className="flex justify-content-center items-center w-1/2">
                <h1>Logo</h1>
            </section>
            <section className="flex w-1/2 p-5">
                <div className="flex justify-content-center items-center flex-col h-100">
                    <h1>Logar-se</h1>
                    {statusRegistro && <FlashMessage styles={styleStatusRegistro} text={messageStatusRegistro} />}
                    <form className="flex justify-content-center items-left gap-3 flex-col" onSubmit={handleSubmit(submittedFormLogin)}>
                        <TextField
                            styles={"bg-amber-100 w-100 p-2 rounded"}
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
                            styles={"bg-amber-100 w-100 p-2 rounded"}
                            htmlFor={"senha_user"}
                            textLabel={"Informe a sua senha"}
                            placeholder={"Informe sua senha:"}
                            typeInput={"password"}
                            register={register("senha_usuario", {
                                required: "A senha é obrigatória",
                            })} 
                            />
                        {errors?.senha_user?.message && <Span text={errors.senha_user.message} /> }

                        <Input styles={"bg-amber-100 w-100 p-2 rounded cursor-pointer"} type={"submit"} value={"Logar"} />
                    </form>
                </div>
            </section>

        </main>
    )
}

export default LoginPage;