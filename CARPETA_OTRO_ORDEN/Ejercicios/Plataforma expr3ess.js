//Extract

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll('tbody > tr[class*="jobSearch"]:not([class*="interestOnly"])');
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("td.jobTitle").textContent.trim().split("[").shift();
    	job.url = elem.querySelector("td.center.detail > a").href.trim();
    	job.location = elem.querySelector("td div span").textContent.trim();

      var posted = elem.querySelector("td.center.medium.date").textContent.trim();

      posted = posted.replace(" Jan ","/01/").trim();
      posted = posted.replace(" Feb ","/02/").trim();
      posted = posted.replace(" Mar ","/03/").trim(); 
      posted = posted.replace(" Apr ","/04/").trim();
      posted = posted.replace(" May ","/05/").trim();
      posted = posted.replace(" Jun ","/06/").trim();
      posted = posted.replace(" Jul ","/07/").trim();
      posted = posted.replace(" Aug ","/08/").trim();
      posted = posted.replace(" Sep ","/09/").trim();
      posted = posted.replace(" Oct ","/10/").trim();
      posted = posted.replace(" Nov ","/11/").trim();
      posted = posted.replace(" Dec ","/12/").trim();
      posted = posted.split("/");
      job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();


//JObdescription

(function() {
  var out = {};
  var job = {};
  var selector = "td#adCopyContainer";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();   
  
  
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  job.html = removeTextAfter(job.html, 'For questions or enquiries about this role', true);


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