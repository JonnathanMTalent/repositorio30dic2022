// ************** 2022


(async function () {
    var out = {};
  
    var jobs = [];
    //msg(out["pass_it"].urls);
    //var html_jobs = document.querySelectorAll("div.valid-job tbody tr")
    var html_jobs = document.querySelectorAll('table[class="jv-job-list"] tbody tr')
    //msg("HTML JOBS" + html_jobs)
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        //msg(elem)
        job.title = elem.querySelector("a").textContent.trim();
        var url = elem.querySelector("td a").href.trim();
        job.reqid = url.split('/').pop();
        job.url = url + '?__jvst=Job Board&__jvsd=talent';
        job.source_location = elem.querySelector('[class="jv-job-list-location"]').textContent.trim();
        job.location = elem.querySelector('[class="jv-job-list-location"]').textContent.trim(); 
        job.temp = "1/31/2022";
        var baseURL = `http://jobs.jobvite.com/iboss/job/${job.reqid}?nl=1&nl=1&fr=true`
        
        //msg(job.location)
        if (job.location.search(/Location/ig) > -1) {
          msg("Multiloc! -> " + baseURL)
          var htmlJob = await fetch(baseURL);
          var response = await htmlJob.text()
          var div = document.createElement("div");
          div.innerHTML = response;
          
          //msg("DIV " + response)
          
          var locs = div.querySelector('[class="jv-job-detail-meta"]');
          
          if (locs){
              locs = locs.textContent.trim().replaceAll("\n",'')
              var array = locs.split("  ");
              const result = array.filter(loc => loc.length > 0);
              result.shift();
              var jobdescLocs = [];
              for (var i=0 ; i<result.length; i++) {
                  var str = ''  
                  if (result[i].includes(",")) {
                      str = result[i] + result[i+1];
                      i = i + 1;
                  } else {
                    str = result[i]
                  }
                  
                  jobdescLocs.push(str.replace(",",", "));
              }
              
              for (var z in jobdescLocs) {
                  var jobx = {...job};    
                  jobx.location = jobdescLocs[z].replaceAll("undefined","");
                  jobs.push(jobx);
              }
          }
          
      } else {
          jobs.push(job);
      }
    }
  
    out["jobs"] = jobs;
    return out;
  })();
  
  
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
  }
  
  
  
  /// ****************** OTRA OPCION PARA DESPLEGAR LOS VER MAS
  
  // Infinite pagination
  (function() {
    var out = {};
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "urls" : []
            
        };
    } else {
        out["pass_it"] = pass_it;
    }
  
    var urls = [];
    var index = [];
    var tables = document.querySelectorAll('table.jv-job-list');
    var validTables = [];
    var firstPageJobs = document.createElement("div");
    firstPageJobs.classList.add("valid-job");
    for (var i = 0; i < tables.length; i++) {
      var elem = tables[i];
        for (const item of elem.querySelectorAll('tbody tr')) {
          if (item.textContent.search(/Show More/gi) > -1) {
           var url = item.querySelector("a").href.trim();
            urls.push(url)
                index.push(i)
        }
      }
    }
  
   
   for (var i = 0; i < tables.length; i++) {
     var elem = tables[i];
     if (!index.includes(i)) firstPageJobs.appendChild(elem);
     else tables[i].remove();
   }
  
    document.body.appendChild(firstPageJobs);
  
    
    out["pass_it"].urls = urls
    out["pass_it"].index = index 
  
    msg(out["pass_it"])
    //msg(tables)
    out.pic=true;
    return out;
  
  })();
  
  // Extract
  (function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    out["pass_it"] = pass_it;
    var jobs = [];
    //msg(out["pass_it"].urls);
    //var html_jobs = document.querySelectorAll("div.valid-job tbody tr")
    var html_jobs = document.querySelectorAll("table.jv-job-list tr")
    msg("HTML JOBS" + html_jobs)
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        //msg(elem)
        job.title = elem.querySelector("a").textContent.trim();
        job.url = elem.querySelector("a").href.trim() + '?__jvst=Job Board&__jvsd=talent';
        job.reqid = job.url.split('/').pop().split("?").shift();
        job.source_location = elem.querySelector("td:nth-child(2)").textContent.trim();
        job.location = elem.querySelector("td:nth-child(2)").textContent.trim(); 
        job.temp = "1/31/2022";
      
        
        if (job.location.indexOf("Locations") > -1) {
          var htmlJob = getDescription(job.url);
          var tmp = document.createElement("DIV");
          tmp.innerHTML = htmlJob;         
          var locs = tmp.querySelector('p.jv-job-detail-meta').textContent.trim().replaceAll("\n",'');
          var array = locs.split("  ");
          const result = array.filter(loc => loc.length > 0);result.shift();
          var jobdescLocs = [];
          for (var i=0 ; i<result.length; i++) {
            var str = result[i] + result[i+1]; i = i+1;
            jobdescLocs.push(str.replace(",",", "));
          }
          
          for (var z in jobdescLocs) {
            var jobx = {...job};    
            jobx.location = jobdescLocs[z];
            jobs.push(jobx);
          }
        } else {
          jobs.push(job);
        }
    }
  
    out["jobs"] = jobs;
    return out;
  })();
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
  }
  
  // Pagination
  (function () {
    var out = {};  
    //if (typeof pass_it == "undefined") pass_it = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"]["urls"].length > 0) {
        var url = out["pass_it"].urls.shift();
        msg("URL ->>" + url);
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out.wait = true;  // COLOCAR EL SELECTOR A ESPERAR
    out.pic = true;
    return out;
  })();
  
  //Desc
  (function() {
    var out = {};
    var job = {};
    var selector = ".jv-job-detail-description"; 
    var remove_selectors = ['a','button','input','iframe','em'];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
  
  
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    
    
    
    job.html = full_html.innerHTML.trim();
    //job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www\.\S+|https?\S+|\(\d+\)|\S+\.com/gi, "");
  
    //job.html = removeTextBefore(job.html, 'About Us', false);
    //job.html = removeTextAfter(job.html, 'Qualifications', true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
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