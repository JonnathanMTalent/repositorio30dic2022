//infinite pagination
(() => {
    var out = {};
    out.has_next_page = false;
    let selector = `div[class="jobs-list active"] p[class="list-centered grid"] a[class="js-no-transPage js-load-more load-more btn-square-center-anim"]:not(a[style="display: none;"])`
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
(function () {
	var out = {};
	var jobs = [];
	var html_jobs = document.querySelectorAll(`article[class*="list-entrie"] header[class="header-entrie "]`);
	for (var elem of html_jobs) {
		if (typeof elem == "function") continue;
		if (typeof elem == "number") continue;
		var job = {};
// 		job.reqid = elem.querySelector('a').href.split('/').pop().trim(); //elem.getAttribute('').split('').pop();
		job.title = elem.querySelector('h4').textContent.trim();
		job.url = elem.parentElement.querySelector(`a`).href
		job.source_location = elem.parentElement.getAttribute(`data-locations`)
		job.source_jobtype = elem.parentElement.getAttribute(`data-types`)
		job.location = elem.parentElement.getAttribute(`data-locations`)
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

	out.jobs = jobs;
	console.table(jobs)
	return out;
})();