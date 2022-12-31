//infinite pagination
(function() {
    var out = {};
    out["pass_it"] = {
        "cont": 1,
        seguir: false,
        page:0
    };
    return out;
})();
//EXTRACT
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch(`${window.location.href}${pass_it.page}/`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html')
        const html_jobs = doc.querySelectorAll('tr[class="data-row"]');
        //paginacion
        out.pass_it.seguir = false;
        var selector = `ul[class="pagination"] a`;
        out["pass_it"].cont += 1;
        var all_elems = doc.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento) {
            if (elemento.textContent.trim() == out["pass_it"].cont) {
                out.pass_it.seguir = true;
            }
        });
        //fin paginacion
        for (var x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            var job = {};
            var elem = html_jobs[x];
            job.title = elem.querySelector('td[class="colTitle"] span[class="jobTitle hidden-phone"]  a').textContent.trim();
            job.url = elem.querySelector('td[class="colTitle"] span[class="jobTitle hidden-phone"]  a').href.trim();
            job.source_location = elem.querySelector('td[class="colLocation hidden-phone"] span[class="jobLocation"]').textContent.trim();
            job.location = job.source_location;
            job.dateposted_raw = elem.querySelector('td[class="colDate hidden-phone"] span[class="jobDate"]').textContent.trim();
            job.dateposted_raw = job.dateposted_raw.replaceAll(',', '').split(' ');
            job.dateposted_raw[0] = job.dateposted_raw[0].replace("Jan", "01")
                .replace("Feb", "02")
                .replace("Mar", "03")
                .replace("Apr", "04")
                .replace("May", "05")
                .replace("Jun", "06")
                .replace("Jul", "07")
                .replace("Aug", "08")
                .replace("Sep", "09")
                .replace("Oct", "10")
                .replace("Nov", "11")
                .replace("Dec", "12");
            job.dateposted_raw = job.dateposted_raw[0] + '/' + job.dateposted_raw[1] + '/' + job.dateposted_raw[2]
            job.temp = '09/20/2022 Juan Bermudez';
            jobs.push(job);
        }
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();
//pagination
(function() {
    var out = {};
    out.pass_it = pass_it;
    out.has_next_page = false;
    out.pass_it.page += 25;
    if (out.pass_it.seguir) {
        out.has_next_page = true
    }
    return out;
})();
//Description
(function() {
    var out = {};
    var job = {};
    //var jobPassit = pass_it["job"];
    var full_html = document.querySelector('span[class="jobdescription"]');
    if (full_html) {
        if (document.querySelector('span[data-careersite-propertyid="customfield1"]')) {
            job.reqid = document.querySelector('span[data-careersite-propertyid="customfield1"]').textContent.trim();
        }
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
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim().replace(/((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g, ``).trim();
        job.html = removeTextBefore(job.html, 'Cooper Tire offers an entirely unique work experience because no matter', true);
        job.html = removeTextAfter(job.html, 'Cooper Tire is an Equal Employment', true);
        job.html = removeTextAfter(job.html, 'Cooper Tire is an Equal Employment Opportunity', true);
        job.html = removeTextBefore(job.html, `Job Summary`, false);
        // job.html = removeTextBefore(job.html, ``, false);
        // job.html = removeTextBefore(job.html, ``, false);
        // job.html = removeTextBefore(job.html, ``, false);
        job.html = removeTextAfter(job.html, /EEO Statement/g, true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        job.source_benefit = getBenefits(job.jobdesc,/Benefits & EEO|benefits package for our employees and their families./g,/Zachry Construction|and many more/g); 
    }
    printJob(job)
    out["job"] = job;
    return out;
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
function getBenefits(html, recorteArriba, recorteAbajo) {
    //benefit
    var newHtml = html;
    if (newHtml.search(recorteArriba) > -1) {
        newHtml = removeTextBefore(newHtml, recorteArriba, true);
        newHtml = removeTextAfter(newHtml, recorteAbajo, true);
        newHtml = newHtml.trim();
    } else {
        newHtml = undefined
    }
    return newHtml
}
function printJob(job) {
    let claves = Object.keys(job);
    msg(`\n \x1b[31m INICIO JOB.....\x1b[39m`)
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if (claves[i] == "jobdesc" || claves[i] == "html") {
            continue
        }
        msg(`${"\x1b[32m"+claves[i]}:`)
        msg(job[clave])
    }
    msg(`\x1b[31m FIN JOB.....\n \x1b[39m`)
}