//https://rb.wd5.myworkdayjobs.com/es/FRS
// BEFORE EXTRACT
(function() {
    var out = {};
    
    //out["pic"] = true; // Se debe usar únicamente para evaluar el comportamiento del jobsite más NO COMO UNA ESPERA
    
    //out.waitFor = 'selector-de-los-jobs';
    out["wait"] = 300;
    
    //out.iframeSelector = '';
    //out.iframeWaitFor = '';
    
    // out["wait"] = true;
    
    //location.reload(); // Refresh
    return out;
    })();

    //EXTRACT

    (function () {
        var jobs  = [];
        var jobs2 = [];
        var out   = {};
        //var cont = 0;
      
        var totalCount;
        var json;
         
        const origin      = window.location.origin,  
              JSON_path   = "/wday/cxs/",
              hostName    = window.location.hostname.split('.')[0],
              companyName = window.location.href.split("/").pop();
        
        var URL_p1 = `${origin}${JSON_path}${hostName}${"/"}${companyName}`;
      
        if (!pass_it["cont"]) {
          out["pass_it"] = {
            cont:  1,
            jobs:  0,
            jobs2: 0,
            totalCount: totalCount
          };
        } else {
          out["pass_it"] = pass_it;
        }
      
          var data = {"limit":20,"offset": out["pass_it"].cont,"searchText":"","appliedFacets":{"workerSubType":[],"jobFamilyGroup":[],"locations":[],"locationCountry":[]}};
      
          $.ajax({
            url: URL_p1 + "/jobs",                                            
            headers: {                                                      
              "Accept": "application/json",
              "Content-Type":"application/json"                
            },
            type: 'POST',                                       
            dataType: "json",                                  
            //data: data,
            data: JSON.stringify(data),
            async: false,
            success: function (result) {
              msg("SUCCES");
              json  = result.jobPostings; 
              //ToKen = result.;                        
              //msg(json.length);
              for (var i = 0; i < json.length; i++) {
                var job = {};
                var external_path = json[i].externalPath;
      
                job.reqid = external_path;
                job.location = json[i].locationsText;
      
                job.title = json[i].title;
                job.url   = window.location.href + external_path;
                
                if(typeof job.location == "string"){
                    job.location = json[i].locationsText;
                }else{
                  job.location = "USA";
                }
      
      
                job.temp = "JAN-2022";
                
                jobs2.push(job); // jobs2 se emplea para validar la cantidad total de jobs mencionados al inicio del jobsite vs los que se extraen, multi-location o no se cuenta como 1
      
                        //if(job.location.indexOf("Locations")>-1){// Se hace el llamado de AJAX si existe el multi-location
      
                          // Se arma el JSON GET por cada job automáticamente. Se toman valores del jobsite en spider config y un atributo del JSON (externalPath)     
                         
                                   var jsonGetLink = `${URL_p1}${"/"}${external_path}`;
              
                                let str = getDescription(jsonGetLink); // Se ejecuta el llamado de AJAX
                                let obj = JSON.parse(str); // Se parsea el JSON que retorna el servidor
                          
                               
                                let datePosted = obj.jobPostingInfo.startDate;
                                if(datePosted){
                                    job.dateposted_raw = getDateFormat(datePosted,"-",2,1,0); 
                                }
                                
                                  if(obj.jobPostingInfo.timeType){
                                job.source_jobtype = obj.jobPostingInfo.timeType;
                                }
                
                                  job.reqid = obj.jobPostingInfo.jobReqId;
                
                
                                  // JOBDATA
                                  var full_html = obj.jobPostingInfo.jobDescription; // atributo JSON con la descripción del job
                                  var div       = document.createElement("div");
                                  div.innerHTML = full_html
                                  var desc = div;
      
      
                                   for (const a of desc.querySelectorAll('a, button, script, style')) { // Borra todos los que encuentre
                                      if (a){ 
                                        a.remove(); 
                                      } 
                                    }
                                    for (const a of desc.querySelectorAll('p')) { // Borra todos los que encuentre
                                      if (a.innerText.search(/Follow us/i)>-1){ 
                                        a.remove(); 
                                      } 
                                    }
      
                                    job.html = desc.innerHTML.trim(); 
      
      
                                    //job.html = removeTextBefore(job.html, "", false);
                                    //job.html = removeTextBefore(job.html, "", false);
      
                                   job.html = job.html.split("Privacy Notice").shift();
                                   job.html = job.html.split("The Federal Reserve Banks").shift();
      
                                    //job.html = job.html.replace("","").trim();
      
                                    job.html      = cleanHTML(job.html);
                                    var tmp       = document.createElement('div');
                                    tmp.innerHTML = job.html;
                                    job.jobdesc   = tmp.textContent.trim();
                                    job.jobdesc   = cleanHTML(job.jobdesc);
      
      
             
                                 // Locaciones divididas en: Primera locación y luego adicionales dentro de un arreglo
                          
                                  var location1 = obj.jobPostingInfo.location.replace("-","").trim();
                                  var extraLocs = obj.jobPostingInfo.additionalLocations;
                
                                if(extraLocs){
                                
                                  extraLocs.push(location1); // Se agrega la primera locación al arreglo "extralocs"
                                  
                                  job.source_location = extraLocs.join("/");
                                  
                                    if(extraLocs.length > 0){ // Se valida la longitud del arreglo
      
                                      let locs = extraLocs;
                                        for(w in locs){
      
                                          var jobw = {...job};
      
                                          jobw.location = locs[w].replace(/\_Remote\_Worker|Remote|\, Remote \-|Remote|\-/gi,"").replace("-","").trim();
                              
                                           if(jobw.location.indexOf(",")==-1){
                                              jobw.location = concatenateUStoStates(jobw.location);
                                          }
      
                                          if(jobw.location.length > 2 && jobw.location.indexOf("Board of Governors")==-1){
                                            jobs.push(jobw); // Multi-location jobs
                                          }  
                                     }
      
                                  }else{
                                      
                                       if(location1.indexOf(",")==-1){
                                              location1 = concatenateUStoStates(location1);
                                       }
                                    job.location = location1.replace(/\_Remote\_Worker|Remote|\, Remote \-|Remote|\-/gi,"").trim();
                                    
                                    job.source_location = location1;
                                    jobs.push(jobw);  
                                  }
                                  
                              //  }
                }
            }
            out["pass_it"].cont+=20;
          },
          error: function (error) {
            msg(error);
          }
        });
        
        out["jobs"] = jobs;
        out["jobs2"] = jobs2;
        out["pass_it"]["jobs"] += jobs.length;
        out["pass_it"]["jobs2"] += jobs2.length;
        out["pass_it"]["totalCount"] = totalCount;
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
      
      function concatenateUStoStates(loc){
               
               loc =  loc.replace("Alabama", "Alabama, US");
               loc =  loc.replace("Alaska", "Alaska, US"); 
               loc =  loc.replace("Arizona", "Arizona, US"); 
               loc =  loc.replace("Arkansas", "Arkansas, US"); 
               loc =  loc.replace("California", "California, US"); 
               loc =  loc.replace("Colorado", "Colorado, US"); 
               loc =  loc.replace("Connecticut", "Connecticut, US");
               loc =  loc.replace("Delaware", "Delaware, US"); 
               loc =  loc.replace("Florida", "Florida, US"); 
               loc =  loc.replace("Georgia", "Georgia, US");
               loc =  loc.replace("Hawaii", "Hawaii, US"); 
               loc =  loc.replace("Idaho", "Idaho, US"); 
               loc =  loc.replace("llinois", "llinois, US"); 
               loc =  loc.replace("Indiana", "Indiana, US"); 
               loc =  loc.replace("Iowa", "Iowa, US"); 
               loc =  loc.replace("Kansas", "Kansas, US"); 
               loc =  loc.replace("Kentucky", "Kentucky, US"); 
               loc =  loc.replace("Louisiana", "Louisiana, US"); 
               loc =  loc.replace("Maine", "Maine, US"); 
               loc =  loc.replace("Maryland", "Maryland, US"); 
               loc =  loc.replace("Massachusetts", "Massachusetts, US"); 
               loc =  loc.replace("Michigan", "Michigan, US"); 
               loc =  loc.replace("Minnesota", "Minnesota, US"); 
               loc =  loc.replace("Mississippi", "Mississippi, US"); 
               loc =  loc.replace("Missouri", "Missouri, US"); 
               loc =  loc.replace("Montana", "Montana, US");
               loc =  loc.replace("Nebraska", "Nebraska, US"); 
               loc =  loc.replace("Nevada", "Nevada, US");
               loc =  loc.replace("New Hampshire", "New Hampshire, US"); 
               loc =  loc.replace("New Jersey", "New Jersey, US"); 
               loc =  loc.replace("New Mexico", "New Mexico, US"); 
               loc =  loc.replace("New York", "New York, US"); 
               loc =  loc.replace("North Carolina", "North Carolina, US"); 
               loc =  loc.replace("North Dakota", "North Dakota, US"); 
               loc =  loc.replace("Ohio", "Ohio, US");
               loc =  loc.replace("Oklahoma", "Oklahoma, US");
               loc =  loc.replace("Oregon", "Oregon, US"); 
               loc =  loc.replace("Pennsylvania", "Pennsylvania, US"); 
               loc =  loc.replace("Rhode Island", "Rhode Island, US"); 
               loc =  loc.replace("South Carolina", "South Carolina, US");
               loc =  loc.replace("South Dakota", "South Dakota, US"); 
               loc =  loc.replace("Tennessee", "Tennessee, US"); 
               loc =  loc.replace("Texas", "Texas, US"); 
               loc =  loc.replace("Utah", "Utah, US"); 
               loc =  loc.replace("Vermont", "Vermont, US"); 
               loc =  loc.replace("Virginia", "Virginia, US"); 
               loc =  loc.replace("West Virginia", "West Virginia, US"); 
               loc =  loc.replace("Wisconsin", "Wisconsin, US"); 
               loc =  loc.replace("Wyoming", "Wyoming, US"); 
      
               return loc;
      
           }

//PAGINATION

//Pagination
(function() {
    var out  = {};
    var jobs = Number(document.querySelector('[data-automation-id="jobFoundText"]').innerText.split(" ").shift().trim());
    var maxAmountOfJobsDisplayedByMyworkDayJobsATS = 2000;
    out["pass_it"] = pass_it;
    // msg(out["pass_it"].jobs);
     msg("TOTAL JOBS: " + jobs);
     msg("Jobs2:  " + out["pass_it"].jobs2);
    //stop condition
    // if(out["pass_it"].jobs2 >= 500 || out["pass_it"].jobs2 >= maxAmountOfJobsDisplayedByMyworkDayJobsATS){ // TEST
      if(out["pass_it"].jobs2 >= jobs || out["pass_it"].jobs2 >= maxAmountOfJobsDisplayedByMyworkDayJobsATS){
      //go to next page
      out["has_next_page"] = false;
    } else {
      //try again
      out["has_next_page"] = true;
    }
    //out.waitFor = "";
    return out;
  })();