//infinite pagination
(() => {
    var out = {};
    out.has_next_page = false;
    if (document.querySelector(`a[class="load_more_jobs"]:nth-child(4):not(a[style="display: none;"])`)) {
        document.querySelector(`a[class="load_more_jobs"]:nth-child(4):not(a[style="display: none;"])`).click()
        msg(`more jobs`);
        out.has_next_page = true;
    } else {
        msg(`no more jobs`);
    }
    out.wait = true;
    return out;
})()

//extract
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll(`ul[class="job_listings"] li[id*="job_listing"]`);
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector(`h3[class="job_listing-title"]`).textContent.trim();
        job.url = elem.querySelector(`a[class="job_listing-clickbox"]`).href.trim();
        job.source_location = elem.querySelector(` a[class="google_map_link"]`).textContent.trim();
        job.location = elem.querySelector(` a[class="google_map_link"]`).textContent.trim();
        // job.reqid = elem.querySelector("").textContent.trim();
        job.source_empname = elem.querySelector(`div[class="job_listing-company"] strong`).textContent.trim();
        //job.source_location = elem.querySelector("").textContent.trim();
        //job.street_location = elem.querySelector("").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.dateclosed_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = "Juan B";
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

//Esperas.
//waitForPageResources yes
//waitForPageText yes
//waitForPageLoadEvent no