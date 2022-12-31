//https://phe.tbe.taleo.net/phe03/ats/careers/v2/searchResults?org=EFI&cws=43

(function(){ 
    var out = {}; 
    msg(pass_it); 
    if(!pass_it["heights"]) out["pass_it"] = {"heights":[]};   
    else          out["pass_it"] = pass_it;  
    out["has_next_page"] = true;                     
    if(out["pass_it"]["heights"].length > 3){       
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);  
        if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])  
          out["has_next_page"] = false;                    
    } 
  window.scrollBy(0, document.body.scrollHeight);  
    out["wait"] = true; 
    //out["pic"]  = true; 
    //out["html"]   = true; 
    out["pass_it"]["heights"].push(document.querySelectorAll('div[class="oracletaleocwsv2-accordion oracletaleocwsv2-accordion-expandable clearfix"]').length);  
    return out; 
})();
//extract
(function() {  
var out = {};  
     var html_jobs = document.querySelectorAll('div[class="oracletaleocwsv2-accordion oracletaleocwsv2-accordion-expandable clearfix"]');  
    var jobs = [];for(var x in html_jobs){  
        if(typeof html_jobs[x] =="function") continue;  
        if(typeof html_jobs[x] =="number") continue;  
        var job = {};  
        var elem = html_jobs[x];  
        job.title = elem.querySelector('a[class="viewJobLink"]').textContent.trim();  
        job.url = elem.querySelector('a[class="viewJobLink"]').href.trim();  
        //job.url = "https://hdr.taleo.net/careersection/jobdetail.ftl?job="+job.reqid+"&lang=en";  
        //LA URL ES:   https://hdr.taleo.net/careersection/jobdetail.ftl?job=165018&lang=en  
        //job.source_location= elem.querySelector(":nth-child(3) > div >div span").textContent.trim();  
        //if(elem.querySelector((":nth-child(3) > div >div span").textContent.trim().split("-").length() > 1)){  
        //  console.log("va bien")  
        //}  
        //job.location = elem.querySelector('div.oracletaleocwsv2-accordion-head-info > div').innerText.split(" - ").reverse().join(", ");  
        //job.jobtype = elem.querySelector('div[class="section-type bp-center"]').textContent.trim();  
        //var fecha= elem.querySelector('div[class="section-publication bp-center"]').textContent.trim().substr(11,10).split("-");  
        //job.dateposted_raw = fecha[1]+'/'+fecha[2]+'/'+fecha[0];  
       //  2022-04-26 12:35:18 
        //if(job.location=="Remote"){  
         // job.location="Cankaya, Ankara, TR";  
      //  }  
        //job.reqid=elem.querySelector("span[id*='requisitionListInterface.reqContestNumberValue']").textContent.trim();  
        //var fecha= elem.querySelector(':nth-child(4) > div >div span').textContent.trim().split(".");  
        //job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];  
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