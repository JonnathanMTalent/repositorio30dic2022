// https://hyperiongrp.wd3.myworkdayjobs.com/es/hyperion_external

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
        "cont":  1,
        "jobs":  0,
        "jobs2": 0,
        "totalCount": totalCount
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
  
            job.reqid = json[i].jobReqId;
            job.location = json[i].locationsText;
  
            job.title = json[i].title;
            job.url   = window.location.href + external_path;
            
            if(typeof job.location == "string"){
                job.location = json[i].locationsText;
            }else{
              job.location = "USA";
            }
       
            
            //if(job.location.search(/Contingent/i)>-1){job.location = "Kansas City, Missouri, US";}// Head office
            
            job.location = job.location.replace(/\_Remote\_Worker|Remote|\, Remote/i,"").trim();
            
            if(job.location == "Missouri"){job.location = "Missouri, US";}
  
            job.temp = "JAN-2022";
            
            jobs2.push(job); // jobs2 se emplea para validar la cantidad total de jobs mencionados al inicio del jobsite vs los que se extraen, multi-location o no se cuenta como 1
  
                    if(job.location.indexOf("Locations")>-1){// Se hace el llamado de AJAX si existe el multi-location
  
                      // Se arma el JSON GET por cada job automáticamente. Se toman valores del jobsite en spider config y un atributo del JSON (externalPath)     
                     
                               var jsonGetLink = `${URL_p1}${"/"}${external_path}`;
          
                            let str = getDescription(jsonGetLink); // Se ejecuta el llamado de AJAX
                            let obj = JSON.parse(str); // Se parsea el JSON que retorna el servidor
  
                            // Locaciones divididas en: Primera locación y luego adicionales dentro de un arreglo
                            let location1 = obj.jobPostingInfo.location;
                            let extraLocs = obj.jobPostingInfo.additionalLocations; // Array
  
                             extraLocs.push(location1); // Se agrega la primera locación al arreglo "extralocs"
  
                            if(extraLocs.length > 0){ // Se valida la longitud del arreglo
  
                            let locs = extraLocs;
                              for(w in locs){
  
                                var jobw = {...job};
  
                                jobw.location = locs[w].replace(/\_Remote\_Worker|Remote/i,"").trim();
  
                                jobs.push(jobw); // Multi-location jobs
                              }
  
                          }
             }else{ 
  
               jobs.push(job); // Single Location jobs
            }
        }
        out["pass_it"].cont+=20;
        //out["pass_it"].cont+=20;
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