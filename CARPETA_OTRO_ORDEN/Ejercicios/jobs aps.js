(function () {
  var jobs = [];
  var out = {};
  var counter = 0;//CONTADOR DE LA PAGINACION
  var counter_page = 0;
  var seguir = true;//FLAG PARA VALIDAR LA PARADA DE PAGINACION
  var json;

  do {    
    var data = "message=%7B%22actions%22%3A%5B%7B%22id%22%3A%22126%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22%22%2C%22classname%22%3A%22aps_jobSearchController%22%2C%22method%22%3A%22retrieveJobListings%22%2C%22params%22%3A%7B%22filter%22%3A%22%7B%5C%22searchString%5C%22%3Anull%2C%5C%22salaryFrom%5C%22%3Anull%2C%5C%22salaryTo%5C%22%3Anull%2C%5C%22closingDate%5C%22%3Anull%2C%5C%22positionInitiative%5C%22%3Anull%2C%5C%22classification%5C%22%3Anull%2C%5C%22department%5C%22%3Anull%2C%5C%22category%5C%22%3Anull%2C%5C%22opportunityType%5C%22%3Anull%2C%5C%22employmentStatus%5C%22%3Anull%2C%5C%22state%5C%22%3Anull%2C%5C%22sortBy%5C%22%3Anull%2C%5C%22offset%5C%22%3A"+counter+"%2C%5C%22offsetIsLimit%5C%22%3Afalse%2C%5C%22lastVisitedId%5C%22%3Anull%7D%26requested%3DWed%20Oct%2021%202020%2013%3A29%3A12%20GMT-0500%20(Colombia%20Standard%20Time)%22%7D%2C%22cacheable%22%3Atrue%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22uB7Kis-nrXhbA1D0ce6Sog%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%22fKbVHkveStmrsuQ-xi-Csw%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Afalse%7D&aura.pageURI=%2Fs%2Fjob-search%3Foffset%3D"+counter+"&aura.token=undefined"
               "message=%7B%22actions%22%3A%5B%7B%22id%22%3A%22121%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22%22%2C%22classname%22%3A%22aps_jobSearchController%22%2C%22method%22%3A%22retrieveJobListings%22%2C%22params%22%3A%7B%22filter%22%3A%22%7B%5C%22searchString%5C%22%3Anull%2C%5C%22salaryFrom%5C%22%3Anull%2C%5C%22salaryTo%5C%22%3Anull%2C%5C%22closingDate%5C%22%3Anull%2C%5C%22positionInitiative%5C%22%3Anull%2C%5C%22classification%5C%22%3Anull%2C%5C%22department%5C%22%3Anull%2C%5C%22category%5C%22%3Anull%2C%5C%22opportunityType%5C%22%3Anull%2C%5C%22employmentStatus%5C%22%3Anull%2C%5C%22state%5C%22%3Anull%2C%5C%22sortBy%5C%22%3Anull%2C%5C%22offset%5C%22%3A         15%2C%5C%22offsetIsLimit%5C%22%3Afalse%2C%5C%22lastVisitedId%5C%22%3Anull%7D%26requested%3DFri%20Nov%2013%202020%2017%3A13%3A57%20GMT-0500%20(hora%20est%C3%A1ndar%20de%2%22%7D%2C%22cacheable%22%3Atrue%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22dDIdorNC3N22LalQ5i3slQ%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%2233FoOzoMlZseaoxhiDlEew%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Afalse%7D&aura.pageURI=%2Fs%2Fjob-search%3Foffset%3D15&aura.token=undefined"
message=%7B%22actions%22%3A%5B%7B%22id%22%3A%22122%3Ba%22%2C%22descriptor%22%3A%22aura%3A%2F%2FApexActionController%2FACTION%24execute%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22namespace%22%3A%22%22%2C%22classname%22%3A%22aps_jobSearchController%22%2C%22method%22%3A%22retrieveJobListings%22%2C%22params%22%3A%7B%22filter%22%3A%22%7B%5C%22searchString%5C%22%3Anull%2C%5C%22salaryFrom%5C%22%3Anull%2C%5C%22salaryTo%5C%22%3Anull%2C%5C%22closingDate%5C%22%3Anull%2C%5C%22positionInitiative%5C%22%3Anull%2C%5C%22classification%5C%22%3Anull%2C%5C%22department%5C%22%3Anull%2C%5C%22category%5C%22%3Anull%2C%5C%22opportunityType%5C%22%3Anull%2C%5C%22employmentStatus%5C%22%3Anull%2C%5C%22state%5C%22%3Anull%2C%5C%22sortBy%5C%22%3Anull%2C%5C%22offset%5C%22%3A30%2C%5C%22offsetIsLimit%5C%22%3Afalse%2C%5C%22lastVisitedId%5C%22%3Anull%7D%26requested%3DFri%20Nov%2013%202020%2017%3A20%3A29%20GMT-0500%20(hora%20est%C3%A1ndar%20de%20Colombia)%22%7D%2C%22cacheable%22%3Atrue%2C%22isContinuation%22%3Afalse%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%22dDIdorNC3N22LalQ5i3slQ%22%2C%22app%22%3A%22siteforce%3AcommunityApp%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fsiteforce%3AcommunityApp%22%3A%2233FoOzoMlZseaoxhiDlEew%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%7D%2C%22uad%22%3Afalse%7D&aura.pageURI=%2Fs%2Fjob-search%3Foffset%3D30&aura.token=undefined
    //FUNCION AJAX DE JQUERY
    $.ajax({
      url: 'https://www.apsjobs.gov.au/s/sfsites/aura?r='+counter_page+'&aura.ApexAction.execute=1', //URL DEL JSON 

      headers: {
        "accept": "*/*",
        "accept-language": "es-ES,es;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-sfdc-page-scope-id": "9530074b-bd0b-4702-b779-44d9093e3a0f",
        "x-sfdc-request-id": "61579430000175ec4f"
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
            job.location = job.location.split(/Various|various|locations|null|-|/gi).join("");
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


          job.temp = 102020;
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
                jobx.dateclosed_raw = job.dateclosed_raw;
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