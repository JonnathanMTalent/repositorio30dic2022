
//Extract

(function() {
	var out = {};
    var html_jobs = document.querySelectorAll('tbody[class="jobsbody"] tr');
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("th a").textContent.split('-')[0].trim();
    	job.url = elem.querySelector("th a").href.trim();
    	job.location = elem.querySelector("td:nth-child(3)").textContent.trim();
      	//job.location = job.location.split("-").reverse().join(", ");
        job.dateposted_raw = elem.querySelector('td:nth-child(4)').textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 3;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();


//Paginación

(function() {
    var out = {};
  var next_page_selector = 'span[class="pagerlink"] >a#next'; //selector to identify the next button
  var last_page_selector = ""; //selector to identify the last page
   
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (!clickable_elem) {
        //last page
      out["has_next_page"] = false;
  } else if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = true;
  }

    out.waitFor = next_page_selector;
    return out;
})();

//Jobdata

