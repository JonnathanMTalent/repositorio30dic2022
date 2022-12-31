//Plataforma applynow.net


//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("table.table.table-list > tbody > tr");
  var jobs = [];
  for(var x in html_jobs){
    
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    
    job.title = elem.querySelector("a.job_title").textContent.trim();
    job.reqid = elem.querySelector("span.reference").textContent.split(":").pop().trim();
    job.url = elem.querySelector("a.job_title").href.trim();
    job.location = elem.querySelector("span.location").textContent.split(":").pop().trim();
    
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



//Paginación

(function() {
  var out = {};
  var next_page_selector = 'li[class="page-item"] > a[aria-label="Next"]'; //selector to identify the next button

  var clickable_elem = document.querySelector(next_page_selector);

  if(clickable_elem){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out.waitFor = "table.table.table-list > tbody > tr";
  return out;
})();



//Jobdata



(function() {
  var out = {};
  var job = {};
  var selector = "div#job_description";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();  


  job.html = removeTextBefore(job.html, 'About the role:', false);
  job.html = removeTextBefore(job.html, 'The Role:', false);

  job.html = removeTextAfter(job.html, 'To apply', true);
  job.html = removeTextAfter(job.html, 'Apply Now', true);
  job.html = removeTextAfter(job.html, "click ‘Apply Now’", true);
  job.html = removeTextAfter(job.html, 'for a confidential discussion', true);

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }


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

