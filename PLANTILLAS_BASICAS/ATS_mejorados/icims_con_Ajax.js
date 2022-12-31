/* -------------------------------------------------------------------------- */
/*                             INFINITY PAGINATION                            */
/* -------------------------------------------------------------------------- */
(function () {
    var out = {};
    if (!pass_it['offSet']) {
        out['pass_it'] = {
            "offSet": 0,
            "limit": 0
        };
    } else {
        out['pass_it'] = pass_it;
    }
    return out;
})();
/* -------------------------------------------------------------------------- */
/*                                   EXTRACT                                  */
/* -------------------------------------------------------------------------- */
(function () {
    var jobs = [];
    var out = {};
    out.pass_it = pass_it.offSet ? pass_it : {
        "offSet": 0,
        "limit": 0
    }
    var counter = 0;
    var limit = 0;
    var json;
    //do {
    //var data = {};
    $.ajax({
        url: window.location.origin + window.location.pathname + '?in_iframe=1&pr=' + out.pass_it.offSet,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "iframe",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "upgrade-insecure-requests": "1"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
            json = document.createElement('div');
            json.innerHTML = result;
            if (out.pass_it.limit == 0)
                if (json.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child'))
                    out.pass_it.limit = json.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child').href.split('pr=').pop().split('&').shift().trim();
            //msg('Counter: ' + out.pass_it.offSet + '\nLimit: ' + out.pass_it.limit);
            //var iframeDocument = json.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
            var html_jobs = json.querySelectorAll('div[class*="iCIMS_JobsTable"] > div[class="row"]');
            for (var x in html_jobs) {
                if (typeof html_jobs[x] == "function") continue;
                if (typeof html_jobs[x] == "number") continue;
                var job = {};
                var elem = html_jobs[x];
                job.title = elem.querySelector("div.col-xs-12.title a").textContent.trim().replace("External Title", "").trim().replace('Job Title', '');
                job.reqid = elem.querySelector('div.col-xs-6.header.left > span:nth-last-child(1)').textContent.trim();
                if (job.reqid.search(/[a-zA-Z]/g) > -1) {
                    job.reqid = elem.querySelector("dl > dd > span").textContent.trim()
                };
                job.url = elem.querySelector("a").href.trim() + "&mode=job&iis=Neuvoo";
                job.location = elem.querySelector("dl > dd > span").textContent.trim();
                job.source_location = elem.querySelector("dl > dd > span").textContent.trim();
                if (job.location.search(/\d/g) > -1) {
                    job.location = elem.querySelector('div.col-xs-6.header.left > span:nth-last-child(1)').textContent.replace(/Remote,/gi, '').trim();
                    job.source_location = elem.querySelector('div.col-xs-6.header.left > span:nth-last-child(1)').textContent.trim()
                };
                //job.location = job.location.split('-').reverse().join().replace(',', ', ').trim();
                job.temp = '[07/15/2022]';
                let salary = Array.from(elem.querySelectorAll('.iCIMS_JobHeaderGroup dl')).filter(tmp => tmp.textContent.search(/min|max/gmi) > -1)
                if (salary.length > 0) {
                    salary.forEach(
                        tmp => {
                            if (tmp.textContent.search(/min/gmi) > -1) job.salary_min = tmp.textContent.replace(/(\r\n|\n|\r|\t)/gm, "").split(/min/gmi).pop();
                            if (tmp.textContent.search(/max/gmi) > -1) job.salary_max = tmp.textContent.replace(/(\r\n|\n|\r|\t)/gm, "").split(/max/gmi).pop();
                        }
                    );
                }
                job.source_salary = '';
                job.source_salary += job.salary_min ? job.salary_min : '';
                job.source_salary += job.salary_min ? ` - ${job.salary_min}` : '';
                let HQ = "Minneapolis, MNY"; // HQ de la compañia 
                let Limpieza = new RegExp('operations|center|- remote|Remote-|-Minneapolis Metro', 'gmi'); // Regex para hacer limpieza a las locaciones (Lo que no queremos que se muestre);
                let HQSerach = new RegExp('remote|HOME|Appleton', 'gmi');
                if (job.location.indexOf("|") > -1) {
                    var array = job.location.split("|");
                    //for (var i = 0; i < array.length; i++){      
                    for (var i in array) {
                        var jobx = {
                            ...job
                        };
                        jobx.location = array[i].trim();
                        jobx.location = jobx.location.split("-").reverse().join(", ").replace(Limpieza, "");
                        if (jobx.location.search(HQSerach) > -1) jobx.location = HQ;
                        jobs.push(jobx);
                    }
                } else {
                    job.location = job.location.split("-").reverse().join(", ").replace(Limpieza, "");
                    if (job.location.search(HQSerach) > -1) job.location = HQ;
                    jobs.push(job);
                }
            }
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter <= limit);
    out["jobs"] = jobs;
    return out;
})();
/* -------------------------------------------------------------------------- */
/*                                 PAGINATION                                 */
/* -------------------------------------------------------------------------- */
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet++;
    msg(out.pass_it)
    if (out.pass_it.offSet < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
/* -------------------------------------------------------------------------- */
/*                                   BEFORE                                   */
/*                                 DESCRIPTION                                */
/* -------------------------------------------------------------------------- */
(function () {
    var out = {};
    out.iframeSelector = "#icims_content_iframe";
    out.iframeWaitFor = "div.iCIMS_JobContent";
    return out;
})();
/* -------------------------------------------------------------------------- */
/*                                 DESCRIPTION                                */
/* -------------------------------------------------------------------------- */
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];
    var iframeDocument = document.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
    var full_html = iframeDocument.querySelector('div[class="iCIMS_JobContent"]');
    if (full_html) {
        var remove_selectors = ['div[class="iCIMS_Logo"]', 'div[class="iCIMS_PageFooter"]', 'div[class="iCIMS_JobOptions"]', 'a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                }
            });
        }
        for (const a of full_html.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
        }
        for (const a of full_html.querySelectorAll('dt')) {
            if (a.textContent.search(/Type/ig) > -1) {
                if (a.nextElementSibling.textContent.trim() != '') {
                    job.source_jobtype = a.nextElementSibling.textContent.trim();
                    a.nextElementSibling.remove();
                    a.remove();
                }
            }
        }
        for (const item of document.querySelectorAll('[class="col-xs-6 header right"]')) {
            if (item.textContent.includes("Posted Date")) {
                job.dateposted_raw = item.textContent.split("(").pop().split(" ").shift().trim();
            }
        }
        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim();
        job.html = removeTextBefore(job.html, 'Overview', false);
        job.html = removeTextAfter(job.html, 'Need help finding the right job', true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
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