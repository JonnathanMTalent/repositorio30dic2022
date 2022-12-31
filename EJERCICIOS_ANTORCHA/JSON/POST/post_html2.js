//https://www.edenbrownsynergy.com/job-search

//infinity

(() => {
    var out = {};
    out.pass_it = {
        "counter":40,
        "counterJobs":0,
        "limit":0
    }
    return out;
})()


// extract

(function () {
    var jobs = [];
    var out = {};
    var seguir = true;
    var counter = 1;
    out.pass_it = pass_it;
    //var Tken = '=';
    //do {
      //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]}​;
      //var data = {"option":com_recmgr, "view":search, "tmpl":component, "layout":ajax, "limitstart":out.pass_it.counter};
      var data ={};
      $.ajax({
        url: 'https://www.edenbrownsynergy.com/index.php?option=com_recmgr&view=search&tmpl=component&layout=ajax&limitstart='+out.pass_it.counter,
        headers: {
    "accept": "*/*",
    "accept-language": "es-ES,es;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
          //msg(result)
          var div = document.createElement("div");
          div.innerHTML = result;
          var html_jobs = div.querySelectorAll('div.job');
          //out.pass_it.limit=div.querySelector('div.search-results-heading').textContent.trim().replace(/([a-zA-Z._-]+)/gi,"").replace(":","").trim();
          out.pass_it.limit=100;
          var mostrar=div.querySelector('div.search-results-heading');
          msg("mostrar es: "+mostrar);
          var stop_pag = html_jobs;
          //out.pass_it.limit=stop_pag.length;

          
          for (var x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            var job = {};
            var elem = html_jobs[x];
            
            job.title = elem.querySelector('a.title').textContent.trim();
            job.url = elem.querySelector('a.title').getAttribute("href").trim();
            
            //job.location = elem.querySelector('').textContent.trim();
            
            //job.dateposted_raw = elem.querySelector("").textContent.trim();
            //job.logo = elem.querySelector("").getAttribute("src").trim();
            //job.source_empname = elem.querySelector("").textContent.trim();
            //job.source_jobtype = elem.querySelector("").textContent.trim();
            //job.source_salary = elem.querySelector("").textContent.trim();
            
            job.temp = 22021;
            jobs.push(job);
          }
 
        },
        error: function (error) {
          msg('TENGO UN ERROR');
          msg(error);
        }
      });
   // } while (seguir);
    out["jobs"] = jobs;
    return out;
  })();


  //pagination

  (function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 10;
          if (out.pass_it.counter > out.pass_it.limit) {
            seguir = false;
          }else{
        out.has_next_page = true;
    }
    return out;
})();