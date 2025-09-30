import express from "express";
import cors from "cors";
import router from "../router/Dados.js";
import conectarBd from "../database/conexao.js";

const app = express();
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}))

app.use('/dados', router);

app.listen(8000);