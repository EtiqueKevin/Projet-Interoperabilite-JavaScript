async function getMeteo (infoIp) {
    const url = `https://www.infoclimat.fr/public-api/gfs/xml?_ll=${infoIp.latitude},${infoIp.longitude}&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2`
    
    const parser = new DOMParser();
    const xsltProcessor = new XSLTProcessor();


    const xslResponse = await fetch("meteo.xsl"); 
    const xslText = await xslResponse.text(); 
    const xslStylesheet = parser.parseFromString(xslText, "application/xml");
    xsltProcessor.importStylesheet(xslStylesheet);

    const xmlResponse = await fetch(url);
    const xmlText = await xmlResponse.text();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const fragment = xsltProcessor.transformToFragment(xmlDoc, document); 

    document.getElementById("meteo-container").appendChild(fragment);
}

export { getMeteo };