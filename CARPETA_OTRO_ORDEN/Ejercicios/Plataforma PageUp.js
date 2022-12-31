//Before extract

(function () {
  var out = {};
  out.waitFor = "table > tbody#recent-jobs-content > tr";
  //out.pic = true;
  //out.html = true;
  return out;
})();


//Extract

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("table > tbody#recent-jobs-content > tr:not([class='summary'])");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("td > a.job-link").textContent.trim().split("(").shift();
    job.reqid = elem.querySelector("td > a.job-link").href.split("/")[6].trim();
    job.url = elem.querySelector("td > a.job-link").href.trim();

    job.location = elem.querySelector("span.location").textContent.trim();
    job.location = job.location.replace("Corporate Office","Kensington, South Australia").trim();
    

      if(elem.querySelector("span.close-date > time")){
          var closed = elem.querySelector("span.close-date > time").getAttribute("datetime").split("T").shift().trim();
          closed = closed.split("-");
          job.dateclosed_raw = closed[1] +'/'+ closed[2] +'/'+ closed[0];
      }
      

    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 122020;

    if(job.location.indexOf(',') > -1) {
      var array = job.location.split(',');
      for (var i in array) {
        var jobx = {};
        jobx.title = job.title;
        jobx.reqid = job.reqid;
        jobx.url = job.url;
        //jobx.source_jobtype = job.source_jobtype;
        //jobx.source_salary = job.source_salary;
        //jobx.logo = job.logo;
        //jobx.source_empname = job.source_empname;
        //jobx.dateposted_raw = job.dateposted_raw;
        jobx.dateclosed_raw = job.dateclosed_raw
        //jobx.html = job.html;
        //jobx.jobdesc= job.jobdesc;
     
        jobx.location = array[i].trim();
        jobx.temp = job.temp;
        if (jobx.location.length > 0) {
          jobs.push(jobx);
        }
      }
    }
    else {
      job.location = job.location
      jobs.push(job);
    }
    } 
    
    out["jobs"]= jobs;
    return out;
    })();


//Infinite pagination

(function() {
  let out = {};
let selector = "#recent-jobs > p > a:not([style*='display: none;'])";   //Este es el selector que solo aparece cundo se da click en load more
let partial_text = "";
  out["has_next_page"] = false;

let all_elems = document.querySelectorAll(selector);
[].forEach.call(all_elems, function(elemento){
    if(out["has_next_page"]) return out;
    if(elemento.textContent.trim().indexOf(partial_text) != -1){
        elemento.click();
        out["has_next_page"] = true;
    }
});        

  out["wait"] = true;
  return out;
})();


//Jobdata

(function() {
  var out = {};
  var job = {};
  var selector = "div#job-details";
  var remove_selectors = [];
  
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  if(document.querySelector("span.open-date > time")){
    var posted = document.querySelector("span.open-date > time").getAttribute("datetime").split("T").shift().trim();
    posted = posted.split("-");
    job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];
  }

  job.source_jobtype = document.querySelector('span[class*="work-type"]').textContent.trim();
  
  job.html      = full_html.innerHTML.trim();  
  
  job.html = removeTextBefore(job.html, 'Categories', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  job.html = removeTextBefore(job.html, 'What is the opportunity', false);
  job.html = removeTextBefore(job.html, 'The opportunity', false);
  
  job.html = removeTextAfter(job.html, 'If you would like to join us', true);
  job.html = removeTextAfter(job.html, 'If you believe you fit this role', true);
  job.html = removeTextAfter(job.html, 'If you would like to know more', true);

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }
  
  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  
  let selectorExpre = 'div#job-details'; //Selector del jobdata (también puede ser p, div, span)
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



//https://careers.csr.com.au/cw/en/listing/?page-items=1000