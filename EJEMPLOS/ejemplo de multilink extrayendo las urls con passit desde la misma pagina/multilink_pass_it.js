// INFINITY
//https://www.urmc.rochester.edu/noyes/about/careers-noyes/allied-health.aspx 


(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
    var urls = []; //Declarar urls del multilink
    for (var x of document.querySelectorAll('.row > .col> ul > li > a')) {
      urls.push(x.href);
    }
    if (!pass_it["urls"]) {
      out["pass_it"] = {
        "currentUrl": 0,
        "urls": urls
      };
    } else {
      out["pass_it"] = pass_it;
    }
    window.location.href = urls[0];
    out.wait = true;
    return out;
  })();

  //BEFORE EXTRACT

  (function () {
    var out = {};
    out.waitFor = '#main-content .plain h2';
    //out["wait"] = true;
    //out.html = true
    //out["pic"] = true;
    //out["wait"] = 200;
    //out.iframeSelector = '';
    //out.iframeWaitFor = '';
    //location.reload(); // Refresh
    return out;
  })();

  // EXTRACT

  (function() {
    var out = {};
    //var count = 0;
    var html_jobs = document.querySelectorAll('#main-content .plain h2'); //donde esta el titulo 
    var jobs = [];
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
  
      job.title = elem.textContent.trim();
      job.url = window.location.href;
  
      //job.experience_required = tagExperienceRequired()
  
      //var aux = document.querySelectorAll('div[class="Attributes"]')[count];
      //aux = aux.textContent.split(',');
      //job.source_jobtype = aux.shift().replace('Ongoing','').trim();
      job.location = "Rochester, New York, US";
      job.source_location = "";
  
      let aux = elem.nextElementSibling;
      let count = 0;
      let full_html = document.createElement('div');
  
      while(aux != null && aux.tagName != 'H2' && count < 25){
        full_html.innerHTML += aux.innerHTML;
        aux = aux.nextElementSibling;
        count += 1;
      }
      
      //msg(full_html);
  
      for (const a of full_html.querySelectorAll('a, img, script, style, button, table, .box-gradient')) {
        if (a) {
          a.remove();
        }
      }
  
      job.html = full_html.innerHTML.trim();
  
      //job.html = full_html.trim().replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www\.\S+|https?\S+|\(\d+\)|\S+\.com|<\/?[^>]+(>|$)/gi, "").trim();
      //job.html       = removeTextBefore(job.html, "<h3>", true);
      //job.html       = removeTextBefore(job.html, job.title+1, true);
  
      //job.html       = removeTextAfter(job.html, "good teaching skills and the desire to learn.", false);//limite o corte de la descripcion    
      //job.html       = removeTextAfter(job.html, "Must demonstrate excellent clinical and interpersonal competence.", false);//limite o corte de la descripcion
      job.html = job.html.split("Applying to Noyes").shift();
  
      if (job.html.search(/part time/i) > -1) { job.source_jobtype = "Part time"; }
      if (job.html.search(/part\-time/i) > -1) { job.source_jobtype = "Part time"; }
      if (job.html.search(/full time/i) > -1) { job.source_jobtype = "Full time"; }
      if (job.html.search(/full\-time/i) > -1) { job.source_jobtype = "Full time"; }
      if (job.html.search(/fixed\-term/i) > -1) { job.source_jobtype = "Fixed Term"; }
      if (job.html.search(/fixed term/i) > -1) { job.source_jobtype = "Fixed Term"; }
  
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
  
      job.temp = '11/10/2021';
      if(job.title.search(/Applying to Noyes/i)>-1){job.title = "";}
      if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
        jobs.push(job);
      }
      //count = count + 1;
    } 
  
    if (jobs.length === 0) {
      var job = {};
      job.title = "job fantasma"+Math.random();
      jobs.push(job);
    }
  
    out["jobs"]= jobs;
    return out;
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = text + " " + newHtml;
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


  // PAGINATION

  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    if (typeof msg == "undefined") msg = function (x) { return x; };
    out["pass_it"]["currentUrl"] += 1;
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
      var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    out.wait = true;
    return out;
  })();