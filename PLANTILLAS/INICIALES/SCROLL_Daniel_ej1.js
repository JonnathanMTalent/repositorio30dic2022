

// Ejercicio 1. 


/*

Jobsite: https://phe.tbe.taleo.net/phe03/ats/careers/v2/searchResults?org=EFI&cws=43




 */

// Extract 

(function() {
    var out = {};
  
        var html_jobs = document.querySelectorAll(''); 
        var jobs = [];
    
        for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        
        var job  = {};
        var elem = html_jobs[x];
  
        job.title    = elem.querySelector('').textContent.trim();
        job.url      = elem.querySelector('').href.trim();
        job.location = elem.querySelector('').textContent.trim();
  
        //job.source_location = elem.querySelector('').textContent.trim();
  
        //job.reqid = elem.querySelector('').textContent.trim();   
  
        //job.source_jobtype = elem.querySelector('').textContent.trim();
        //job.source_salary  = elem.querySelector('').textContent.trim();
  
        //job.experience_required = elem.querySelector('').textContent.trim();
  
        //job.source_empname = elem.querySelector('').textContent.trim();
        //job.logo           = elem.querySelector('').getAttribute("src").trim();
        
        //let datePosted     = elem.querySelector('').textContent.trim();
        //job.dateposted_raw = getDateFormat(datePosted," ",0,1,2); 
  
        //let dateClosed     = elem.querySelector('selectorDeLaFechaDeCierre').textContent.trim();
        //job.dateclosed_raw = getDateFormat(dateClosed);
  
        job.temp  = "2022";
  
        //if(job.source_empname.search(//i)>-1){job.title = '';}
       
        //if(job.title.length > 0){
        jobs.push(job);
        //}
      
      } 
    
    out["jobs"]= jobs;
    //console.table(jobs)
      return out;
  })();
  
  
  // Pagination
  
  
  (function() {
      var out = {};  
      out["has_next_page"] = false;  
      out["wait"] = false;
      return out;
  })();
  
  
  // Infinite Pag
  
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
      out["pass_it"]["heights"].push(document.querySelectorAll("").length); 
      return out;
  })();