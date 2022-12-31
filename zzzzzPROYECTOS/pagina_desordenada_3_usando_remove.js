// ejemplo:https://www.ifastcorp.com/ifastcorp/careers/job-openings.tpl?country=SG
PAGINA DESORDENADA 3 (usando .remove())


(function() {
	var out = {};
  	var jobs = [];
    var html_jobs = document.querySelectorAll("#availableCareer h3");
  	// .replace(/\(.*?\)/g, '')
  
  for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	var remove_selectors = ['.label.label-warning.pull-right'];
   // var clean = elem.querySelector("span.label.label-warning.pull-right").textContent.trim();
    	job.title = elem.textContent.replace('Email this to your friends',"").trim();
    	job.url = window.location.href;
    	job.location = "Singapore, SG";
    	job.source_location='';
    	 /*var fecha = elem.querySelector("").textContent.trim().split("/");
        job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
	    //job.source_apply_email = elem.querySelector("").textContent.trim();
	    //job.source_empname = elem.querySelector("").textContent.trim();
	    //job.source_jobtype = elem.querySelector("").textContent.trim();
	    //job.source_salary = elem.querySelector("").textContent.trim();
		//job.reqid = elem.querySelector("").textContent.trim();
	//job.experience_required = elem.querySelector("").textContent.trim();
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;


           job.html = elem.parentNode;//.replace(/Email this to your friends/gi,"");
    
      	if (remove_selectors.length > 0) {       
            remove_selectors.forEach(remove_selector => {
			  let salir
              do{
                salir = false;
                if (job.html.querySelector(remove_selector)) {
                    job.html.querySelector(remove_selector).remove();
                   	salir = true;
                }
              }while (salir);  
            });
        } 
        
     job.html = job.html.innerHTML.trim()
  	 job.html = removeTextBefore(job.html, job.title, true);
  	 job.html = removeTextAfter(job.html, "<hr", true);
     job.html = cleanHTML(job.html);
     let tmp = document.createElement('div');
     tmp.innerHTML = job.html;
     job.jobdesc = tmp.textContent.trim();
     job.jobdesc = cleanHTML(job.jobdesc);
// PONER DE AQUI EN ADELANTE LAS VARIABLES A BUSCAR USANDO EL TMP




		// *************************************************
       	job.temp = 1;
    	jobs.push(job);
  	}  
  
	out["jobs"]= jobs;
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