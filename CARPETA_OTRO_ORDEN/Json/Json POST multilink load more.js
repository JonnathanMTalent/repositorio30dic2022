//Caso de uso: http://boo.neuvoo.com/boo3-web/qa/app/index.php?empcode=st-barbara-limited&scanid=128805

//Multilink, Json POST con load more

//Extract


(function() {
  var jobs = [];
  var out = {};

  out["pass_it"] = pass_it;

  var counter = 1;
  var limit = 0;
  var json;
  //do {
  var data = {"keywords":null,"categories":[],"workTypes":[],"locations":[],"disableSpellCheck":false};
  $.ajax({
    url : out["pass_it"]["url"]+out["pass_it"]["counter"]+"/50",    //Revisar el size de la pagina, jugar con esos datos
    headers: {
      "accept": "application/json, text/plain, */*",
      "content-length": "89",      //Revisar los jobs maximos que se extraen por pagina, para no paginar el json
      "Content-Type": "application/json"
    },
    type : 'POST',
    data : JSON.stringify(data),
    dataType: "json",
    async : false,
    success : function(result){
      json = result.jobs;
      out["pass_it"]["total"] = result.totalCount;

      // msg(result.totalCount);
      msg(out["pass_it"].total);
      //limit = result.pages +1;
      for(var i = 0; i<json.length; i++) {
        var job = {};
        job.title = json[i].roleName;
        job.url = "https://www.livehire.com/careers/atlanticgold/job/"+json[i].urlCode +"/"+ json[i].advertUrlCode +"/"+ json[i].seoSlug;

        if(json[i].physicalLocation){
          job.location = json[i].physicalLocation;
        }else{
          job.location = "Leonora, WA, AU";
        }

        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();

        var fecha = json[i].publishedAt.split('T')[0];
        job.dateposted_raw = fecha.split('-')[1]+'/'+fecha.split('-')[2]+'/'+fecha.split('-')[0];

        //job.source_empname = elem.querySelector("").textContent.trim();
        job.source_jobtype = json[i].workType;
        //job.source_salary = elem.querySelector("").textContent.trim();
        
        job.temp = 102020;
        jobs.push(job);
      }
      counter = counter + 10;
    },
    error: function(error){
      msg(error);
    }
  });
  // } while (counter < limit);

  out["jobs"]= jobs;
  return out;
})();


//Paginación


(function () {
  var out = {};
  out.wait=true;

  out["pass_it"] = pass_it; //SE PASAN LOS VALORES ASIGNADOS EN EL INFINITE PAGINATION


  if (out["pass_it"]["urls"].length > 0) {
    out["pass_it"]['url'] = out["pass_it"]['urls'].shift();  //PROXIMA URL
    msg('\x1b[42m CAMBIO DE URL \x1b[0m');
    out["pass_it"].cont = 0							//RESETEO CONTADOR 
    out["has_next_page"] = true;
  } else {
    msg('\x1b[41m FIN MULTILINK \x1b[0m');
    out["has_next_page"] = false;
  }

  return out;
})();


//Infiniti Paginación


(function() {
  var out = {};

  if (typeof pass_it == "undefined") 
    pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "total":0,
      "urls":["https://www.livehire.com/api/jobsapi/careers/search/atlanticgold/",
              "https://www.livehire.com/api/jobsapi/careers/search/stbarbara-png/",
              "https://www.livehire.com/api/jobsapi/careers/search/stbarbara/"],   //ACA LAS URLS DEL MULTILINK
      "url":''
    };
  } else {
    out["pass_it"] = pass_it;
  }

  out["pass_it"]["url"]= out["pass_it"]["urls"].shift(); //SE OBTIENE LA 1ERA URL


  return out;
})();