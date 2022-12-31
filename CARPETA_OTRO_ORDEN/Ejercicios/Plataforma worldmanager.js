//Plataforma Worldmanager


//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('ul#list > li[class*="position textColour"]');
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("h2 > a").textContent.trim();
    job.reqid = elem.querySelector("h2 > a").href.split("id=").pop().split("&").shift().trim();
    job.url = elem.querySelector("h2 > a").href.trim();
    job.location = elem.querySelector("span.LocationNameColour").textContent.split(":").pop().trim();
    job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();

    if(elem.querySelector("span.PostedDateColour")){
      var posted = elem.querySelector("span.PostedDateColour").textContent.split(":").pop().trim();
      posted = posted.replace(" January ","/01/").replace(" February ","/02/").replace(" March ","/03/").trim();
      posted = posted.replace(" April ","/04/").replace(" May ","/05/").replace(" June ","/06/").trim();
      posted = posted.replace(" July ","/07/").replace(" August ","/08/").replace(" September ","/09/").trim();
      posted = posted.replace(" October ","/10/").replace(" November ","/11/").replace(" December ","/12/").trim();
      posted = posted.split("/");
      job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
    }

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 12021;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


//Jobdata

(function() {
    var out = {};
    var job = {};
    var selector = "div.LongDescription.textColour";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim(); 
  
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  
  
    if(job.html.indexOf('@')>-1){
      var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
      job.html = job.html.replace(eliminar,'');
    }
  
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  
    let selectorExpre = 'li'; //Selector del jobdata (también puede ser p, div, span)
    let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
    for (const a of document.querySelectorAll(selectorExpre)) {
      if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
        if (a.textContent.match(regextwo)) {
          job.experience_required = a.innerText.match(regextwo)[0];
          job.experience_required = job.experience_required.replace("18+ years","").trim();
          job.experience_required = job.experience_required.replace("50 years","").trim();
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