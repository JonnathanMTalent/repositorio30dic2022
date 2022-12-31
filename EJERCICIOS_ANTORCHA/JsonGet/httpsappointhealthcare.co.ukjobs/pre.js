//Extract

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
      var jobs = json.data.data; /*la ruta de los jobs.  Ej.:  var jobs = json.jobList;*/
    
    var returnedJobs = [];  
    for(i in jobs) {
          var job = {};/*init*/
        
      var dom = "https://appointhealthcare.co.uk/job/"; // Domino del url de las descripciones para terminar de armar
      
      
        job.title    = jobs[i].title;
        job.url      = dom + jobs[i].id+"/nurse-unit-manager/"; 
      
        //job.location = jobs[i].locationSelector;
  
  
        job.temp = "Jan-2020";
        
        returnedJobs.push(job);
      }
      
      out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
      return out;
  })();

  //PAGINATION

  (function() {
    var out = {};
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;
    
    
        if (out["pass_it"]["jobs"] < 15) {  // aqui se pone la cantidad de jobs por pagina
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 1;
      
      
      var beforePageVariable   = "https://unity.appointgroup.co.uk/api/search?dummy=0.2765534931542444&sector=&location=&location_geo=&keywords=&paginate=true&site=appointhealthcare.co.uk&page="; // parte anterior al conteo de la url del json
      //var afterPageVariable    = ""; // parte posterior dl conteo de la pagina
      
      var url = beforePageVariable + out["pass_it"].cont;


     
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
    
    //https://unity.appointgroup.co.uk/api/search?dummy=0.6689189892277336&sector=&location=&location_geo=&keywords=&paginate=true&site=appointhealthcare.co.uk&page=2
    //https://unity.appointgroup.co.uk/api/search?dummy=0.2765534931542444&sector=&location=&location_geo=&keywords=&paginate=true&site=appointhealthcare.co.uk&page=3