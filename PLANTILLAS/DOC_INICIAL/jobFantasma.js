(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("").textContent.trim();
    	job.url = elem.querySelector("").href.trim();
    	job.location = elem.querySelector("").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
   //   job_fantasma:
if(jobs.length==0){
    var jobf={title:window.location.href};
	jobs.push(jobf);
}
  
	out["jobs"]= jobs;
  	return out;
})();