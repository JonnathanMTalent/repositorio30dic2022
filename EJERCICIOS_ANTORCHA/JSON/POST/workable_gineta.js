//https://apply.workable.com/ginetta/

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
    
    //do {  // PONER ABAJO EL DATA QUE HAY EN PAYLOAD DANDO CLICK EN VIEWPARSED out.pass_it.counterJobs counterJobs
        var data = {"query":"","location":[],"department":[],"worktype":[],"remote":[]};
        $.ajax({ 
            url: "https://apply.workable.com/api/v3/accounts/ginetta/jobs",
            headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en",
    "content-type": "application/json",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-datadog-origin": "rum",
    "x-datadog-parent-id": "7399490260469995300",
    "x-datadog-sampled": "1",
    "x-datadog-sampling-priority": "1",
    "x-datadog-trace-id": "216667068932739794"

            },
            type: 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 
            data : JSON.stringify(data), // para usar el post descomentamos esta linea 
            // data : 'do=careersiteJobSearch&location_id=&vertical_id=&keyword=&pagesize=10&page='+out.passit.cont,
            dataType: "json",
            async: false,
            success: function(result) {

                json = result.results; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 
                 out.pass_it.limit = result.total; // esta es la cantidad de paginas que tiene el jobsiteenel json
                //out.pass_it.limit =result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    var elem = json[i];
                    
                    
                    job.title = elem.title; //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 
                    job.reqid = elem.id; //copiar ruta de acceso de la propieadd 
                    job.url = 'https://apply.workable.com/ginetta/j/'+elem.id; //armamos la url a partir de la que sale en la ventana, en la parte de las rutas
                    
                    out.pass_it.counterJobs+=1;
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
    if(out.pass_it.limit > out.pass_it.counterJobs){
        out.has_next_page = true;
    }else{
        out.has_next_page = false;
    }
    return out;
})();