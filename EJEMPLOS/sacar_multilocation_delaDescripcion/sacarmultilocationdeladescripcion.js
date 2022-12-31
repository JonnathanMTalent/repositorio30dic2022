            var str       = getDescription(job.url);
            var obj       = document.createElement("div");
            obj.innerHTML = str
            var desc = obj.querySelector("div.cities.d-inline-block");
            var desc2 = obj.querySelector("div.my-5");
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

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

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
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