//Etiqueta PRE con paginación


//Before extract

(function() {
    var out = {};
     try{
       var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.body.children[0].children[0].listItems;
       out["json"] = jobs;
     }catch(error){
        out["wait"] = 500;
       
     }
    
      return out;
})();




//Exract


(function() {
    var out = {};
    // var html_jobs = document.querySelectorAll("");
    //  This gives you an HTMLElement object
  
    if(typeof pass_it == "undefined") pass_it = {};
    msg("***************************************");
    //msg(pass_it);
    //msg(window.location.href);
    msg("***************************************");
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    //var element = document.querySelector("pre").textContent;
    //msg(element);
    var jobs =  pass_it["json"];
  
    var returnedJobs = [];    
    if(!jobs){
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.body.children[0].children[0].listItems;
    }
    //msg(typeof(jobs));
    for(i in jobs) {
      var job = {};/*init*/
      // msg("Entre")
      job.title = jobs[i].title.instances[0].text;
      job.title = job.title.split("(").shift();
      job.url = "https://cibc.wd3.myworkdayjobs.com" + jobs[i].title.commandLink;
      job.location = jobs[i].subtitles[0].instances[0].text.split("-").reverse().join(", ");
      job.location = job.location;
  
      job.temp = 5;
      returnedJobs.push(job);
  
    }
    //msg(jobs);
    //msg(returnedJobs.length);
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();


  //paginación


(function() {
      var out = {};
      
      if(typeof pass_it == "undefined") pass_it = {};
    if(typeof msg == "undefined") msg = function(x){return x;};

      if (!pass_it["cont"]) {
          out["pass_it"] = {
        "cont": 0,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
      if (out["pass_it"]["jobs"] == 50) {
      
      //url, cambia según el JSON
      var url = "https://cibc.wd3.myworkdayjobs.com/search/9/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont
      + "?clientRequestID=9900407428ef4bb5af89b60c18ff355b";
      out["pass_it"].cont += 50;
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
          out["has_next_page"] = false;
    }
  
      return out;
  })();