//https://careers.zalora.com/data/page/1/ ESTA EN EL SCANID: 93130

// before extract

(function() {
	var out = {};
  	out.waitFor = "pre"
  //	out.pic = true;
    return out;
})();

// extract

(function() {
    var out = {};
    var jobs = [];
    var element = document.querySelector("pre").textContent;//  Selector pre is usually where the string of the json is
    var json = JSON.parse(element);//  We parse the json so it can be worked
    var json_jobs = json;//  Replace positionOfJobs for the path were are the jobs
  
    for(i in json_jobs) {
      var job = {};/*init*/
      var elem = json_jobs[i];
  
      job.title = elem.title;
      job.reqid = elem.board_code;  
      job.url = 'https://careers.zalora.com/jobs/analytics-lead-commercial-data-squad/' + job.reqid;
      job.html = elem.description;
      	
     	job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
      

      job.source_jobtype = elem.type;
      if(job.source_jobtype != "Internship")
      {
        job.temp = "2";
  
      	jobs.push(job);
      }   
    }
  
    out["jobs"]= jobs;
    return out;
  })();


  //PAGINATION

  (function () {
    var out  = {};
    //out.wait = 1000;
  
    var url_base           = "https://careers.zalora.com/data/page/";
    var main_loop_selector = "pre";


    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 2,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  

  var perpage_fijo = 100;
  
  
  var element = document.querySelector("pre").textContent;
    //  We parse the json so it can be worked
    var json = JSON.parse(element);
    //  Replace positionOfJobs for the path were are the jobs
    var json_jobs = json;
    
	var perpage_actual = json.length;
  
    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
 if(perpage_actual < perpage_fijo){
    msg('\x1b[41m The pagination has finished \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont + '/';
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
  //out.waitFor = "";
   //out["wait"] = true;
    return out;
})();