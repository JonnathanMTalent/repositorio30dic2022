(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var seguir = false;
    var json;
    var Tken = "0";
  
    do {
      // var data = {"facetLocation":"","flexibleWorking":"false","fullTime":"false","industry":"","isSponsored":false,"jobType":"","partTime":"false","query":"","locations":"","salMax":"","salMin":"","sortType":"RELEVANCE_DESC","specialismId":"","subSpecialismId":"","typeOnlyFilter":"","userAgent":"-Desktop","radius":50,"isCrossCountry":false,"isResponseCountry":false,"responseSiteLocale":"","pageToken":Tken,"jobId":"","jobRefrence":"","crossCountryUrl":",","payType":"","type":"search","cookieDomain":".hays.ae"};
      var data = {"token":Tken,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
      $.ajax({
        url: 'https://apply.workable.com/api/v3/accounts/lingoace/jobs', 
  
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en",
          "content-type": "application/json;charset=UTF-8",
        },
  
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json", 
        async: false,
        success: function (result) {
  
          json = result.results; 
          Tken = result.nextPage;
  
          var stop_pag = json;
          if (stop_pag.length < 1) {
            seguir = false;
            //msg(`---> FINAL DE PAGINACIÓN`);
          }
  
          for (var i in json) {
            var job = {};
  
            job.title = json[i].title;
            job.reqid = json[i].shortcode;
            job.url = "https://apply.workable.com/lingoace/j/"+json[i].shortcode;
            var city = json[i].location.city;
            var country = json[i].location.country;
            job.location = city+", "+country;
            job.source_location = city+", "+country;
            //job.location = job.location.split("(").shift();
  
            job.dateposted_raw = json[i].published;
            job.dateposted_raw = job.dateposted_raw.split("T").shift().split("-");
            job.dateposted_raw = job.dateposted_raw[1]+"/"+ job.dateposted_raw[2]+"/"+job.dateposted_raw[0];
            // job.dateclosed_raw = json[i].postingExpiryDate.month + "/" + json[i].postingExpiryDate.day + "/" + json[i].postingExpiryDate.year;
  
            //job.logo = json[i].;
            //job.source_empname = json[i].companyTitle;
            if(json[i].type){
              job.source_jobtype = json[i].type;
            }
            //job.source_salary = json[i].compensationAmount.units;
  
  
            if(Tken==null) { job.tken = "null"; } else{ job.tken = Tken; }
  
            job.temp = 422021;
            jobs.push(job);
          }
  
  
          //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
          counter += 1;
          //msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
        },
        error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
          //msg(error);
        }
      });
    } while (Tken);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
    out["jobs"] = jobs;
    return out;
  })();



  // JOBDESCRIPTION:

  (function() {
    var out = {};
    var job = {};
    var selector = 'div[data-ui="job-description"]';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();  
  
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  }
  
    job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');
  
  
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    out["job"] = job;
    return out;
  
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }       
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }       
    }
    return newHtml;
  }