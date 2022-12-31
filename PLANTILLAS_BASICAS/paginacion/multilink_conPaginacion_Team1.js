// infinite
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
           if (!pass_it["urls"]) {
           
           out["has_next_page"] = true;
           out["pass_it"] = {
           jobs_per_page: 0,
               "urls": ["https://careers.adityabirla.com/cement",
                       "https://careers.adityabirla.com/chemicals",
                       "https://careers.adityabirla.com/financial",
                       "https://careers.adityabirla.com/mining",
                       "https://careers.adityabirla.com/insulators",
                       "https://careers.adityabirla.com/nf-metals",
                       "https://careers.adityabirla.com/power",
                       "https://careers.adityabirla.com/paints",
                       "https://careers.adityabirla.com/apparel-retail",
                       "https://careers.adityabirla.com/textile",
                       "https://careers.adityabirla.com/trading-solutions",
                       "https://careers.adityabirla.com/abmcpl",
                       "https://careers.adityabirla.com/pulp-and-fibre",
                       "https://careers.adityabirla.com/jobs/search?JobField=HR",
                       "https://careers.adityabirla.com/jobs/search?JobField=LEG",
                       "https://careers.adityabirla.com/jobs/search?JobField=PRD",
                       "https://careers.adityabirla.com/jobs/search?JobField=TES",
                       "https://careers.adityabirla.com/jobs/search?JobField=PRO",
                       "https://careers.adityabirla.com/jobs/search?JobField=MNT",
                       "https://careers.adityabirla.com/jobs/search?JobField=TQM",
                       "https://careers.adityabirla.com/jobs/search?JobField=POW",
                       "https://careers.adityabirla.com/jobs/search?JobField=NWS",
                       "https://careers.adityabirla.com/jobs/search?JobField=RND",
                       "https://careers.adityabirla.com/jobs/search?JobField=REM",
                       "https://careers.adityabirla.com/jobs/search?JobField=INV"]                //Colocar las urls
           };
       } else {
           out["pass_it"] = pass_it;
       }
    return out;
  })();
  
  //Extrac
  (function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.cs_item_content");
    out["pass_it"] = pass_it;
    if(!document.querySelector("div.cs_item_content")){
      out["pass_it"].jobs_per_page = -1;
       out["jobs"] = [
          {
            title: Math.random(),
          },
        ];
        msg(
          `\x1b[31m JSON Path was wrongly set ---- \n\x1b[33m Returning jobs: ${out["pass_it"].jobs_per_page}`
        );
        return out;
     }
    
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("h3 a").textContent.trim();
      job.url = elem.querySelector("h3 a").href.trim();
      job.location = elem.querySelector("div.cs_item_type_job_meta_location a").textContent.trim();
      job.reqid = job.url.split('job-title=').pop().split('-').shift().trim();
      job.source_location = elem.querySelector("div.cs_item_type_job_meta_location a").textContent.trim();
      //job.street_location = elem.querySelector("").textContent.trim();
      //job.dateposted_raw = elem.querySelector("div.cs_item_type_job_meta  div:nth-child(2) span").textContent.trim();
      //job.dateclosed_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      job.source_empname = elem.querySelector("div.cs_item_type_job_meta_category a").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = "qwe";
      jobs.push(job);
    }
  
    out["jobs"]= jobs;
    return out;
  })();
  
  //Pagination
  // (function() {
  //   var out = {};
  //   out["pass_it"] = pass_it;
    
  //   out.waitFor = "div.cs_item_content"
  //   return out;
  // })();
  
  (function() {
        var out = {};
    
      var next_page_selector = 'div.container.xs-mt-40.lg-mb-40.animatedParent > div:nth-child(5) > div:nth-child(1) >  a:last-child'; // Selector del next 
      //var last_page_selector = ""; //Selector de la última página
    
        if (typeof pass_it == "undefined") pass_it = {};
           if (!pass_it["urls"]) {
           
           out["has_next_page"] = true;
           out["pass_it"] = {
           jobs_per_page: 0,
               "urls": ["https://careers.adityabirla.com/cement",
                       "https://careers.adityabirla.com/chemicals",
                       "https://careers.adityabirla.com/financial",
                       "https://careers.adityabirla.com/mining",
                       "https://careers.adityabirla.com/insulators",
                       "https://careers.adityabirla.com/nf-metals",
                       "https://careers.adityabirla.com/power",
                       "https://careers.adityabirla.com/paints",
                       "https://careers.adityabirla.com/apparel-retail",
                       "https://careers.adityabirla.com/textile",
                       "https://careers.adityabirla.com/trading-solutions",
                       "https://careers.adityabirla.com/abmcpl",
                       "https://careers.adityabirla.com/pulp-and-fibre",
                       "https://careers.adityabirla.com/jobs/search?JobField=HR",
                       "https://careers.adityabirla.com/jobs/search?JobField=LEG",
                       "https://careers.adityabirla.com/jobs/search?JobField=PRD",
                       "https://careers.adityabirla.com/jobs/search?JobField=TES",
                       "https://careers.adityabirla.com/jobs/search?JobField=PRO",
                       "https://careers.adityabirla.com/jobs/search?JobField=MNT",
                       "https://careers.adityabirla.com/jobs/search?JobField=TQM",
                       "https://careers.adityabirla.com/jobs/search?JobField=POW",
                       "https://careers.adityabirla.com/jobs/search?JobField=NWS",
                       "https://careers.adityabirla.com/jobs/search?JobField=RND",
                       "https://careers.adityabirla.com/jobs/search?JobField=REM",
                       "https://careers.adityabirla.com/jobs/search?JobField=INV"]                //Colocar las urls
           };
       } else {
           out["pass_it"] = pass_it;
       }
       
      var clickable_elem = document.querySelector(next_page_selector);
    
        //stop condition
        if (!document.querySelector(next_page_selector)) {
            
              out["has_next_page"] = false;     
                    msg("NO EXISTE EL SELECTOR DE PAGINACION");	
                    if (out["pass_it"]["urls"].length > 0) {
                          var url = out["pass_it"].urls.shift();
                              //msg(url);
                            msg("PERO TIENE URL");	
                            msg(url);
                          window.location.href = url;
                          out["has_next_page"] = true;
                  }
      }else {
          // if(document.querySelector(next_page_selector).textContent.trim() == 'next'){
          //     if(document.querySelector(next_page_selector).getAttribute('class')?.trim() == 'active'){
          //         out["has_next_page"] = false;     
          //         msg("NO MAS PAGINAS");
          //         if (out["pass_it"]["urls"].length > 0) {
          //             var url = out["pass_it"].urls.shift();
          //                 //msg(url);
          //       		msg("PERO TIENE URL");	
          //             window.location.href = url;
          //             out["has_next_page"] = true;
          //         }
          //     }
            
          // }else{ 
              msg("clickkk");	
                clickable_elem.click();
              out["has_next_page"] = true;
              if(document.querySelector(next_page_selector).textContent.trim() == 'next'){
              if(document.querySelector(next_page_selector).getAttribute('class')?.trim() == 'active'){
                  out["has_next_page"] = false;     
                  msg("NO MAS PAGINAS");
                  if (out["pass_it"]["urls"].length > 0) {
                      var url = out["pass_it"].urls.shift();
                          //msg(url);
                        msg("PERO TIENE URL");	
                      window.location.href = url;
                      out["has_next_page"] = true;
                  }
              }
            
          }
          // }
      }
      
      out["wait"] = true;
        //out["pic"] = true;
        //out.waitFor = "a.item.hasImage";
      out.waitFor = "div.cs_item_content"
      msg(out["has_next_page"])
      
      
      if(!document.querySelector("div.cs_item_content")){
      if (out["pass_it"]["urls"].length > 0) {
          var url = out["pass_it"].urls.shift();
              //msg(url);
            msg("PERO TIENE URL");	
            msg(url);
          window.location.href = url;
          out["has_next_page"] = true;
      }else{
          out["has_next_page"] = false;
      }
     }
        
        return out;
  })();