import cors from "cors";
import express from "express";
import conectarBd from "../database/conexao.js";
import router from "../router/Dados.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/dados", router);

app.listen(8000);
