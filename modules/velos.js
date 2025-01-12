async function creerMapVelo (ipInfo) {
    try {
        let response = await fetch('https://api.cyclocity.fr/contracts/nancy/gbfs/station_information.json');
        let data = await response.json();
        const station_info = data.data.stations;

        response = await fetch('https://api.cyclocity.fr/contracts/nancy/gbfs/station_status.json');
        data = await response.json();
        const station_status = data.data.stations;

        var map = L.map('map').setView([ipInfo.latitude, ipInfo.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        let stations = station_info.map(info => {
            let status = station_status.find(status => status.station_id === info.station_id);
            return {
                ...info,
                ...status
            };
        });

        stations.forEach(station => {
            let marker = L.marker([station.lat, station.lon]).addTo(map);
            marker.bindPopup(`
                <h3>${station.name}</h3>
                <p>Nombre de vélos disponibles : ${station.num_bikes_available}</p>
                <p>Nombre de places disponibles : ${station.num_docks_available}</p>
            `);
        });
    } catch (error) {
        console.error(error);
    }
}

export { creerMapVelo };