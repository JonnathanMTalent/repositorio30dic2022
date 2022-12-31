(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.entry-content-wrapper.clearfix.standard-content");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("span.job-meta.slide-meta-loc.locationLabel").textContent.trim();
      job.source_location = elem.querySelector("span.job-meta.slide-meta-loc.locationLabel").textContent.trim();
      job.source_salary  = elem.querySelector('span.job-meta.slide-meta-sal').textContent.trim();
      if(job.source_salary.includes("Not disclosed")){job.source_salary  = " "}
      job.experienced_required = elem.querySelector('span.job-meta.slide-meta-exp').textContent.trim();
      //job.source_empname     = elem.querySelector('').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
      //var datePosted     = elem.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted,"",0,1,2);
      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed,"",0,1,2);
      job.reqid = job.url.split('-').pop().split('?').shift().trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1996;
      if(job.location.indexOf(",")>-1){
            var locs = job.location.split(",");
              for(w in locs){
                var jobw = {...job};
                jobw.location = locs[w];
                jobs.push(jobw); // Multi-location jobs
              }
          }else{
          jobs.push(job); // Single Location jobs
          }
    } 
  
    out["jobs"]= jobs;
    return out;
  })();