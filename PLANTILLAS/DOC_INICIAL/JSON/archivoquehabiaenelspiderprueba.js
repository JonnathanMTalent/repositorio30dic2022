(function() {
    var jobs = [];
    var out = {};
    var counter = 1;//VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start=
    var limit = 0;
    var json;
  //en esta variable data tengo que poner la variable counter al final en el filter
         do {
            var data={"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"Town/City"},{"name":"zzreqWorkatHome","label":"Option to Work Remote"},{"name":"payGroupCode","label":"Job Function"},{"name":"zzreqJobType","label":"Job Type"},{"name":"typeOfFulltime","label":"Schedule"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"location","label":"Location"}]},"pagefilter":{"page":counter},"rl":"enUS"};
      $.ajax({ //ES NA PETICION AL SERVIDOR, EL DEBUELVE UNA ACCION JSON
//ESTA URL LA SACAMOS DEL ENCABEZADO, AL INSPECCIONAR Y SE LLAMA: URL DE LA SOLICITUD (BUSCARLA EN INGLES)
        url : 'https://recruiting.adp.com/srccar/public/rest/1/115407/search/',
        headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
          
          //TODO ESTE TEXTO DE ARRIBA ME SALE CUANDO LE DOY COPIAR COMO FECH SOBRE EL ARCHIVO JSON QUE CARGA
          
       //   "Content-Type": "application/json;charset=UTF-8"
        },
        type : 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          json = result.jobs; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data
          limit = result.pages; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.ptitle;  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO
            job.location = elem.location;  //copiar ruta de acceso de la propieadd
            job.url = elem.url;
            //job.id=elem.id
            //job.url = elem.positionOfUrl;                    
            //job.dateposted_raw = elem.positionOfDatePosted;
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
  
            job.temp = "1";
            jobs.push(job);
          }
          counter = counter + 1;  //CONTADOR QUE INCREMENTA
          msg("EL NUMERO DE CONTADOR ES: "+counter)
        },
        error: function(error){
          msg(error);
        }
      });
    } while (counter < limit);  //CONDICION DE PARADA
  
    out["jobs"]= jobs;
    return out;
  })();




/*
ACCION 1 URL EN LN

JOBSITE==  https://jb.skillsmapafrica.com/JobSearch



EL SPIDER CONFIG :


{
    "options": {
        "inactivateJQuery": false,
        "ignoreLoadErrors": false,
        "waitForPageLoadEvent": true,
        "waitForResources": true
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
}



*/
