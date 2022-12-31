/* -------------------------------------------------------------------------- */
/*                              BEFORE PAGINATION                             */
/* -------------------------------------------------------------------------- */
(() => {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        cont: 0,
        totalJobs: 0,
        jobs: []
      }
    }
    else {
      out["pass_it"] = pass_it;
    }
    /* 
    Selector donde estan todos los jobs, y lo convertirmos a Array.from, de esta forma solo nos queda en un vector 
     los selectore, asi evitamos validar si es una funcion u otro valor que no necesitamos
     A diferencia del la otra forma, primero capturamos todos los trabajos, y luego la descripcion, de esta forma se procesa
     mas rapido la informacion
     */
    let container = Array.from(document.querySelectorAll(""));
    //msg(container.length);
    if (out["pass_it"].totalJobs === 0) {
      let jobs = [];// This will contain all the extracted jobs
      for (let i = 0; i < container.length; i++) {
        let job = {};
        var elem = container[i];
        job.title = elem.querySelector('').textContent.trim();
        job.url = window.location.href.trim();
        job.source_location = elem.querySelector('')?.textContent.trim();
        job.location = job.source_location;
        job.reqid = elem.querySelector("").textContent.trim();
        job.source_jobtype = elem.querySelector("").textContent.trim();
        job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
      }
      out["pass_it"].jobs = jobs;
      out["pass_it"].totalJobs = jobs.length;
      container[out["pass_it"].cont].click();
    }
    else { // SI no encontro mas jobs que agregar al array, lo que hacemos es dale click para traer
      // podemos hacer click de dos formas:
  
     //Forma 1: Click con el selector general del job
      container[out["pass_it"].cont].click();
      //Forma 2: Click a un campo en espesifico, ejempli al selector del titulo
      //container[out["pass_it"].cont].querySelector("").click();
  
      //msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    }
    out.waitFor = ""; // Espera por si es necesaria, es caso de no usarlo eliminarlo
    return out;
  })();
  /* -------------------------------------------------------------------------- */
  /*                                   EXTRACT                                  */
  /* -------------------------------------------------------------------------- */
  (function () {
    var out = {};
    var jobs = [];
    var selector = "";
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont]; // Creamos una copia del job que se esta procesando en ese momento, asi nos evitamos asignar de nuevo los valores
    //var remove_selectors = ["a","script","style","input","button"];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
      job.html = full_html.innerHTML.trim();
      var emailRegex = /[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}/i;
      if (job.html.search(emailRegex) > -1) job.source_apply_email = job.html.match(emailRegex)[0].trim();
      job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|https?:\/\/\S+|loading.?.?.?/gi, "");
      //job.html = removeTextBefore(job.html, 'Descrição', false);
      job.html = removeTextAfter(job.html, ' Apply today', true);
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
    }
    else {// Para evitar error Asignamos vacio el resto de datos, con solo asignar el del titulo y url estos quedan para que el sistema no los suba
      job.title += " => Invalid job";
      job.url = "";
      job.html = "";
      job.jobdesc = "";
    }
    window.location.href = ""; //Si no tenemos paginacion podemos asignar el link para que se devuelva o por su defecto usar ==> window.history.back();
    jobs.push(job);
    out["jobs"] = jobs;
    out.waitFor = "";
    return out;
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }
    }
    return newHtml;
  }
  /* -------------------------------------------------------------------------- */
  /*                                 PAGINACION                                 */
  /* -------------------------------------------------------------------------- */
  (function () { ///---> 
    var out = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) { // Sumamos el cotador de los jobs, para sabe cual es el que sigue en caso la condicion no se cumpla iria al else dado que ya termino de recorrer el vector
      out["pass_it"].nextPage = false;
      out["pass_it"].cont += 1;
      out["'has_next_page'"] = true;
      msg("Another Job");
    }
    // En caso de que el inlan sea por paginacion seleccionamos el selector paginamos normal con la excepcion que reiniamos nuestro contador y cantidad de jobs
    // si el caso no tiene paginacion, dentro del else nos basta con poner  ⟢ ⊱⊱ ⟢ out["has_next_page"] = false;
    else { 
      var next_page_selector = ""; //selector to identify the next button
      var clickable_elem = document.querySelector(next_page_selector);
      if (!clickable_elem) {
        out["has_next_page"] = false;
      } else {
        out["pass_it"].cont = 0;
        out["pass_it"].totalJobs = 0;
        clickable_elem.click();
        out["has_next_page"] = true;
      }
    }
    msg(out["pass_it"].cont);
    out.wait = true;
    return out;
  })();
  
  
  //INf OPC
  (function () {
    var out = {};
    out["pass_it"] = {
      cont: 0,
      totalJobs: 0,
      jobs: []
    }
    return out;
  })();