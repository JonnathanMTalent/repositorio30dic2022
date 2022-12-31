 // EXTRACT

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.opening");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
        // msg(elem)
    	job.title = elem.querySelector("a").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();
        job.reqid = job.url.split("id=").pop();
      	job.source_location = '';
      	job.source_location = elem.querySelector("span.location").textContent.trim();
    	job.location = elem.querySelector("span.location").textContent.trim();
        if (job.location.toLowerCase().includes("remote")) job.location = 'Beaverton, OR'; 
       	job.temp = "464646";
     	jobs.push(job);
      
      /*if(job.title !="Future Opportunities"){
        	job.is_crunchbase=1;
    		jobs.push(job);
      }*/
      
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

//PAGINATION:

(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();


//BEFORE JOBDESCRIPTION

(function() {
	var out = {};
  	out.iframeSelector = "#grnhse_iframe"
  out.iframeWaitFor = 'div#wrapper'//"body"//"div.elementor-tab-content.elementor-clearfix.elementor-active"
    return out;
})();



//JOBDESCRIPTION


(function() {
    var out = {};
    var job = {};
    var iframeDocument=document.querySelector('#grnhse_iframe').contentWindow.document;
    var selector = "div#wrapper";  
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = iframeDocument.querySelector(selector);
    
    
    const auxExperience = [...full_html.querySelectorAll('LI')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
  if (auxExperience) {
      job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
  }
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Responsibilities', false);
      job.html = removeTextBefore(job.html, 'Position Summary', false);
    job.html = removeTextAfter(job.html, 'This is a full-time position', true);
    job.html = removeTextAfter(job.html, 'This is a very exciting period of growth for our team', true);
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