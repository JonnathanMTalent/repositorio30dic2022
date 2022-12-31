(function() { 

    var jobs = []; 

    var out = {}; 

    var counter = 0;//VERIFICAMOS COMO EMPIEZA E L CONTADOR EN EL JSON EN LA PAGINA el atrbuto start= 

    var limit = 0; 

    var json; 

   do { 

  //    var data = {}; 

      $.ajax({ //ES NA PETICION AL SERVIDOR, EL DEBUELVE UNA ACCION JSON 

//ESTA URL LA SACAMOS DEL ENCABEZADO, AL INSPECCIONAR Y SE LLAMA: URL DE LA SOLICITUD (BUSCARLA EN INGLES) 

        url : 'https://public-rest33.bullhornstaffing.com/rest-services/17EG1/search/JobOrder?start='+counter+'&query=(isOpen:1)%20AND%20(isDeleted:0)&fields=id,title,publishedCategory(id,name),address(city,state,countryName),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit&count=30&sort=-dateLastPublished&showTotalMatched=true', // 

         

        headers: { 

              "accept": "application/json, text/plain, */*", 

    "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6", 

    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"", 

    "sec-ch-ua-mobile": "?0", 

    "sec-ch-ua-platform": "\"Windows\"", 

    "sec-fetch-dest": "empty", 

    "sec-fetch-mode": "cors", 

    "sec-fetch-site": "cross-site" 

           

          //TODO ESTE TEXTO DE ARRIBA ME SALE CUANDO LE DOY COPIAR COMO FECH SOBRE EL ARCHIVO JSON QUE CARGA 

           

       //   "Content-Type": "application/json;charset=UTF-8" 

        }, 

        type : 'GET', //PONER EL METODO QUE APARECE AL DARLE SOBRE EL ARCHIVO CARGADO JSON PAGAR COMO FETH 

        //data : JSON.stringify(data), 

        dataType: "json", 

        async : false, 

        success : function(result){ 

          json = result.data; //POSCICION DE LOS JOBS  aqui va la ruta de donde estan todos los jobs en este caso data 

          limit = result.total; //LIMITE EXTRAIDO DEL JSON EN LA PAGINA COMO TOTAL DE JOBS 

          for(var i = 0; i<json.length; i++) { 

            var job = {}; 

            var elem = json[i]; 

            job.title = elem.title;  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO 

            job.location = elem.address.city+","+elem.address.state;  //copiar ruta de acceso de la propieadd 

            job.url = elem.id; 

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

    } while (counter < limit);  //CONDICION DE PARADA 

   

    out["jobs"]= jobs; 

    return out; 

  })(); 