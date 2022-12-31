// Ultipro


//Before Extract

(function() {
  var out = {};
  out.iframeSelector = "iframe#_as";
  out.iframeWaitFor = "div.opportunity";
  out.pic = true;
  return out;
})();


//Extract

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div.opportunity");
  var jobs = [];

  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("h3 > a").textContent.trim();
    job.reqid = elem.querySelector('span[data-bind="text: RequisitionNumber()"]').textContent.trim();
    job.url = elem.querySelector("h3 > a").href.trim();
    job.location = elem.querySelector('span[data-automation="city-state-zip-country-label"]').textContent.trim();

    if(elem.querySelector('small[data-automation="opportunity-posted-date"]')){
      var posted = elem.querySelector('small[data-automation="opportunity-posted-date"]').textContent.trim();
      posted = posted.replace(/Jan/gi,"01").replace(/Feb/gi,"02").replace(/Mar/gi,"03").trim();
      posted = posted.replace(/Apr/gi,"04").replace(/May/gi,"05").replace(/Jun/gi,"06").trim();
      posted = posted.replace(/Jul/gi,"07").replace(/Aug/gi,"08").replace(/Sep/gi,"09").trim();
      posted = posted.replace(/Oct/gi,"10").replace(/Nov/gi,"11").replace(/Dec/gi,"12").trim();
      posted = posted.replace(",","").split(" ");
      job.dateposted_raw = posted[0] +'/'+ posted[1] +'/'+ posted[2];
    }

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector('span[data-automation="job-hours"]').textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();


    job.temp = 122020;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


//Job data


(function() {
  var out = {};
  var job = {};
  var selector = 'body.opportunitydetail-controller.candidate-layout div.index-action div#opportunityDetailView div[class="col-md-18"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim(); 

  //job.html = removeTextBefore(job.html, 'Description', false);
  job.html = removeTextAfter(job.html, 'Equal Opportunity Employer', true);
  job.html = removeTextAfter(job.html, "Qualifications", true);

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }


  let selectorExpre = 'p'; //Selector del jobdata (también puede ser p, div, span)
  let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
  for (const a of document.querySelectorAll(selectorExpre)) {
    if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
      if (a.textContent.match(regextwo)) {
        job.experience_required = a.innerText.match(regextwo)[0];
        job.experience_required = job.experience_required.replace("18+ years","").trim();
        job.experience_required = job.experience_required.replace("80 years","").trim();
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