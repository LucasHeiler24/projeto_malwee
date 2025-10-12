const sideBar = document.getElementById('sidebar');
const btnAumentarSideBar = document.getElementById('btnAmpliarSideBar');
const btnDiminuirSideBar = document.getElementById('btnDiminuirSideBar');
const logo = document.getElementById('logo');

btnDiminuirSideBar.style.display = 'none';
btnAumentarSideBar.addEventListener('click', () => {
    btnAumentarSideBar.style.display = 'none';
    btnDiminuirSideBar.style.display = 'block';

    sideBar.style.width = '220px';
    logo.style.width = '100px';

    document.getElementById('homeSideBar').textContent = 'Home';
    document.getElementById('graficoSideBar').textContent = 'Gráficos mensal';
    document.getElementById('diferencaSideBar').textContent = 'Diferença mensal';
    document.getElementById('analiseSideBar').textContent = 'Análise por período';
    document.getElementById('historicoSideBar').textContent = 'Histórico';
    document.getElementById('logoutSideBar').textContent = 'Log-out';

    btnDiminuirSideBar.addEventListener('click', () => {
        btnAumentarSideBar.style.display = 'block';
        btnDiminuirSideBar.style.display = 'none';

        sideBar.style.width = '80px';
        logo.style.width = '70px';

        document.getElementById('homeSideBar').textContent = '';
        document.getElementById('graficoSideBar').textContent = '';
        document.getElementById('diferencaSideBar').textContent = '';
        document.getElementById('analiseSideBar').textContent = '';
        document.getElementById('historicoSideBar').textContent = '';
        document.getElementById('logoutSideBar').textContent = '';
    })
});

document.getElementById('btnHomeSideBar').addEventListener('click', () => window.location.href = './index.html');
document.getElementById('btnGraficoSideBar').addEventListener('click', () => window.location.href = './graficos.html');
document.getElementById('btnDiferencaSideBar').addEventListener('click', () => window.location.href = './diferenca_mensal.html');
document.getElementById('btnAnaliseSideBar').addEventListener('click', () => window.location.href = './analise_periodo.html');
document.getElementById('btnHistoricoSideBar').addEventListener('click', () => window.location.href = './historico.html');
document.getElementById('btnLogoutSideBar').addEventListener('click', () => window.location.href = './index.html');