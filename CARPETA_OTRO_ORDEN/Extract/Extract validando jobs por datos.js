//Para validar un job hasta cieerta pagina


//Extract. Crea el pass it y pushe jobs con condición

(function() {
  var out = {};

  if (!pass_it["urls"]) {
    out["pass_it"] = {
      // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
      "jobs": 0,
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var html_jobs = document.querySelectorAll("div.job-result-tiles > div");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    
    var datepush = elem.querySelector('div[aria-label="Job Posted Date"]');

    if(datepush){

      job.title = elem.querySelector("div.job-details div.job-title a").textContent.trim();
      job.reqid = elem.querySelector("div.job-details div.job-title a").href.trim().split("/")[5];
      job.url = elem.querySelector("div.job-details div.job-title a").href.trim();
      job.location = elem.querySelector("div.job-details div.job-location").textContent.trim();

      if (elem.querySelector('div[aria-label="Job Posted Date"]')){
        var posted = elem.querySelector('div[aria-label="Job Posted Date"]').textContent.trim();
        job.dateposted_raw = dateAgo(posted," ", 0, 1);
      }

      if(elem.querySelector("div.job-details-logo img")){
        job.logo = "http://l.ca.scc.associationcareernetwork.com/"+elem.querySelector("div.job-details-logo img").getAttribute("src").trim();
      }  

      job.source_empname = elem.querySelector("div > div.job-details > div.job-company-row").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      
      job.temp = 22021;
      jobs.push(job);
    } 
  }

  out["pass_it"]["jobs"] = jobs.length;
  out["jobs"] = jobs;
  return out;
})();


//Pagination llama el pass it

(function() {
  var out = {};
  
  out["pass_it"] = pass_it;
  
  var next_page_selector = 'li[class="page-item"] > a[aria-label="Next"]'; //selector to identify the next button
  var clickable_elem = document.querySelector(next_page_selector);

  if(clickable_elem && out["pass_it"]["jobs"] > 0){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out["wait"] = true;
  out["html"] = true;
  out["pic"] = true;
  out.waitFor = 'div.job-details > div.job-detail-row > div.job-title > a';
  return out;
})();
