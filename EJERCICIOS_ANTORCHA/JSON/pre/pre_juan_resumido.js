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

        job.temp = "1";

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