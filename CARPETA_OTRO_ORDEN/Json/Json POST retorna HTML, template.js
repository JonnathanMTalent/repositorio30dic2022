//Json POST retorna HTML



(function () {
    var jobs = [];
    var out = {};
    var seguir = true;
    var counter = 1;
    //var Tken = '=';
    do {
      //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]}​;
      var data = {};
      $.ajax({
        url: 'URL',
        headers: {
          //"Accept" : "*/*",
          "Content-Type": "application/json;charset=UTF-8",
          //"Accept-Encoding" : "gzip, deflate, br"
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
          //msg(result)
          var div = document.createElement("div");
          div.innerHTML = result;
          var html_jobs = div.querySelectorAll('selector_jobs');
          
          var stop_pag = html_jobs;
          if (stop_pag.length < 1) {
            seguir = false;
            msg(`---> FINAL DE PAGINACIÓN`);
          }
          
          for (var x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            var job = {};
            var elem = html_jobs[x];
            
            job.title = elem.querySelector('').textContent.trim();
            job.url = elem.querySelector('').getAttribute("href").trim();
            job.location = elem.querySelector('').textContent.trim();
            
            //job.dateposted_raw = elem.querySelector("").textContent.trim();
            //job.logo = elem.querySelector("").getAttribute("src").trim();
            //job.source_empname = elem.querySelector("").textContent.trim();
            //job.source_jobtype = elem.querySelector("").textContent.trim();
            //job.source_salary = elem.querySelector("").textContent.trim();
            
            job.temp = 22021;
            jobs.push(job);
          }
          counter += 1;
          msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
        },
        error: function (error) {
          msg('TENGO UN ERROR');
          msg(error);
        }
      });
    } while (seguir);
    out["jobs"] = jobs;
    return out;
  })();






  //otro que retorna html ***sin paginacion***

  (function () {
    var jobs = [];
    var out = {};
    var seguir = true;
    var counter = 1;
    //var Tken = '=';
    //do {
    //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
    var data = {};
    $.ajax({
      url: 'https://www.amaliazorg.nl/werken-en-leren/vacatures',
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "es-ES,es;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
      },
      type: 'GET',
      data: JSON.stringify(data),
      dataType: "html",
      async: false,
      success: function (result) {
       // msg(result)
        var div = document.createElement("div");
        div.innerHTML = result;
        var html_jobs = div.querySelectorAll('article.VacancyItem');
        for (var x in html_jobs) {
          if (typeof html_jobs[x] == "function") continue;
          if (typeof html_jobs[x] == "number") continue;
          var job = {};
          var elem = html_jobs[x];
  
          msg(elem);
          job.title = elem.querySelector('a').textContent.trim();
         job.url = elem.querySelector('a').getAttribute("href").trim();
         job.location = elem.querySelector('div.left > span.title').textContent.trim();
  
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
  
          job.temp = 22021;
          jobs.push(job);
        }
        
        // msg(data);
        //counter += 1;
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
      },
      error: function (error) {
        msg('TENGO UN ERROR');
        msg(error);
      }
    });
    //} while (seguir);
    out["jobs"] = jobs;
    return out;
  })();