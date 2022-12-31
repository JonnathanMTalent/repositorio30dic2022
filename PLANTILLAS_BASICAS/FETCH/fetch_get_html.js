
// RECORDAR QUE LOS SELECTORES NO SIEMPRE SON LOS MISMOS Y TOCA BUSCARLOS CON UN MSG

//Extract
(async () => {
    const out = {};
    const jobs = [];
    /// declarando el pass_it
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) {
        return x;
    };
    if (!pass_it.counter) {
        out.pass_it = {
            "counter": 1,
            "jobs": 0,
            "limit": 0
        };
    } else {
        out.pass_it = pass_it;
    }
    const resp = await fetch(`http://careers.baptistonline.org/search/jobs/in?page=${out.pass_it.counter}`, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en,fr-CO;q=0.9,fr;q=0.8,en-CO;q=0.7,es-CO;q=0.6,es;q=0.5,pt-BR;q=0.4,pt;q=0.3,fr-FR;q=0.2,en-US;q=0.1",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "http://careers.baptistonline.org/search/jobs",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });
    const html = await resp.text();
    const div = document.createElement("div");
    div.innerHTML = html;
    const html_jobs = div.querySelectorAll('div[class="jobs-section__item padded-v-medium"]');
    const limit = parseInt(div.querySelector('div > div.columns.medium-9.large-10').textContent.trim().split('of').pop().split('results').shift().trim());
    msg(limit);
    out.pass_it.limit = limit;
    out.pass_it.jobs = out.pass_it.jobs + html_jobs.length;
    for (let x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        let job = {};
        let elem = html_jobs[x];
        //////EXTRACTING VARIABLES///////
        job.title = elem.querySelector('h2 a').textContent.trim();
        job.url = elem.querySelector(' h2 a').href.trim();
        //job.reqid = job.url.split('jobs/').pop().split('-').shift().trim();
        //job.source_location = elem.querySelector('div[class="jobs-section__item padded-v-medium"] > div').textContent.trim();
        //job.location = job.source_location.split('•').pop().trim().replaceAll('\n', '').replace(/\s+/g, '').replace(',', ', ');
        //job.dateposted_raw = elem.querySelector(' ul > li:nth-child(2)').textContent.trim();
        //job.logo = elem.querySelector('[class="logo"]:not(body > div.header.hidden-sm.hidden-xs > div.logo)').getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector('li[id="schedule"] div:nth-child(1) p').textContent.trim();
        //job.source_salary = elem.querySelector('div:nth-child(1) > div > address > ul > li:nth-child(2)').textContent.trim();
        job.temp = 1;
        jobs.push(job);
    }
    out.pass_it.counter = out.pass_it.counter + 1;
    out.jobs = jobs;
    return out;
})();
//Pagination
(() => {
    const out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) {
        return x;
    };
    out.pass_it = pass_it;
    //stop condition
    if (out.pass_it.jobs >= out.pass_it.limit) {
        //last page
        out.has_next_page = false;
    } else {
        //try again
        out.has_next_page = true;
    }
    //out["wait"] = true;
    //out.waitFor = "tr.data-row.clickable";
    return out;
})();