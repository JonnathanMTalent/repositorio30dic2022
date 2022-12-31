//infinite pagination
(function(){
    var out = {};
    var jobs = document.querySelectorAll("div.listitem.job").length;
    var elmnt = document.querySelector(`button#loadMoreButton:not(button[style="display: none;"])`);

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };

    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    
    if(out["pass_it"]["cont"]== jobs){
      out["has_next_page"] = false;
    }else if (elmnt) {
      
      elmnt.click();
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }

    out["pass_it"]["cont"] = jobs;

    out["wait"]=true;
    return out;
  })()

//extract
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.listitem.job");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      var selector = elem.querySelector("div.body");

      job.title = elem.querySelector("h3").textContent.trim();
      job.url =  elem.querySelector(".linkDetailsPage a").href.trim();
      job.location = elem.querySelector("div.location").textContent.trim();
      job.source_location = elem.querySelector("div.location").textContent.trim();
      
      job.reqid = elem.getAttribute("id").split("-").pop().trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 999;

      job.location = job.location.split("/");
        job.location.forEach(location =>{
          var jobx = {...job};      
          jobx.location = location;
          jobs.push(jobx);
        })
      //jobs.push(job);
    } 

    out["jobs"]= jobs;
    return out;
  })();

//pagination
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

//jobdata
(function() {
    var out = {};
    var job = {};
    var selector = "main .container .row div:nth-child(1)";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Wir freuen uns auf Ihre Bewerbung!', true);
    job.html = removeTextAfter(job.html, 'Deine Bewerbung', true);
    job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www\.\S+|https?\S+|\(\d+\)|\S+\.com/gi, "");
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