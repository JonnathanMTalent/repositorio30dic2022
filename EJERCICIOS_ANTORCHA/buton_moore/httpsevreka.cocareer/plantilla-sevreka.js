//infinity
(function() {
    var out = {};
  var next_page_selector = 'div[class*="load-more-button-wrap"] > a '; //selector to identify the next button
  //var last_page_selector = ""; //selector to identify the last page
  var clickable_elem = document.querySelector(next_page_selector);
    //stop condition
    if (!clickable_elem) {
        //last page
      out["has_next_page"] = false;
  } else if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  }
    out.wait = true;
    return out;
})();

//extract
(function () {
	var out = {};
	var jobs = [];
	var html_jobs = document.querySelectorAll('a[class="evreka-crew-jobs-item"]');
	for (var elem of html_jobs) {
		if (typeof elem == "function") continue;
		if (typeof elem == "number") continue;
		var job = {};
// 		job.reqid = elem.querySelector('a').href.split('/').pop().trim(); //elem.getAttribute('').split('').pop();
		job.title = elem.querySelector('span:nth-child(1)').textContent.trim();
		job.url = elem.href.trim();
		job.source_location = ``;
		//HQ'S Company
		job.location = `Cankaya, Ankara`
		//job.dateposted_raw = elem.querySelector('').textContent.trim();
		//job.dateclosed_raw = elem.querySelector('').textContent.trim();
		//job.logo = elem.querySelector('img').getAttribute("src").trim();
		//job.source_empname = elem.querySelector('').textContent.trim();
		job.source_jobtype = elem.querySelector('span:nth-child(3)').textContent.trim();
		//job.experience_required = elem.querySelector('').textContent.trim();
		//job.source_salary = elem.querySelector('').textContent.trim();
		job.temp = 96;
		jobs.push(job);
	}

	out.jobs = jobs;
	console.table(jobs)
	return out;
})();