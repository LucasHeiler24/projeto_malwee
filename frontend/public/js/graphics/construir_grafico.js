export default function construirGrafico(options, data, htmlGrafico, typeGrafico) {
    return new Chart(htmlGrafico, {
        type: typeGrafico,
        data,
        options
    });
}