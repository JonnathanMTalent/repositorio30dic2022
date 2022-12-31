//infinite pagination
(function() {
    var out = {};
    if (!pass_it["heights"]) {
        out["pass_it"] = {
            "heights": []
        };
    } else {
        out["pass_it"] = pass_it;
    }


    let next_page_selector = 'button[id="moreButton"]'; //selector to identify the next button
    let jobs = document.querySelectorAll(`table[class="jobcenter--results"] tbody tr`).length;
    var clickable_elem = document.querySelector(next_page_selector);

    out["has_next_page"] = true;
    clickable_elem.click();
    if (out["pass_it"]["heights"].length > 3) {
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
            out["has_next_page"] = false;
    }


    out["pass_it"]["heights"].push(jobs);
    msg(out.pass_it);

    out["wait"] = true;
    return out;
})();


//extract
(function () {
	var out = {};
	var jobs = [];
	var html_jobs = document.querySelectorAll('table[class="jobcenter--results"] tbody tr');
	for (var elem of html_jobs) {
		if (typeof elem == "function") continue;
		if (typeof elem == "number") continue;
		var job = {};
		job.reqid = elem.querySelector('td:nth-child(4) a').href.split('/').pop().trim(); //elem.getAttribute('').split('').pop();
		job.title = elem.querySelector('td:nth-child(1)').textContent.trim();
		job.url = elem.querySelector('td:nth-child(4) a').href.trim();
		job.source_location = elem.querySelector('td:nth-child(3)').textContent.trim();
		job.location = elem.querySelector('td:nth-child(3)').textContent.trim();
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