(function () {
    var out = {};
    out["wait"] = true;
    var jobsSelector = ".iCIMS_JobsTable > div.row";
    var returnedJobs = [];
    var html_jobs = [];
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var iframe_selector = "#icims_iframe_span > iframe";   
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  
    html_jobs = iframeDocument.querySelectorAll(jobsSelector);
  
    for (var x in html_jobs) {
      var elem = html_jobs[x];
  
      if (typeof elem == "function") continue;
      if (typeof elem == "number") continue;
      var loc = elem.querySelector("div.col-xs-6.header.left").textContent.replace("Job Locations","").trim().split("|");
  
      for (var l in loc) {
  
        var job = {};/*init*/
  
        job.title = elem.querySelector("div.col-xs-12.title").textContent.replace("Job Title","").trim();
        job.url = elem.querySelector("a").href.trim()+"&mode=job&iis=Neuvoo";
        job.location = loc[l];
        job.source_location=job.location;
        job.location = job.location.split("-").reverse().join(", ");
         job.reqid = elem.querySelector("div.iCIMS_JobHeaderGroup > dl > dd").textContent.trim();
        //job.source_jobtype = job.source_jobtype.split("(")[0];
        //job.location = job.location.split("-").reverse().join(", ");
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = "";
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = "Feb-2021";
  
        //job.dateposted_raw = elem.querySelector("div.col-xs-6.header.right > span > span").textContent.trim().split(" ")[0].replace("(","");
  
        returnedJobs.push(job);
      }
  
    }
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
    //out["pic"] = true;
    return out;
  })();