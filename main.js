import { getInfosIp } from "./modules/ip.js";
import { SarsByIp, DataMaxeville } from "./modules/covid.js";
import { creerGraph } from "./modules/chart.js";
import { creerMapVelo } from "./modules/velos.js";
import { getMeteo } from "./modules/meteo.js";
import { getQualiteAir } from "./modules/qualite-air.js";

window.addEventListener('load', async function() {
    const infoIp = await getInfosIp();
    displayDataHosp(infoIp);
    displayDataMaxeville();
    creerMapVelo(infoIp);
    getMeteo(infoIp);
    getQualiteAir();
});

async function displayDataHosp(infoIp) {
    const data = await SarsByIp(infoIp);
    creerGraph('chart-hosp', data.data, 'Hospitilisations à cause du Covid-19 dans le département ' + data.department);
}

async function displayDataMaxeville() {
    const data = await DataMaxeville();
    creerGraph('chart-maxeville', data, 'SARS-CoV-2 dans les eaux de Maxeville');
}