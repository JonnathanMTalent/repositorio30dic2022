(function() {
    var out = {};
  
        var html_jobs = document.querySelectorAll('a.stretched-link');
        var jobs = [];
    
        for(var x in html_jobs){
  
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        
            var job  = {};
            var elem = html_jobs[x].parentElement;
  
            job.title    = elem.querySelector('h3.offer-title').textContent.trim();
            job.url      = elem.querySelector('a').href.trim();
            job.location = elem.querySelector('i.fa-map-marker').parentElement.querySelector('div.city').textContent.trim();
          
          
            var str       = getDescription(job.url);
            var obj       = document.createElement("div");
            obj.innerHTML = str
            var desc = obj.querySelector("div.cities.d-inline-block");
            var desc2 = obj.querySelector("div.my-5");
  
  // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  DESCRIPCION
           for (const a of desc2.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
              if (a){ 
                a.remove(); 
              } 
            }
  
            job.html = desc2.innerHTML.trim(); 
          
          
            job.html = removeTextBefore(job.html, "Esperamos su solicitud.", false);
            job.html = removeTextAfter(job.html, "Procedimiento de solicitud", false);
          
           //job.html = job.html.split("").shift();
           //job.html = job.html.split("").shift();
  
            //job.html = job.html.replace("","").trim();
  
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
  
  // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            
            
            if(job.title.search(/Open sollicitatie/i)>-1){job.title = '';}
       
  
            job.temp  = "2022";
            
            
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
            
            
  let selectorLocs = 'div.cities d-inline-block';
  let selectorLoc  = 'div.city.d-inline-block'; 
  
          if(job.location.toLowerCase().indexOf("locaties")>-1){ // Validación del selector con multi-location
          
            var locs = desc.querySelectorAll(selectorLoc);
              for(w in locs){
                    if(typeof locs[w] =="function") continue;
                    if(typeof locs[w] =="number") continue;
              
                var jobw = {...job};
                
                jobw.location = locs[w].textContent.trim();
    
                jobs.push(jobw); // Multi-location jobs
              }
          }
          jobs.push(job); // Single Location jobs
          } 
  
  
  
  
  
            
  
  
       
    
    out["jobs"]= jobs;
    //console.table(jobs)
      return out;
  })();
  
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