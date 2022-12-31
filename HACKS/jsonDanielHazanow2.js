(function () {
    var jobs = [];
    var out = {};
    var json;
  
    if (!pass_it["cont"]) { //si no existe el passit lo declara
      out["pass_it"] = {
        "cont": 0,  //ACCION 1= establecemos el contador del passit segun inicie el contador en la pagina a indexar
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
      var data = "pg=" + out["pass_it"].cont; // Establecemos la variable data como la parte de la url que pasa de pagina
  
          $.ajax({
              url: 'https://www.prnhealthservices.com/jobs',       //colocamos la url sin la parte del query: ?                         
              headers: {  //sobre el archivo json  copy as fetch y borrar el sobrente
           
  
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,es-ES;q=0.7,es;q=0.6",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
  
                       
              },
              type: 'GET',     //Establecer el mismo metodo del archivo json trabajado                                
              data: data,
              async: false,
              success: function (result) {
                  msg("SUCCES");
                  json  = result;
                
                        msg(window.location.href);
                      // Convertir un string JS a un objeto iterable
                      var js_string 	     = json;                            //3 lineas convierten el resultado, el json o string en
                      var htmlObject       = document.createElement("div");     //un objeto iterable parseandolo a html
                      htmlObject.innerHTML = js_string    //aqui entramos en ese document creado
  
                      var html_jobs = htmlObject.querySelectorAll('li.clearfix.job'); //aqui va la caja contenedora del job
                        //var jobs = []; // Variable declarada en la segunda línea
  
                      for(var x in html_jobs){   //iteramos sobre la linea de los node list de arriba
                        
                        if(typeof html_jobs[x] =="function") continue;
                          if(typeof html_jobs[x] =="number") continue;
  
                              var job  = {};
                              var elem = html_jobs[x];
  
                              var title_p1    = elem.querySelector("div.occupation");//.textContent.trim();
                              var title_p2 = elem.querySelector("div.specialty"); //.textContent.trim();
  
                              var title = "";
                              var array_title = Array();   // Este array se genero para unir luego el título en sus dos componentes 
  
                              if(title_p1 !== null) array_title.push(title_p1.innerText);
                              if(title_p2 !== null) array_title.push(title_p2.innerText);
  
                              if(array_title.length) title = array_title.join(" "); //join me concatena las dos partes del titulo
                                    //en este caso es un espacio el que los concatena
                      job.title = title;
                        
                        
                        job.location = elem.querySelector("a").textContent.trim();
                        
                              job.url      = elem.querySelector("a").href.trim();
                        
  
                        
  
                                job.temp = "DEC-2021";
                                
                                jobs.push(job);
        }
        out["pass_it"].cont++;
      },
      error: function (error) {
        msg(error);
      }
    });
  
    out["jobs"] = jobs;
    out["pass_it"]["jobs"] += jobs.length;
    return out;
  })();
  
  /*
EJERCICIO JSON:

jobsite: https://www.prnhealthservices.com/jobs?pg=0


PASOS: 

establecemos la url del jobsite a partir del inicio del contador, en este caso es cero 
1) Identificar el query, el símbolo de ? en la url que permite ir a partes determinadas del servidor 
2) identificar desde que indice inicia el conteo de las paginas y establecerla en el contador del passit en el extract 
4) Para visualizar el json html vamos a la parte de Network--> Doc (en crhome), también puede estar en Network -->Fetch/xhr 
5) luego ir al Header y dar click sobre el archivo que tiene el índice de inicio, para verlo puede ser necesario hacer click en  
    el boton next o more de la pagina. 
    $ la url debe que hay en el header EN REQUEST_URL debe ser igual a la que me aparece en el buscador arriba.
6) verificamos como página si de 1 en 1 de 10 en 10, etc. Esto dando click en next y verificando el número de página resultante.
EN EL PREVIEW TRAE LA MISMA PAGINA, EN EL RESPONSE EL HTML 
7) verificar en la pestaña "Response" si me trae un elemento del dom, esto para ver si el contenido no está basado en span y en tal caso 
   no se podría indexar de esa forma, explícitamente verificamos que exista uno de esos jobs en el response. También verificar un id de un link. 
   Todo esto nos permite asegurarnos de no perder el tiempo. TOMAR ELEMENTOS DE LA PAGINA COMO TAL, NO DE LOS ELEMENT
8) LO QUE QUEREMOS ES QUE EL SERVIDOR NOS DEBUELVA EL OBJETO DOM COMPLETO 
9) El DESactivate jquery debe estar en false en las config, ya que estamos usando Ajax. NECESITAMOS URAR JQUERY
 NORMALMENTE EN LOS HEADERS DEL AJAX NORMAL MENTE SE USA EL ACCEPT Y EL CONTENT TYPE
10) Colocamos la url en la posición quitándole la sección que corresponde al query del contador. 
11) En la parte de los Headers colocamos los atributos, sobre el archivo json secundario y copy as fetch borramos el sobrante 
12) Identificamos el tipo de método Get o Pos e indicamos 
13) var html_jobs = htmlObject.querySelectorAll(''); //aqui va la caja contenedora del job 
14)asignamos los selectores del título, locación, url, etc. 
15)verificamos la correcta extracción de los datos en el test step 

*/