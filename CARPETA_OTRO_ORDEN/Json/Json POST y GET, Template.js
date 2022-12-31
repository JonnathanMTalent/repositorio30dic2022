//Json llamado ajax POST y GET



//Extract

(function () {
    var jobs = [];
    var out = {};
    // var cont = 1;
    var json;
    // do {
      //****solo descomentar var data y data si es json post** */
    //var data = {"key":"da029c0c4481e4aad5b5b7e25498519f2e801f23","channel":0,"locale":"de","sort":{"by":"createdOn","order":"desc"},"page":{"offset":0,"num":1000},"filter":{}};
    $.ajax({  //https://talent-dev.com/private/tools/jobs/pageCompanyView.php?id=23020
        url: 'https://jobs.b-ite.com/api/v1/postings/search',                                            // 1) url
        headers: {                                                      
        "accept": "*/*",
        "Content-Type":"application/json;charset=UTF-8"    // 2) headers recordar contet-type
        },
        type: 'POST',                                        // 3) tipo
        dataType: "json",                                   // 4) data que retorna
        //data: data,
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
        msg("\x1b[45m loading jobs...");
        json = result.jobPostings;                                 // 5) ruta de los trabajos
        //msg(json.length);
        for (var i = 0; i < json.length; i++) {
            var job = {};
            job.title = json[i].title;
           // job.title = job.title.split(": ").pop().split("|").shift();
            job.location = json[i].jobSite;
            job.url = json[i].url;
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
        // cont++;
        },
        error: function (error) {
        msg(error);
        }
    });
    //  } while (json.length > 0);                                 // 6) condicion de parada
    out["jobs"] = jobs;
    return out;
    })();



    //Otro POST

    (function () {
        var jobs = [];
        var out = {};
        var counter = 1;
        var seguir = true;
        var json;
        //var Tken = '=';
        do {
       
          //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
          var data = {};
         
          $.ajax({
            url: 'URL', 
            headers: {
              "Content-Type": "application/json;charset=UTF-8" 
            },
            type: 'POST', //TIPO DE PETICION
            data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
            dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
            async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
            success: function (result) {//FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
              // out["expected_jobs"] = result.totalCount;
              json = result.Jobs.Job; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
              var stop_pag = json;
              if (stop_pag.length < 1) {
                seguir = false;
                msg(`---> FINAL DE PAGINACIÓN`);
              }
              //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
              for (var i in json) {
                var job = {};

                job.title = json[i].;
                job.reqid = json[i].;
                job.url = json[i].;
                job.location = json[i].;
                //job.dateposted_raw = json[i].;
                //job.logo = json[i].;
                //job.source_apply_email = json[i].;
                //job.source_empname = json[i].;
                //job.source_jobtype = json[i].;
                //job.source_salary = json[i].;
                //job.html= json[i].;
                //job.jobdesc = job.html;;
      
                job.temp = 1;
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
        } while (seguir);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
        out["jobs"] = jobs;
        return out;
      })();
      


