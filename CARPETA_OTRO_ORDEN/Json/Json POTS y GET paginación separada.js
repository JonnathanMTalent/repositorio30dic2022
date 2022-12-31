//Json POST y GET con paginación separada. Sugerido para más de 5.000 jobs

//Caso:  https://www.greatugandajobs.com/jobs

//Extract
(function () {
  var jobs = [];
  var out = {};
  //var cont = 0;
  var json;

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  msg(out["pass_it"].cont);
  //do {
  //var data = {"key":"da029c0c4481e4aad5b5b7e25498519f2e801f23","channel":0,"locale":"de","sort":{"by":"createdOn","order":"desc"},"page":{"offset":0,"num":1000},"filter":{}};
  $.ajax({
    url: 'https://www.greatugandajobs.com/index.php?option=com_jsjobs&task=job.getnextjobs&pagenum=' + out["pass_it"].cont + '&jt=&cat=&cd=',                                            // 1) url
    headers: {                                                      
      "accept": "*/*",
      "Content-Type":"text/html; charset=UTF-8"    // 2) headers
    },
    type: 'GET',                                        // 3) tipo
    dataType: "html",                                   // 4) data que retorna
    //data: data,
    //data: JSON.stringify(data),
    async: false,
    success: function (result) {
      msg("\x1b[45m loading jobs...");
      json = result;
      var html_jobs = document.createElement("div");
      html_jobs.innerHTML = json;

      var html = html_jobs.querySelectorAll(".js-toprow");
      msg(html.length);

      // 5) ruta de los trabajos
      for (var i = 0; i < html.length; i++) {
        var job = {};
        job.title = html[i].querySelector('.js-title a').textContent.trim().split("- Career Opportunity ")[0];
        // job.location = html[i].querySelector(".job-location").textContent.trim();
        job.url = html[i].querySelector(".js-title a").href.trim();
        job.reqid = job.url.split("-").pop().split("?")[0];
        job.dateclosed_raw = html[i].querySelector('span.get-text').textContent.trim();
        var get_date= job.dateclosed_raw.replace(/April/gi,"04").replace(/May/gi,"05").replace(/June/gi,"06");
        get_date=get_date.replace(/January/gi,"01").replace(/February/gi,"02").replace(/March/gi,"03");
        get_date=get_date.replace(/July/gi,"07").replace(/August/gi,"08").replace(/September/gi,"09");
        get_date=get_date.replace(/October/gi,"10").replace(/November/gi,"11").replace(/December/gi,"12");
        get_date = get_date.split(' ')[1] + '/' + get_date.split(' ')[0] + '/' +get_date.split(' ')[2];
        job.dateclosed_raw = get_date;
        //job.logo = json[i].;
        //job.source_apply_email = json[i].;
        //job.source_empname = json[i].;
        //job.source_jobtype = json[i].;
        //job.source_salary = json[i].;
        //job.dateposted_raw = json[i].;
        //job.dateclosed_raw = json[i].;
        /*  var fecha = json[i].
                                                                                                                                                                                                                                fecha = fecha.split(" ")[0].split("-");
                                                                                                                                                                                                                                job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
        job.temp = 1;
        jobs.push(job);
      }
      out["pass_it"].cont++;
    },
    error: function (error) {
      msg(error);
    }
  });
  // } while (json.length > 0);                                 // 6) condicion de parada
  out["jobs"] = jobs;
  out["pass_it"]["jobs"] += jobs.length;
  return out;
})();

//Pagination
  (function() {
    var out = {};
    var jobs = document.querySelector(".totaljobsheading span").textContent.trim();
    out["pass_it"] = pass_it;
    msg(out["pass_it"].jobs);
    msg(jobs);
    //stop condition
    if(out["pass_it"].jobs >= jobs){
      //go to next page
      out["has_next_page"] = false;
    } else {
      //try again
      out["has_next_page"] = true;
    }
    out.waitFor = "";
    return out;
  })();
