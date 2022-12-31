//Extract

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.searchResultsShell tbody tr");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("td.colTitle > span > a").textContent.trim();
    	job.url = elem.querySelector("a.jobTitle-link").href.trim()+"?utm_source=neuvoo";
    	job.location = elem.querySelector("td.colLocation.hidden-phone").textContent.trim().split(", 2").shift();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
		  //job.source_apply_email = elem.querySelector("").textContent.trim();
		  job.source_empname = elem.querySelector("td.colFacility.hidden-phone").textContent.trim();
		  //job.source_jobtype = elem.querySelector("").textContent.trim();
		  //job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();


//Paginación

(function () {
  var out = {};
  out.wait = 2000;

  var url_base = "https://jobs.transport.nsw.gov.au/search/?q=&sortColumn=referencedate&sortDirection=desc&startrow=";

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined")
    msg = function (x) {
      return x;
    };

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      cont: 25,
      jobs: 0,
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var perpage_fijo = "25";
  var perpage_actual = document.querySelectorAll("div.searchResultsShell tbody tr").length;

  msg("perpage_fijo: " + perpage_fijo);
  msg("perpage_actual: " + perpage_actual);

  if (perpage_actual >= perpage_fijo) {
    var nuevaUrl = url_base + out["pass_it"].cont;
    out["pass_it"].cont += 25;
    msg("\x1b[45m URL siguiente:\x1b[45m" + nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true;
  } else {
    msg("\x1b[41m NO HAY MAS PAGINA ");
    out["has_next_page"] = false;
  }
  out["wait"] = true;
  return out;
})();


//Jobdata


(function() {
  var out = {};
  var job = {};
  var selector = 'div span[itemprop="description"]';
  var remove_selectors = ["a"];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim().replace("For more information on this position, view the role description","").replace("For more information on Employee Benefits at TfNSW please click","");    
  
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