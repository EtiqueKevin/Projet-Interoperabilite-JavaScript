async function getInfosIp() {
    try{
        const response = await fetch('https://ipapi.co/json/');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getDepartement(longitude, latitude) {
    try{
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.features[0].properties.context.split(', ')[0].trim();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getInfosIp, getDepartement };