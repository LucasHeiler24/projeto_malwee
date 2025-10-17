export default function validationLogin({ matricula, senha }) {

    if (!matricula || !senha)
        return { message: 'Preenche os campos corretamente' }

    return;

}