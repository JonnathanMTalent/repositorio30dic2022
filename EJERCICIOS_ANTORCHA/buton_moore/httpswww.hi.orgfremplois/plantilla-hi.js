//infinite pagination
(() => {
    var out = {};
    out.has_next_page = false;
    let selector = `button[id="show_more_jobs_btn"]:not(button[style="display: none;"])`
    if (document.querySelector(selector)) {
        document.querySelector(selector).click();
        out.has_next_page = true;
        console.log(`click()`)
    } else {
        console.log(`No mas jobs.`)
    }
    out.wait = true
    return out;
    
})()
//extract
(function() {
    var out = {};
    var jobs = [];
    var html_jobs = document.querySelectorAll('table[class="table table-hover job-listing"] tbody tr[class="clickable-row"]');
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
//         job.reqid = elem.querySelector('a').href.split('/').pop().trim(); //elem.getAttribute('').split('').pop();
        job.title = elem.querySelector('td:nth-child(2)').textContent.trim();
        job.url = `https://www.hi.org${elem.getAttribute(`data-href`)}`
        job.source_location = elem.querySelector('td:nth-child(3)').textContent.trim();
        job.location = elem.querySelector('td:nth-child(3)').textContent.trim();		
        job.dateposted_raw = elem.querySelector('td:nth-child(4)').textContent.trim().split(`/`);
		job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[0]}/${job.dateposted_raw[2]}`
        job.dateclosed_raw = elem.querySelector('td:nth-child(7)').textContent.trim();
		job.dateclosed_raw = `${job.dateclosed_raw[1]}/${job.dateclosed_raw[0]}/${job.dateclosed_raw[2]}`
        //job.logo = elem.querySelector('img').getAttribute("src").trim();
        //job.source_empname = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('td:nth-child(6)').textContent.trim();
        //job.experience_required = elem.querySelector('').textContent.trim();
        //job.source_salary = elem.querySelector('').textContent.trim();
        job.temp = 96;
        jobs.push(job);
    }

    out.jobs = jobs;
    console.table(jobs)
    return out;
})();