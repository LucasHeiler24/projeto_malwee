import {body} from "express-validator";

const validationsUser = 
[
    body('id_matricula')
    .trim()
    .notEmpty()
    .isInt()
    .isLength({min: 6})
    .withMessage("Informe um indentificador de matrícula válido"),
    body('nome_usuario')
    .trim()
    .notEmpty()
    .contains(' ')
    .withMessage("Informe corretamente seu nome"),
    body('senha_usuario')
    .trim()
    .notEmpty()
    .isLength({min: 6})
    .withMessage("Informe uma senha com pelo menos 6 caracteres")
];

const validationLogin = 
[
    body('id_matricula')
    .trim()
    .notEmpty()
    .isInt()
    .isLength({min: 6})
    .withMessage("Informe um indentificador de matrícula válido"),
    body('senha_usuario')
    .trim()
    .notEmpty()
    .isLength({min: 6})
    .withMessage("Informe uma senha com pelo menos 6 caracteres")
]

export {validationsUser, validationLogin};