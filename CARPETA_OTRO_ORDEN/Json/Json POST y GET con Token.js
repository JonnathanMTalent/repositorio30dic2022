//Json GET con token en Headers


(function () {
  var jobs = [];
  var out = {};
  var counter = 1;//CONTADOR DE LA PAGINACION
  var seguir = true;//FLAG PARA VALIDAR LA PARADA DE PAGINACION
  var json;
  var token = document.querySelector('body').getAttribute("data-api-token");
  var key = document.querySelector('body').getAttribute("data-api-key");
  var timestamp = document.querySelector('body').getAttribute("data-api-timestamp");
  var totaJobs;
  //var Tken = '=';
  do {
    //DATOS PARA LA CARGA DEL JSON POST
    //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
    //var data = {};
    //FUNCION AJAX DE JQUERY
    $.ajax({
      url: 'https://jobs.pilotflyingj.com/api/4.3/companies/146302/career-site/jobs?page_size=250&page_number='+counter+'&sort_by=headline&sort_order=ASC', //URL DEL JSON 

      headers: {
        "accept": "*/*",
        "accept-language": "es-ES,es;q=0.9,ja;q=0.8,en;q=0.7",
        "api-key": key,
      //  "api-key": "a5a42be583e281bca02ed0a30ef4bca3f046c46d",
        //"api-timestamp": "2021-02-04T16:49:53",
        "api-timestamp": timestamp,
       // "api-token": "8840466df41c9826807115f90f23077e65492aeb",
        "api-token": token,
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },

      type: 'GET', //TIPO DE PETICION
      //data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
      dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
      async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
      success: function (result) {//FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
        // out["expected_jobs"] = result.totalCount;
        json = result.jobs; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
        totaJobs  = result.numFound;
        var stop_pag = json;
        //SE PREGUNTA POR LA LONGITUD DEL ARRAY DE LOS JOBS, PARA DETENER LA PAGINACION
    /*    if (stop_pag.length < 1) {
          seguir = false;
          msg(`---> FINAL DE PAGINACIÓN`);
        } */

        //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
        for (var i in json) {
          var job = {};

          job.title = json[i].headline_titlecase;
          job.url = "https://jobs.pilotflyingj.com/" + json[i].job_url;
          job.location = json[i].locations[0].city_state;
          var datePosted = json[i].start_date.split("T").shift().split("-");
          job.dateposted_raw = `${datePosted[1]}/${datePosted[2]}/${datePosted[0]}`
            
          var dateClosed  = json[i].expiration_date.split("T").shift().split("-");
          job.dateclosed_raw = `${dateClosed[1]}/${dateClosed[2]}/${dateClosed[0]}`
          job.reqid = json[i].reference_string;
          job.source_jobtype = json[i].EmploymentTypesCSV;
          //job.logo = json[i].;
          //job.source_apply_email = json[i].;
          //job.source_empname = json[i].;
          //job.source_salary = json[i].;
          //job.html= json[i].;
          //job.jobdesc = job.html;;

          job.temp = 21;
          jobs.push(job);
        }
        //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
        counter += 1;
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${jobs.length}`);
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${totaJobs}`);
      },
      error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
        msg(error);
      }
    });
  } while (jobs.length < totaJobs);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
  out["jobs"] = jobs;
  return out;
})();



/*
  (function() {
      var out = {};
       var html_jobs = document.querySelectorAll("ul.results-list li.result-item");
      var jobs = [];for(var x in html_jobs){
          if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
          var job = {};
          var elem = html_jobs[x];
          job.title = elem.querySelector("a.item-title").textContent.trim();
          job.url = elem.querySelector("a.item-title").href.trim();
          job.location = elem.querySelector("span.city-state").textContent.trim();
          //job.dateposted_raw = elem.querySelector("td:nth-child(1)").textContent.trim().replace(".","/").replace(".","/");
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          job.temp = 123;
          jobs.push(job);
      } 

      out["jobs"]= jobs;
      return out;
  })();
  */




//Json POST con token en PAGINACIÓN

