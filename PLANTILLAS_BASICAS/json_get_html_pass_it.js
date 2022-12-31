//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "jobsperpage":0,
        "limit":15
    }
    return out;
})()

// extract

(function () {
    var jobs = [];
    var out = {};
    out.pass_it = pass_it;

      //var data ={};
      $.ajax({
        url: 'https://mediacorp.jobs2web.com/search?q=&sortColumn=referencedate&sortDirection=desc&startrow='+out.pass_it.counter,
        headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
        },
        type: 'GET',
        //data: JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
          //msg(result)
          var div = document.createElement("div");
          div.innerHTML = result;
          var html_jobs = div.querySelectorAll('#searchresults > tbody > tr');
          out.pass_it.jobsperpage=html_jobs.length;
          msg('Cantidad de jobs actuales: '+out.pass_it.jobsperpage);
          
          for (var x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            var job = {};
            var elem = html_jobs[x];
            
            job.title = elem.querySelector("td.colTitle > span > a").textContent.trim().replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").trim();
            job.url = elem.querySelector("td.colTitle > span > a").href.trim();
            job.reqid = job.url.split("/")[5].trim();
            

            
            job.temp = 22021;
            jobs.push(job);
          }
 
        },
        error: function (error) {
          msg('TENGO UN ERROR');
          msg(error);
        }
      });
    out["jobs"] = jobs;
    return out;
  })();

  //pagination

  (function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 15;
    const { counter, jobsperpage, limit } = out.pass_it;
    out.has_next_page = limit >=jobsperpage;
    return out;
})();