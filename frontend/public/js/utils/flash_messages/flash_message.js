export default function flashMessage(htmlDiv, text, type) {
    htmlDiv.style.display = 'flex';
    if (type == 'error') {
        htmlDiv.style = `background: rgb(138, 0, 34); padding: 20px; border-radius: 5px; color: #fff; justify-content:center; align-items:center`;
        htmlDiv.innerHTML = `<p>${text}</p>`;

        return setTimeout(() => { htmlDiv.style.display = 'none' }, 5000);
    }

    htmlDiv.style = `background: rgb(73, 163, 0); padding: 20px; border-radius: 5px; color: #fff; justify-content:center; align-items:center`;
    htmlDiv.innerHTML = `<p>${text}</p>`;

    return setTimeout(() => { htmlDiv.style.display = 'none' }, 2000);
}