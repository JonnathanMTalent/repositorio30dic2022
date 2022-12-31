//fetch json oculto Id/Json
(async () => {
    let out = {};
    var job = {};
    // out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {        
        const resp = await fetch(window.location.href, {
            "credentials": "include",
            "headers": {
                "Accept": "*/*"
            },
            "referrer": window.location.href,
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.text();
        // msg(data)
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html')
        let all = doc.querySelectorAll(`script[type="application/ld+json"]`);
        for(let x of all){
            if(x.textContent.match(/"@type" : "JobPosting"/)){ //cambiar el como se ve el json
                var dataJson = JSON.parse(x.textContent.trim())
                var full_html = document.createElement(`div`);
                full_html.innerHTML = dataJson.description; //cambiar la etiqueta en la que viene eljson
                if(dataJson.hiringOrganization){ //cambiar los demás datos a extraer. 
                    job.source_empname = dataJson.hiringOrganization.name;
                    job.logo = dataJson.hiringOrganization.logo;
                }
            }
        }
        if (full_html) {
            for (const a of full_html.querySelectorAll('p, span, li')) {
                if (a.textContent.search(/@|http|www./ig) > -1) {
                    a.remove();
                }
            }
            var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
            if (remove_selectors.length > 0) {
                remove_selectors.forEach(remove_selector => {
                    for (const a of full_html.querySelectorAll(remove_selector)) {
                        a.remove();
                    }
                });
            }
            job.html = full_html.innerHTML.trim();
            job.html = removeTextBefore(job.html, `Job Summary`, false);
            //job.html = removeTextBefore(job.html, ``, false);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim().replace(/<[^>]*>?/g, '');
            job.jobdesc = cleanHTML(job.jobdesc);
        }
        out["job"] = job;
        console.table(job)
        return out;
    } catch (err) {
        throw err;
    }
})()
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