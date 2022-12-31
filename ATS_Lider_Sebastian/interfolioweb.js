//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 1,
        "limit": 0,
        "jobCount": 0
    };
    return out;
})();
//extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;

    //do {
    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    $.ajax({
        url: 'https://logic.interfolio.com/byc-search/' + window.location.href.split('/').slice(0, -1).pop() + '/public_job_boards?limit=100&page=' + out.pass_it.offSet + '&sort_by=date&sort_order=desc', //link del json
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache, no-store, must-revalidate",
            "expires": "-1",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.results;
            out.pass_it.limit = result.total_count;
            for (let elem of json) {
                var job = {};
                job.reqid = elem.legacy_position_id;
                job.title = elem.name;
                job.source_location = elem.location;
                job.location = job.source_location;
                job.url = 'https://apply.interfolio.com/' + elem.legacy_position_id;
                var dateAux = new Date(elem.open_date);
                job.dateposted_raw = dateAux.toLocaleDateString("en-US");

                var full_html = document.createElement("div");
                full_html.innerHTML = elem.description + elem.qualifications;

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

                    if (typeof cleanHTML == "undefined") cleanHTML = function (x) {
                        return x
                    };
                    if (typeof msg == "undefined") msg = console.log;

                    job.html = full_html.innerHTML.trim();

                    //job.html = removeTextBefore(job.html, '', false);
                    //job.html = removeTextAfter(job.html, '', true);

                    job.html = cleanHTML(job.html);
                    var tmp = document.createElement('div');
                    tmp.innerHTML = job.html;
                    job.jobdesc = tmp.textContent.trim();
                    job.jobdesc = cleanHTML(job.jobdesc);
                }
                job.temp = "96";
                jobs.push(job);
                out.pass_it.jobCount += 1;
            }
            //counter += 1;
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter < limit);

    out["jobs"] = jobs;
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
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.jobCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();