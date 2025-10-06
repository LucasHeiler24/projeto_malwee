import cors from "cors";
import express from "express";
import conectarBd from "../database/conexao.js";
import router from "../router/Dados.js";
import routerUser from "../router/User.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/dados", router);
app.use("/user", routerUser);

app.listen(8000, () =>{
  console.log("Servidor rodando em: http://localhost:8000");
});
