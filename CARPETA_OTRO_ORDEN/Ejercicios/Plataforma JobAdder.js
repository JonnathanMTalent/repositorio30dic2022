// Plataforma JobAdder


//Before extract

(function () {
  var out = {};
  out.waitFor = "div.ja-job-list > div.job";
  out.pic = true;
  return out;
})();


//Extract

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div.ja-job-list > div.job");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("h2 > a").textContent.trim();
    job.reqid = elem.querySelector("h2 > a").getAttribute("data-job-id");
    job.url = "http://www.mecwacare.org.au/jobadder.html?ja-job=" + job.reqid;

    job.location = elem.querySelector("ul.classifications > li:nth-child(3)").textContent.trim();
    job.location = job.location.replace("Other","").trim();

    if(elem.querySelector("p.date-posted")){
      var posted = elem.querySelector("p.date-posted").textContent.trim().split("/");
      job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
    }

    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector("ul.classifications > li:nth-child(4)").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();



    job.temp = 12021;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


//Pagination


(function() {
  var out = {};
  var next_page_selector = "a.next"; //selector to identify the next button

  var clickable_elem = document.querySelector(next_page_selector);

  if(clickable_elem){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out.waitFor = "div.ja-job-list > div.job";
  return out;
})();



//Before Jobdata

(function () {
  var out = {};
  out.waitFor = "div.description";
  out.pic = true;
  //out.html = true;
  return out;
})();


//Jobdata


(function() {
  var out = {};
  var job = {};
  var selector = "div.description";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;


  for(const a of document.querySelectorAll('em')) {
    if (a.textContent.includes('Application Closes:')) {
      if(a.textContent.indexOf('202')>-1){
        var closed = a.textContent.trim().split("Application Closes:").pop().split(",").pop().trim();
        closed = closed.replace(/January/gi,"01").replace(/February/gi,"02").replace(/March/gi,"03").trim();
        closed = closed.replace(/April/gi,"04").replace(/May/gi,"05").replace(/June/gi,"06").trim();
        closed = closed.replace(/July/gi,"07").replace(/August/gi,"08").replace(/September/gi,"09").trim();
        closed = closed.replace(/October/gi,"10").replace(/November/gi,"11").replace(/December/gi,"12").trim();
        closed = closed.replace("Monday","").trim();
        closed = closed.replace("Tuesday","").trim();
        closed = closed.replace("Wednesday","").trim(); 
        closed = closed.replace("Thursday","").trim();
        closed = closed.replace("Friday","").trim();
        closed = closed.replace("Saturday","").trim();
        closed = closed.replace("Sunday","").trim();
        closed = closed.replace("st","").trim();
        closed = closed.replace("nd","").trim();
        closed = closed.replace("rd","").trim();
        closed = closed.replace("th","").trim();
        closed = closed.replace(".","").replace(",","").replace(/&nbsp;/g," ").trim();
        closed = closed.split(" ");
        job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
      }
    }
  }


  job.html      = full_html.innerHTML.trim();   

  job.html = removeTextBefore(job.html, 'To apply for this role', false);
  job.html = removeTextBefore(job.html, 'Essential', false); 
  job.html = removeTextBefore(job.html, 'The Project Officer', false);
  job.html = removeTextBefore(job.html, 'To be successful in this role', false);

  job.html = removeTextAfter(job.html, 'If you are looking for flexible', true);
  job.html = removeTextAfter(job.html, 'Enquires to', true); 
  job.html = removeTextAfter(job.html, 'Enquiries to', true);
  job.html = removeTextAfter(job.html, 'All enquiries to', true); 
  job.html = removeTextAfter(job.html, 'Enquiries to Wina Kung', true);

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

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

