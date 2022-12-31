//https://can01.safelinks.protection.outlook.com/GetUrlReputation

(function() { 

    var jobs = []; 

    var out = {}; 

    var counter = 0;//VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 

    var limit = 0; 

    var json; 

  // do { 

  //    var data = {}; 

      $.ajax({ //ES NA PETICION AL SERVIDOR, EL DEBUELVE UNA ACCION JSON 

//ESTA URL LA SACAMOS DEL ENCABEZADO, AL INSPECCIONAR Y SE LLAMA: URL DE LA SOLICITUD (BUSCARLA EN INGLES) 

        url : 'https://jb.skillsmapafrica.com/JobSearch/JobBasicSearch', 

        headers: { 

    "accept": "*/*", 

    "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6", 

    "content-type": "application/x-www-form-urlencoded; charset=UTF-8", 

    "dxcss": "/Images/favicon.ico,/Content/SkillsMapStyles.css,/Content/jqueryui/base/base.css,/Content/jqueryui/base/theme.css,/content/toastr.css,/Content/Jcrop.css,1_17,0_411,1_50,1_53,1_51,1_16,0_415,0_420,0_546,0_424,0_550,1_18,1_14,1_13,1_22,1_40,1_21,1_4,https://cdn.optinly.net/v1/styles.css", 

    "dxscript": "1_304,1_211,1_185,1_188,1_182,1_280,1_293,1_209,1_217,17_42,1_298,1_198,17_1,1_196,1_254,1_256,1_263,1_262,1_255,1_252,1_259,1_253,1_261,1_258,1_257,1_235,1_248,1_244,1_242,1_251,1_250,1_249,1_246,1_245,1_260,1_241,1_238,1_239,1_240,1_243,1_247,17_15,17_17,1_290,1_296,1_279,1_289,1_286,1_288,17_27,17_24,1_190,1_223,1_208,1_236,17_16,1_215", 

    "newrelic": "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjIxMTE2MjEiLCJhcCI6Ijg0MjIzNjAzIiwiaWQiOiJmZWU3ZmQzYTQzZDA1YjFjIiwidHIiOiIzZTcyODdmYzk5MDg5OTExODk3NDFhOTYyYjkzYzk0ZiIsInRpIjoxNjUxNTIxNTY5OTMzLCJ0ayI6IjMwNDU1NzAifX0=", 

    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"", 

    "sec-ch-ua-mobile": "?0", 

    "sec-ch-ua-platform": "\"Windows\"", 

    "sec-fetch-dest": "empty", 

    "sec-fetch-mode": "cors", 

    "sec-fetch-site": "same-origin", 

    "traceparent": "00-3e7287fc9908991189741a962b93c94f-fee7fd3a43d05b1c-01", 

    "tracestate": "3045570@nr=0-1-2111621-84223603-fee7fd3a43d05b1c----1651521569933", 

    "x-newrelic-id": "VgcGUFBRCRAIUFNQBAQOVg==", 

    "x-requested-with": "XMLHttpRequest" 

           

          //TODO ESTE TEXTO DE ARRIBA ME SALE CUANDO LE DOY COPIAR COMO FECH SOBRE EL ARCHIVO JSON QUE CARGA 

           

       //   "Content-Type": "application/json;charset=UTF-8" 

        }, 

        type : 'POST', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 

        //data : JSON.stringify(data), 

        dataType: "json", 

        async : false, 

        success : function(result){ 

          json = result; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 

          //limit = result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 

          for(var i = 0; i<json.length; i++) { 

            var job = {}; 

            var elem = json[i]; 

            job.title = elem.JobTitle;  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 

            job.location = elem.Location;  //copiar ruta de acceso de la propieadd 

            job.url = 'https://jb.skillsmapafrica.com/Job/Index/'+elem.Id; 

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

          counter = counter + 30;  //CONTADOR QUE INCREMENTA 

          msg("EL NUMERO DE CONTADOR ES: "+counter) 

        }, 

        error: function(error){ 

          msg(error); 

        } 

      }); 

   // } while (counter < limit);  //CONDICION DE PARADA 

   

    out["jobs"]= jobs; 

    return out; 

  })(); 

  //