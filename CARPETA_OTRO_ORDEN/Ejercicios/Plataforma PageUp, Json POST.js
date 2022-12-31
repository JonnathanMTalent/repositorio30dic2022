//Json POST plataforma pageup



(function () {
  var jobs = [];
  var out = {};
  var seguir = true;
  var counter = 1;

  do {
    var tmpDate = new Date();     //  Wed Oct 16 2013 12:37:29 GMT+0200
    var now = tmpDate.getTime();  //  1381919849147
    var ts = now;
    
    var data = '&page='+counter+'&page-items=15&ts='+ts;
    $.ajax({
      url: 'https://careers.madergroup.com.au/cw/en/listing?&page='+counter+'&page-items=15&ts='+ts,
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,es;q=0.8,de;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
      },
      type: 'POST',
      data: data,
      dataType: "json",
      async: false,
      success: function (result) {
        //msg(result)
        var div = document.createElement("div");
        div.innerHTML = result.results;
        
        
        var html_jobs = div.querySelectorAll('li.puexternal_jobbox');
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
          
          job.title = elem.querySelector('a.job-link').textContent.trim();
          job.url = elem.querySelector('a.job-link').href.trim();
          job.location = elem.querySelector('span.location').textContent.trim();
          
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          
          job.temp = 1;
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
