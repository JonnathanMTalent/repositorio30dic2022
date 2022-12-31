//jobsite: homesite: https://recruiting.adp.com/srccar/public/nghome.guid?c=2167807&d=ExternalCareerSite



//Resumido

//jobsite: homesite: https://recruiting.adp.com/srccar/public/nghome.guid?c=2167807&d=ExternalCareerSite

//EN ESTE CASO LOS JOBS SOLO APARECEN AL DARLE AL BOTON SEAARCH

(function() {

  var jobs = [];
  var out = {};
  var counter = 1; //VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 
  var limit = 0;
  var json;

  do {
      var data = {
          "filters": [{
              "name": "country",
              "label": "Country"
          }, {
              "name": "state",
              "label": "State/Province"
          }, {
              "name": "city",
              "label": "Town/City"
          }, {
              "name": "zzreqWorkatHome",
              "label": "Option to Work Remote"
          }, {
              "name": "payGroupCode",
              "label": "Job Function"
          }, {
              "name": "zzreqJobType",
              "label": "Job Type"
          }, {
              "name": "typeOfFulltime",
              "label": "Schedule"
          }],
          "results": {
              "pageTitle": "Search Results",
              "zeroResultsMessage": "We're sorry but we have no job openings at this time that match your search criteria. Please try another search.",
              "searchFailureMessage": "Oops! Something went wrong.  Search has encountered a problem. Try searching again",
              "resultsFoundLabel": "results found",
              "bookmarkText": "Bookmark This",
              "pageSize": "100",
              "sortOrder": "00001000",
              "shareText": "Share",
              "fields": [{
                  "name": "ptitle",
                  "label": "Published Job Title"
              }, {
                  "name": "location",
                  "label": "Location"
              }]
          },
          "pagefilter": {
              "page": counter
          },
          "rl": "enUS"
      };
      $.ajax({ //ES NA PETICION AL SERVIDOR, EL DEBUELVE UNA ACCION JSON 
          //ESTA URL LA SACAMOS DEL ENCABEZADO, AL INSPECCIONAR Y SE LLAMA: URL DE LA SOLICITUD (BUSCARLA EN INGLES) 
          url: "https://recruiting.adp.com/srccar/public/rest/1/115407/search/",
          headers: {

              "accept": "application/json, text/plain, */*",
              "accept-language": "es-ES,es;q=0.9",
              "content-type": "application/json;charset=UTF-8",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin"
              //TODO ESTE TEXTO DE ARRIBA ME SALE CUANDO LE DOY COPIAR COMO FECH SOBRE EL ARCHIVO JSON QUE CARGA 
              //   "Content-Type": "application/json;charset=UTF-8" 
          },
          type: 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 
          //data : JSON.stringify(data), // para usar el post descomentamos esta linea 
          // data : 'do=careersiteJobSearch&location_id=&vertical_id=&keyword=&pagesize=10&page='+out.passit.cont,
          dataType: "json",
          async: false,
          success: function(result) {
              json = result.jobs; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 
              limit = result.pages; // esta es la cantidad de paginas que 
              //limit = result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 
              for (var i = 0; i < json.length; i++) {
                  var job = {};
                  var elem = json[i];
                  job.title = elem.ptitle; //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 
                  job.location = elem.locationCity + "," + elem.locationState; //copiar ruta de acceso de la propieadd 
                  job.url = elem.url; //armamos la url a partir de la que sale en la ventana, en la parte de las rutas
                  job.temp = "1";
                  jobs.push(job);
              }
              counter = counter + 1; //CONTADOR QUE INCREMENTA 
              msg("EL NUMERO DE CONTADOR ES: " + counter)
          },
          error: function(error) {
              msg(error);
          }
      });
  } while (counter < limit); //CONDICION DE PARADA 
  //    while (json.length>0);  //CONDICION DE PARADA  tambien sirve se puede reemplazar si no esta el limit
  out["jobs"] = jobs;
  return out;
})();

/*

a veces aparece el json dandole a search

de copy as fecht sacamos:
 -url
 -encavezados
 -metodo pos-get

LA DIFERENCIA ENTRE GUET Y POST ES :
  -LO DEL REQUEST PAY LOAD
  -CASI TODOS LOS GET PAGINAN POR REQUEST URL
  -LOS POST PAGINAN POR LA VARIABLE DATA EN PAGE FILTER O EL CONTADOR


AGREGAR LA COOKIE AL HEADER DE FORMA MANUAL CUANDO TOCA, O CONSTRUIRLA
- COOKIE O TOKEM
-ESTA EN EL HTML O EN EL JSON SE LLAMA COOKIE O TOKEN Y AHI VA UN NUMERO.. POR LO GENERAL ESTA DENTRO DEL HTML
 SE TOMA EL NUMERO Y SE PEGA EN LOS ELEMENT EN EL BUSCADOR CTRL+F Y SE TOMA EL ELEMENTO DONDE ESTA


CUANDO NO VENGA UNA PROPIDAD QUE CONTIENE A LOS JOBS DEJARLO COMO RESPONSE O LO QUE VIENE COMO RESPUESTA DE LA FUNCION  DE LLAMADA

CON COPY PROTPERTY PATH
EL CONFIG CAMBIA TIENE 2 TRUE

1) COPI AS FECH 3 DATOS
2)COMENTAR EL DO WHILE
3)PEGAR URL HEADERS Y TIPO DE METODO

primero provamos el extrac en la primera pagina y luego se hace la paginacion
En post tenemos que llenar la variable data para que pagine, data es un json

EN EL JSON GET NO SE NECESITA DATA PORQUE EL PAYLOAD ESTA EN LA MISMA URL

descomentamos el tringify data

copiamos lo que hay en payload--> view source,,  y lo poenemos en data
*/


















