import {useForm} from "react-hook-form" 
import Input from "../components/Input";
import Span from "../components/Span";
import { useNavigate } from "react-router-dom";

const CadastroPage = () => {

    const { register, handleSubmit, formState:{errors}} = useForm()
    let navegate = useNavigate();


    const dataForm = async ({nome, matricula, senha}) => {
        try{

            const response = await fetch('http://localhost:8000/user/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_matricula: matricula,
                    nome_usuario: nome,
                    senha_usuario: senha
                })
            });

            const status = await response.json();

            console.log(status);
            if(status.status == 201) navegate('/login');
        
        }
        catch(e){
            console.log(e);
        }

    }

    console.log(errors);
    return (
        <>
            <main>
                <section>
                    <div className="">
                        <form onSubmit={handleSubmit(dataForm)}>
                            <div className="view-form">
                                <label>Informe o seu nome</label>
                                <Input
                                    type='text'
                                    placheolder='Informe o seu nome'
                                    register={register('nome', {
                                        required: true
                                    })}
                                />
                            </div>
                            {errors?.nome && <Span text={errors.nome.type == 'required' && "Preenche o nome corretamente!"}/> }
                            <div className="view-form">
                                <label>Informe a sua matrícula</label>
                                <Input
                                    type='text'
                                    placheolder='Informe a sua matrícula'
                                    register={register('matricula', {
                                        required: true, minLength: 6, maxLength: 6
                                    })}
                                    />
                                <Span text="Informe apenas os números!" />
                            </div>
                            {errors?.matricula && <Span text={ errors.matricula.type == 'required' && "Preenche a matrícula corretamente!"} /> }
                            {errors?.matricula && <Span text={ errors.matricula.type == 'minLength' && "Informe uma matrícula de pelo menos 6 digitos"} /> }
                            {errors?.matricula && <Span text={ errors.matricula.type == 'maxLength' && "Informe uma matrícula de 6 digitos"} /> }

                            <div className="view-form">
                                <label>Informe a sua senha</label>
                                <Input
                                    type='text'
                                    placheolder='Informe a sua senha'
                                    register={register('senha', {
                                        required: true, minLength: 6
                                    })}
                                    />
                            </div>
                            {errors?.senha && <Span text={(errors.senha.type == 'required') ? 
                            "Preenche a senha corretamente!" : "Informe uma senha de pelo menos 6 digitos!"}/> }
                            <Input type='submit' value='send' />
                        </form>
                    </div>
                </section>
            </main>
        </>
    )

}

export default CadastroPage;