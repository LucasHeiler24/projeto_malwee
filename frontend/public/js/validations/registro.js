export default function validationRegistro({ nome, matricula, senha }) {
    if (!nome || !matricula || !senha)
        return { message: 'Por favor, preencher todos os campos' };
    if (isNaN(matricula))
        return { message: 'Informe apenas os números da matrícula' };
    if (matricula.length != 6)
        return { message: 'Informe corretamente a sua matrícula' };
    if (senha.length < 6)
        return { message: 'A senha deve ter no mínimo 6 digitos' };

    return;
}