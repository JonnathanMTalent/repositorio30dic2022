//https://hyperiongrp.wd3.myworkdayjobs.com/es/hyperion_external

(function() {
    var jobs = [];
    var out = {};
    var counter = 0;
    var seguir = true;
    var json;
    var json1;
    

    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it.hasOwnProperty("counter")) {
        out["pass_it"] = {
            stop_pag: 1, // USED TO PAGINATE
            counter: 0, // GET THE JOBS OBTAIN ON EACH ITERATION
        };
    } else {
        out["pass_it"] = pass_it;
    }


    //var Tken = '=';
    // do {

    //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
    var data = {
        "limit": 20,
        "offset": out.pass_it.counter, // out["pass_it"].cont,
        "appliedFacets": {},
        "searchText": ""
    };

    $.ajax({
        url: 'https://hyperiongrp.wd3.myworkdayjobs.com/wday/cxs/hyperiongrp/hyperion_external/jobs', //url del header donde esta el json
        headers: {
            "accept": "application/json",
            "accept-language": "es",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        type: 'POST', //TIPO DE PETICION
        data: JSON.stringify(data), //LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
        dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
        async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
        success: function(result) { //FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
            // out["expected_jobs"] = result.totalCount;
            json = result.jobPostings; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
            //     var stop_pag = json;

            out.pass_it.stop_pag = json.length;
            msg("mensaje 1 " + out.pass_it.stop_pag);
            /*
            if (stop_pag.length < 20) {
                seguir = false;
                msg(`---> FINAL DE PAGINACIÓN`);
            }
            */
            //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
            for (var i in json) {
                var job = {};

                job.title = json[i].title;
               job.reqid = json[i].bulletFields[0];
               job.url = "https://hyperiongrp.wd3.myworkdayjobs.com/es/hyperion_external" + json[i].externalPath;//url de la barra de ruta no es la del header
               job.location = json[i].locationsText;
               job.location = job.location.split("-").reverse().join(", ");
    //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
   
            job.location = job.location+", England"
            job.location = job.location.replace("remote","").trim();
            job.location = job.location.replace("Home - UK- England","london").trim();
            job.location = job.location.replace("Redhill - Betchworth House","redhill").trim();
            job.location = job.location.replace("- 21 Rue Glesener","").trim();  
            job.location = job.location.replace("Betchworth House, Redhill","redhill").trim();
            job.location = job.location.replace("England, UK, Home","redhill").trim();
   
   
   
   //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
   
   
               job.source_location = json[i].locationsText;
  //             job.dateposted_raw = json[i].postedOn;
 //              job.dateposted_raw = job.dateposted_raw;
 //              job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 1, 2);
                //job.logo = json[i].;
                //job.source_apply_email = json[i].;
                //job.source_empname = json[i].;
                //job.source_jobtype = json[i].;
                //job.source_salary = json[i].;
                //job.html= json[i].;
                //job.jobdesc = job.html;;

                job.temp = 1;



               // if (job.location.indexOf("Ubicaciones") > -1) {
                                //    usamos el mismo  external path que el de la url del jobdesc externo, pero esta parte inicial de la url es la del header del json de la descripcion.
                   //esta url esta en una variaable para que cambie en cada job pues es la descripcion
                    var urlPeticion = "https://hyperiongrp.wd3.myworkdayjobs.com/wday/cxs/hyperiongrp/hyperion_external" + json[i].externalPath;
                    $.ajax({
                        url: urlPeticion,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        type: 'GET',
                        // data : JSON.stringify(data),
                        dataType: "json",
                        async: false,
                        success: function(result) {
                            //msg(result)
                            job.temp = 1;
                            
                            json1 = result.jobPostingInfo;
                            job.location = json1.location;
    //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
   
            job.location = job.location+", England"
            job.location = job.location.replace("remote","").trim();
            job.location = job.location.replace("Home - UK- England","london").trim();
            job.location = job.location.replace("Redhill - Betchworth House","redhill").trim();
            job.location = job.location.replace("- 21 Rue Glesener","").trim();  
            job.location = job.location.replace("Betchworth House, Redhill","redhill").trim();
            job.location = job.location.replace("England, UK, Home","redhill").trim();
   
   
   
   //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                            var date = json1.startDate;
                            date = date.split("-");
                            job.dateposted_raw =date[1]+"/"+date[2]+"/"+date[0];
                            //job.dateposted_raw =json1.startDate;
                            msg(job.dateposted_raw+"***viene de la descripcion");
                            jobs.push(job);

                            var temp = json1.additionalLocations
                            temp.map(location => {
                                var jobx = {};
                                jobx = {
                                    ...job
                                }
                                 
                                jobx.location = location;
                                jobx.location = jobx.location.split("-").reverse().join(", ");
                                jobx.location = jobx.location+", England"
                                jobx.location = jobx.location.replace("remote","").trim();
                                jobx.location = jobx.location.replace("remote","").trim();
                                jobx.location = jobx.location.replace("Home - UK- England","london").trim();
                                jobx.location = jobx.location.replace("Redhill - Betchworth House","redhill").trim();
                                jobx.location = jobx.location.replace("- 21 Rue Glesener","").trim();
                                jobx.location = jobx.location.replace("Betchworth House, Redhill","redhill","").trim();
                                jobx.location = jobx.location.replace("England, UK, Home","redhill","").trim();
                                
                                jobs.push(jobx);
                            })



                        },
                        error: function(error) {
                            msg(error);
                        }
                    });
                //} else {
                 //   jobs.push(job);
               // }

            }
            //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL

            msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${out.pass_it.counter}`);
        },
        error: function(error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
            msg(error);
        }
    });
    // } while (seguir); //EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
    out["jobs"] = jobs;
    return out;
})();

/*
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    } else {
        var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]
    };
    var date_Now = new Date(); //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g) > -1) {
        nDays = 0;
    }
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) {
        nDays = 1;
    }
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) {
        nDays = numberDWMY;
    }
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) {
        nDays = numberDWMY * 7;
    }
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) {
        nDays = numberDWMY * 30;
    }
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) {
        nDays = numberDWMY * 365;
    }
    var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date); //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd = datePosted.getDate(); //devuelve el numero del dia del mes.
    var mm = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    dateJob = mm + '/' + dd + '/' + yyyy;
    return dateJob;
}*/


//