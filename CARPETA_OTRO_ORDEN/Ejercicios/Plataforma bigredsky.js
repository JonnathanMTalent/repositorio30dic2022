//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("table.Report > tbody > tr.evenrow, tr.oddrow");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("td:nth-child(3) > a").textContent.trim();
    job.url = elem.querySelector("td:nth-child(3) > a").href.trim();
    job.location = elem.querySelector("td:nth-child(7)").textContent.trim() + ", AU";
    job.location = job.location.replace("Perth Metro","Perth Metropolitan").trim();
    
    var fecha = elem.querySelector("td:nth-child(1) > input").getAttribute("value").trim().split("/");
    job.dateclosed_raw = fecha[1] +'/'+ fecha[0] +'/'+ fecha[2];
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector("td:nth-child(4)").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


//Jobdata

(function() {
  var out = {};
  var job = {};
  var selector = "div.templatetext";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();

  job.html = removeTextBefore(job.html, 'A job to be proud of', false);
  job.html = removeTextBefore(job.html, 'The opportunity', false);
  job.html = removeTextAfter(job.html, 'Are you ready to change lives', true);
  job.html = removeTextAfter(job.html, 'Are you ready to change lives', true);
  job.html = job.html.replace("08 9334 1426","");

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

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