// original
//EN ESTE CASO LOS JOBS SOLO APARECEN AL DARLE AL BOTON SEAARCH

(function() { 

    var jobs = []; 

    var out = {}; 

    var counter = 1;//VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 

    var limit = 0; 

    var json; 

  do { 

      var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"Town/City"},{"name":"zzreqWorkatHome","label":"Option to Work Remote"},{"name":"payGroupCode","label":"Job Function"},{"name":"zzreqJobType","label":"Job Type"},{"name":"typeOfFulltime","label":"Schedule"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"location","label":"Location"}]},"pagefilter":{"page":counter},"rl":"enUS"}; 

      $.ajax({ //ES NA PETICION AL SERVIDOR, EL DEBUELVE UNA ACCION JSON 

//ESTA URL LA SACAMOS DEL ENCABEZADO, AL INSPECCIONAR Y SE LLAMA: URL DE LA SOLICITUD (BUSCARLA EN INGLES) 

        url : "https://recruiting.adp.com/srccar/public/rest/1/115407/search/", 

        headers: { 

            "accept": "application/json, text/plain, */*",
            "accept-language": "es-ES,es;q=0.9",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"

           

          //TODO ESTE TEXTO DE ARRIBA ME SALE CUANDO LE DOY COPIAR COMO FECH SOBRE EL ARCHIVO JSON QUE CARGA 

           

       //   "Content-Type": "application/json;charset=UTF-8" 

        }, 

        type : 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 

        //data : JSON.stringify(data), // para usar el post descomentamos esta linea 
     // data : 'do=careersiteJobSearch&location_id=&vertical_id=&keyword=&pagesize=10&page='+out.passit.cont,

        dataType: "json", 

        async : false, 

        success : function(result){ 

          json = result.jobs; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 
          limit=result.pages; // esta es la cantidad de paginas que 

          //limit = result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 

          for(var i = 0; i<json.length; i++) { 

            var job = {}; 

            var elem = json[i]; 

            job.title = elem.ptitle;  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 

            job.location = elem.locationCity+","+elem.locationState;  //copiar ruta de acceso de la propieadd 

            job.url = elem.url; //armamos la url a partir de la que sale en la ventana, en la parte de las rutas

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
//    while (json.length>0);  //CONDICION DE PARADA  tambien sirve se puede reemplazar si no esta el limit

   

    out["jobs"]= jobs; 

    return out; 

  })(); 
  
  /*
  
  a veces aparece el json dandole a search

de copy as fecht sacamos:
   -url
   -encavezados
   -metodo pos-get

LA DIFERENCIA ENTRE GUET Y POST ES :
		-LO DEL REQUEST PAY LOAD
		-CASI TODOS LOS GET PAGINAN POR REQUEST URL
		-LOS POST PAGINAN POR LA VARIABLE DATA EN PAGE FILTER O EL CONTADOR


AGREGAR LA COOKIE AL HEADER DE FORMA MANUAL CUANDO TOCA, O CONSTRUIRLA
  - COOKIE O TOKEM
  -ESTA EN EL HTML O EN EL JSON SE LLAMA COOKIE O TOKEN Y AHI VA UN NUMERO.. POR LO GENERAL ESTA DENTRO DEL HTML
   SE TOMA EL NUMERO Y SE PEGA EN LOS ELEMENT EN EL BUSCADOR CTRL+F Y SE TOMA EL ELEMENTO DONDE ESTA


CUANDO NO VENGA UNA PROPIDAD QUE CONTIENE A LOS JOBS DEJARLO COMO RESPONSE O LO QUE VIENE COMO RESPUESTA DE LA FUNCION  DE LLAMADA

CON COPY PROTPERTY PATH
EL CONFIG CAMBIA TIENE 2 TRUE

1) COPI AS FECH 3 DATOS
2)COMENTAR EL DO WHILE
3)PEGAR URL HEADERS Y TIPO DE METODO

primero provamos el extrac en la primera pagina y luego se hace la paginacion
En post tenemos que llenar la variable data para que pagine, data es un json

EN EL JSON GET NO SE NECESITA DATA PORQUE EL PAYLOAD ESTA EN LA MISMA URL

descomentamos el tringify data

copiamos lo que hay en payload--> view source,,  y lo poenemos en data
*/
  
 

