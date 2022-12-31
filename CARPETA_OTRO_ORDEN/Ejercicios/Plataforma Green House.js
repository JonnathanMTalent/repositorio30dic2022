//Plataforma GreenHouse


//Extract

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div.opening");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("a").textContent.trim();
    job.reqid = elem.getAttribute("department_id").trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = elem.querySelector("span.location").textContent.trim();

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 12021;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


