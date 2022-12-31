//Extract
//Usar el link así: https://careers.smartrecruiters.com/Torstar
(function() {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;
    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    msg('https://api.smartrecruiters.com/v1/companies' + window.location.pathname + '/postings?limit=100&offset=' + out.pass_it.offSet) //link del json)
    $.ajax({
        url: 'https://api.smartrecruiters.com/v1/companies' + window.location.pathname + '/postings?limit=100&offset=' + out.pass_it.offSet, //link del json
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Opera GX\";v=\"83\", \"Chromium\";v=\"97\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "json",
        async: false,
        success: function(result) {
            json = result.content;
            out.pass_it.limit = result.totalFound;
            for (let elem of json) {
                var job = {};
                job.reqid = elem.refNumber;
                job.title = elem.name;
                job.source_location = [];
                job.source_location.push(elem?.location?.city);
                job.source_location.push(elem?.location?.region);
                job.source_location.push(elem?.location?.country?.toUpperCase());
                job.source_location = job.source_location.filter(Boolean).join(", ");
                job.location = job.source_location;
                job.url = 'https://jobs.smartrecruiters.com/' + elem?.company?.identifier + '/' + elem.id;
                job.dateposted_raw = elem.releasedDate;
                job.source_jobtype = elem?.typeOfEmployment?.label;
                job.temp = "96";
                jobs.push(job);
            }
        },
        error: function(error) {
            msg(error);
        }
    });
    out["jobs"] = jobs;
    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 100;
    if (out.pass_it.offSet < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0
    };
    return out;
})();
//jobdata
(function () {
    var out = {};
    var jsonDesc;
    var job = {};
    var full_html = document.createElement('div');
    $.ajax({
        url: 'https://api.smartrecruiters.com/v1/companies/' + window.location.href.split('/').slice(0, -1).pop() + '/postings/' + window.location.href.split('/').pop(), //link del json
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Opera GX\";v=\"83\", \"Chromium\";v=\"97\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "json",
        async: false,
        success: function (result) {
            jsonDesc = result.jobAd.sections;
            for (let elem of Object.keys(jsonDesc)) {
                full_html.innerHTML += "<h3>" + jsonDesc[elem].title + "</h3><br/>" + jsonDesc[elem].text + "<br/>";
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
            if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
            if (typeof msg == "undefined") msg = console.log;
            job.html = full_html.innerHTML.trim();
            //job.html = removeTextBefore(job.html, '', false);
            //job.html = removeTextAfter(job.html, //, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
        },
        error: function (error) {
            msg(error);
        }
    });
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