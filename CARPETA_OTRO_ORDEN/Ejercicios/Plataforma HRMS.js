// Plataforma HRRS


//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("ul.ps_grid-body > li.ps_grid-row.psc_rowact");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector('span[id*="SCH_JOB_TITLE$"]').textContent.trim();
    job.reqid = elem.querySelector('span[id*="HRS_APP_JBSCH_I_HRS_JOB_OPENING_ID$"]').textContent.trim();
    job.url = "https://careers.hprod.onehcm.usg.edu/psp/careers/CAREERS/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_JBPST_FL&Action=U&FOCUS=Applicant&SiteId=39000&JobOpeningId="+job.reqid+"&PostingSeq=1";
    job.location = elem.querySelector('span[id*="LOCATION$"]').textContent.trim();

    if(elem.querySelector('span[id*="SCH_OPENED$"]')){
      var posted = elem.querySelector('span[id*="SCH_OPENED$"]').textContent.trim().split("/");
      job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
    }

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 1932021;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();




//Infinete pagination


(function(){
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1,
      "fail_counter":0,
      "job_counter":[]
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var html_jobs = document.querySelectorAll("li.psc_rowact");
  var total_jobs = document.querySelector(" div.ps_header-grid-custom > div > div > div").textContent.split("first ")[1].split("jobs ")[0].trim();

  msg(html_jobs.length);
  msg(total_jobs);

  var top = document.querySelector('div.ps_box-grid.ps_scrollable.sbar.sbar_v.ps_scrollable_v').scrollTop;

  if (typeof msg === 'undefined') msg = console.log

  if (document.querySelector("#buttoncontainer > div > span > a")) document.querySelector("#buttoncontainer > div > span > a").click();

  document.querySelector('div.ps_box-grid.ps_scrollable.sbar.sbar_v.ps_scrollable_v').scroll({
    top: 999999999,
    left: 0
  });

  if(html_jobs.length >= total_jobs){
    out["has_next_page"] = false;   
  }

  out["wait"]   = 2000
  out["html"] 	= true;
  out["pass_it"]["job_counter"].push(document.querySelectorAll("ul.ps_grid-body > li").length);
  if(out["pass_it"]["job_counter"].length > 5){
    out["pass_it"]["length"] = out["pass_it"]["job_counter"].length;
    (out["pass_it"]["job_counter"]).shift();
    var y = out["pass_it"]["job_counter"][0];
    for(var x in out["pass_it"]["job_counter"]){
      //msg(x+"|"+out["pass_it"]["job_counter"][x]);
      if(typeof out["pass_it"]["job_counter"][x] == "function") break;
      if(y != out["pass_it"]["job_counter"][x]) out["has_next_page"] = true; 

    }
  }else{
    out["has_next_page"] = true; 
  }


  // msg(out);

  return out;
})();