

Bamboo HR ATS

// Extract

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("li.ResAts__card-content.ResAts__listing");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
      

      
            job.title    = elem.querySelector("a.ResAts__listing-link").textContent.trim().split("(")[0];
            job.url      = elem.querySelector("a").href.trim();
  
      
              //Location array "city, state"

              var city    = elem.querySelector("div.ResAts__listing-sectionWrapper div.AtsLead.truncate").textContent.trim();
              var state   = elem.querySelector("div.ResAts__listing-sectionWrapper").textContent.replace(city,"").trim();

              var loc = "";
              var array_loc = Array();

              if(city) array_loc.push(city);
              if(state) array_loc.push(state);

              if(array_loc.length) loc = array_loc.join(", ");

            job.location = loc;


            job.source_jobtype = elem.querySelector('div[itemprop="employmentType"]').textContent.trim();

            job.temp = "August-2020";
      
      		if(job.title.indexOf("Don't see an opening")>-1){job.title = "";}

          if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
          jobs.push(job);
          }
       
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();




    // DESCRIPTION JS PLANO

    
(function() {
var out = {};
var job = {};

var selector = 'div.ResAts__Viewport.js-jobs-viewport.js-chosen-container';

var remove_selectors = ['a','input','div.alert','img', 'button',
                        'script','style','div.ResAts__applyButtonWrapper'
                        
];
  //var job = pass_it["job"];



var full_html = document.querySelector(selector);

if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;



  var full_html_text = full_html.textContent;



 // TO Remove selectors 
  for (const a of full_html.querySelectorAll('a, img, script,div.ResAts__applyButtonWrapper')) {
      if (a){
        a.remove(); 
      } 
    }
  


   
job.html    = full_html.innerHTML.trim();


  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);


  job.html = job.html.split("Apply")[0];

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
newHtml = text + " " + newHtml;
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

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition], 
              month =  dateRaw.split(cut)[monthPosition], 
              year  = dateRaw.split(cut)[yearPosition];

          if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr/i)>-1){month = "04";}
            if(month.search(/may/i)>-1){month = "05";}
            if(month.search(/jun/i)>-1){month = "06";}
            if(month.search(/jul/i)>-1){month = "07";}
            if(month.search(/aug/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
  }
