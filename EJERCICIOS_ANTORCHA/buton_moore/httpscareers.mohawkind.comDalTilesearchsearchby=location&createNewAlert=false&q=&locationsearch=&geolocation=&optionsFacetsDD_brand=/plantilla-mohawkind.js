//extract
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('tr[class*="job-tile job-id"]');
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector('[class*="jobTitle-link"]').textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.source_location=elem.querySelector('[id*="mobile-section-location"]').textContent.trim();
      job.location =  job.source_location
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    } 
    out["jobs"]= jobs;
    return out;
  })();

//infinity
(function() {
    var out = {};  
    var selector = document.querySelector('div[class="tile-more-results-container"]').getAttribute('style')
    out["has_next_page"] = false;
    if(selector !='display: none;'){
      document.querySelector('#tile-more-results').click()
      out["has_next_page"] = true;
    }   
    //tiempo de espera
    out["wait"] = true;
    return out;
  })();