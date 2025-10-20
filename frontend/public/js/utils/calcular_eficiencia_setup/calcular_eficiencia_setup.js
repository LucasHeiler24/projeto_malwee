export default function calcularEficienciaSetup(dados) {
    return dados.map((dados) => {
        return { ...dados, eficiencia_setup: (dados.setup_totais != 0 && dados.metros_totais != 0) ? dados.setup_totais / dados.metros_totais : 0 }
    })
}