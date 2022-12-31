(function() {
  var out = {};

  var regex = /\d+/;

  if (typeof msg === 'undefined') msg = console.log;

  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);
  var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;

  var expected_jobs = regex.exec(expected_jobs_str)[0];

  out["expected_jobs"] = expected_jobs;

  return out;
})();



//Extract

(function() {
  var out = {};
  // var html_jobs = document.querySelectorAll("");
  //  This gives you an HTMLElement object
  if(typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var jobs =  pass_it["json"];
  var returnedJobs = [];
  var element = document.querySelector("pre").textContent;
  //msg(element);
  var json = JSON.parse(element);
  var jobs = json.body.children[0].children[0].listItems;

  //msg(typeof(jobs));
  for(i in jobs) {
    var job = {};/*init*/
    // msg("Entre")
    job.title = jobs[i].title.instances[0].text;
    job.reqid = jobs[i].subtitles[0].instances[0].text;
    job.url = "https://elanco.wd5.myworkdayjobs.com" + jobs[i].title.commandLink ;
    job.location = jobs[i].subtitles[1].instances[0].text;
    job.location = job.location.split("-").reverse().join(", ");
    //job.location = job.location;

    if(jobs[i].subtitles.length > 2){
      var posted = jobs[i].subtitles[2].instances[0].text.replace('+','').trim();
      job.dateposted_raw = dateAgo(posted,' ',1,2);  
    }



    job.temp = 3312;

    
    if(job.location.indexOf("Location") > -1){
      var urlPeticion="https://elanco.wd5.myworkdayjobs.com/wday/cxs/elanco/External_Career"+jobs[i].title.commandLink.split("External_Career").pop()
      $.ajax({
        url : urlPeticion,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        type : 'GET',
        // data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          //msg(result)
          job.temp = 1;  
          json = result.jobPostingInfo;
          job.location=json.location;
          returnedJobs.push(job);

          var temp = json.additionalLocations
          temp.map(location =>{
            var jobx = {};
            jobx ={...job}
            jobx.location = location;
            returnedJobs.push(jobx);
          }) 


        },
        error: function(error){
          msg(error);
        }
      });
    } else{
      returnedJobs.push(job);
    }
  }

  out["pass_it"]["jobs"] += returnedJobs.length;
  out["jobs"]= returnedJobs;
  return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");

  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send(); 
  return response;
}


function dateAgo (text, char_separator, value_DWMY, position_DWMY){  
  var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().indexOf('TODAY')>-1 || dayWeekMonthYear.toUpperCase().indexOf('HOUR')>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;//resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);        //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd    = datePosted.getDate();           //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;        //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;}  
  if (mm<10){mm ='0'+ mm;}  
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}



////*****tipo post******////

(function () {
    var jobs = [];
    var out = {};
    var counter = 0;
    var seguir = true;
    var json;
      var json1;
    //var Tken = '=';
    do {
  
      //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
      var data = {"limit":20,"offset":counter,"appliedFacets":{},"searchText":""};
  
      $.ajax({
        url: 'https://elanco.wd5.myworkdayjobs.com/wday/cxs/elanco/External_Career/jobs', 
        headers: {
          "accept": "application/json",
          "accept-language": "en-US",
          "content-type": "application/json",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "Content-Type": "application/json" 
        },
        type: 'POST', //TIPO DE PETICION
        data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
        dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
        async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
        success: function (result) {//FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
          // out["expected_jobs"] = result.totalCount;
          json = result.jobPostings; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
          var stop_pag = json;
          if (stop_pag.length < 20) {
            seguir = false;
            msg(`---> FINAL DE PAGINACIÓN`);
          }
          //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
          for (var i in json) {
            var job = {};
  
            job.title = json[i].title;
            job.reqid = json[i].bulletFields[0];
            job.url = "https://elanco.wd5.myworkdayjobs.com/en-US/External_Career" + json[i].externalPath;
            job.location = json[i].locationsText;
            job.dateposted_raw = json[i].postedOn;
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;
            //job.source_jobtype = json[i].;
            //job.source_salary = json[i].;
            //job.html= json[i].;
            //job.jobdesc = job.html;;
  
            job.temp = 1;
  
  
  
            if(job.location.indexOf("Location") > -1){
              var urlPeticion = "https://elanco.wd5.myworkdayjobs.com/wday/cxs/elanco/External_Career" + json[i].externalPath;
              $.ajax({
                url : urlPeticion,
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                },
                type : 'GET',
                // data : JSON.stringify(data),
                dataType: "json",
                async : false,
                success : function(result){
                  //msg(result)
                  job.temp = 1;  
                  json1 = result.jobPostingInfo;
                  job.location = json1.location;
                  jobs.push(job);
  
                  var temp = json1.additionalLocations
                  temp.map(location =>{
                    var jobx = {};
                    jobx ={...job}
                    jobx.location = location;
                    jobs.push(jobx);
                  }) 
  
  
                },
                error: function(error){
                  msg(error);
                }
              });
            } else{
              jobs.push(job);
            }
  
          }
          //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
          counter = counter + 20;
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
  
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
  
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send(); 
    return response;
  }
  
  
  function dateAgo (text, char_separator, value_DWMY, position_DWMY){  
    var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_DWMY]!=='undefined'){
      var dayWeekMonthYear = text.split(char_separator)[position_DWMY]
      }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().indexOf('TODAY')>-1 || dayWeekMonthYear.toUpperCase().indexOf('HOUR')>-1){nDays = 0;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
    var dateJob    = date_Now.getDate() - nDays;//resto dias de publicacion a la fecha actual
    var get_date   = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);        //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd    = datePosted.getDate();           //devuelve el numero del dia del mes.
    var mm    = datePosted.getMonth()+1;        //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10){dd ='0'+dd;}  
    if (mm<10){mm ='0'+ mm;}  
    dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }
  