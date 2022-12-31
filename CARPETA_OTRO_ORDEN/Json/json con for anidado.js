////Json con for anidado////

(function () {
  var jobs = [];
  var out = {};
  var counter = 1;
  var seguir = true;
  var json;
  var json0;
  var json00;
  //var Tken = '=';
  // do {

  //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
  //var data = {};

  $.ajax({
    url: 'https://careers.atherenergy.com/api/job?api=allJob', 
    headers: {
      //"accept": "application/json, text/plain, */*",
      //"accept-language": "es-ES,es;q=0.9",
      //"if-none-match": "W/\"1def0e-gjZAwkPy0ysh2VuWDDCemynboMw\"",
      //"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
      //"sec-ch-ua-mobile": "?0",
      //"sec-ch-ua-platform": "\"Windows\"",
      //"sec-fetch-dest": "empty",
      //"sec-fetch-mode": "cors",
      //"sec-fetch-site": "same-origin",
      //"Content-Type": "application/json; charset=utf-8" 
    },
    type: 'GET', //TIPO DE PETICION
    //data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
    dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
    async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
    success: function (result) {//FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
      // out["expected_jobs"] = result.totalCount;
      //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
      //var stop_pag = json;
      //if (stop_pag.length < 1) {
      //  seguir = false;
      //  msg(`---> FINAL DE PAGINACIÓN`);
      //}
      //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
      json00 = result.data
      for (var a in json00) {
        json0 = json00[a]
        for (var e in json0) {
          json = json0[e].jobs;
          for (var i in json) {
            var job = {};

            job.title = json[i].posting_title;
            job.reqid = json[i].openingid;
            job.url = "https://careers.atherenergy.com/job/"+json[i].openingid;
            job.location = json[i].city;
            job.source_location = json[i].city;
            job.dateposted_raw = json[i].createdAt;
            job.dateposted_raw =  job.dateposted_raw.split("T").shift().split("-");
            job.dateposted_raw =  job.dateposted_raw[1]+"/"+job.dateposted_raw[2]+"/"+job.dateposted_raw[0];
            job.experience_required = json[i].experience;
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;
            //job.source_jobtype = json[i].;
            //job.source_salary = json[i].;
            //job.html= json[i].;
            //job.jobdesc = job.html;;

            job.temp = 6;
            jobs.push(job);
          }
        }
      }
      //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
      counter += 1;
      msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
    },
    error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
      msg(error);
    }
  });
  // } while (seguir);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
  out["jobs"] = jobs;
  return out;
})();