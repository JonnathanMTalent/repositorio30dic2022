//https://recruiting.adp.com/srccar/public/nghome.guid?c=2167807&d=ExternalCareerSite


(() => {
    var out = {};
    out.pass_it = {
        "counter":1,
        "counterJobs":0, // AQUI PUEDE PONER LAS PROPIEDADDES QUE QUIERA, CAMBIR EL NOMBRE SEGUN LO MAS INTUITIVO
        "limit":0       // PARA LLAMAR ESTA PROPIEDAD POR EJEMPLO SE USA ASI: out.pass_it.limit
    }
    return out;
  })()




(function() {

    var jobs = [];
    var out = {};
    
    var json;
    var counterJobs = 0;
    out.pass_it = pass_it;
    //counter = out.pass_it.counter; //VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 
    
    //do {  // PONER ABAJO EL DATA QUE HAY EN PAYLOAD DANDO CLICK EN VIEWPARSED
        var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"Town/City"},{"name":"zzreqWorkatHome","label":"Option to Work Remote"},{"name":"payGroupCode","label":"Job Function"},{"name":"zzreqJobType","label":"Job Type"},{"name":"typeOfFulltime","label":"Schedule"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"location","label":"Location"}]},"pagefilter":{"page":out.pass_it.counter},"rl":"enUS"};
        $.ajax({ 
            url: "https://recruiting.adp.com/srccar/public/rest/1/115407/search/",
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
                 out.pass_it.limit = result.pages; // esta es la cantidad de paginas que tiene el jobsiteenel json
                //out.pass_it.limit =result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    var elem = json[i];
                    
                    
                    job.title = elem.ptitle; //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 
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