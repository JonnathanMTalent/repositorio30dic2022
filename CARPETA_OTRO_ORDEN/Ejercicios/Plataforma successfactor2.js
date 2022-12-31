//Before extract

(function() {
  var out = {};
  out.waitFor = "tbody > tr.jobResultItem"
  return out;
})();


//Extract

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("tbody > tr.jobResultItem");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("a.jobTitle").textContent.trim();
    job.reqid = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(1)").textContent.trim();
    job.url = elem.querySelector("a.jobTitle").href.trim();

    job.location = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(3)").textContent.trim();
    job.location = job.location.split("–").reverse().join(", ");
    
    var posted = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(2)").textContent.split("Posted on ").pop().trim().split("/");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
    
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector("div.noteSection > div:nth-child(2) > span:nth-child(2)").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    
    job.temp = 12021;
    jobs.push(job);
  } 

  //out.pic = true;
  out["jobs"]= jobs;
  return out;
})();

//Paginación

(function() {
  var out = {};
  var next_page_selector = 'a[title="Next Page"]'; //selector to identify the next button

  var clickable_elem = document.querySelector(next_page_selector);
  
  if(clickable_elem){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out.waitFor = "table > tbody > tr.jobResultItem";
  return out;
})();


//Jobdata


(function() {
  var out = {};
  var job = {};
  var selector = 'div span[itemprop="description"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  
  if(document.querySelector('span[itemprop="customfield1"]')){
  job.source_jobtype = document.querySelector('span[itemprop="customfield1"]').textContent.trim();}
  else {job.source_jobtype = "";}
  msg(job.source_jobtype)
  
  if(document.querySelector('span[itemprop="customfield2"]')){
  job.source_salary = document.querySelector('span[itemprop="customfield2"]').textContent.trim();}
  else { job.source_salary = "";}
  msg(job.source_salary)
  
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  job.html = removeTextAfter(job.html, 'How to apply', true);
  job.html = removeTextAfter(job.html, 'Interested?', true);
  job.html = removeTextAfter(job.html, 'Need help?', true);
  job.html = removeTextAfter(job.html, 'Want to know more?', true);
  job.html = removeTextAfter(job.html, 'Application Instructions', true);
  job.html = removeTextAfter(job.html, 'To get a complete profile', true);

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }
  
  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }  


  let selectorExpre = 'div span[itemprop="description"]'; //Selector del jobdata (también puede ser p, div, span)
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