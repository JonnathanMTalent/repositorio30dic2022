// Plataforma talent-soft


//Extract

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("#main > ul.ts-related-offers__row > li");
  	var jobs = [];
        for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue; 
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h3 > a").textContent.trim();
    	job.url = elem.querySelector("h3 > a").href.trim();
        var fecha = elem.querySelector("ul > li:nth-child(2)").textContent.trim().split("/");
        job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];
        //job.location = elem.querySelector("ul > li.noBorder").textContent.trim();
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


//Paginación


(function () {
    var out = {};
    var selector = "ul.ts-ol-pagination-list li a";  // selector donde esta la paginacion

  if (typeof pass_it == "undefined") pass_it = {};
    
  if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;
      	
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == out["pass_it"].cont){                
              	//msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
              	out["has_next_page"] = true;
            }
        });  

    out.waitFor = 'div.ts-offer-card';
    return out;
})();


//Jobdata

(function() {
  var out = {};
  var job = {};
  var selector = "div.ts-offer-page__block";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.location = $("p#fldlocation_location_geographicalareacollection").text().trim().split("(")[0].replace("Europe, ","").trim().split(",").reverse().join(", ");
  
  job.source_jobtype = document.querySelector("#fldjobdescription_contract").textContent.trim();
  
  job.html      = full_html.innerHTML.trim();    
  
  job.html = removeTextBefore(job.html, 'Vos missions', false);
  job.jobdesc = removeTextBefore(job.html, 'Vos missions', false);
  
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
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

