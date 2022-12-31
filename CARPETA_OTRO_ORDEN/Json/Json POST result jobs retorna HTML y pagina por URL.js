//Json GET primera pagina y segunda POST. El result es json pero retorna HTML. Paginación por step pagination por URL. 

//Extract


(function () {
  var jobs = [];
  var out = {};
  var json;

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  //do{

  var data = "zoekterm=&vakgebied=&opleidingsniveau=&regio=";

  $.ajax({
    url: 'https://www.werkenbijfarmfrites.com/vacatures?pagina=' + out["pass_it"].cont,    

    headers: {                                                      
      "accept": "*/*",
      "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"    // 2) headers
    },
    
    type: 'POST',                                        // 3) tipo
    dataType: "json",                                   // 4) data que retorna
    data: data,
    //data: JSON.stringify(data),
    async: false,
    success: function (result) {
      msg("\x1b[45m loading jobs...");

      json = result.html;
      //msg(jobs)

      var html_jobs = document.createElement("div");
      html_jobs.innerHTML = json;

      var elem = html_jobs.querySelectorAll("li.grid-item");

      for (var i = 0; i < elem.length; i++) {
        var job = {};
        
        job.title = elem[i].querySelector('h3').textContent.trim();
        job.reqid = elem[i].querySelector("a").href.trim().split("/")[4].split("-").shift();
        job.url = elem[i].querySelector("a").href.trim();
        //job.location = elem[i].querySelector("ul > li:nth-child(2)").textContent.trim();
        
        //job.logo = elem[i].;
        //job.source_jobtype = elem[i].;
        //job.source_salary = elem[i].;
        //job.dateposted_raw = elem[i].;
        //job.dateclosed_raw = elem[i].;

        job.temp = 22021;
        jobs.push(job);
      }
      //cont++;
    },
    error: function (error) {
      msg(error);
    }
  });
  // } while (json.length > 0);                          

  out["jobs"] = jobs;
  out["pass_it"]["jobs"] += jobs.length;
  return out;
})();




//pagination. Compara el total de los jobs con los que trajo del extract en el Pass pass_it


(function() {
  var out = {};

  out["pass_it"] = pass_it;

  var total_jobs = document.querySelector(".section-title > small").textContent.split("(")[1].split(")")[0].trim();
  msg(total_jobs)
  msg(out["pass_it"].jobs)

  out["pass_it"].cont

  //stop condition
  if (total_jobs == out["pass_it"].jobs) {
    //last page
    out["has_next_page"] = false;
  } else {

    out["pass_it"].cont ++;
    out["has_next_page"] = true;
  } 

  out.wait = true;
  return out;
})();