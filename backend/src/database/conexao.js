import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
async function conectarBd() {
  if (global.conexao) return global.conexao;

  try {
    const conexao = await mysql2.createConnection({
<<<<<<< Updated upstream
      host: process.env.HOST_DATABASE,
      database: process.env.NAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
<<<<<<< HEAD
      user: process.env.USER_DATABASE,
      port: process.env.PORT_DATABASE
=======
      user: process.env.USER_DATABASE
=======
      host: "localhost",
      database: "novoBd",
      password: "",
      user: "root",
      port: 3306,
>>>>>>> Stashed changes
>>>>>>> 62abda71570dd0c2d65fea76bb7234dea8a402e1
    });
    global.conexao = conexao;
    return conexao;
  } catch (e) {
    console.log(e);
  }
}

export default conectarBd;