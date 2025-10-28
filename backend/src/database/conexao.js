import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
async function conectarBd() {
  if (global.conexao) return global.conexao;

  try {
    const conexao = await mysql2.createConnection({
      host: process.env.HOST_DATABASE,
      database: process.env.NAME_DATABASE,     
      password: process.env.PASSWORD_DATABASE,
      user: process.env.USER_DATABASE,
      port: process.env.PORT_DATABASE
    });
    global.conexao = conexao;
    return conexao;
  } catch (e) {
    console.log(e);
  }
}

export default conectarBd;