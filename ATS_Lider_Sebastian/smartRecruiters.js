//Extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;

    //do {
    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
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
        success: function (result) {
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
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();
//extractFetch
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    try {
        let jobs = [];
        let resp = await fetch(`https://api.smartrecruiters.com/v1/companies${window.location.pathname}/postings?limit=100&offset=${out.pass_it.offSet}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "sec-ch-device-memory": "8",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-arch": "\"x86\"",
                "sec-ch-ua-full-version-list": "\".Not/A)Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"103.0.5060.114\", \"Chromium\";v=\"103.0.5060.114\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-model": "",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": `https://careers.smartrecruiters.com/${window.location.pathname}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        //Texto
        // let data = await resp.text();
        // let doc = document.createElement('div');
        // doc.innerHTML = data;
        // let htmlJobs = doc.querySelectorAll('Selector');

        //JSON
        const data = await resp.json();
        let htmlJobs = data.content;

        out.pass_it.limit = data.totalFound;

        for (var i in htmlJobs) {
            let elem = htmlJobs[i];
            let job = {};
            job.reqid = elem.refNumber;
            job.title = elem.name;
            job.source_location = [];
            job.source_location.push(elem?.location?.city);
            job.source_location.push(elem?.location?.region);
            job.source_location.push(elem?.location?.country?.toUpperCase());
            job.source_location = job.source_location.filter(Boolean).join(", ");
            job.location = job.source_location;
            job.url = `https://jobs.smartrecruiters.com/${elem?.company?.identifier}/${elem.id}`;
            job.dateposted_raw = elem.releasedDate;
            job.source_jobtype = elem?.typeOfEmployment?.label;
            job.temp = "96";
            jobs.push(job);
        }
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
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
//jobdataFetch
(async () => {
    let out = {};
    //out["pass_it"] = pass_it;

    try {
        let job = {};

        let resp = await fetch(`https://api.smartrecruiters.com/v1/companies/${window.location.href.split('/').slice(0, -1).pop()}/postings/${window.location.href.split('/').pop()}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "sec-ch-device-memory": "8",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-arch": "\"x86\"",
                "sec-ch-ua-full-version-list": "\".Not/A)Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"103.0.5060.114\", \"Chromium\";v=\"103.0.5060.114\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-model": "",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": `https://careers.smartrecruiters.com/${window.location.pathname}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        //Texto
        // let data = await resp.text();
        // let doc = document.createElement('div');
        // doc.innerHTML = data;
        // let htmlJobs = doc.querySelectorAll('Selector');

        //JSON
        const data = await resp.json();
        let jsonDesc = data.jobAd.sections;

        let full_html = document.createElement('div');
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

        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;

        job.html = full_html.innerHTML.trim();

        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextAfter(job.html, //, true);

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        out["job"] = job;
    } catch (err) {
        console.log(err)
    }
    return out;
})();

//extract Filtro de location US
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;

    //do {
    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
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
        success: function (result) {
            json = result.content;
            out.pass_it.limit = result.totalFound;
            for (let elem of json) {
                var job = {};
                job.reqid = elem.refNumber;
                job.title = elem.name;

                job.source_location = [];
                if (elem?.location?.country?.toUpperCase() == 'US') {
                    job.source_location.push(elem?.location?.city);
                    job.source_location.push(elem?.location?.region);
                    job.source_location = job.source_location.filter(Boolean).join(", ");
                } else {
                    var auxPath = getPath(elem, "Country");
                    auxPath = auxPath.split('.').slice(0, -1).join('.') + '.valueLabel';
                    job.source_location.push(elem?.location?.city);
                    job.source_location.push(setToValue(elem, auxPath));
                    job.source_location = job.source_location.filter(Boolean).join(", ");
                }


                job.location = [];
                job.location.push(elem?.location?.city);
                job.location.push(elem?.location?.region);
                job.location.push(elem?.location?.country?.toUpperCase());
                job.location = job.location.filter(Boolean).join(", ");

                job.url = 'https://jobs.smartrecruiters.com/' + elem?.company?.identifier + '/' + elem.id;
                job.dateposted_raw = elem.releasedDate;
                job.source_jobtype = elem?.typeOfEmployment?.label;
                job.temp = "96";
                jobs.push(job);
            }
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();
function getPath(obj, value, path) {
    try {
        if (typeof obj !== 'object') {
            return;
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var t = path;
                var v = obj[key];
                if (!path) {
                    newPath = key;
                } else {
                    newPath = path + '.' + key;
                }
                if (v === value) {
                    return newPath;
                } else if (typeof v !== 'object') {
                    newPath = t;
                }
                var res = getPath(v, value, newPath);
                if (res) {
                    return res;
                }
            }
        }
    } catch (e) {
        msg(e.message);
    }
}
function setToValue(obj, path) {
    path = path.split('.');
    for (var i of path) {
        obj = obj[i];
    }
    return obj
}