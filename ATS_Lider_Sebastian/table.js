//Infinity
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0
    };
    return out;
})();
//Extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;

    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    $.ajax({
        url: window.location.href + '?startrow=' + out.pass_it.offSet, //link del json
        headers: {
            "accept": "application/json, text/plain, */*"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "html",
        async: false,
        success: function (result) {
            json = document.createElement('div');
            json.innerHTML = result;
            out.pass_it.limit = json.querySelector('ul[class="pagination"] > li:last-child').previousElementSibling.querySelector('a').href.split('startrow=').pop().split('&').shift().trim();
            msg(out.pass_it.limit)
            var html_jobs = json.querySelectorAll('table[id="searchresults"] > tbody > tr');
            for (var elem of html_jobs) {
                var job = {};
                job.reqid = elem.querySelector('a').href.split('/').slice(0, -1).pop().trim();
                job.title = elem.querySelector('span[class*="jobTitle"]').textContent.trim();
                job.url = elem.querySelector('a').href.trim();
                job.dateposted_raw = elem.querySelector('span[class*="jobDate"]').textContent.replace(',', '').trim();
                job.dateposted_raw = getDateFormat(job.dateposted_raw, " ", 1, 0, 2);
                job.temp = 96;
                $.ajax({
                    url: job.url, //link del json
                    headers: {
                        "accept": "application/json, text/plain, */*"
                    }, //se obtienen con el fetch
                    type: 'GET',
                    //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
                    dataType: "html",
                    async: false,
                    success: function (resultA) {
                        var full_html = document.createElement("div");
                        full_html.innerHTML = resultA;

                        for (const a of full_html.querySelectorAll('span[class="joblayouttoken-label"]')) {
                            if (a.textContent.search(/Type of Contract/ig) > -1) {
                                job.source_jobtype = a.nextElementSibling.textContent.trim();
                            }
                            if (a.textContent.search(/experience/ig) > -1 && a.nextElementSibling.textContent.match(/[0-9]/)) {
                                job.experience_required = a.nextElementSibling.textContent.trim();
                            }
                        }

                        full_html = full_html.querySelector('span[class="jobdescription"]');
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
                            full_html.innerHTML = resultA;
                            job.source_location = full_html.querySelector('p[id="job-location"]').textContent.trim();
                            for (let auxLoc of full_html.querySelectorAll('span[class="jobGeoLocation"]')) {
                                let jobx = {
                                    ...job
                                };
                                jobx.location = auxLoc.textContent.trim();
                                jobs.push(jobx);
                            }
                        }

                    },
                    error: function (error) {
                        msg(error);
                    }
                });

            }
        },
        error: function (error) {
            msg(error);
        }
    });
    out["jobs"] = jobs;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
    let day = dateRaw.split(cut)[dayPosition].trim(),
        month = dateRaw.split(cut)[monthPosition].trim(),
        year = dateRaw.split(cut)[yearPosition].trim();
    day = day.replace(/rd|st|th|nd/, "").trim();
    if (day < 10 && day.length < 2) {
        day = "0" + day;
    }
    if (dateRaw.search(/[a-z]/gi) > -1) {
        //English, Dutch, French
        if (month.search(/ene|jan|january/i) > -1) {
            month = "01";
        }
        if (month.search(/feb?v?|february|fév/i) > -1) {
            month = "02";
        }
        if (month.search(/mar|march|maar/i) > -1) {
            month = "03";
        }
        if (month.search(/apr|abr|april|avr/i) > -1) {
            month = "04";
        }
        if (month.search(/may|mai|mei/i) > -1) {
            month = "05";
        }
        if (month.search(/jun|june|juin/i) > -1) {
            month = "06";
        }
        if (month.search(/jul|july|juil/i) > -1) {
            month = "07";
        }
        if (month.search(/aug|ago|august|août/i) > -1) {
            month = "08";
        }
        if (month.search(/sep|set|september/i) > -1) {
            month = "09";
        }
        if (month.search(/oct|out|october|okt/i) > -1) {
            month = "10";
        }
        if (month.search(/nov|november/i) > -1) {
            month = "11";
        }
        if (month.search(/dec|dez|december|déc/i) > -1) {
            month = "12";
        }
    }
    var datum = month + "/" + day + "/" + year;
    return datum;
}
//Pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 25;
    if (out.pass_it.offSet < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();