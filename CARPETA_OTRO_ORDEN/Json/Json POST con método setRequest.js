// Peticiones cuando nos bloquea la pagina con json POST

// Caso de uso: http://boo.neuvoo.com/boo3-web/qa/app/index.php?scanid=194404


// Extract

(function () {
  var jobs = [];
  var out = {};
  var counter = 0;//CONTADOR DE LA PAGINACION
  var counter_page = 0;
  var seguir = true;//FLAG PARA VALIDAR LA PARADA DE PAGINACION
  var json;

  do {    
    var data = "message=%7B%22actions%22%3A%5B%7B%22id%22%3A%22126%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22%22%2C%22classname%22%3A%22aps_jobSearchController%22%2C%22method%22%3A%22retrieveJobListings%22%2C%22params%22%3A%7B%22filter%22%3A%22%7B%5C%22searchString%5C%22%3Anull%2C%5C%22salaryFrom%5C%22%3Anull%2C%5C%22salaryTo%5C%22%3Anull%2C%5C%22closingDate%5C%22%3Anull%2C%5C%22positionInitiative%5C%22%3Anull%2C%5C%22classification%5C%22%3Anull%2C%5C%22department%5C%22%3Anull%2C%5C%22category%5C%22%3Anull%2C%5C%22opportunityType%5C%22%3Anull%2C%5C%22employmentStatus%5C%22%3Anull%2C%5C%22state%5C%22%3Anull%2C%5C%22sortBy%5C%22%3Anull%2C%5C%22offset%5C%22%3A"+counter+"%2C%5C%22offsetIsLimit%5C%22%3Afalse%2C%5C%22lastVisitedId%5C%22%3Anull%7D%26requested%3DWed%20Oct%2021%202020%2013%3A29%3A12%20GMT-0500%20(Colombia%20Standard%20Time)%22%7D%2C%22cacheable%22%3Atrue%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22uB7Kis-nrXhbA1D0ce6Sog%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%22fKbVHkveStmrsuQ-xi-Csw%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Afalse%7D&aura.pageURI=%2Fs%2Fjob-search%3Foffset%3D"+counter+"&aura.token=undefined"
    //FUNCION AJAX DE JQUERY
    $.ajax({
      url: 'https://www.apsjobs.gov.au/s/sfsites/aura?r='+counter_page+'&aura.ApexAction.execute=1', //URL DEL JSON 
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,es;q=0.8,de;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-sfdc-page-scope-id": "1c14bd8c-0b4a-4789-8f4e-9a7ab0721605",
        "x-sfdc-request-id": "3743985100007ef32b"
      },
      type: 'POST', //TIPO DE PETICION
      data:  data,//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
      dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
      async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
      success: function (result) { //FUNCION EN CASO DE EXITO, RETORNA LA RESPUES

        json = result.actions[0].returnValue.returnValue.jobListings; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
        var stop_pag = json;
        //SE PREGUNTA POR LA LONGITUD DEL ARRAY DE LOS JOBS, PARA DETENER LA PAGINACION
        if (stop_pag.length < 1) {
          seguir = false;
          //msg(`---> FINAL DE PAGINACIÓN`);
        }
        //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
        for (var i in json) {
          var job = {};
          job.title = json[i].jobName;
          job.url = "https://www.apsjobs.gov.au/s/job-details?Id=" + json[i].jobId; 

          job.location = json[i].jobLocation;
          if(job.location){
            job.location = job.location.split(/Various|various|locations|in|null|-|/gi).join("");
          }else{
            job.location = "Canberra, AU";
          }

          job.source_jobtype = json[i].jobType;
          job.source_salary = "$" + json[i].jobSalaryFrom + " to " + "$" + json[i].jobSalaryTo;

          var posted = json[i].jobPostedDate.split("-");
          job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];

          var closed = json[i].jobCloseDate.split("-");
          job.dateclosed_raw = closed[1] +'/'+ closed[2] +'/'+ closed[0];

          job.source_empname = json[i].departmentName;

          if(json[i].agencyImageURL){
            job.logo = json[i].agencyImageURL;
          }else{
            job.logo = "https://www.apsjobs.gov.au/resource/1579066580000/CommunityResources/resources/images/logo__government.svg";
          }


          //job.html= json[i].;
          //job.jobdesc = job.html;;


          job.temp = 1;
          //jobs.push(job);

          if(job.location){
            if(job.location.indexOf(',') > -1) {
              var array = job.location.split(',');
              for (var i in array) {
                var jobx = {};
                jobx.title = job.title;
                jobx.url = job.url;
                jobx.source_jobtype = job.source_jobtype;
                jobx.source_salary = job.source_salary;
                jobx.dateposted_raw = job.dateposted_raw;
                jobx.dateclosed_raw = job.dateposted_raw;
                jobx.source_empname = job.source_empname;
                jobx.logo = job.logo;
                //jobx.html = job.html;
                //jobx.jobdesc= job.jobdesc;
                jobx.location = array[i].trim();
                jobx.location = jobx.location.replace(" ",", ").trim() + ", AU";
                jobx.temp = job.temp;
                if (jobx.location.length > 0) {
                  jobs.push(jobx);
                }
              }
            }
          }
          else {
            job.location = job.location
            job.location = job.location.replace(" ",", ").trim() + ", AU";
            jobs.push(job);
          }

        }
        //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
        counter += 15;
        counter_page += 1;
        //msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
      },
      error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
        msg('ERROR', error);
      }
    });
  } while (seguir);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
  out["jobs"] = jobs;
  return out;
})();


//Job description


(function() {
  var out = {};
  var job = {};

  const job_id = window.location.href.split('?Id=').pop().trim();
  msg('JOBID--> '+job_id);

  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("POST", 'https://www.apsjobs.gov.au/s/sfsites/aura?r=1&aura.ApexAction.execute=1', false);

  xhrrequest.setRequestHeader("Accept","*/*");
  xhrrequest.setRequestHeader("Accept-Language","en-US,en;q=0.9,es;q=0.8");
  xhrrequest.setRequestHeader("Cache-Control","no-cache,must-revalidate,max-age=0,no-store,private");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");


  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      msg(xhrrequest.responseText);

      var json = JSON.parse(xhrrequest.responseText);
      var html = json.actions[0].returnValue.returnValue;

      job.html = html.departmentDescription + '<br><br>'+ html.jobDescription+ '<br><br>'+ html.jobDuties+ '<br><br>'+ html.jobEligibilityRequirements;

      job.html = job.html.replace("undefined","").trim();

      if(job.html.indexOf('@')>-1){
        var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
        job.html = job.html.replace(eliminar,'');
      }

      if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
      if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
      if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
      if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }


      job.html        = cleanHTML(job.html);
      var tmp       = document.createElement("DIV");
      tmp.innerHTML = job.html;
      job.jobdesc     = tmp.textContent.trim();
    }
  };
  xhrrequest.send("message=%7B%22actions%22%3A%5B%7B%22id%22%3A%22112%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22%22%2C%22classname%22%3A%22aps_jobSearchController%22%2C%22method%22%3A%22getJobDetails%22%2C%22params%22%3A%7B%22jobId%22%3A%22"+job_id+"%22%7D%2C%22cacheable%22%3Atrue%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22uB7Kis-nrXhbA1D0ce6Sog%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%22oSTUAtBRwkgvawuWs_Palw%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Afalse%7D&aura.pageURI=%2Fs%2Fjob-details%3FId%3D"+job_id+"&aura.token=undefined"); 

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