(function () {
  var jobs = [];
  var out = {};
  var counter = 1;
  var seguir = false;
  var json;
  var Tken="0";

  do {
    var data = {"facetLocation":"","flexibleWorking":"false","fullTime":"false","industry":"","isSponsored":false,"jobType":"","partTime":"false","query":"","locations":"","salMax":"","salMin":"","sortType":"RELEVANCE_DESC","specialismId":"","subSpecialismId":"","typeOnlyFilter":"","userAgent":"-Desktop","radius":50,"isCrossCountry":false,"isResponseCountry":false,"responseSiteLocale":"","pageToken":Tken,"jobId":"","jobRefrence":"","crossCountryUrl":",","payType":"","type":"search","cookieDomain":".hays.ae"};

    $.ajax({
      url: 'https://m.hays.com/jobportal/int/s/ae/en/job/browse/v1/jobs', 

      headers: {
        "accept": "application/json",
        "accept-language": "es-ES,es;q=0.9,ja;q=0.8,en;q=0.7",
        "activityurl": "/search?q=&location=&specialismId=&subSpecialismId=&locationf=&industryf=&sortType=0&jobType=-1&flexiWorkType=-1&payTypefacet=-1&minPay=-1&maxPay=-1&jobSource=HaysGCJ&searchPageTitle=Job%20search%20%E2%80%93%20Hays%20Recruitment%20-%20PL&searchPageDesc=Check%20our%20job%20offers%20and%20work%20for%20the%20best%20employers.%20Find%20a%20dream%20job%20with%20Hays%20UK.",
        "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJndWlkIjoiOWM0MGQwNmYtNzM0ZS00NDZhLTkzOGQtYjRjMmYxZWYyMTJhIiwiZG9tYWluTmFtZSI6ImFlIiwic3ViIjoiOWM0MGQwNmYtNzM0ZS00NDZhLTkzOGQtYjRjMmYxZWYyMTJhIiwiaWF0IjoxNjEyMjc3ODkxLCJleHAiOjE2NDMzODE4OTF9.2OOCoQSLKa6K8nBZeUk13X5RZAVQoChMar6vSPoVQJTuHH6-WOXuP-zW48iOAqYmnNDa1sWywjnlW7fR8QdBRg",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-auth": "SEFZU19PTkxJTkUyX0FQSV9LRVk=:C81DkSGHXaZE/vvKlLcxO2ZTNzOiQbMG8jgU+8ovzfw=",
        "x-date": "2021-02-02T09:59:19-0500",
        "x-session": "bbfec61c-1d44-4000-89c8-36bf4fe0753f"
      },

      type: 'POST',
      data: JSON.stringify(data),
      dataType: "json", 
      async: false,
      success: function (result) {

        json = result.data.result.jobs; 
        Tken = result.data.result.nextPageToken;

        var stop_pag = json;
        if (stop_pag.length < 1) {
          seguir = false;
          msg(`---> FINAL DE PAGINACIÓN`);
        }

        for (var i in json) {
          var job = {};

          job.title = json[i].title;
          job.reqid = json[i].filterableCustomFields.JobId.values[0];
          job.url = json[i].trackingUrl;
          
          job.location = json[i].location;
          job.location = job.location.split("(").shift();

          job.dateposted_raw = json[i].publishDate.month + "/" + json[i].publishDate.day + "/" + json[i].publishDate.year;
          job.dateclosed_raw = json[i].postingExpiryDate.month + "/" + json[i].postingExpiryDate.day + "/" + json[i].postingExpiryDate.year;

          //job.logo = json[i].;
          job.source_empname = json[i].companyTitle;
          //job.source_jobtype = json[i].;
          job.source_salary = json[i].compensationAmount.units;


          if(Tken==null) { job.tken = "null"; } else{ job.tken = Tken; }

          job.temp = 422021;
          jobs.push(job);
        }


        //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
        counter += 1;
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
      },
      error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
        msg(error);
      }
    });
  } while (counter<3);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
  out["jobs"] = jobs;
  return out;
})();



/*(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div.job-listing > ul > li");
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("a").textContent.trim();
    job.reqid = elem.querySelector("input").getAttribute("value").trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = elem.querySelector("p.location > span").textContent.trim();

    var salario = elem.querySelector("p.salary.dollar-active> span").textContent.trim();
    if(salario.indexOf('00')>-1){
      job.source_salary = salario;
    }

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 12021;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();*/





******/////***********////********
token parseado
var tokenSelector = [...document.querySelectorAll("script")]
.map(src => src.textContent.trim())
.filter(src => src.search(/"token":/)>-1)[0];
var token = JSON.parse(tokenSelector.replace(/if\(\!csod\.context  \|\| \!csod\.context\.token\)  csod\.context\=|;/gi,"")).token;
var json;