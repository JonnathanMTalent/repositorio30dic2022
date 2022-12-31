/*
Esta función nos permite extraer los beneficios de los jobs en caso de que estén en una URL aparte
 y es común entre todos los jobs. Algunas veces las paginas no permiten hacer la petición por el uso
  de algún firewall pero en caso de que se pueda hacer es la mejor manera.
*/


async function getBenefits(url, selector, before, after) {
    let benefits = '';
    const removeSelectors = ['[class="carh"]'];
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image' +
                    '/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'es-419,es;q=0.9',
                'cache-control': 'max-age=0',
                'sec-gpc': '1',
                'upgrade-insecure-requests': '1',
            },
            body: null,
        });
        const Data = await response.text();
        let htmlBenefits = new DOMParser().parseFromString(Data, 'text/html').body;
        if (removeSelectors.length > 0) {
            removeSelectors.forEach(elem => {
                if (htmlBenefits.querySelector(elem)) {
                    let items = htmlBenefits.querySelectorAll(elem);
                    for (const selector of items) selector.remove();
                }
            });
        }
        benefits = htmlBenefits.querySelector(selector).textContent.trim();
        if (before) benefits = benefits.split(before).pop().trim();
        if (after) benefits = benefits.split(after).shift().trim();
    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
        throw error;
    }
    return benefits;
}
job.source_benefit = await getBenefits('https://www.benefits.com', '.benefits', 'Benefits', 'About us');






// FETCH BENEFITS YULIANA

(async () => {
    let out = {};
    let job = [];
    
        out.pass_it = {
        "benefit":"",
        "benefitRes":"",
        "cont": 1
    };




    const url = `https://careers.bootbarn.com/`;

    try {
        
        const resp = await fetch(url),
            html = await resp.text(),
            div = document.createElement('div');
        div.innerHTML = html;


        let benefits = Array.from(div.querySelectorAll('h3')).filter(x => x.textContent.trim() == 'Employee Perks');
        if (benefits.length > 0) {
            job.source_benefit = benefits[0].textContent.trim() + ' ' + benefits[0].nextElementSibling.textContent.trim();
            out.pass_it.benefit = job.source_benefit;
            out.pass_it.benefitRes=="" ? out.pass_it.benefitRes=out.pass_it.benefit :out.pass_it.benefitRes=out.pass_it.benefitRes;
        }


    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
    }


    return out;
})();



