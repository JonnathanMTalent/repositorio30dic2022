// Extract con multilocation


(function() {
var out = {};
     var html_jobs = document.querySelectorAll("div#ListJobResult > div.box-sec2");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
  var elem = html_jobs[x];
      
    var loc = elem.querySelector("div.box-sec2-left > span > span > p > span:nth-child(3)").textContent.replace(/ and /gi," & ").trim();
    loc = loc.substring(loc.lastIndexOf("/")+1)
    loc = loc.split(" & ")
    loc.forEach( function (element){      
      
      var job = {};
    	job.title = elem.querySelector("h4 > a").textContent.trim();
    	job.url = elem.querySelector("h4 > a").href.trim()+"?utm_source=neuvoo";
      var datePosted = elem.querySelector("div.box-sec2-left > span").textContent.split("Job Posting: ").pop().split(" - ").shift().trim();
      job.dateposted_raw = getDateFormat(datePosted," ",0,1,2);
      job.source_empname = elem.querySelector("div.box-sec2-right > h5").textContent.trim();
    	//job.location = elem.querySelector("div.box-sec2-left > span > span > p > span:nth-child(3)").textContent.trim();
      //job.location = job.location.substring(job.location.lastIndexOf("/")+1)
      //job.location = job.location+", AU";
      job.location = element.replace(" - ",", ").trim()+", AU";

      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
        //job.experience_required = elem.querySelector("").textContent.trim();  		
        //job.dateclosed_raw = monthJob+"/"+dia+"/"+ano;

       	job.temp = 1;
    	jobs.push(job);
       }, elem);
  	} 
  
out["jobs"]= jobs;
  	return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
      dateRaw = dateRaw.replace(/\,/g,"").trim();
        
      let day   =  dateRaw.split(cut)[dayPosition].trim(), 
          month =  dateRaw.split(cut)[monthPosition].trim(), 
          year  = dateRaw.split(cut)[yearPosition].trim();

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