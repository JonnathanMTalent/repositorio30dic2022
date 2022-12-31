//peticion beneficios. (cambiar la url, selector de los beneficios, corte para el inicio de los beneficios y corte para el fin de los beneficios.)
async function traerBeneficios(url, selector, inicio, fin) {
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        // const url = `https://www.sri.com/careers/` // poner acá la url donde estan los beneficios
        // const selector = `div[class="gb-accordion-text"]`; //poner acá el selector de los beneficios.
        const resp = await fetch(url, {
            "credentials": "omit",
            "headers": {
                "Accept": "*/*",
            },
            "referrer": url,
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html');
        if (doc.querySelector(selector)) {
            var source_benefit = doc.querySelector(selector).textContent.trim();
            //hacemos el recorte de forma habitual            
            if (source_benefit.search(inicio) > -1) {
                source_benefit = removeTextBefore(source_benefit, inicio, true);
                // job.source_benefit = removeTextBefore(job.source_benefit, '', true);         
                source_benefit = removeTextAfter(source_benefit, fin, true);
                source_benefit = source_benefit.trim();
            }
            msg(`${"\x1b[32m"+source_benefit}`)
            return `<p><h3>Benefits</h3><br>${source_benefit}</p>`;
        } else {
            return undefined;
        }
    } catch (err) {
        throw err;
    }
}
//ejemplo de uso:
//Poner lo siguiente despues del job.html = full_html.innerHTML.trim();
//job.html += await traerBeneficios(`https://www.sri.com/careers/`, `div[class="gb-accordion-text"]`, `Available benefits`, `WELLNESS AT SRI`);
//job.source_benefit = await traerBeneficios(`https://www.sri.com/careers/`, `div[class="gb-accordion-text"]`, `Available benefits`, `WELLNESS AT SRI`);