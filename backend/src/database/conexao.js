// import mysql2 from "mysql2/promise";

// async function conectarBd() {
//   if (global.conexao) return global.conexao;

//   try {
//     const conexao = await mysql2.createConnection({
//       host: "localhost",
//       database: "bd_malwee",
//       password: "97224404",
//       user: "root",
//     });
//     global.conexao = conexao;
//     return conexao;
//   } catch (e) {
//     console.log(e);
//   }
// }

// export default conectarBd;

import mysql2 from "mysql2/promise";

async function conectarBd() {
  if (global.conexao) return global.conexao;

  try {
    const conexao = await mysql2.createConnection({
      host: "localhost",
      database: "novoBd",
      password: "",
      user: "root",
<<<<<<< HEAD
      port: 3307
=======
      port: 3306,
>>>>>>> 8f47b82f725646654bbf484df35fdf35fba44580
    });
    global.conexao = conexao;
    return conexao;
  } catch (e) {
    console.log(e);
  }
}

export default conectarBd;
