//peticion beneficios.
(async () => {    
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {        
        const url = `https://www.callawaygolf.com/careers/` // poner acá la url donde estan los beneficios
        const selector = `div[id="page-content"] div[class="col-md-12"]`; //poner acá el selector de los beneficios.
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
        if(doc.querySelector(selector)){            
            job.source_benefit = doc.querySelector(selector).textContent.trim();
            //hacemos el recorte de forma habitual            
            if (job.source_benefit.search(/Benefits/) > -1) {                
                job.source_benefit = removeTextBefore(job.source_benefit, `Benefits`, true);
                // job.source_benefit = removeTextBefore(job.source_benefit, '', true);         
                job.source_benefit = removeTextAfter(job.source_benefit, `Employee Development and Engagement`, true);
                job.source_benefit = removeTextAfter(job.source_benefit, `Equal Opportunity Employer`, true);
                job.source_benefit = removeTextAfter(job.source_benefit, `E-Verify`, true);
                // job.source_benefit = removeTextAfter(job.source_benefit, ``, true);
                // job.source_benefit = removeTextAfter(job.source_benefit, ``, true);
            }
            msg(job.source_benefit)
        }        
    } catch (err) {
        throw err;
    }
})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}