//infinite pagination
(()=>{
	var out = {};
	out.has_next_page = false;
	let selector = `a[id="more-jobs"]:not(a[style="display: none;"])`
	if(document.querySelector(selector)){
		document.querySelector(selector).click();
		out.has_next_page = true;
		console.log(`click()`)
	}else{
		console.log(`No mas jobs.`)
	}	
	return out;
})()

//extract
(function() {
    var out = {};
    var jobs = [];
    var html_jobs = document.querySelectorAll('ul[class="jlc-m-listing bp-box list-hover"] li');
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.querySelector('a').href.split('/').pop().trim(); //elem.getAttribute('').split('').pop();
        job.title = elem.querySelector('div[class="section-jobTitle"]').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.source_location = elem.querySelector('div[class="section-location bp-center"]').textContent.trim();
        job.location = elem.querySelector('div[class="section-location bp-center"]').textContent.trim();
        //job.dateposted_raw = elem.querySelector('').textContent.trim();
        //job.dateclosed_raw = elem.querySelector('').textContent.trim();
        //job.logo = elem.querySelector('img').getAttribute("src").trim();
        //job.source_empname = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('div[class="section-type bp-center"]').textContent.trim().split(`Type`).pop().trim();
        //job.experience_required = elem.querySelector('').textContent.trim();
        //job.source_salary = elem.querySelector('').textContent.trim();
        job.temp = 96;
        jobs.push(job);
    }

    out.jobs = jobs;
    console.table(jobs)
    return out;
})();