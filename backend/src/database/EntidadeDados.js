import conectarBd from "./conexao.js";

async function pegarDadosMesEAnoEscolhido(mesEscolhidoEAno) {
  try {
    const conexao = await conectarBd();

    // const [rows] = await conexao.query("SELECT * FROM dados WHERE data_historico LIKE ?", [`%${mesEscolhidoEAno}%`]);

    const [rows] = await conexao.query("SELECT * FROM novocsv WHERE data_historico LIKE ?", [`%${mesEscolhidoEAno}%`]);
    

    return rows;
  } catch (e) {
    return e;
  }
}

export { pegarDadosMesEAnoEscolhido };
