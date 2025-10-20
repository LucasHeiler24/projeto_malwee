const sectionGraficosTiposTecidos = document.getElementById('sectionGraficosTiposTecidos');
const sectionGraficosMetrosProduzidos = document.getElementById('sectionGraficosMetrosProduzidos');
const sectionGraficosTempoProducao = document.getElementById('sectionGraficosTempoProducao');
const sectionGraficosTempoSetup = document.getElementById('sectionGraficosTempoSetup');

sectionGraficosTiposTecidos.style.display = 'flex';
document.getElementById('btnAbrirGraficosTiposTecidos').style = "background: #0e191d; color: #fff;";
sectionGraficosMetrosProduzidos.style.display = 'none';
sectionGraficosTempoProducao.style.display = 'none';
sectionGraficosTempoSetup.style.display = 'none';

const divBtnTiposTecidos = document.getElementById('btnAbrirGraficosTiposTecidos');
const divBtnMetrosProduzidos = document.getElementById('btnAbrirGraficosMetrosProduzidos');
const divBtnTempoProducao = document.getElementById('btnAbrirGraficosTempoProducao');
const divBtnTempoSetup = document.getElementById('btnAbrirGraficosTempoSetup');

divBtnTiposTecidos.addEventListener('click', function () {
    this.style = "background: #0e191d; color: #fff;";
    divBtnMetrosProduzidos.style = "background: #fff; color: #000;";
    divBtnTempoProducao.style = "background: #fff; color: #000;";
    divBtnTempoSetup.style = "background: #fff; color: #000;";


    sectionGraficosTiposTecidos.style.display = 'flex';
    sectionGraficosMetrosProduzidos.style.display = 'none';
    sectionGraficosTempoProducao.style.display = 'none';
    sectionGraficosTempoSetup.style.display = 'none';
});

divBtnMetrosProduzidos.addEventListener('click', function () {
    this.style = "background: #0e191d; color: #fff;";
    divBtnTiposTecidos.style = "background: #fff; color: #000;";
    divBtnTempoProducao.style = "background: #fff; color: #000;";
    divBtnTempoSetup.style = "background: #fff; color: #000;";

    sectionGraficosTiposTecidos.style.display = 'none';
    sectionGraficosMetrosProduzidos.style.display = 'flex';
    sectionGraficosTempoProducao.style.display = 'none';
    sectionGraficosTempoSetup.style.display = 'none';
});

divBtnTempoProducao.addEventListener('click', function () {
    this.style = "background: #0e191d; color: #fff;";
    divBtnTiposTecidos.style = "background: #fff; color: #000;";
    divBtnMetrosProduzidos.style = "background: #fff; color: #000;";
    divBtnTempoSetup.style = "background: #fff; color: #000;";

    sectionGraficosTiposTecidos.style.display = 'none';
    sectionGraficosMetrosProduzidos.style.display = 'none';
    sectionGraficosTempoProducao.style.display = 'flex';
    sectionGraficosTempoSetup.style.display = 'none';
});

divBtnTempoSetup.addEventListener('click', function () {
    this.style = "background: #0e191d; color: #fff;";
    divBtnTiposTecidos.style = "background: #fff; color: #000;";
    divBtnMetrosProduzidos.style = "background: #fff; color: #000;";
    divBtnTempoProducao.style = "background: #fff; color: #000;";

    sectionGraficosTiposTecidos.style.display = 'none';
    sectionGraficosMetrosProduzidos.style.display = 'none';
    sectionGraficosTempoProducao.style.display = 'none';
    sectionGraficosTempoSetup.style.display = 'flex';
});