//   JOBSITE:       https://hire.myavionte.com/app/careers/#/jobs/EtnB8FiDM4U/MoaInVnOAMg//

// EJEMPLO DE INLAN_1

//BEFORE EXTRACT
// Accion1: linea 21   ;  Accion2: linea 42 ; Accion_3: linea 51

(function () {
    let out = {};//declara el objeto out donde guarda los atributos del pass_it
    if (typeof pass_it == "undefined") pass_it = {};//declara el pass it si este no existia
    if (!pass_it["cont"]) { //VERIFICA SI EXISTE EL PASSIT EL CONTADOR SI NO LO CREA DE LA SIGUIENTE FOMRA
      out["pass_it"] = { //en el objeto out en la llave pass_it guarda los pares cont, totalJobs, array jobs[]
        cont: 0, //INDICA LA POSICION DEL ARRAY
        totalJobs: 0, //INDICA EL TOTAL DE JOBS QUE VAMOS A EXTRAER, COMO UN LIMITE
        jobs: []  // EL ARRAY DONDE SE GUARDAN LOS JOBS
      }
    }
    else {//si el pass_it ya existia lo actualiza
      out["pass_it"] = pass_it; // AQUI VALIDAMOS SI YA ESTA CREADO EL PASSIT ENTONCES SIMPLEMENTE LO IGUALA AL QUE YA EXISTIA. LO ESTAMOS DECLARANDO NUEVAMENTE
    }
    let container = Array.from(document.querySelectorAll('div[class="jobs-list"] > div:not(:first-child)')); // ACCION_1:  SE COLOCA EL SELECTOR DE LA LISTA DE JOBS ,,,Main job container AQUI SE GUARDAN LOS JOBS EN UN ARRAY
    //  ESTE SELECTOR DEL CODIGO DE LA LINEA ANTERIOR ES UN EJEMPLO DE CUANDO SE QUIERE EVITAR UN ELEMENTO DE UNA LISTA 
    msg(container.length);  //este mensaje simplemente muestra en la consola la cantidad de jobs extraidos
    if (out["pass_it"].totalJobs === 0) { //verifica si en el passit el totoal jobs es cero o no, si es cero es porque apenas empezo,, y hace todo hasta la linea 49
      let jobs = [];// This will contain all the extracted jobs
      for (let elem of container) {  //si pasa a este FOR es la primera vez que esta en esta pagina y guardara toda la info que haya en los jobs visibles
        let job = {};// creamos el objeto job para llenarlo con los datos dentro de este for mas abajo hasta el job.push(job)
        
        //AQUI ABAJO PONEMOS TODO LO QUE PODAMOS EXTRAER DEL JOBSITE ANTES DE ENTRAR A LOS JOBS O LA DESCRIPCION:
        
        job.title = elem.querySelector('div[class*="job-item-job-title"]').textContent.trim();
        job.source_location = elem.querySelector('div[class*="job-item-location"]').textContent.trim(); // ESTE SE TRAE TAL CUAL DE LA PAGINA SIN MODIFICACION
        job.location = job.source_location; // EN ESTE CASO NO SE MODIFICO PERO AQUI SE DEBE ORGANIZAR EN EL FORMATO MM/DD/AAAA FORMATO AMERICANO
        var dateAux = new Date(elem.querySelector('div[class*="job-item-post-date"]').textContent.trim()); // ESTE ES UN HACK PARA LA FECHA, ORGANIZAR DE UNA VEZ. Date es una funcion predeterminada de javaScript
        job.dateposted_raw = dateAux.toLocaleDateString("en-US");  // HACK PARA LA FECHA ORGANIZADA EN EL FORMATO MM/DD/AAAA FORMATO AMERICANO
        job.temp = 96; // SE PUEDE CAMBIAR EL TEMP A LO QUE UNO QUIERA . EL TEMP DEBE HACER PARTE DEL JOB, DE AQUI VA A LLEGAR AL EXTRACT
        jobs.push(job); // AQUI LLENAMOS EL ARRAY JOBS[] DE LA LINEA 15 CON CADA OBJETO JOB DE LA LINEA 27: let job = {}; EL CUAL ACABAMOS DE ALIMENTAR DESDE LA LINEA 31
      }// AQUI YA TERMINAMOS DE EXTRAER LA INFO QUE MAS SE PUDO DE LA PAGINA DEL JOBSITE ANTES DE PASAR A LA PAGINA DE DESCRIPCION
      
      out["pass_it"].jobs = jobs; // EL JOBS DEL PASS_IT DE LA LINEA 15 LO IGUALAMOS CON LA VARIABLE JOBS DE LA LINEA 25
      out["pass_it"].totalJobs = jobs.length;  //EL TOTAL JOBS DEL PASS_IT SE IGUALA A LA LONGITUD DE EL JOBS DE LA LINEA 25 ESTA LINEA ES EL CONDICIONAL DEL IF DE LA LINEA 11
      //Accion_2: comprobarlo con la siguiente linea:  document.querySelectorAll('selector click para ir al descriptin del job')[0].click();
      //como este container es igual al de la linea 21 se quita el query selector si no hay que entrar mas abajo con mas selectores asi: 
      //container[out["pass_it"].cont].click() es igual a: container[i].click() donde i es la posicion del array en el pass_it 
      container[out["pass_it"].cont].click(); // ACCION_2 :  AQUI DAMOS CLICK AL JOB PARA IR A LA DESCRIPCION puede ser tambien el la linea de abajo comentada:
      //container[out["pass_it"].cont].querySelector('selector click para ir al descriptin del job').click();//Accion_2: AQUI DAMOS CLICK AL JOB PARA IR A LA DESCRIPCION 
      //el selector de arriba lo usamos si necesitamos usar etiquetas adicionales a las de la linea 21 del container principal, si no se de ja la de la linea 45
      msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title); // aqui sacamos el titulo del job que esta en la posicion del cont por consola
    } //hasta aqui hace cosas en la primera iteracion 
    else { // esto es lo que hace de la segunda iteracion en adelante pasa directamente a hacer click hacia cada descripcion porque ya extrajo los datos del jobsite
      //Accion_3: verificar cual de las siguientes dos lineas es la que aplica
      container[out["pass_it"].cont].click(); ////Accion_3:este se pone igual al de la linea 42
      //container[out["pass_it"].cont].querySelector('selector click para ir al descriptin del job').click();//Accion_3
      msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);// aqui sacamos el titulo del job que esta en la posicion del cont por consola
    }
    out.waitFor = 'div[class="job-description"] > span:nth-child(2)'; //aqui generamos la espara para los selectores de la descripcion, podemos poner mas si es necesario
    //esta espera permite que el extract no inicie hasta que aparezca la info del description y asi evitar errores
    return out; // retorna el objeto out de la linea 9 el cual contiene toda la info del pass_it
  })();