export default function chartJs(data, options, htmlGrafico, type) {
    return new Chart(
        htmlGrafico,
        {
            type,
            data,
            options
        }
    )
}