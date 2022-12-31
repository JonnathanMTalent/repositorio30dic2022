// ICIMS JSON GET - TAKING DESCRIPTION FROM EXTRACT 


// EXTRACT 

(function () {
    var jobs = [];
    var out = {};
    var json;
    var totalPages;
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0,
        "totalPages":totalPages
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
      var data = "pr=" + out["pass_it"].cont + "&in_iframe=1&schemaId=&o="; 
    
          $.ajax({
              url: 'https://careers-arh.icims.com/jobs/search',                                
              headers: {                                                      
                  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
              },
      
              type: 'GET',                                     
              data: data,
              async: false,
              success: function (result) {
              
              msg("SUCCES");
  
                      json  = result;
  
                      var js_string 	     = json;
                      var htmlObject       = document.createElement("div");
                      htmlObject.innerHTML = js_string
  
                        var html_jobs = htmlObject.querySelectorAll('div.row'); 
                
                      totalPages = Number(htmlObject.querySelector('h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs').innerText.split(" of ").pop().trim()); 
  
                        msg("\x1b[43m "+ out["pass_it"].cont + "/" + totalPages +  "\x1b[0m");
  
  
                      for(var x in html_jobs){
                        
                        if(typeof html_jobs[x] =="function") continue;
                          if(typeof html_jobs[x] =="number") continue;
  
                              var job  = {};
                              var elem = html_jobs[x];
                        
                        if(elem.querySelector("div.title") !== null){
                          
                              const tracker = '&mode=job&iis=Neuvoo';
                       
                              job.title  = elem.querySelector("div.title h2").textContent.trim();
                              job.url    = elem.querySelector("div.title a").href.trim().concat(tracker);
                              job.reqid = job.url.split("/jobs/").pop().split("/").shift().trim();
                          
                                var info = elem.querySelector('div[role="list"]');
                                for (const a of info.querySelectorAll('dl')) {
                                  if (a.textContent.indexOf('Position Type')>-1){
                                       job.source_jobtype = a.querySelector('dd.iCIMS_JobHeaderData').textContent.trim();
                                   }
  
                                }
                          
                              // Extrayendo valores desde el jobdata
                        
                                  var full_html = getDescription(job.url);
                                  var div       = document.createElement("div");
                                  div.innerHTML = full_html
                                  var desc = div; 
       
                                // DESCRIPTION 
  
                                var jobdata = div.querySelector("div.iCIMS_JobContent");
  
  
                               for (const a of div.querySelectorAll('div.iCIMS_JobHeaderGroup dl')) {
                                    if (a.innerText.search(/Posted Date/)>-1){
  
  
                                          let datePosted     = a.querySelector("dd.iCIMS_JobHeaderData span").getAttribute('title').split(" ").shift().trim();
                                            job.dateposted_raw = datePosted;//getDateFormat(datePosted," ",0,1,2); 
  
                                     }
                               }
  
                               for (const a of jobdata.querySelectorAll('div.iCIMS_JobOptions, div[id="jobSocialOptions"], div.iCIMS_PageFooter, div.iCIMS_Logo, div#popupOverlay, div.iCIMS_JobOptions, div.iCIMS_JobsTable, a, button, script')) { // Borra todos los que encuentre
                                  if (a){ 
                                    a.remove(); 
                                  } 
                                }
  
                                job.html = jobdata.innerHTML.trim(); 
  
                                //job.html = removeTextBefore(job.html, "", false);
                                //job.html = removeTextBefore(job.html, "", false);
  
                               job.html = job.html.split("Interested in this opportunity").shift();
                               //job.html = job.html.split("").shift();
  
                                //job.html = job.html.replace("","").trim();
  
                                job.html      = cleanHTML(job.html);
                                var tmp       = document.createElement('div');
                                tmp.innerHTML = job.html;
                                job.jobdesc   = tmp.textContent.trim();
                                job.jobdesc   = cleanHTML(job.jobdesc);
                
  
                                job.temp = "MAY-2022";
                                
                                job.location = elem.querySelector('.col-xs-6.header.left span:not(.sr-only)').innerText.trim();
                                job.source_location = elem.querySelector('.col-xs-6.header.left span:not(.sr-only)').innerText.trim();
  
  
                         var multilocation = "|";             
                          
                              if(job.location.indexOf("|")>-1){
  
                              var locs = job.location.split('|');
  
                                for(var w in locs){
  
                                  var jobw = {...job};
  
                                  jobw.location = locs[w];
  
                                  jobw.location = jobw.location.trim().split('-').reverse().join(", ");
  
                                  jobs.push(jobw);
  
  
                                }
  
                              }else{
  
                              job.location = job.location.trim().split('-').reverse().join(", ");  
                              jobs.push(job);
  
                              }
                      
                           }
                          
        }
        out["pass_it"].cont++;
                msg(out["pass_it"].cont);
      },
      error: function (error) {
        msg(error);
      }
    });
  
    out["jobs"] = jobs;
    out["pass_it"]["jobs"] += jobs.length;
    out["pass_it"]["totalPages"] = totalPages;
  
    return out;
  })();
  
  
    function getDescription(url) {
      var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
     var response = "";
      xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
          //console.log(xhrrequest.responseText);
          response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
  }
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
  
  
  // PAG 
  
  
    (function() {
      var out = {};
      
       out["pass_it"] = pass_it;
  
  
      msg(out["pass_it"].cont + "/" + out["pass_it"].totalPages);
      //msg(jobs);
      //stop condition
      if(out["pass_it"].cont >= out["pass_it"].totalPages){
        //go to next page
        out["has_next_page"] = false;
      } else {
        //try again
        out["has_next_page"] = true;
      }
      //out.waitFor = "";
      return out;
    })();
    
    