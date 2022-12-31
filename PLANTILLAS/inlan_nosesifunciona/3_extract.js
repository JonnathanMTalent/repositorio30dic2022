




/* METODO INLAN  
// EXTRACT
// ACCION_1: LINEA 14 ; ;ACCION_2: LINEA 54 ;ACCION_3: LINEA 59 ; ACCION_4: LINEA 21



*/
(function () {
    var out = {}; //SE DECLARA EL  OBJETO OUT QUE SE VA A RETORNAR AL FINAL 
    var jobs = []; //SE DECLARA EL ARRAY JOBS
    out["pass_it"] = pass_it; //AQUI NO SE VALIDA EL PASS_IT , SOLO SE INSTANCIA. Y SE IGUALA AL PASS_IT QUE VIENE DEL BEFORE EXTRACT
    var job = out["pass_it"].jobs[out["pass_it"].cont]; // SE HACE ESTE JOB IGUAL AL JOB QUE HAY EN EL ARRAY DE JOBS EN LA POSICION DEL CONTADOR CONT
    //ESTE TRAE LOS ATRIBUTOS QUE PUDO EXTRAER DESDE EL BEFORE EXTRACT, EL TEMP , TITULO, ETC MENOS LA URL YA QUE EL METODO INLAN SE TRATA DE ESO
    var full_html = document.querySelector('div[class="job-description"] > span:nth-child(2)'); //ACCION_1: AQUI GUARDAMOS EL SELECOTOR DE LA DESCRIPCION DEL JOB,
    // DEBE TRER 1 SOLO ELEMENTO
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) { //NOS ASEGURAMOS DE QUE NO FALLE: SI.. SI EXISTE EL SELECTOR DE LA DESCRIPCION, HACE LO SIGUIENTE:
      //USAMOS full_html.querySelector('')...  si los elementos estan dentro del selector de la descripcion en linea 14 si esta por fuera usamos: document.querySelector('')...
      //ACCION_2: AQUI PONEMOS TODO LO QUE NO PUDIMOS EXTRAER DEL JOBSITE INICIAL Y TOCA SACAR DE LA DESCRIPCION DEL JOB..OBLIGADO LA URL.
      
      job.url = document.querySelector('div[class="job-url"] a').href.trim();  //PROBAR SI LA URL QUE ARMAMOS SI FUNCIONA
      job.reqid = job.url.split('=').pop().trim(); //divide esta url en un array dividiendo lo con el =  luego usa pop que quita el ultimo elemento y lo retorna y luego lo limpia con trim
      
      
      //LA SIGUIENTE FUNCION HACE UNA LIMPIEZA 
      for (const a of full_html.querySelectorAll('p, span, li')) {
        if (a.textContent.search(/@|http|www./ig) > -1) {
          a.remove();
        }
      }
      
      
      
      
      //AQUI PODEMOS AGREGAR EN LA SIGUIENTE LINEA EL SELECTOR DE ALGO QUE QUERAMOS BORRAR 
      var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
      if (remove_selectors.length > 0) { //SI EXISTE AL MENOS UN ELEMENTO DE REMOVE SELECTOR PASA A 
        remove_selectors.forEach(remove_selector => { //PARA CADA ELEMENTO DEL ARRAY REMOVE_SELECTORS
          for (const a of full_html.querySelectorAll(remove_selector)) { //BUSCA EN EL FULL_HTML QUE ES LA DESCRIPCION DE LA LINEA 14 LOS ELEMENTOS DE REMOVE...
            a.remove(); // Y LOS ELIMINA
          }
        });
      }
      // AQUI AGREGAMOS LAS LINEAS DE LIMPIEZA DEL DESCRIPTION ADICIONALES:
      
      //ESTE JOB FUE DECLARADO EN LA LINEA 12 IGUAL AL JOB QUE HAY EN EL ARRAY DE JOBS EN LA POSICION DEL CONTADOR CONT
      job.html = full_html.innerHTML.trim(); //ELIMINAMOS ESPACIOS--- 
      //job.html = removeTextBefore(job.html, '', false);  //ELIMINAR TEXTO ANTES DE EL TEXTO TAL, SIN CONTENERLO
      job.html = removeTextAfter(job.html, /If this role interests you/, true); // ELIMINE EL TEXTO DESPUES DE EL TEXTO IF THIS ROLE.. CONTENIENDOLO
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div'); // crea un espacio en el html para guardar la info del job
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
    } //en la siguiente linea verificar que espera me sirve:
    window.history.back();  //le da click a la flecha regresar del navegador o browser se puede usar este o el de abajo no ambos 
    //document.querySelector('div[class="job-actions-back"] button').click(); // aqui escogeria el selector del boton de devolverse
    jobs.push(job); //en el array jobs de la linea 10 agregamos el objeto job que ya viene con la info del pass_it desde el before extract y la del extrac
    out["jobs"] = jobs; //luego en el array del pass it jobs agregamos el array de que ya esta lleno con los objetos job llenos de info del extrac y before extract
    out.waitFor = 'div[class="jobs-list"] > div:not(:first-child)'; // como nos devolvimos a la lista de jobs en la linea 55 agregamos la espera del selector principal
    return out; // retorna el objeto out
  })();
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
  
  
  