//Extract
(function() {

    var out = {};
    var jobsSelector = "table.jv-job-list tr";
    var returnedJobs = [];
    var jobs_number = 0; // 
    var html_jobs = [];

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": jobs_number
        };
    } else {
        out["pass_it"] = pass_it;
    }

    html_jobs = document.querySelectorAll(jobsSelector);

    for (var x in html_jobs) {
        var job = {}; /*init*/
        var elem = html_jobs[x];

        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;

        if (elem.querySelector('.jv-job-list-name a')) {

            job.title = elem.querySelector('.jv-job-list-name a').textContent.trim();

            const tracker = '?__jvst=Job Board&__jvsd=talent';
            job.url = elem.querySelector('.jv-job-list-name a').href.trim() + tracker;

            job.reqid = job.url.split('/').pop().replace(tracker, '').trim();

            job.source_location = elem.querySelector('.jv-job-list-location').textContent.trim();
            job.location = elem.querySelector('.jv-job-list-location')
                .textContent.replace(/\n+/g, '').replace(/\s+/g, ' ').trim().replace(`Remote,`, ``).trim();


            if (job.location.indexOf(",") > -1)
                job.location = job.location.split(",")[0].trim() + ", " + job.location.split(",")[1].trim();

            job.temp = '08/02/2022'


            var full_html = getDescription(job.url);
            var div = document.createElement("div");



            div.innerHTML = full_html;

            if (div.querySelector('div[class="jv-job-detail-description"]')) {
                job.html = div.querySelector('div[class="jv-job-detail-description"]').innerHTML.trim();

                let benefitRegex = /Benefits of joining the LAZ Family:|Additional Benefits:/gi;
                if (job.html.search(benefitRegex) > -1) {
                    for (const b of div.querySelectorAll("p")) {
                        if (b.nextElementSibling) {
                            if (b.textContent.search(benefitRegex) > -1 &&
                                b.nextElementSibling.querySelector("li")) {
                                job.source_benefit = b.nextElementSibling.textContent.trim();
                                //msg(job.source_benefit)
                                break;
                            }
                        }
                    }
                }

                for (const a of div.querySelectorAll('li')) {
                    if (a.textContent.search(/Pay Rate:|Pay:/ig) > -1 && a.textContent.match(/\$/gi)) {
                        job.source_salary = a.textContent.split(':').pop().trim();
                    }
                }


                //job.html = removeTextAfter(job.html, '', true);


                job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);
            }



            if (job.location.trim().indexOf('Locations') > -1) {

                var loc = div.querySelector('p[class="jv-job-detail-meta"]').innerHTML.trim().split('<span class="jv-inline-separator"></span>');
                job.source_location = div.querySelector('p[class="jv-job-detail-meta"]').innerHTML.trim();

                for (var i = 1; i < loc.length; i++) {
                    let jobx = {
                        ...job
                    };
                    jobx.location = loc[i].trim();
                    returnedJobs.push(jobx);
                }
            } else {
                returnedJobs.push(job);

            }
        }


    }

    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
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
//Funcion para hacer la petición.
function getDescription(url) {

    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job

    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };

    xhrrequest.send();
    return response;
}

//Pagination

(function() {
    let out = {};
    let next_page_selector = '.jv-pagination-next';
    let clickable_elem = document.querySelector(next_page_selector);

    if (!document.querySelector(next_page_selector)) {
        out['has_next_page'] = false;
    } else if (clickable_elem) {
        clickable_elem.click();
        out['has_next_page'] = true;
    } else {
        out['has_next_page'] = true;
    }

    out.waitFor = next_page_selector;
    return out;
})();