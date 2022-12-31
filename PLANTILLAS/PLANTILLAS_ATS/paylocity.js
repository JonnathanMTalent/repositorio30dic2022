//https://recruiting.paylocity.com/

//BEFORE EXTRACT
(function() {
    var out = {};
    out.waitFor = "div.job-listing-job-item";
    return out;
  })();

//EXTRACT

(function() {
    let out = {};
    const html_jobs = document.querySelectorAll("div.job-listing-job-item");
    const jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      let elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();  
      job.source_location = elem.querySelector("div.col-xs-4.location-column span.job-item-normal").textContent.trim();
  
      job.location = elem.querySelector("div.col-xs-4.location-column span.job-item-normal").textContent.trim();
      job.location = job.location.split('(').shift();
      job.location = job.location.replace('NY, NJ, or CT','Nueva York, US / New Jersey, US / Connecticut, US');
      job.location = job.location.replace('FL/GA/DC/MD','Florida, US / Georgia, US / Washington, D.C, US / Maryland');
      job.location = job.location.replace('Home-based/Remote Working','Piscataway, NJ');
      job.location = job.location.replace('U.S.A','Piscataway, NJ');
      job.location = job.location.replace('Remote, USA','Piscataway, NJ');
      job.location = job.location.replace('Remote/Piscataway, NJ','Piscataway, NJ');
      job.location = job.location.replace('Near Major City Airport, NYC/Boston/San Francisco','New York, US / Boston, US / San Francisco, US');   
      job.location = job.location.replace('Remote','');
      if(job.location == ''){job.location = 'Piscataway, NJ';}
      // if(job.location == "" || job.location.includes("Genscript") || job.location.includes("Remote Worker","")) job.location = "Piscataway, NJ, US";
      // job.location = job.location.replace("/Remote","").replace(" or ","/").replace("NY, NJ,","NY/NJ").replace("Near Major City Airport,","").replace("- Remote","").replace("Seattle. WA","Seattle, WA").split("(").shift().replace("N/A","").split(" – ").shift().trim();
      job.dateposted_raw = elem.querySelector("span.job-item-title +br +span").textContent.replace('-','').trim();
      job.reqid = job.url.split('/').pop().trim();
      job.temp = 2223456;
  
      job.location = job.location.split("/")
      job.location.map(location =>{
        var jobx = {};
        jobx ={...job}
        jobx.location = location;
        jobs.push(jobx);
      }) 
    } 
  
    out["jobs"]= jobs;
    return out;
  })();

  //

  //JOBDESC

  (function() {
    var out = {};
    var job = {};
    var selector = "div.job-preview div.job-preview-details";
    var remove_selectors = [];
  
    for(const a of document.querySelectorAll("a, style, script, img")){
      a.remove();
    }
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    //let jobtype = document.querySelector('div.preview-location').innerText;
    //if(jobtype.includes('•')) job.source_jobtype =document.querySelector('div.preview-location').innerText.split('•')[1].split('in').shift().trim();
  
    for(const a of full_html.querySelectorAll('p, div.vertical-padding')){
      const text = a.textContent.trim();
      if(text.search(/Job Title/i) > -1){
        a.remove();
      }
      if(text.search(/Job Type/i) > -1){
        job.source_jobtype = text.replace("Job Type","").trim();
      }
    }
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Description', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
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