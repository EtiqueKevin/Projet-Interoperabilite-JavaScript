
import { getDepartement } from './ip.js';

async function SarsByIp (InfoIp) {
    try {
        const department = await getDepartement(InfoIp.longitude, InfoIp.latitude);
        let datePrec = new Date();
        datePrec.setFullYear(datePrec.getFullYear() - 2);
        const date = datePrec.toISOString().split('T')[0];
        let dataTab = [];
        let page = 1;
        let data = null;
        while (true) {
            const url = `https://tabular-api.data.gouv.fr/api/resources/5c4e1452-3850-4b59-b11c-3dd51d7fb8b5/data/?dep__exact=${department}&date__greater=${date}&page=${page}&page_size=50`;  
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (!data.data || data.data.length === 0) {
                    break;
                }   
                dataTab = dataTab.concat(data.data);
                page++;
            }catch (error) {
                console.error(error);
                break;
            }
        }
        const dataFormatted = dataTab.map((item) => {
            return {
                values: item.hosp,
                labels: item.date
            }
        });
        return {
            data: dataFormatted,
            department: department
        }
    } catch (error) {
        console.error(error);
    }
}

async function DataMaxeville() {
    let page = 1;
    let dataTab = [];
    while (true) {
        const url = `https://tabular-api.data.gouv.fr/api/resources/2963ccb5-344d-4978-bdd3-08aaf9efe514/data/?page=${page}&page_size=50`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!data.data || data.data.length === 0) {
                break;
            }
            const dataMaxeville = data.data
            .filter(item => item.MAXEVILLE !== null)
            .map(item => ({
                labels: item.semaine,
                values: item.MAXEVILLE
            }));      
            dataTab = dataTab.concat(dataMaxeville);
            page++;
        } catch (error) {
            console.error(error);
            break;
        }
    }
    return dataTab;

}



export { SarsByIp, DataMaxeville };