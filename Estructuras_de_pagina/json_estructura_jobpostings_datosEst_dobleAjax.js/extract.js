//https://karriere.kemna.de/stellenangebote.html#

(function() {

    var jobs = [];

    var out = {};

    var counter = 1; //VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 

    var limit = 0;

    var json;

    //en esta variable data tengo que poner la variable counter al final en el filter 

    //do {

        var data = {"key":"7146879a173c42d5755467f43e943f030e251cf3","channel":0,"locale":"de","sort":{"by":"modifiedOn","order":"desc"},"origin":"https://karriere.kemna.de/stellenangebote.html#","page":{"num":1000,"offset":0},"filter":{}}

        $.ajax({ //ES NA PETICION AL SERVIDOR, EL DEBUELVE UNA ACCION JSON 

            //ESTA URL LA SACAMOS DEL ENCABEZADO, AL INSPECCIONAR Y SE LLAMA: URL DE LA SOLICITUD (BUSCARLA EN INGLES) 

            url: "https://jobs.b-ite.com/api/v1/postings/search",

            headers: {

   "accept": "*/*",
   "accept-language": "es-ES,es;q=0.9",
   "bite-jobsapi-client": "v5-20220302-bdf39ed",
   "content-type": "application/json;charset=UTF-8",
   "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
   "sec-ch-ua-mobile": "?0",
   "sec-ch-ua-platform": "\"Windows\"",
   "sec-fetch-dest": "empty",
   "sec-fetch-mode": "cors",
   "sec-fetch-site": "cross-site"



                //TODO ESTE TEXTO DE ARRIBA ME SALE CUANDO LE DOY COPIAR COMO FECH SOBRE EL ARCHIVO JSON QUE CARGA 



                //   "Content-Type": "application/json;charset=UTF-8" 

            },

            type: 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 

            data: JSON.stringify(data),

            dataType: "json",

            async: false,

            success: function(result) {

                json = result.jobPostings; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 

                limit = result.page.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 

                for (var i = 0; i < json.length; i++) {

                    var job = {};

                    var elem = json[i];

                    job.title = elem.title; //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 

                    job.location = elem.jobSite+", DE"; //copiar ruta de acceso de la propieadd 

                   job.url = elem.url;

                    //job.id=elem.id 

                    //job.url = elem.positionOfUrl;                     

                     var dto= elem.startsOn
                     var date=dto.split("T").shift().split("-");
                   var dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
                   job.dateposted_raw=dateposted_raw;
                    //job.dateclosed_raw = elem.positionOfDateClosed; 

                    //job.source_jobtype = elem.positionOfJobtype; 

                    //job.source_salary = elem.positionOfSalary;          

                    //job.source_empname = elem.positionOfEmpname; 

                    //job.logo = elem.positionOfLogo; 

                    //job.source_apply_email = elem.positionOfEmail; 



                    job.temp = "1";
                                            //poner después del temp
                       $.ajax({
                           //poner acá la URL
                           url: job.url, //88888888888888888888888888888888888,
                           headers: {
                               //poner acá los headers
                               "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                               "Accept": "*/*",
                               "Accept-Language": "en",
                               "Content-Type": "application/vnd.oracle.adf.resourceitem+json;charset=utf-8",
                               "Ora-Irc-Language": "en",
                               "Sec-Fetch-Dest": "empty",
                               "Sec-Fetch-Mode": "cors",
                               "Sec-Fetch-Site": "same-origin"
                           },
                           type: 'GET',
                           //poner acá el tipo de peticion JSON, HTML
                           dataType: "html",
                           async: false,
                           success: function(resultD) {


                               //poner acá las variable que se van a extraer de la descripcion
                               jsonDesc = resultD
                               // msg(jsonDesc)

                               // var selector = 'div[class="position-job-description"]';
                               // var remove_selectors = ['img', 'video', 'button', 'input', 'style', 'javascript', 'script'];
                               var div = document.createElement("div");

                               div.innerHTML = jsonDesc;

                               // msg(div.innerHTML)

                               if (div.querySelector('script[type="application/ld+json"]')) {
                                   // Extract text on the script
                                   var html = div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g, ' ').replace(/\@/gi, "");
                                   //convert text to json
                                   var json = JSON.parse(html);
                                   //ORIGINAL: var date=json.graph[1].datePublished.split("T").shift().split("-");
                                   var date = json.datePosted.split("T").shift().split("-");
                                   job.dateposted_raw = date[1] + "/" + date[2] + "/" + date[0];
                                   var jobdesc = json.description;
                                   jobdesc = cleanHTML(jobdesc)
                                   job.html = jobdesc;
                                   // msg(job.html)
                                   job.jobdesc = jobdesc;
                                   msg('desc: ' + job.jobdesc)
                                   if (json.employmentType) {
                                       job.source_jobtype = json.employmentType;
                                   }

                               }



                               // job.jobdesc = cleanHTML(job.jobdesc);


                           },
                           error: function(error) {
                               msg(error);
                           }
                       });

                    jobs.push(job);

                }

                counter = counter + 1; //CONTADOR QUE INCREMENTA 

                msg("EL NUMERO DE CONTADOR ES: " + counter)

            },

            error: function(error) {

                msg(error);

            }

        });

  //  } while (counter < limit); //CONDICION DE PARADA 



    out["jobs"] = jobs;

    return out;

})();

//funciones de descripcion
function removeTextBefore(html, text, flag) {
   var newHtml = html;
   if (newHtml.search(text) > -1) {
       newHtml = newHtml.split(text).pop();
       if (!flag) {
           newHtml = "<h3>" + text + "</h3>" + newHtml;
       }
   }
   return newHtml;
}

function removeTextAfter(html, text, flag) {
   var newHtml = html;
   if (newHtml.search(text) > -1) {
       newHtml = newHtml.split(text).shift();
       if (!flag) {
           newHtml = newHtml + "<p>" + text + "</p>";
       }
   }
   return newHtml;
}