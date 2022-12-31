// Plataforma workforcenow


//Extract


(function() {
  var out = {};

  if(typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "total_jobs":0,
      "expected_jobs":0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);

  var jobs = json.jobRequisitions;
  var returnedJobs = [];	
  for(i in jobs) {
    var job = {};

    job.title = jobs[i].requisitionTitle;
    job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
    job.reqid = jobs[i].clientRequisitionID;

    var job_id = jobs[i].customFieldGroup.stringFields[0].stringValue;
    job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=b5d4f8f2-10a5-4937-b2f0-12caaae5951a&ccId=19000101_000001&jobId="+job_id+"&lang=en_US";                    

    var posted = jobs[i].postDate;
    posted = posted.split("T").shift().trim();
    posted = posted.split("-");
    job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];

    //job.dateclosed_raw = jobs[i].positionOfDateClosed;
    //job.source_jobtype = jobs[i].positionOfJobtype;
    //job.source_salary = jobs[i].positionOfSalary;         
    //job.source_empname = jobs[i].positionOfEmpname;
    //job.logo = jobs[i].positionOfLogo;

    job.temp = 12021;
    returnedJobs.push(job);
  }

  //msg(jobs);
  //msg(returnedJobs.length);
  out["pass_it"].jobs = returnedJobs.length;
  out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
  out["jobs"]= returnedJobs;
  return out;
})();


//Con multilocation


(function() {
  var out = {};

  if(typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "total_jobs":0,
      "expected_jobs":0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);

  var jobs = json.jobRequisitions;
  var returnedJobs = [];	
  for(i in jobs) {
    var job = {};

    job.title = jobs[i].requisitionTitle;
    //job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
    job.reqid = jobs[i].clientRequisitionID;

    var job_id = jobs[i].customFieldGroup.stringFields[0].stringValue;
    job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=b5d4f8f2-10a5-4937-b2f0-12caaae5951a&ccId=19000101_000001&jobId="+job_id+"&lang=en_US";                    

    var posted = jobs[i].postDate;
    posted = posted.split("T").shift().trim();
    posted = posted.split("-");
    job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];

    //job.dateclosed_raw = jobs[i].positionOfDateClosed;
    //job.source_jobtype = jobs[i].positionOfJobtype;
    //job.source_salary = jobs[i].positionOfSalary;         
    //job.source_empname = jobs[i].positionOfEmpname;
    //job.logo = jobs[i].positionOfLogo;

    job.temp = 12021;
    //returnedJobs.push(job);

    if(jobs[i].requisitionLocations[0].nameCode){
      var array = jobs[i].requisitionLocations;

      //Hago El multi location
      for (var i in array) {
        var jobx = {};
        jobx.title = job.title;
        jobx.reqid = job.reqid;
        jobx.url = job.url;
        //jobx.source_jobtype = job.source_jobtype;
        //jobx.source_salary = job.source_salary;
        //jobx.logo = job.logo;
        //jobx.source_empname = job.source_empname;
        jobx.dateposted_raw = job.dateposted_raw;
        //jobx.dateclosed_raw = job.dateclosed_raw

        jobx.location = array[i].nameCode.shortName;
        if(!jobx.location) { jobx.location = "US"; }
        jobx.location = jobx.location.split("Honda Village,").pop().trim();
        jobx.location = jobx.location.replace("North Shore Nissan,","").trim();
        jobx.location = jobx.location.replace("Volvo Village of Danvers,","").trim();
        jobx.location = jobx.location.replace("Audi Norwell,","").trim();
        jobx.location = jobx.location.replace("Porsche Norwell,","").trim();
        jobx.location = jobx.location.replace("Boston Volvo Village,","").trim();
        jobx.location = jobx.location.replace("McLaren","US").trim();
        jobx.temp = job.temp;
        returnedJobs.push(jobx);
      }
    } 
  }

  out["pass_it"].jobs = returnedJobs.length;
  out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
  out["jobs"]= returnedJobs;
  return out;
})();



//pagination


(function() {
    var out = {};
  
    out["pass_it"] = pass_it;
  
    var element = document.querySelector("pre").textContent;
    //msg(element);
    var json = JSON.parse(element);
    var total_jobs = json.meta.totalNumber;
    var jobs = json.jobRequisitions;
    //var per_page = json.meta.perPage;
  
    msg("========>" + jobs.length);
  
  
    if(jobs.length == 20){
      out["pass_it"].cont += 20;
      var url = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=b5d4f8f2-10a5-4937-b2f0-12caaae5951a&timeStamp=1611845860301&lang=en_US&ccId=19000101_000001&locale=en_US&$skip=" + out["pass_it"].cont;
  
      window.location.href = url;
      out["has_next_page"] = true;
    }else{
  
      out["has_next_page"] =false;
    }
  
    out.waitFor = 'pre';
    return out;
  })();


  //Before jobdescription

  




  //Jobdata



  (function() {
    var out = {};
    var job = {};
    var selector = "div.job-description-data > div";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    if (document.querySelector('span.job-description-worker-catergory')){
      job.source_jobtype = document.querySelector('span.job-description-worker-catergory').textContent.trim();
    }
  
    job.html      = full_html.innerHTML.trim();    
  
    job.html = job.html.replace("For more information about Village Automotive Group and the benefits it offers its employees, please visit us online at","").trim();
  
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'For more information about', true);
  
  
    if(job.html.indexOf('@')>-1){
      var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
      job.html = job.html.replace(eliminar,'');
    }
  
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  
  
    let selectorExpre = 'div.job-description-data > div'; //Selector del jobdata (también puede ser p, div, span)
    let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
    for (const a of document.querySelectorAll(selectorExpre)) {
      if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
        if (a.textContent.match(regextwo)) {
          job.experience_required = a.innerText.match(regextwo)[0];
          job.experience_required = job.experience_required.replace("18+ years","").trim();
          job.experience_required = job.experience_required.replace("60 years","").trim();
        }else{
          job.experience_required = '';
        }
      }
    }
  
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
  
  
    out["job"] = job;
    return out;
  
  })();
  
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }       
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }       
    }
    return newHtml;
  }