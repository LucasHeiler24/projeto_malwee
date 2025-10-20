const header = document.querySelector('header');
const main = document.querySelector('main');
main.style = 'margin-left: 90px; padding:20px';

header.addEventListener('mouseover', function () {
    this.style.width = '260px';

    document.getElementById('linkHeaderDashboard').textContent = "Dashboard";
    document.getElementById('linkHeaderDiferenca').textContent = "Comparação";
    document.getElementById('linkHeaderHistorico').textContent = "Histórico";
    document.getElementById('linkHeaderLogout').textContent = "Log-out";

    this.addEventListener('mouseout', function () {
        document.getElementById('linkHeaderDashboard').textContent = "";
        document.getElementById('linkHeaderDiferenca').textContent = "";
        document.getElementById('linkHeaderHistorico').textContent = "";
        document.getElementById('linkHeaderLogout').textContent = "";
        this.style.width = '90px';
    })
});

document.getElementById('headerDashboard').addEventListener('click', () => window.location.href = './dashboard.html')
document.getElementById('headerDiferenca').addEventListener('click', () => window.location.href = './comparacao.html')
document.getElementById('headerHistorico').addEventListener('click', () => window.location.href = './historico.html')
document.getElementById('headerLogout').addEventListener('click', () => window.location.href = './login.html')