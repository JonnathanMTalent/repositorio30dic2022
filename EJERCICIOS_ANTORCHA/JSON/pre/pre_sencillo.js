(function() {
    var out = {};
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.data;
    var returnedJobs = [];	
    for(var i in jobs) {
      var job = {};
  
      job.title = jobs[i].title;   
      job.url = "https://career.sea.com/position/"+jobs[i].id;
      job.reqid = jobs[i].id;
      job.source_location = jobs[i].location_detail.name;
      job.location = jobs[i].location_detail.name;
      //if(!jobs[i].sdo.department.name.match(/Infrastructure|Corporate IT/g)) job.source_empname = jobs[i].sdo.department.name;
      var exp = new Object(jobs[i].levels[0]);
      job.experience_required = exp.level_name;
  
      job.temp = 1;
      job.html      = jobs[i].job_description + jobs[i].job_requirement;   
      //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
      //job.html = removeTextAfter(job.html, 'Rincon Consultants, Inc does not accept', true);
      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc);
  
      if(job.url.indexOf("132")==-1){
        if(!job.title.includes("XX")) returnedJobs.push(job);
      }
    }
    //msg(jobs);
    //msg(returnedJobs.length);
  
    //out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();


  //Resumido:

  (function() {
    var out = {};
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.data;
    var returnedJobs = [];	
    for(var i in jobs) {
      var job = {};
      job.title = jobs[i].title;   

      job.temp = 1;
      job.html      = jobs[i].job_description + jobs[i].job_requirement;   
      //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
      //job.html = removeTextAfter(job.html, 'Rincon Consultants, Inc does not accept', true);
      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc);
  
      if(job.url.indexOf("132")==-1){
        if(!job.title.includes("XX")) returnedJobs.push(job);
      }
    }
    //msg(jobs);
    //msg(returnedJobs.length);
  
    //out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();