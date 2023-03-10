//extract
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.sc-AxjAm.dCHaPS > a");
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("h3").textContent.trim();
        job.url = elem.href.trim();
        job.location = elem.querySelector("div > div > div:nth-child(2) > div:nth-child(2) > div").textContent.trim();
        job.source_location = elem.querySelector("div > div > div:nth-child(2) > div:nth-child(2) > div").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        job.reqid = job.url.split('hotels/').pop().split('-')[0]; //slice(-2,-1)
        job.logo = elem.querySelector("img").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        if (elem.querySelector('h3').nextElementSibling) {
            var dateClosed = elem.querySelector('h3').nextElementSibling.textContent.trim();
            job.dateclosed_raw = dateClosed.replace(/Deadline/,'').trim();
        }
        if (elem.querySelector("div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(4)")) {
            job.source_salary = elem.querySelector("div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(4)").textContent.trim();
        } else {
            job.source_salary = "";
        }
        job.temp = 1;
        jobs.push(job);
    }
    out["jobs"] = jobs;
    console.table(jobs);
    return out;
})();
//Pagination
(function() {
    var out = {};
    out["has_next_page"] = false;
    out["wait"] = false;
    return out;
})();
//jobdata
(function() {
    var out = {};
    var job = {};
    var selector = 'div[class="JobAdelements__LeftContent-sc-zijx95-2 cAjXWk"]';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    if (full_html) {
        // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
            if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
        });
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim();
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        // job.html = removeTextAfter(job.html, 'Nicht gefunden wonach du suchst?', true);
        job.html = removeTextAfter(job.html, 'Nicht gefunden wonach du suchst', true);
        // job.html = removeTextAfter(job.html, '', true);
        // job.html = removeTextAfter(job.html, '', true);
        // job.html = removeTextAfter(job.html, '', true);
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