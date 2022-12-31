//Success factor


//Before extract

(function() {
  var out = {};
  out.waitFor = "tr.data-row.clickable"
  return out;
})();



//extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("tr.data-row.clickable");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("span.jobTitle.hidden-phone > a").textContent.trim();
    job.reqid = elem.querySelector("span.jobTitle.hidden-phone > a").href.split("/")[5].trim();
    job.url = elem.querySelector("span.jobTitle.hidden-phone > a").href.trim();
    job.location = elem.querySelector("div.jobdetail-phone.visible-phone > span.jobLocation").textContent.trim();

    if(elem.querySelector("td.colDate.hidden-phone > span.jobDate")){
      var posted = elem.querySelector("td.colDate.hidden-phone > span.jobDate").textContent.trim();
      posted = posted.replace(/Jan/gi,"01").replace(/Feb/gi,"02").replace(/Mar/gi,"03").trim();
      posted = posted.replace(/Apr/gi,"04").replace(/May/gi,"05").replace(/Jun/gi,"06").trim();
      posted = posted.replace(/Jul/gi,"07").replace(/Aug/gi,"08").replace(/Sep/gi,"09").trim();
      posted = posted.replace(/Oct/gi,"10").replace(/Nov/gi,"11").replace(/Dec/gi,"12").trim();
      posted = posted.split("-");
      job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
    }

    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 12021;
    jobs.push(job);
  } 

  //out.pic = true;
  out["jobs"]= jobs;
  return out;
})();


//Jobdata


(function() {
  var out = {};
  var job = {};
  var selector = "span.jobdescription";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;


  for(const a of document.querySelectorAll('span')) {
    if (a.textContent.includes('Hourly rate')) {
      job.source_salary = a.textContent.trim().split(" - ").shift().trim();
    }
    if (a.textContent.includes('Closing date:')) {
      if (a.textContent.includes('202')) {
        var closed = a.textContent.trim().replace("Closing date:",'');
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
        closed = closed.replace(".","").replace(",","").replace("s","").split(" ");
        job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
      }
    }
  }


  job.html      = full_html.innerHTML.trim();    

  job.html = removeTextBefore(job.html, 'About the role', false);
  job.html = removeTextAfter(job.html, 'For more information', true);

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

  let selectorExpre = 'span.jobdescription'; //Selector del jobdata (también puede ser p, div, span)
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
