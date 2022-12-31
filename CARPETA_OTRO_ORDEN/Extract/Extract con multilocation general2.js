// Extract con multilocation general

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('table[summary="Jobs list"] > tbody > tr');
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var elem = html_jobs[x];

    var loc = elem.querySelector("td.cp_jobDetails > ul > li:nth-child(2)").textContent.trim();

    loc = loc.split(" or ")
    loc.forEach( function (element){      

      var job = {};
      job.title = elem.querySelector("a.cp_jobListJobTitle").textContent.trim();
      job.url = elem.querySelector("a.cp_jobListJobTitle").href.trim();
      job.location = element.trim()+", AU";
      if(job.location.indexOf("Required to work") > -1) 
        job.location = "Canberra ACT, AU";
      if(job.location.indexOf("Various") > -1) 
        job.location = "Canberra ACT, AU";
      job.source_salary = elem.querySelector("td.cp_jobDetails > ul > li:nth-child(3)").textContent.trim();
      job.source_salary = job.source_salary.replace("Employment - State Network","");
      job.source_salary = job.source_salary.replace("Organisational leadership and innovation","");

      var date = elem.querySelector("td.cp_closingDate").innerHTML.trim();
      date = date.split("<br>")[0];
      date = date.split("-");
      if(date[1].indexOf("Jan") > -1){date[1] = "01";}
      if(date[1].indexOf("Feb") > -1){date[1] = "02";}
      if(date[1].indexOf("Mar") > -1){date[1] = "03";}
      if(date[1].indexOf("Apr") > -1){date[1] = "04";}
      if(date[1].indexOf("May") > -1){date[1] = "05";}
      if(date[1].indexOf("Jun") > -1){date[1] = "06";}
      if(date[1].indexOf("Jul") > -1){date[1] = "07";}
      if(date[1].indexOf("Aug") > -1){date[1] = "08";}
      if(date[1].indexOf("Sep") > -1){date[1] = "09";}
      if(date[1].indexOf("Oct") > -1){date[1] = "10";}
      if(date[1].indexOf("Nov") > -1){date[1] = "11";}
      if(date[1].indexOf("Dec") > -1){date[1] = "12";}
      job.dateclosed_raw = date[1]+"/"+date[0]+"/"+date[2];
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      //job.experience_required = elem.querySelector("").textContent.trim();  		
      //job.dateclosed_raw = monthJob+"/"+dia+"/"+ano;

      job.temp = 2;
      jobs.push(job);
    }, elem);
  } 

  out["jobs"]= jobs;
  return out;
})();