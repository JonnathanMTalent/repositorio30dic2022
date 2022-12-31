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
              url: 'https://careers-adastragrp.icims.com/jobs/search',                                
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
  
                        //var 
                        //msg(js_string)
                        
                        
                        parser = new DOMParser();
                      
                      htmlObject = parser.parseFromString(js_string, "text/html");
                      
                      html_jobs = htmlObject.querySelectorAll('div.row'); 
  
                        
                
                      totalPages = Number(htmlObject.querySelector('h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs').innerText.split(" of ").pop().trim());
                      
                      
                      
                           for (const a of htmlObject.querySelectorAll('script[type="text/javascript"]')) {
                              if (a.innerText.search(/jobImpressions/i)>-1){
                           
                          
                          var arrJobs = a.innerText.split('];').shift().split('[').pop();
                          
                                  arrJobs = "[" + arrJobs + "]";
                                  arrJobs = JSON.parse(arrJobs);
  
  
                                  for(var w in arrJobs){
  
                                      
                                         let datePosted     = arrJobs[w].postedDate;
                                         job.dateposted_raw = getDateFormat(datePosted,"-",2,1,0);
  
  
                                      
                                  }
                    
                            }
                           }
                               
  
  
                   
  
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
                                 
                                  
       
                                // DESCRIPTION 
  
                                var jobdata = div.querySelector("div.col-xs-12.description");
                                
  
  
                               for (const a of jobdata.querySelectorAll('div.iCIMS_JobOptions, div[id="jobSocialOptions"], div.iCIMS_PageFooter, div.iCIMS_Logo, div#popupOverlay, div.iCIMS_JobOptions, div.iCIMS_JobsTable, a, button, script')) { // Borra todos los que encuentre
                                  if (a){ 
                                    a.remove(); 
                                  } 
                                }
  
                                job.html = jobdata.innerHTML.trim(); 
  
                                //job.html = removeTextBefore(job.html, "", false);
                                //job.html = removeTextBefore(job.html, "", false);
  
                               job.html = job.html.split("Interested in this opportunity").shift();
                               job.html = job.html.split("Options").shift();
  
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
  
                               function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
         if(dateRaw.indexOf(",")>-1){     
         dateRaw = dateRaw.replace(/\,/g,"");
         }
         if(dateRaw.indexOf(".")>-1){
            var periods = dateRaw.match(/\./g).length;
            if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
         }
  
          let day   = dateRaw.split(cut)[dayPosition].trim(), 
              month = dateRaw.split(cut)[monthPosition].trim(), 
              year  = dateRaw.split(cut)[yearPosition].trim();
  
              day = day.replace(/nd|rd|st|th/gi,"").trim();    
           if(day < 10 && day.length < 2){day = "0" + day;}
           if(year.length == 2){year = "20" + year;}
      
          if(dateRaw.search(/[a-z]/gi)>-1){ 
             //English, Dutch, French
              if(month.search(/jan/i)>-1){month = "01";}
              if(month.search(/feb|fév/i)>-1){month = "02";}
              if(month.search(/mar|maar/i)>-1){month = "03";}
              if(month.search(/apr|avr/i)>-1){month = "04";}
              if(month.search(/may|mai|mei/i)>-1){month = "05";}
              if(month.search(/jun|juin/i)>-1){month = "06";}
              if(month.search(/jul|juil/i)>-1){month = "07";}
              if(month.search(/aug|août/i)>-1){month = "08";}
              if(month.search(/sep/i)>-1){month = "09";}
              if(month.search(/oct|okt/i)>-1){month = "10";}
              if(month.search(/nov/i)>-1){month = "11";}
              if(month.search(/dec|déc/i)>-1){month = "12";}
          }
    var datum = month +"/"+  day +"/"+ year;
      return datum;
  }
  
  /*(function() { 
   var out = {}; 
   var iframeDocument = document.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document; 
   var html_jobs = iframeDocument.querySelectorAll('div[class="container-fluid iCIMS_JobsTable"] > div'); 
   var jobs = [];for(var x in html_jobs){ 
   if(typeof html_jobs[x] =="function") continue; 
   if(typeof html_jobs[x] =="number") continue; 
   var job = {}; 
   var elem = html_jobs[x]; 
   job.title = elem.querySelector('a h2').textContent.trim(); 
   job.url = elem.querySelector('a').href.trim(); 
   
   
   if(elem.querySelector('div[class="col-xs-6 header left"]')){
       job.location=elem.querySelector('div[class="col-xs-6 header left"] span:nth-child(2)').textContent.trim();
   }else{job.location='Toronto, Ontario'}
   
   //job.location = elem.querySelector("").textContent.trim(); 
   //job.dateposted_raw = elem.querySelector("").textContent.trim(); 
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
   */