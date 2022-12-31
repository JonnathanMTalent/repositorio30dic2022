////////////////////////////EXTRACT//////////////////////////////////////////////
(function() {
    var out = {};
  if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["url"]) {
      out["pass_it"] = {
        "counter": 0,
        "jobs": 0,
        "url":['Hola.com']
      };
    } else {
      out["pass_it"] = pass_it;
    }
  //  This gives you an HTMLElement object
    var element = document.querySelector("pre").textContent;
    //  This gives you a string in JSON syntax of the object above that you can 
    // send with XMLHttpRequest.
    var json = JSON.parse(element);
    var jobs = json.data;
    var returnedJobs = [];  
    for(var i in jobs) {
        var job = {};/*init*/
        job.title = jobs[i].title;
      job.reqid = jobs[i].id;
     let city = jobs[i].address.city
      let state = jobs[i].address.state
      job.location = `${city}, ${state}`
        //job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=04bf51f8-d2dd-4641-ba92-183522f6e8b3&ccId=19000101_000001&jobId="+jobs[i].customFieldGroup.stringFields[0].stringValue.trim()+"&lang=en_CA";                    
      //  job.dateposted_raw = jobs[i].postDate;
        //job.source_jobtype = jobs[i].workLevelCode.shortName;
        job.temp = "1";
     /* if( jobs[i].requisitionLocations.length > 1) {
        var array = jobs[i].requisitionLocations;
        for (var x in jobs[i].requisitionLocations) {
            var jobx = {};
            jobx.title = job.title;
            jobx.url = job.url;
            //jobx.source_jobtype = job.source_jobtype;
            //jobx.source_salary = job.source_salary;
            //jobx.logo = job.logo;
            //jobx.source_empname = job.source_empname;
            //jobx.dateposted_raw = job.dateposted_raw;
            //jobx.html = job.html;
            //jobx.jobdesc= job.jobdesc;
            jobx.location = jobs[i].requisitionLocations[x].nameCode.shortName;
            jobx.temp = job.temp;
            if (jobx.location.length > 0) {
             returnedJobs.push(jobx);
            }
        }
    }
    else {
        job.location = job.location
        
    }*/
      returnedJobs.push(job);
    }
    out["pass_it"]["jobs"] = returnedJobs.length;
    msg(out["pass_it"]["jobs"])
    out["jobs"]= returnedJobs;
    return out;
})();
//////////////////////////////////////////////pagination///////////////////////////////////////
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["url"]) {
      out["pass_it"] = {
        "counter": 0      };
    } else {
      out["pass_it"] = pass_it;
    }
    //stop condition    
   var element = document.querySelector("pre").textContent;
      //  This gives you a string in JSON syntax of the object above that you can 
      // send with XMLHttpRequest.
      var json = JSON.parse(element);
      var jobs = json.meta.totalJobs;
    msg(jobs)
    if (jobs ==20) {
        //last page        
      out["has_next_page"] = true;
      out["pass_it"].counter+=20
      window.location.href = "https://public-rest30.bullhornstaffing.com/rest-services/45BQO9/query/JobBoardPost?where=(isOpen=true)&fields=id,title,publishedCategory(id,name),address(city,state),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted&count=20&orderBy=-dateLastPublished&start="+out["pass_it"].counter;
    } else {
        //go to next page        
        out["has_next_page"] = false;
    }
    out.wait = true;
    out.pic = true;
    out.html = true;
    return out;
  })();