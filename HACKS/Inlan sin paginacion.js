//1.infinity
*****************************************************************************
(function() {
	var out = {};
  	  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      cont: 0,
      totalJobs: 0,
      cont_page:1,
      jobs: []
    }
  }
  else {
    out["pass_it"] = pass_it;
  }
    out.waitFor = 'div#offre.row';
    return out;
})();
*******************************************************************************
//2.Before EXTRACT
*******************************************************************************
(function () {
  let out = {};
  out["pass_it"] = pass_it;
  let container = Array.from(document.querySelectorAll('')); // Main job container(Selector job)
  //msg(container.length);
  if (out["pass_it"].totalJobs === 0) {
    let jobs = [];// This will contain all the extracted jobs
    for (let elem of container) {
      let job = {};
       job.title = elem.querySelector('').textContent.trim();
      //job.url = window.location.href;// Se puede usar en el before extrac o extrac(pero dejar solo uno) si presenta problemas comentar 
      job.source_location = elem.querySelector('').textContent.trim();
      job.location = elem.querySelector('').textContent.trim();
      job.reqid = elem.querySelector('').textContent.trim();
      //var dateAux = new Date(elem.querySelector('div[class*="job-item-post-date"]').textContent.trim());
      //job.dateposted_raw = dateAux.toLocaleDateString("en-US");*/
      var dateAux = new Date(elem.querySelector('div[class*="job-item-post-date"]').textContent.trim());
      job.dateposted_raw = dateAux.toLocaleDateString("en-US");*/
      job.temp = 96;
      jobs.push(job);
    }
    out["pass_it"].jobs = jobs;// Se guardan los jons
    out["pass_it"].totalJobs = jobs.length; // La cantidad de los jobs que estan en el jobsite
    container[out["pass_it"].cont].querySelector('').click();//Se le hace un queryselector cuando hay un boton para ir a la descripcion en caso contrario solo se deja el punto click
    //msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
  }
  else {
    container[out["pass_it"].cont].querySelector('').click();//Se le hace un queryselector cuando hay un boton para ir a la descripcion en caso contrario solo se deja el punto click
   // msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
  }
  //out.waitFor = 'div#offre.row';// Selector de la descripcion (solo aplica cuando no trae la descripcion )(actua como una espera before jobdescription)
  //out.html=true;
  return out;
})();
********************************************************************************
//3.EXTRACT(DESCRIPCION)
********************************************************************************
(function () {
  var out = {};
  var jobs = [];
  var selector = ''; //selector descripcion
  out["pass_it"] = pass_it;
  var job = out["pass_it"].jobs[out["pass_it"].cont];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
  if (typeof msg == "undefined") msg = console.log;
  if (full_html) {
    job.url = window.location.href;Se puede usar en el before extrac o extrac(pero dejar solo uno) si presenta problemas comentar 
    //job.reqid = job.url.split('=').pop().trim();
    for (const a of full_html.querySelectorAll('p, span, li')) {
      if (a.textContent.search(/@|http|www./ig) > -1) {
        a.remove();
      }
    }
    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
    if (remove_selectors.length > 0) {
      remove_selectors.forEach(remove_selector => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }
    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, '', false);
    //job.html = removeTextAfter(job.html, /If this role interests you/, true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
  }
  window.history.back();// Sirve para devolverme al jobsite

  //window.location.href = "poner jobsite";// en caso de que el window.history.back no sirva- se descomenta,esta y se pone el jobsite el cual lo que va hacer es buscar y devolverse al mismo jobsite
  //document.querySelector('div[class="job-actions-back"] button').click();
  //document.querySelector('input[id$="VacancySearchButton"]').click();
  jobs.push(job);
  out["jobs"] = jobs;
  out.html=true;
  //out.waitFor = '#Description > div';
  return out;
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
*******************************************************************************
//4.Paginacion(No paginacion)

(function () {
  var out = {};
  out["pass_it"] = pass_it;
  //var selector = ''; //(selector next page) si hay paginacion descomentar linea 4 y abajo desde la linea 12 hasta la 25, para poder aplicar la paginacion
  if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
    out["pass_it"].cont += 1;
    out["has_next_page"] = true;
  }
  //stop condition
  else {
    out["has_next_page"] = false;
    // out["pass_it"].cont_page += 1;
    //     var all_elems = document.querySelectorAll(selector);
    //     [].forEach.call(all_elems, function(elemento) {
    //         if (elemento.textContent.trim() == out["pass_it"].cont_page) {
    //             //msg("click!!!!!"+elemento.textContent.trim());
    //             elemento.click();
    //             out["has_next_page"] = true;
    //             out["pass_it"].cont=0;
    //             out["pass_it"].totalJobs=0;

                //msg('__________________OTRAAAAAAAAAAAAAAA '+out["pass_it"].cont_page)

        //     }
        // });
  }
  //msg(out["pass_it"].cont);
  //out.waitFor = '#ctl00_CPH1_vcyS_vsGrid_ctl00 > tbody>tr'; // Las esperas se descomenta y se utilizan son no este extrayendo correctamente los jobs(cuando esto ocurra aplicar las esperas)
  //out.pic=true;
  // out.html=true;
  //out.html=true;
  return out;
})();
