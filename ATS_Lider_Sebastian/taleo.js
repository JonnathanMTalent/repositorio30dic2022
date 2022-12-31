//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('table[class="contentlist"] > tbody > tr[id*=".row"]');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.reqid = elem.querySelector('td:nth-child(2) > div').getAttribute('id');
        job.title = elem.querySelector('h2').textContent.trim();
        job.url = 'https://urrea.taleo.net/careersection/urrea_flujo/jobdetail.ftl?job=' + job.reqid;
        job.location = 'Guadalajara, Jalisco, MX';//div[class="morelocation"]
        job.temp = 96;
        if (job.title.search(/No encontraste tu vacante/i) == -1) {
            jobs.push(job);
        }
    }

    out["jobs"] = jobs;
    return out;
})();
//Pagination
(function () {
    var out = {};
    var selector = 'div[class="pagerpanel"] a';  // selector donde esta la paginacion

    if (typeof pass_it == "undefined") pass_it = {};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }

    out["has_next_page"] = false;
    out["pass_it"].cont += 1;

    var all_elems = document.querySelectorAll(selector);
    [].forEach.call(all_elems, function (elemento) {
        if (elemento.textContent.trim() == out["pass_it"].cont) {
            //msg("click!!!!!"+elemento.textContent.trim());
            elemento.click();
            out["has_next_page"] = true;
        }
    });

    out["wait"] = true;
    return out;
})();
//Jobdata
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('table[class="tablelist"] > tbody > tr div[class="editablesection"]');

    if (full_html) {

        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

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

        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (typeof msg == "undefined") msg = console.log;

        job.html = full_html.innerHTML.trim();

        job.html = removeTextBefore(job.html, 'Descripción', false);
        //job.html = removeTextAfter(job.html, '', true);

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        if (job.jobdesc.length < 50) {
            job.html = " ";
            job.jobdesc = " ";
        }
    } else {
        job.html = " ";
        job.jobdesc = " ";
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


//Naranjadito
//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0
    };
    return out;
})();
//extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;
    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    $.ajax({//https://phf.tbe.taleo.net/phf02/ats/careers/v2/searchResults?org=COSTCO&cws=41
        url: 'https://phf.tbe.taleo.net/phf02/ats/careers/v2/searchResults?next&rowFrom=' + out.pass_it.offSet + '&act=null&sortColumn=null&sortOrder=null', //link del json
        headers: {
            "accept": "text/html, */*; q=0.01",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "html",
        async: false,
        success: function (result) {
            json = document.createElement('div');
            json.innerHTML = result;
            out.pass_it.limit = document.querySelector('span[class="oracletaleocwsv2-panel-number"]').textContent.trim();
            msg(out.pass_it.limit)
            var html_jobs = json.querySelectorAll('div[class*="oracletaleocwsv2-accordion"] > div[class="oracletaleocwsv2-accordion-block"] > div[class="oracletaleocwsv2-accordion-head"]');
            for (var elem of html_jobs) {
                if (typeof elem == "function") continue;
                if (typeof elem == "number") continue;
                var job = {};
                job.reqid = elem.querySelector('a').href.split('rid=').pop().trim(); //elem.getAttribute('').split('').pop();
                job.title = elem.querySelector('h4').textContent.trim();
                job.url = elem.querySelector('a').href.trim();
               // job.source_location = elem.querySelector('div[class="oracletaleocwsv2-accordion-head-info"] > div:last-child').textContent.trim();
               // job.location = job.source_location;
               job.source_location = elem.querySelector('div[class="oracletaleocwsv2-accordion-head-info"] > div:nth-child(3)').textContent.trim();
               if(job.source_location.indexOf('-')>-1){
               job.location = job.source_location.split('-').reverse().join(', ').replace('CAN','CA');   
               }else{
                   job.location = job.source_location;
               };
                //job.dateposted_raw = elem.querySelector('').textContent.trim();
                //job.dateclosed_raw = elem.querySelector('').textContent.trim();
                //job.logo = elem.querySelector('img').getAttribute("src").trim();
                //job.source_empname = elem.querySelector('').textContent.trim();
                //job.source_jobtype = elem.querySelector('').textContent.trim();
                //job.experience_required = elem.querySelector('').textContent.trim();
                //job.source_salary = elem.querySelector('').textContent.trim();
                job.temp = 96;
                jobs.push(job);
            }
        },
        error: function (error) {
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
    out.pass_it.offSet += 10;
    msg("OffSet: " + out.pass_it.offSet + "\nLimit: " + out.pass_it.limit);
    if (out.pass_it.offSet < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    return out;
})();

//JSON
//extract
(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var size = 0;
    var json;
    do {
        var data = { "multilineEnabled": false, "sortingSelection": { "sortBySelectionParam": "3", "ascendingSortingOrder": "false" }, "fieldData": { "fields": { "KEYWORD": "", "LOCATION": "", "CATEGORY": "" }, "valid": true }, "filterSelectionParam": { "searchFilterSelections": [{ "id": "POSTING_DATE", "selectedValues": [] }, { "id": "LOCATION", "selectedValues": [] }, { "id": "JOB_FIELD", "selectedValues": [] }, { "id": "JOB_SCHEDULE", "selectedValues": [] }] }, "advancedSearchFiltersSelectionParam": { "searchFilterSelections": [{ "id": "ORGANIZATION", "selectedValues": [] }, { "id": "LOCATION", "selectedValues": [] }, { "id": "JOB_FIELD", "selectedValues": [] }, { "id": "JOB_NUMBER", "selectedValues": [] }, { "id": "URGENT_JOB", "selectedValues": [] }, { "id": "EMPLOYEE_STATUS", "selectedValues": [] }, { "id": "JOB_SHIFT", "selectedValues": [] }] }, "pageNo": counter };
        $.ajax({
            url: 'https://humber.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=8100010168',
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/json",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "tz": "GMT-05:00",
                "tzname": "America/Bogota",
                "x-requested-with": "XMLHttpRequest"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.requisitionList;
                limit = result.pagingData.totalCount;
                size += result.pagingData.pageSize;
                for (var elem of json) {
                    var job = {};
                    job.reqid = elem.jobId;
                    job.title = elem.column[0];
                    job.location = 'Ontario, CA';
                    job.url = 'https://humber.taleo.net/careersection/hbr_ex/jobdetail.ftl?job=' + elem.contestNo;
                    job.dateposted_raw = elem.column[3];
                    job.temp = 96;
                    jobs.push(job);
                }
                counter = counter + 1;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (size < limit);

    out["jobs"] = jobs;
    return out;
})();
//jobdata
(function () {
    var out = {};
    var job = {};
    //var jobPassit = pass_it["job"];

    var full_html = document.querySelector('table[id*="requisitionDescriptionInterface"]');

    if (full_html) {

        for (const a of full_html.querySelectorAll('p, li')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
            if (a.textContent.search(/salary/i) > -1 && a.textContent.match(/[1-9]/) && a.textContent.match(/\$/)) {
                job.source_salary = a.textContent.split(':').pop().trim();
                a.remove();
            }
        }

        let selectorExpre = 'div.editablesection'; //Selector del jobdata (también puede ser p, div, span)
        let regextwo = '[0-9]{1,2} année d’expérience|[0-9]{1,2} année|[0-9]{1,2} et [0-9]{1,2} ans|BAC+[0-9]{1,2}|[0-9]{1,2} à [0-9]{1,2} ans|Bac + [0-9]{1,}|[+][0-9]{1,2}|[0-9]{1,2}[+]|[0-9]{1,2}ère|[0-9]{1,2} an minimum|[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
        for (const a of document.querySelectorAll(selectorExpre)) {
            if (a.textContent.match(/année|BAC|Bac|years in|expérience|experience|Experience|Expérience/gi)) {
                if (a.textContent.match(regextwo)) {
                    job.experience_required = a.innerText.match(regextwo)[0];
                    //job.experience_required = job.experience_required.replace("+","Bac +").trim();
                }
            }
        }

        for (const a of full_html.querySelectorAll('h2, span[class="subtitle"]')) {
            if (a.textContent.search(/Deadline/i) > -1 && a.parentElement.querySelector('span:last-child').textContent.match(/[a-z]*\s*[0-9]*\,\s*[0-9]/)) {
                job.dateclosed_raw = a.parentElement.querySelector('span:last-child').textContent.trim();
                job.dateclosed_raw = getDateFormat(job.dateclosed_raw, " ", 1, 0, 2);
                a.parentElement.remove();
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

        if (job.html.search(/Full Time|Full-Time/i) > -1) {
            job.source_jobtype = 'Full Time';
        }
        if (job.html.search(/Part Time|Part-Time/i) > -1) {
            job.source_jobtype = 'Part Time';
        }

        job.html = removeTextBefore(job.html, /Job Details|Find Your Spot at Humber|What you will do:/, true);
        job.html = removeTextAfter(job.html, /Anti-Discrimination Statement/, true);

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        if (job.jobdesc.length < 50) {
            job.html = " ";
            job.jobdesc = " ";
        }
    } else {
        job.html = " ";
        job.jobdesc = " ";
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
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
    let day = dateRaw.split(cut)[dayPosition].trim(),
        month = dateRaw.split(cut)[monthPosition].trim(),
        year = dateRaw.split(cut)[yearPosition].trim();
    day = day.replace(/rd|st|th|nd/, "").trim();
    if (day < 10 && day.length < 2) { day = "0" + day; }
    if (dateRaw.search(/[a-z]/gi) > -1) {
        //English, Dutch, French
        if (month.search(/ene|jan|january/i) > -1) { month = "01"; }
        if (month.search(/feb?v?|february|fév/i) > -1) { month = "02"; }
        if (month.search(/mar|march|maar/i) > -1) { month = "03"; }
        if (month.search(/apr|abr|april|avr/i) > -1) { month = "04"; }
        if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
        if (month.search(/jun|june|juin/i) > -1) { month = "06"; }
        if (month.search(/jul|july|juil/i) > -1) { month = "07"; }
        if (month.search(/aug|ago|august|août/i) > -1) { month = "08"; }
        if (month.search(/sep|set|september/i) > -1) { month = "09"; }
        if (month.search(/oct|out|october|okt/i) > -1) { month = "10"; }
        if (month.search(/nov|november/i) > -1) { month = "11"; }
        if (month.search(/dec|dez|december|déc/i) > -1) { month = "12"; }
    }
    var datum = month + "/" + day + "/" + year;
    return datum;
}

//JsonCategories 5k limit
//Extract
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    var jobs = [];
    var counter = 0;
    var limit = 0;
    var page = 1;
    var json;
    //var prueba = [{"locName":"Akron%252COhio%252CUnited%2520States","count":45},{"locName":"Albuquerque%252CNew%2520Mexico%252CUnited%2520States","count":138}]
    //for(var auxLoc of prueba){
    //for(var auxLoc of out.pass_it.locations){
    msg('Company: ' + out.pass_it.locations[out.pass_it.pageCount].locName);
    limit = out.pass_it.locations[out.pass_it.pageCount].count;
    do {
        var data = {};
        $.ajax({
            //url : 'https://careers.autozone.com/api/jobs?limit=100&page=' + page + '&locations=' + auxLoc.locName,
            url: window.origin + '/api/jobs?limit=100&sortBy=posted_date&page=' + page + '&brand=' + out.pass_it.locations[out.pass_it.pageCount].locName,
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            type: 'GET',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.jobs;
                limit = result.totalCount;
                if (json.length > 0) {
                    msg('Hay jobs');
                    for (var elem of json) {
                        var job = {};
                        elem = elem.data;
                        job.reqid = elem.req_id;
                        if (elem.title.match(/Full Time|Full-Time|FullTime/i)) {
                            job.source_jobtype = 'Full Time';
                        }
                        if (elem.title.match(/Part Time|Part-Time|PartTime/i)) {
                            job.source_jobtype = 'Part Time';
                        }
                        job.title = elem.title.replace(/ *\([^)]*\) */g, "");
                        job.source_empname = elem?.brand;
                        job.source_location = [];
                        job.location = [];
                        elem.multipleLocations ? (
                            job.source_location.push('Multiple'),
                            job.source_location = job.source_location.join(', ')
                        ) : (
                            job.source_location.push(elem?.location_name),
                            job.source_location.push(elem?.street_address),
                            job.source_location.push(elem?.city),
                            job.source_location.push(elem?.state),
                            job.source_location.push(elem?.country_code),
                            job.source_location = job.source_location.filter(Boolean).join(", ")
                        );
                        job.location.push(elem?.city);
                        job.location.push(elem?.state);
                        job.location.push(elem?.country_code);
                        job.location = job.location.filter(Boolean).join(", ");
                        job.url = window.origin + '/jobs/' + elem.slug;
                        if (elem.update_date) {
                            job.dateposted_raw = elem.update_date.split('T').shift();
                            job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                        } else {
                            job.dateposted_raw = elem.create_date.split('T').shift();
                            job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                        }
                        job.html = '<div>' + elem.description + '</div>';
                        job.html = cleanHTML(job.html);
                        var tmp = document.createElement('div');
                        tmp.innerHTML = job.html;
                        job.jobdesc = tmp.textContent.trim();
                        job.temp = 96;
                        var joby = job;
                        if (elem.additional_locations) {
                            var countReqId = 0;
                            for (let auxLoc of elem.additional_locations) {
                                var jobx = {};
                                jobx = { ...joby }
                                jobx.reqid = joby.reqid + '-' + parseInt(countReqId + 1);
                                job.location = [];
                                job.location.push(auxLoc?.city);
                                job.location.push(auxLoc?.state);
                                job.location.push(auxLoc?.country_code);
                                job.location = job.location.filter(Boolean).join(", ");
                                jobs.push(jobx);
                                countReqId += 1;
                            }
                        }
                        jobs.push(job);
                    }
                } else {
                    msg('No hay Jobs');
                    limit = 0;
                    var job = {};
                    job.title = '5K limit reached. Ghost Job for: ' + out.pass_it.locations[out.pass_it.pageCount].locName;
                    jobs.push(job);
                }
            },
            error: function (error) {
                msg(error);
            }
        });
        msg('Page: ' + page + '\nLimit: ' + limit);
        page = page + 1;
    } while (page < limit);
    //page = 1;
    //counter = 0;
    // }
    out["jobs"] = jobs;
    return out;
})();
//Pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.pageCount += 1;
    if (out.pass_it.locations[out.pass_it.pageCount]) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = true;
    return out;
})();
//infinity
(function () {
    var out = {};
    if (pass_it["locations"]) {
        out["pass_it"] = pass_it;
    } else {
        out["pass_it"] = {
            "locations": [],
            "pageCount": 0
        };
    }
    var locations = [];
    var counter = 0;
    var json;
    var expectecJobs = 0;
    $.ajax({
        url: window.origin + '/api/jobs?page=1',
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (result) {
            //json = result.filter.locations.all;
            json = result.filter.brands.all;
            for (var elem of json) {
                var loc = {};
                /*
                        loc.locName = '';
                        if(elem.city){
                          loc.locName += elem.city.replace(/\s/g, '%2520').trim();
                        }
                        if(elem.city && elem.state){
                          loc.locName += '%252C' + elem.state.replace(/\s/g, '%2520').trim();
                        }else{
                          loc.locName += elem.state.replace(/\s/g, '%2520').trim();
                        }
                        if(elem.city && elem.state && elem.country){
                          loc.locName += '%252C' + elem.country.replace(/\s/g, '%2520').trim();
                        }else{
                          loc.locName += elem.country.replace(/\s/g, '%2520').trim();
                        }
                        loc.count = elem.count;
                        */
                /* loc.locName = elem.category;
                        loc.count = elem.numJobs;*/
                loc.locName = elem.brand;
                loc.count = elem.numJobs;
                //
                expectecJobs += loc.count;
                locations.push(loc);
            }
            //counter = counter + 1;
        },
        error: function (error) {
            msg(error);
        }
    });
    out.pass_it.locations = locations;
    msg('Expected jobs: ' + expectecJobs);
    return out;
})();

//Extract sin category
(function () {
    let out = {};
    let jobs = [];
    out["pass_it"] = pass_it;
    let json;

    $.ajax({
        url: window.origin + '/api/jobs?limit=100&page=' + out.pass_it.offSet,
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.jobs;
            out.pass_it.limit = result.totalCount;
            if (json.length > 0) {
                msg('Hay jobs');
                for (var elem of json) {
                    var job = {};
                    elem = elem.data;
                    job.reqid = elem.req_id;
                    job.source_jobtype = elem?.employment_type;
                    job.title = elem.title.replace(/ *\([^)]*\) */g, "");
                    //job.source_empname = elem?.brand;
                    job.source_location = [];
                    job.location = [];

                    elem.multipleLocations ? (
                        job.source_location.push('Multiple'),
                        job.source_location = job.source_location.join(', ')
                    ) : (
                        job.source_location.push(elem?.location_name),
                        job.source_location.push(elem?.street_address),
                        job.source_location.push(elem?.city),
                        job.source_location.push(elem?.state),
                        job.source_location.push(elem?.country_code),
                        job.source_location = job.source_location.filter(Boolean).join(", ")
                    );

                    job.location.push(elem?.city);
                    job.location.push(elem?.state);
                    job.location.push(elem?.country_code);
                    job.location = job.location.filter(Boolean).join(", ");
                    job.url = window.origin + '/jobs/' + elem.slug;
                    if (elem.update_date) {
                        job.dateposted_raw = elem.update_date.split('T').shift();
                        job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                    } else {
                        job.dateposted_raw = elem.create_date.split('T').shift();
                        job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                    }
                    job.html = elem.description + '<br>' + elem?.responsibilities + '<br>' + elem?.qualifications;
                    job.html = cleanHTML(job.html);
                    var tmp = document.createElement('div');
                    tmp.innerHTML = job.html;
                    job.jobdesc = tmp.textContent.trim();
                    job.temp = 96;
                    var joby = job;
                    if (elem.additional_locations) {
                        var countReqId = 0;
                        for (let auxLoc of elem.additional_locations) {
                            var jobx = {};
                            jobx = {
                                ...joby
                            }
                            jobx.reqid = joby.reqid + '-' + parseInt(countReqId + 1);
                            job.location = [];
                            job.location.push(auxLoc?.city);
                            job.location.push(auxLoc?.state);
                            job.location.push(auxLoc?.country_code);
                            job.location = job.location.filter(Boolean).join(", ");
                            jobs.push(jobx);
                            countReqId += 1;
                        }
                    }
                    jobs.push(job);
                    out.pass_it.jobsCount += 1;
                }
            } else {
                msg('No hay Jobs');
                out.pass_it.limit = 0;
                var job = {};
                job.title = '5K limit reached. Ghost Job for: ';
                jobs.push(job);
            }
        },
        error: function (error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();
//extract Fetch
(async () => {
    let out = {};
    out["pass_it"] = pass_it;

    try {
        let jobs = [];

        let resp = await fetch(`${window.origin}/api/jobs?limit=100&page=${out.pass_it.offSet}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": window.location.href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        //JSON
        const data = await resp.json();
        let htmlJobs = data.jobs;
        out.pass_it.limit = data.totalCount;
        if (htmlJobs.length > 0) {
            for (var i in htmlJobs) {
                let elem = htmlJobs[i].data;
                let job = {};
                job.reqid = elem.req_id;
                job.source_jobtype = elem?.employment_type;
                job.title = elem.title.replace(/ *\([^)]*\) */g, "");
                //job.source_empname = elem?.brand;
                job.source_location = [];
                job.location = [];

                elem.multipleLocations ? (
                    job.source_location.push('Multiple'),
                    job.source_location = job.source_location.join(', ')
                ) : (
                    job.source_location.push(elem?.location_name),
                    job.source_location.push(elem?.street_address),
                    job.source_location.push(elem?.city),
                    job.source_location.push(elem?.state),
                    job.source_location.push(elem?.country_code),
                    job.source_location = job.source_location.filter(Boolean).join(", ")
                );

                job.location.push(elem?.city);
                job.location.push(elem?.state);
                job.location.push(elem?.country_code);
                job.location = job.location.filter(Boolean).join(", ");
                job.url = `${window.origin}/jobs/${elem.slug}`;
                if (elem.update_date) {
                    job.dateposted_raw = elem.update_date.split('T').shift();
                    job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                } else {
                    job.dateposted_raw = elem.create_date.split('T').shift();
                    job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                }
                job.html = elem.description + '<br>' + elem?.responsibilities + '<br>' + elem?.qualifications;
                job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.temp = 96;
                var joby = job;
                if (elem.additional_locations) {
                    var countReqId = 0;
                    for (let auxLoc of elem.additional_locations) {
                        var jobx = {};
                        jobx = {
                            ...joby
                        }
                        jobx.reqid = joby.reqid + '-' + parseInt(countReqId + 1);
                        job.location = [];
                        job.location.push(auxLoc?.city);
                        job.location.push(auxLoc?.state);
                        job.location.push(auxLoc?.country_code);
                        job.location = job.location.filter(Boolean).join(", ");
                        jobs.push(jobx);
                        countReqId += 1;
                    }
                }
                jobs.push(job);
                out.pass_it.jobsCount += 1;
            }
        } else {
            msg('No hay Jobs');
            out.pass_it.limit = 0;
            var job = {};
            job.title = '5K limit reached. Ghost Job for: ';
            jobs.push(job);
        }
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
    return out;
})();
//Infinity
(function () {
    var out = {};

    out["pass_it"] = {
        "offSet": 1,
        "limit": 0,
        "jobsCount": 0
    };

    return out;
})();
//Pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.jobsCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();


// Taleo json get html

//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":10,
        "jobsperpage":0,
        "limit":0
    }
    return out;
})()


//Extract

(function () {
    var jobs = [];
    var out = {};
    out.pass_it=pass_it;
    //out.pass_it = pass_it;

      //var data ={};
      $.ajax({
        url: 'https://phg.tbe.taleo.net/phg02/ats/careers/v2/searchResults?next&rowFrom='+out.pass_it.counter+'&act=null&sortColumn=null&sortOrder=null&currentTime=1661539513899',
        headers: {
    "accept": "text/html, */*; q=0.01",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        //data: JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
          //msg(result)
          var div = document.createElement("div");
          div.innerHTML = result;
          var html_jobs = div.querySelectorAll('.oracletaleocwsv2-accordion-head-info');
          out.pass_it.jobsperpage=html_jobs.length;
          msg('Cantidad de jobs actuales: '+out.pass_it.jobsperpage);
          
          for (var x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            var job = {};
            var elem = html_jobs[x];
            
    var loc = elem.querySelector("div:nth-child(2)").textContent.trim().split(",");
    loc.forEach( function (element){
      var job = {};

      job.title = elem.querySelector("h4").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.reqid = elem.querySelector("a").href.trim().split("rid=")[1];
      job.location = element.trim().split(" - ").reverse().join(", ").trim();
      job.source_location = element.trim();

      //job.location = job.location.replace("*Flexible","Guelph, ON").trim();
      job.location = job.location + ', CA';
      if(job.location.includes('Canada')){
        job.location = 'Canada'; 
      }
      if(job.location.includes('*')){
        job.location =  job.location.replace('*',''); 
      }
      //DATE POSTED//
      var datum1 = elem.querySelector('div:nth-child(4)').textContent.trim();
      datum1 = datum1.trim();

      var day   =  datum1.split("-")[2];
      var month =  datum1.split("-")[1];
      var year  =  datum1.split("-")[0];

      job.dateposted_raw  = month +"/"+  day +"/20"+ year;

      //job.street_location = "Co-operators ," + job.location;

      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = "Co-operators";
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();





      job.temp = '.3312.';
      if(job.url.length>10)jobs.push(job);
    }, elem);

      
          }
 
        },
        error: function (error) {
          msg('TENGO UN ERROR');
          msg(error);
        }
      });
    out["jobs"] = jobs;
    return out;
  })();


  //pagination

  (function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 10;
    const { counter, jobsperpage, limit } = out.pass_it;
    out.has_next_page = jobsperpage==10;
    return out;
})();

//jobdescription

(function() {
    var out = {};
    var job = {};
    var selector = "div.col-md-8";
    //var job = pass_it["job"];
  
    var full_html = $(selector);
    
     let aux = Array.from(document.querySelectorAll('h3')).filter(x => x.textContent.search(/Comment vous en bénéficiez :/gmi) > -1);
      aux[0]!=null ? job.source_benefit=aux[0].nextElementSibling.textContent.trim() : job.source_benefit='';
  
    // remove something from the jobdatata
    full_html.find('a').remove().end().html();
    full_html.find('input').remove().end().html();
    full_html.find('div.oracletaleocwsv2-button-navigation').remove().end().html();
    full_html.find('span.social-share-btn').remove().end().html();
    full_html.find('script').remove().end().html();
  
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    let selectorExpre = 'div.col-md-8'; //Selector del jobdata (también puede ser p, div, span)
    let regextwo = 'BAC+[0-9]{1,2}|[0-9]{1,2} à [0-9]{1,2}|Bac + [0-9]{1,}|[+][0-9]{1,2}|[0-9]{1,2}[+]|[0-9]{1,2}ère|[0-9]{1,2} an minimum|[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
    for (const a of document.querySelectorAll(selectorExpre)) {
      if (a.textContent.match(/BAC|Bac|years in|expérience|experience|Experience|Expérience/gi)) {
        if (a.textContent.match(regextwo)) {
          job.experience_required = a.innerText.match(regextwo)[0];
          job.experience_required = job.experience_required.replace("years","years of experience").trim();
        }else{
          job.experience_required = '';
        }
      }
    }
    msg('\x1b[43mjob.experience_required : \x1b[0m'+ job.experience_required);
  
    var full_html = full_html.html();
  
    job.source_jobtype = $("div.col-xs-12.col-sm-12.col-md-4 > div > div.row > div:nth-child(2) > strong").text();
  
  
    job.html 		= full_html.trim();
  
    job.html = removeTextBefore(job.html, "What you’re responsible for:", false);
    job.html = removeTextAfter(job.html, "Interested in applying", true);
    job.html = removeTextAfter(job.html, "Vous aimeriez présenter", true);
  
  
    if(job.html.indexOf('@')>-1){
      var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
      job.html = job.html.replace(eliminar,'');
    }
  
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  
  
    job.html 		= cleanHTML(job.html);
    job.jobdesc 	= job.html;
  
    out["job"] = job;
    return out;
  
  })();
  
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }  		
    }
    return newHtml;
  }
  
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }  		
    }
    return newHtml;
  }