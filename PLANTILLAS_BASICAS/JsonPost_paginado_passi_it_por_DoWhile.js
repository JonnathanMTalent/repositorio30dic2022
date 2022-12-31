//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "counterJobs":0,
        "limit":0
    }
    return out;
})()



//EXTRACT
//EN ESTE CASO LOS JOBS SOLO APARECEN AL DARLE AL BOTON SEAARCH

(function() {

    var jobs = [];
    var out = {};
    
    var json;
    var counterJobs = 0;
    out.pass_it = pass_it;
    //counter = out.pass_it.counter; //VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 
    
    //do {  // PONER ABAJO EL DATA QUE HAY EN PAYLOAD DANDO CLICK EN VIEWPARSED out.pass_it.counter
        var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"Town/City"},{"name":"zzreqWorkatHome","label":"Option to Work Remote"},{"name":"payGroupCode","label":"Job Function"},{"name":"zzreqJobType","label":"Job Type"},{"name":"typeOfFulltime","label":"Schedule"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"location","label":"Location"}]},"pagefilter":{"page":out.pass_it.counter},"rl":"enUS"};
        $.ajax({ 
            url: "https://poner la url del header aqui /",
            headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"

            },
            type: 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 
            data : JSON.stringify(data), // para usar el post descomentamos esta linea 
            // data : 'do=careersiteJobSearch&location_id=&vertical_id=&keyword=&pagesize=10&page='+out.passit.cont,
            dataType: "json",
            async: false,
            success: function(result) {

                json = result.jobs; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 
                 out.pass_it.limit = result.pages/4; // esta es la cantidad de paginas que tiene el jobsiteenel json
                //out.pass_it.limit =result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    var elem = json[i];
                    
                    
                    job.title = elem.title; //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 
                    job.location = elem.location; //copiar ruta de acceso de la propieadd 
                    job.url = elem.url; //armamos la url a partir de la que sale en la ventana, en la parte de las rutas
                    
                    
                    job.temp = "1";
                    jobs.push(job);
                }
                
                msg("EL NUMERO DE CONTADOR ES: " + out.pass_it.counter)
            },
            error: function(error) {
                msg(error);
            }
        });
    //} while (counter < 3); //CONDICION DE PARADA 
    //    while (json.length>0);  //CONDICION DE PARADA  tambien sirve se puede reemplazar si no esta el limit
    out["jobs"] = jobs;
    return out;
})();

// PAGINATION

(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 1;
    if(out.pass_it.limit > out.pass_it.counter){
        out.has_next_page = true;
    }else{
        out.has_next_page = false;
    }
    return out;
})();







// LA MISMA PLANTILLA COMENTADA

//infinity

// ACCIONES 1
(() => {
    var out = {};
    out.pass_it = {
        "counter":1,   // ACCION 1: VALIDAR COMO EMPIEZA LA PAGINACION EN LA DATA, O EN LA URL DEL JSON
        "counterJobs":0, // AQUI PUEDE PONER LAS PROPIEDADDES QUE QUIERA, CAMBIR EL NOMBRE SEGUN LO MAS INTUITIVO
        "limit":0       // PARA LLAMAR ESTA PROPIEDAD POR EJEMPLO SE USA ASI: out.pass_it.limit
    }
    return out;
  })()
  
  
  
  //EXTRACT
  //EN ESTE CASO LOS JOBS SOLO APARECEN AL DARLE AL BOTON SEAARCH, O NEXT, MOOORE
  
  //ACCIONES 7
  
  (function() {
  
    var jobs = [];
    var out = {};
    
    var json;
    var counterJobs = 0;
    out.pass_it = pass_it;
    //counter = out.pass_it.counter; //VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA o  en VISTA PREVIA del navegador, dandole a next para ver de cuanto en cuanto va la paginacion 
     // si va de 1 en 1 o de 30  en 30
    
    //do {  //ACCION1: PONER ABAJO EL DATA QUE HAY EN EL NAVEGADOR SECCION: CARGA UTIL  DANDO CLICK EN VER ORIGEN Y COPIANDO BIEN LO QUE SALE
           //ACCION2: AQUI EN LA DATA BUSCA EL NUMERO ENTERO Y LO REEMPLAZA POR  out.pass_it.counter  OJO SOLO EL NUMERO NADA MAS
        var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"Town/City"},{"name":"zzreqWorkatHome","label":"Option to Work Remote"},{"name":"payGroupCode","label":"Job Function"},{"name":"zzreqJobType","label":"Job Type"},{"name":"typeOfFulltime","label":"Schedule"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"location","label":"Location"}]},"pagefilter":{"page":out.pass_it.counter},"rl":"enUS"};
        $.ajax({ 
            url: "url que esta en ENCABEZADOS DEL NAVEGADOR : URL DE LA SOLICITUD", //ACCION3 PONER URL VERIFICAR QUE ESTE EN CODIGO DE ESTADO 200
            // ESTA URL ES LA URL DE LA PETICION, ES DIFERENTE A LA QUE SE PONE EN CONFIG QUE ES LA DEL  JOBSITE
            headers: { //ACCION 4 PONER HEADERS
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  
            },
            type: 'POST', 
            data : JSON.stringify(data), 
            dataType: "json",
            async: false,
            success: function(result) {
  
                json = result.jobs; // ACCION 5: POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data  VER EN VISTA PREVIA
                // CONDICION DE PARADA
                out.pass_it.limit = result.pages; //ACCION 6:  esta es la cantidad de paginas que tiene el jobsiteenel json, VER EN VISTA PREVIA, lo puede poner tambien por cantidad de jobs
                //out.pass_it.limit =result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    var elem = json[i];
                    
                    //ACCION 7SECCION PARA EXTRAER LA INFORMACION 
                    job.title = elem.title; //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 
                    job.location = elem.location; //copiar ruta de acceso de la propieadd 
                    job.url = elem.url; //armamos la url a partir de la que sale en la ventana, en la parte de las rutas
                    
                    
                    job.temp = "1";
                    jobs.push(job);
                }
                
                msg("EL NUMERO DE CONTADOR ES: " + out.pass_it.counter)
            },
            error: function(error) {
                msg(error);
            }
        });
    out["jobs"] = jobs;
    return out;
  })();
  
  // PAGINATION
   
  //ACCIONES 2
  (function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 1; // PONER SEGUN CORRESPONDA SI VA A PAGINAR DE 1 EN 1 O DE 30 EN 30
    if(out.pass_it.limit > out.pass_it.counter){  //PONER LA VALICION SEGUN CORRESPONDA mayor que por numero de pag,, menor que cuando es cantidad de jobs
        out.has_next_page = true;
    }else{
        out.has_next_page = false;
    }
    return out;
  })();
