//Inland

//Before extract:

(function() {
	var out = {};
  
	if (typeof pass_it == "undefined") 
      pass_it = {};

  	if (!pass_it["cont"]) {
    	out["pass_it"] = {
      		"cont": 0,
		    "salir":false

    	};
  	} else {
    	out["pass_it"] = pass_it;
    }
  
  var SelectorJobs = "div.job-item.job-items-3.clearfix" //+out["pass_it"]["cont"]+")";
  var elem = document.querySelectorAll(SelectorJobs)[out["pass_it"].cont];
     
  if (elem){
    out["pass_it"]["title"] = elem.querySelector("div.job-item-job-title.has-data").textContent.trim();
    out["pass_it"]["location"] = elem.querySelector("div.job-item-detail.job-item-location.has-data.has-next").textContent.trim();
    //out["pass_it"]["dateposted_raw"] =
    
  	elem.click();
    
    out.waitFor = "div.job-description";
  }
  else{
    msg("EN EL FALSE DE BEFORE")
    out["pass_it"]["salir"] = true;
  }
  

    return out;
})();


//Extract:

(function() {

	var out = {};
	var jobs = [];
  	out["pass_it"] = pass_it;
  if (out["pass_it"]["salir"]){
  	var job = {};
    job.title = 'holaa';
    jobs.push(job);
  }else{
  		
  if (document.querySelector("div.job-description")){
    var job = {};
   	job.title = out["pass_it"]["title"]//document.querySelector(".c-job-details__title").textContent.replace(/\[.*?\]/g, '').trim();
    job.location = out["pass_it"]["location"] //document.querySelector(".c-job-details__overview__value:nth-of-type(2)").textContent.trim();
  	job.url =   document.querySelector("div.job-url a").href.trim() //window.location.href;

  
     job.html = document.querySelector("div.job-description").innerHTML.trim();
  
  	  //job.html = removeTextBefore(job.html, "Wat ga je doen?", false);
  	  //job.html = removeTextAfter(job.html, "Vragen?", true);
    // job.html 		= cleanHTML(job.html);
    // job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
	// job.jobdesc     = cleanHTML(job.jobdesc);
      	job.html      = cleanHTML(job.html);
  		var tmp       = document.createElement('div');
  		tmp.innerHTML = job.html;
  		job.jobdesc   = tmp.textContent.trim();
  		job.jobdesc   = cleanHTML(job.jobdesc);
    
  
  job.temp = 1;
  jobs.push(job);
    	
  }	
  }
  
  out["jobs"] = jobs;
	return out;
  
   
})();


 function removeTextBefore(html, text, flag) {
      let newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = "<h3>" + text + "</h3>" + newHtml;
        }  		
      }
      return newHtml;
    }

    function removeTextAfter(html, text, flag) {
      let newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
          newHtml = newHtml + "<p>" + text + "</p>";
        }  		
      }
      return newHtml;
    }


//Paginación:

(function () {
  var out = {};
   
    out["pass_it"] = pass_it;
     out["pass_it"].cont += 1;
 	 window.location.href = 'https://hire.myavionte.com/app/careers/#/jobs/EtnB8FiDM4U/MoaInVnOAMg//';

  
if (out["pass_it"]["salir"])
    out["has_next_page"] = false;
else
    out["has_next_page"] = true;

  out.waitFor = 'job-card';
  return out;
})();