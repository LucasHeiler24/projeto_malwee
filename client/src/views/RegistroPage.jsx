import {useForm} from "react-hook-form";
import TextField from "../components/TextField";
import Input from "../components/Input";
import Span from "../components/Span";
import formRegistroSubmitted from "../requests/usuario/registro";
import { useState } from "react";
import FlashMessage from "../components/FlashMessage";
import {useNavigate} from "react-router-dom"

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
        <main className="h-screen w-screen flex">
            <section className="flex justify-content-center items-center w-1/2">
                <h1>Logo</h1>
            </section>
            <section className="flex w-1/2 p-5">
                <div className="flex justify-content-center items-center flex-col h-100">
                    <h1>Registrar-se</h1>
                    {statusRegistro && <FlashMessage styles={styleStatusRegistro} text={messageStatusRegistro} />}
                    <form className="flex justify-content-center items-left gap-3 flex-col" onSubmit={handleSubmit(submittedFormRegistro)}>
                        <TextField
                            styles={"bg-amber-100 w-100 p-2 rounded"}
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
                            styles={"bg-amber-100 w-100 p-2 rounded"}
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
                            styles={"bg-amber-100 w-100 p-2 rounded"}
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

                        <Input styles={"bg-amber-100 w-100 p-2 rounded cursor-pointer"} type={"submit"} value={"Registrar"} />
                    </form>
                </div>
            </section>

        </main>
    )
}

export default RegistroPage;