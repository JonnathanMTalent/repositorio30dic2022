//   191610   ESTO ESTABA EN ESE SCAN ID: They ask to index the feed and expand it at the following locations in "Plessisville, QC" and "Victoriaville, QC" ticket id=55823 



//EXTRACT

(function() {
    var out = {};
    var locs = ["Plessisville, QC","Victoriaville, QC"];
    //var auxtitle = ["Monteur portes et fenêtres"];
    var html_jobs = document.querySelectorAll(".jl");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      //auxtitle.push(job.title);
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector(".jc").textContent.trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      job.source_empname = elem.querySelector(".company").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
  
      //jobs.push(job);
      //} 
  
      for(var i in locs){
        //for(var j in auxtitle){
        var jobx={};
        jobx.title=job.title;
        jobx.url=job.url;
        jobx.location=locs[i];
        jobx.source_empname=job.source_empname;
        jobx.temp=job.temp;
        jobx.html    = job.html;   
        jobx.jobdesc = job.jobdesc;
        jobs.push(jobx);
      }
    }
    //} 
  
  
  
    out["jobs"]= jobs;
    return out;
  })();
  
  
  
  
  
  
  
  
  
  // (function() {
  //   var out = {};
  //   var locs = ["Plessisville, QC","Victoriaville, QC"];
  //   //var auxtitle = ["Monteur portes et fenêtres"];
  //   var html_jobs = document.querySelectorAll(".jl");
  //   var jobs = [];for(var x in html_jobs){
  //     if(typeof html_jobs[x] =="function") continue;
  //     if(typeof html_jobs[x] =="number") continue;
  //     var job = {};
  //     var elem = html_jobs[x];
  //     job.title = elem.querySelector("a").textContent.trim();
  //     //auxtitle.push(job.title);
  //     job.url = elem.querySelector("a").href.trim();
  //     job.location = elem.querySelector(".jc").textContent.trim();
  //     //job.dateposted_raw = elem.querySelector("").textContent.trim();
  //     //job.logo = elem.querySelector("").getAttribute("src").trim();
  //     //job.source_apply_email = elem.querySelector("").textContent.trim();
  //     job.source_empname = elem.querySelector(".company").textContent.trim();
  //     //job.source_jobtype = elem.querySelector("").textContent.trim();
  //     //job.source_salary = elem.querySelector("").textContent.trim();
  //     job.temp = 1;
  //     var full_html = getDescription(job.url);
  //     var temp = document.createElement("div");
  //     temp.innerHTML = full_html;
  //     job.url = "https://jobs.neuvoo-ats.com/job.php?id="+temp.querySelector('div.bottom-apply a.applyb').href.split('id=').pop().trim();
  //     var desc = temp.querySelector('div.description');
  //     job.html      = desc.innerHTML.trim();    
  //     //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //     //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  //     job.html      = cleanHTML(job.html);
  //     job.jobdesc   = desc.textContent.trim();
  //     job.jobdesc   = cleanHTML(job.jobdesc);
  
  //     //jobs.push(job);
  //     //} 
  
  //     for(var i in locs){
  //       //for(var j in auxtitle){
  //       var jobx={};
  //       jobx.title=job.title;
  //       jobx.url=job.url;
  //       jobx.location=locs[i];
  //       jobx.source_empname=job.source_empname;
  //       jobx.temp=job.temp;
  //       jobx.html    = job.html;   
  //       jobx.jobdesc = job.jobdesc;
  //       jobs.push(jobx);
  //     }
  //   }
  //   //} 
  
  
  
  //   out["jobs"]= jobs;
  //   return out;
  // })();
  // function getDescription(url) {
  //   var xhrrequest = new XMLHttpRequest();
  //   xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  //   var response = "";
  //   xhrrequest.onreadystatechange = function() {
  //     if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
  //     {
  //       //console.log(xhrrequest.responseText);
  //       response = xhrrequest.responseText;
  //     }
  //   };
  //   xhrrequest.send(); 
  //   return response;
  // }



  //JOBDESC

