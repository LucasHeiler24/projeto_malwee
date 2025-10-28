import cors from "cors";
import express from "express";
import routerDados from "../router/Dados.js";
import routerUser from "../router/User.js";
import routerHistorico from "../router/Historico.js";
import routerComparacao from "../router/Comparacao.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/dados", routerDados);
app.use("/user", routerUser);
app.use("/historico", routerHistorico);
app.use("/comparacao", routerComparacao);

app.listen(8000, () => {
  console.log("Servidor rodando em: http://localhost:8000");
});
