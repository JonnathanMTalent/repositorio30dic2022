//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        offSet: 0,
        limit: 0,
        jobsCount: 0
    };
    return out;
})();
//Extract
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    try {
        let jobs = [];
        let resp = await fetch(window.location.origin + window.location.pathname + '?in_iframe=1&pr=' + out.pass_it.offSet, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrer": window.location.href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        let data = await resp.text();
        let doc = document.createElement('div');
        doc.innerHTML = data;
        let htmlJobs = doc.querySelectorAll('div[class*="iCIMS_JobsTable"] > div[class="row"]');
        out.pass_it.limit = doc.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child')?.href?.split('pr=')?.pop()?.split('&')?.shift()?.trim();
        msg(`Limit: ${out.pass_it.limit}`);
        for (let elem of htmlJobs) {
            let job = {};
            job.title = elem.querySelector('h2').textContent.trim();
            job.url = elem.querySelector('a').href.split('?').shift().trim() + '?mode=job&iis=Neuvoo"';
            //Tags de arriba
            for (var a of elem.querySelectorAll('div[class*="header"] > span:nth-child(1)')) {
                if (a.textContent.search(/Location/ig) > -1) {
                    job.source_location = a.parentElement.querySelector('span:nth-child(2)').textContent.trim();
                    job.location = a.parentElement.querySelector('span:nth-child(2)').textContent.replace('| ...', '').trim();
                }
                if (a.textContent.search(/Posted Date/ig) > -1) {
                    let dateAux = new Date(a.parentElement.querySelector('span:nth-child(2)').getAttribute('title').split(' ').shift().trim());
                    job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                }
            }
            if (!job.location) {
                job.location = 'Cambridge, ON, CA'; //HQ LOCATION, CHANGE ON EVERY CASE
            }
            //Tags de abajo
            for (var a of elem.querySelectorAll('div[class*="additionalFields"] dl')) {
                if (a.querySelector('dt').textContent.search(/ID|Posting Number/ig) > -1) {
                    job.reqid = a.querySelector('dd').textContent.trim();
                }
                if (a.querySelector('dt').textContent.search(/Tipo de Posición|Type/ig) > -1 && a.querySelector('dd').textContent.match(/Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i)) {
                    job.source_jobtype = a.querySelector('dd').textContent.trim();
                }
                if (a.querySelector('dt').textContent.search(/Fecha de cierre de la postulación|Closed Date/ig) > -1) {
                    let dateAux = new Date(a.querySelector('dd').textContent.trim());
                    job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                }
            }
            job.temp = 96;
            if (job.location.indexOf('|') > -1) {
                var array = job.location.split('|');
                for (let auxLoc of array) {
                    var jobx = {};
                    jobx = {
                        ...job
                    }
                    jobx.location = auxLoc.split('-').reverse().join(', ').trim() + '';
                    jobs.push(jobx);
                }
            } else {
                job.location = job.location.split('-').reverse().join(', ') + '';
                jobs.push(job);
            }
        }
        out["jobs"] = jobs;
    } catch (err) {
        throw err;
    }
    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    //if (out.pass_it.jobsCount < out.pass_it.limit) {
    if (out.pass_it.offSet <= out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//jobdata
(async () => {
    let out = {};
    try {
        let job = {};
        let resp = await fetch(window.location.href.split('?').shift() + '?in_iframe=1', {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrer": window.location.href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        let data = await resp.text();
        let full_html = document.createElement('div');
        full_html.innerHTML = data;
        full_html = full_html.querySelector('div[class="iCIMS_JobContent"]');
        if (full_html) {
            for (const a of full_html.querySelectorAll('p, span, li')) {
                if (a.textContent.search(/@|http|www./ig) > -1) {
                    a.remove();
                }
                if (a.textContent.search(/Starting rate/ig) > -1) {
                    job.source_salary = '$' + a.textContent.split('$').pop().replace(/\*/g, '').trim();
                    a.remove();
                }
            }
            for (const a of full_html.querySelectorAll('dt')) {
                if (a.textContent.search(/Type|Job Classification/ig) > -1) {
                    if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i)) {
                        job.source_jobtype = a.nextElementSibling.textContent.trim();
                        a.nextElementSibling.remove();
                        a.remove();
                    }
                }
                if (a.textContent.search(/Minimum Pay/ig) > -1) {
                    if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/[1-9]/)) {
                        job.source_salary = a.nextElementSibling.textContent.trim();
                        a.nextElementSibling.remove();
                        a.remove();
                    }
                }
                if (a.textContent.search(/Maximum Pay/ig) > -1) {
                    if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/[1-9]/)) {
                        job.source_salary += ' - ' + a.nextElementSibling.textContent.trim();
                        a.nextElementSibling.remove();
                        a.remove();
                    }
                }
            }
            var remove_selectors = ['div[class="iCIMS_JobHeaderGroup"]', 'div[class="iCIMS_Logo"]', 'div[class="iCIMS_PageFooter"]', 'div[class="iCIMS_JobOptions"]', 'a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
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
            job.html = full_html.innerHTML.trim();
            job.html = removeTextBefore(job.html, 'Overview', false);
            job.html = removeTextAfter(job.html, /Need help finding the right job\?|\#[A-Z]/ig, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
        }
        out["job"] = job;
    } catch (err) {
        throw err;
        msg(JSON.stringify(err));
    }
    return out;
})();
function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}