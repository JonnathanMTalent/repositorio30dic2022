(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div[class="css_jobsCell"]');
    var jobs = [];
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector('h5.css_headline').textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.reqid = job.url.split('/').pop();
      job.location = elem.querySelector('h6[class="css_subheadline"]').textContent.replace('Locatie:','').replace('a/d','aan').trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 'sep-28-2021';
      job.location = job.location.split(",");
      job.location.map(location =>{
        var jobx = {};
        jobx ={...job}
        jobx.location = location+', NL';
        jobs.push(jobx);
      }) 
    } 
  
    out["jobs"]= jobs;
    return out;
  })();