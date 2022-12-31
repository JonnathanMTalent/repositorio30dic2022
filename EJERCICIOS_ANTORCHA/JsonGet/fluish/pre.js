//extract
(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
      if (!pass_it["cont"]) {
        out["pass_it"] = {
          "cont": 1,
          "jobs": 0
        };
      } else {
        out["pass_it"] = pass_it;
      }
    
      var element = document.querySelector("pre").textContent;
      var json = JSON.parse(element);
      var jobs = json.List; /*la ruta de los jobs.  Ej.:  var jobs = json.jobList;*/
    
    var returnedJobs = [];  
    for(i in jobs) {
          var job = {};/*init*/
        
      var dom = "https://flourish-uk.com"; // Domino del url de las descripciones para terminar de armar
      
      
        job.title    = jobs[i].JobTitle;
        job.url      = dom + jobs[i].JobUrl;
      
        //job.location = jobs[i].locationSelector;
  
  
        job.temp = "Jan-2020";
        
        returnedJobs.push(job);
      }
      
      out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
      return out;
  })();

  // pagination

  (function() {
    var out = {};
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;
    
    
        if (out["pass_it"]["jobs"] < 10) {  // aqui se pone la cantidad de jobs por pagina
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 1;
      
      
      var beforePageVariable   = "https://flourish-uk.com/Umbraco/api/SearchJobs/GetOffers?PageNumber="; // parte anterior al conteo de la url del json
      var afterPageVariable    = "&JobTitles=&JobTerm=0&Counties="; // parte posterior dl conteo de la pagina
      
      var url = beforePageVariable + out["pass_it"].cont+afterPageVariable;


     
      window.location.href = url; //aqui se coloco la url nueva que armamos en el navegador
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    return out;
    })();
    
 //https://flourish-uk.com/Umbraco/api/SearchJobs/GetOffers?PageNumber=2&JobTitles=&JobTerm=0&Counties=
 //https://flourish-uk.com/Umbraco/api/SearchJobs/GetOffers?PageNumber=3&JobTitles=&JobTerm=0&Counties=