https://www.hi.org/fr/emplois

EXTRACT: 

 

(function() { 

var out = {}; 

     var html_jobs = document.querySelectorAll('tr[class*="clickable-row"]'); 

  	var jobs = [];for(var x in html_jobs){ 

    	if(typeof html_jobs[x] =="function") continue; 

      	if(typeof html_jobs[x] =="number") continue; 

    	var job = {}; 

    	var elem = html_jobs[x]; 

    	job.title = document.querySelector('td:nth-child(2)').textContent.trim(); 

     	var url = document.querySelector('tr[class*="clickable-row"]').getAttribute('data-href'); 

        job.url="https://hi.org/"+url; 

    	//job.url = "https://hdr.taleo.net/careersection/jobdetail.ftl?job="+job.reqid+"&lang=en"; 

        //LA URL ES:   https://hdr.taleo.net/careersection/jobdetail.ftl?job=165018&lang=en 

      	//job.source_location= elem.querySelector(":nth-child(3) > div >div span").textContent.trim(); 

        //if(elem.querySelector((":nth-child(3) > div >div span").textContent.trim().split("-").length() > 1)){ 

        //	console.log("va bien") 

        //} 

    	job.location = elem.querySelector("td:nth-child(3)").textContent.trim(); 

      	//if(job.location=="Remote"){ 

         // job.location="Cankaya, Ankara, TR"; 

      //  } 

      	//job.reqid=elem.querySelector("span[id*='requisitionListInterface.reqContestNumberValue']").textContent.trim(); 

        var fecha= elem.querySelector('td:nth-child(4)').textContent.trim().split("/"); 

        job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2]; 

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