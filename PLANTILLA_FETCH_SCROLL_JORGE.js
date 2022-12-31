/*
VER HTML CORRECTO:
https://codebeautify.org/htmlviewer


EL JSON O EL HTML LO PUEDE BUSCAR EN LA PAGINA EN FETCH O EN DOC
PASO1: REEMPLAZAR TO DO  EL FETHC
paso 3: modificar las variables del pass_it
paso 2= colocar el query selector all donde estan todos los jobs, caja de los jobs
/////EXTRACTING VARIABLES///////paso 4 poner todas las variables como un extract normal
paso 5 comentar o descomentar toda esta parte de la descripcion segundo llamado fetch con ctrl + /
paso 6 = mirar como pagina la pagina en la url si de 1 en un 1 o de 10 en 10 etc y declarar el passit 
en el infinity el counter como inicia
paso  7: voy a al pagination y le pongo que aumente de n en n segun lo anterior
8 descomentar la declaracion del passit en el extract
9 paso: descomentar las lineas del jobsperpage y jobsin page y acomodar segun los valores
10: probar que pagine correctamente
11 paso: ir a una descripcion y ver si el html me sale en fetch o en doc al recargar la pagina
12 reemplazar el fetch de la descripcion completo
//13  PONER EL SELECTOR DE LA DESCRIPCION
*/



//infinity
(() => {
    var out = {};
    out.pass_it = {    // acuerdese que aqui puede declarar las variables que quiera las llama asi en otro step: out.pass_it.variable
        "counter":0,  //paso 6: numero de pagina..suele usarse para poner en la url como numero de pagina, si la pag empieza en el 1 ponerlo como 1, si empieza en 10 ponerlo 10
        "jobsPerPage":0, // cantidad fija de jobs, lo puede pner aqui si quiere
        "jobsInPage":0  // cantidad que hay en el momento.. html_jobs.length
    }
    return out;
})()

//Extract
(async () => {
    const out = {};
    const jobs = [];
   // out.pass_it=pass_it;  // paso 8 
    const resp = await fetch("https://jobs.dkb.de/search/?q=&sortColumn=referencedate&sortDirection=desc&searchby=location&d=15&startrow="+out.pass_it.counter, {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://jobs.dkb.de/search/?q=&sortColumn=referencedate&sortDirection=desc&searchby=location&d=15",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
    const html = await resp.text();
    msg('lo que trae el fetch PARA CORREGIRLO es: '+html);  // recordar abrir la flechita, y la pagina es https://codebeautify.org/htmlviewer
    const div = document.createElement("div");
    div.innerHTML = html;
    //paso 2= colocar el query selector all donde estan todos los jobs, caja de los jobs
    const html_jobs = div.querySelectorAll('PONER EL SELECTOR DE LOS JOBS');

    //paso 3: y 9 modificar las variables del pass_it, comentarlas 3 lineas siguientes, mientras prueba con solo el titulo
    //out.pass_it.jobsPerPage=25; //  tambien puede poner selector elem.querySelector('')...
    //out.pass_it.jobsInPage = html_jobs.length;
    //msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);

    for (let x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        let job = {};
        let elem = html_jobs[x]; // esta x es la posicion osea como un indice i
        //////EXTRACTING VARIABLES///////paso 4 poner todas las variables como un extract normal
       // if(elem.querySelector("")!=null && elem.querySelector("h2 a")!= undefined && elem.querySelector("h2 a")!='')job.title=elem.querySelector("h2 a").textContent.trim();
        job.title = elem.querySelector("").textContent.trim();


        job.temp = 1;
        
        //paso 5 comentar toda esta parte con ctrl + /
//     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*

 ////PASO 12
//                   var selector = `Selector de la descripcion`; //13  PONER EL SELECTOR DE LA DESCRIPCION
//                   var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
//                   const resp2 = await fetch(job.url, {
//                   "headers": {
//                     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//                     "accept-language": "es-ES,es;q=0.9",
//                     "cache-control": "max-age=0",
//                     "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
//                     "sec-ch-ua-mobile": "?0",
//                     "sec-ch-ua-platform": "\"Windows\"",
//                     "sec-fetch-dest": "document",
//                     "sec-fetch-mode": "navigate",
//                     "sec-fetch-site": "none",
//                     "sec-fetch-user": "?1",
//                     "upgrade-insecure-requests": "1"
//                   },
//                   "referrerPolicy": "strict-origin-when-cross-origin",
//                   "body": null,
//                   "method": "GET",
//                   "mode": "cors",
//                   "credentials": "include"
//                 });
//                   const data = await resp2.text();
//                   const parseDoc = new DOMParser();
//                   const doc = parseDoc.parseFromString(data, 'text/html')
//                   var full_html = doc.querySelector(selector);
//                   if (full_html) {
                
// // ESTO SOLO PARA EXTRAER MAS VARIABLES
// //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*

// //////extraer otras variables se puede con el full_html o en este caso con el doc.. el  doc es equivalente al document en la plantilla normal...osea es donde esta todo el html,
// /////mientras que en el full_html solo esta lo que agarra el selector

//     /////// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
//     // //let job=[] //poner esto si se va a probar en consola QUITARLO O COMENTARLO EN EL DINAMIC
//     // let aux = Array.from(doc.querySelectorAll('li')).filter(x => x.textContent.search(/years/gmi) > -1);
//     // aux[0]!=null ? job.experience_required=aux[0].textContent.trim() : job.experience_required='';
//     // //aux[0]!=null ? job.experience_required=aux[0].textContent.trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('') : job.experience_required='';
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// // CON GUION SOLO ES PARA EXPERIENCE REQUIRED
//     // const auxExperience = [...doc.querySelectorAll('p')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
//     // if (auxExperience) {
//     //     job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
//     // }
// //////*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

// //////jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//                       // remove something from the jobdatata
//                       if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
//                           if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
//                       });
//                       if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
//                           return x
//                       };
//                       if (typeof msg == "undefined") msg = console.log;
//                       job.html = full_html.innerHTML.trim();
//                       //limpieza de las descripciones
//                       //job.html = removeTextBefore(job.html, ``, false);
//                       //job.html = removeTextAfter(job.html, ``, true);
//                       //job.html = removeTextAfter(job.html, ``, true);
//                       //job.html = removeTextAfter(job.html, ``, true);
//                       job.html = cleanHTML(job.html);
//                       var tmp = document.createElement('div');
//                       tmp.innerHTML = job.html;
//                       job.jobdesc = tmp.textContent.trim();
//                       job.jobdesc = cleanHTML(job.jobdesc);
//                   }
                  
//*/// ████████████████████████████████████████████████████████████████████

        job.temp = 1;
        jobs.push(job);
    }
    //out.pass_it.counter +=1;
    // if(job.title !=null && job.title!= undefined && job.title)!='')jobs.push(job);
    out.jobs = jobs;
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


//PAGINATION
    (function() {
        var out = {};
        out.pass_it = pass_it;
        out.pass_it.counter += 25;  // paso 7 //PONER AQUI CUANTO VA A AUMENTAR EL COUNTER O PAGINA SI DE 1 EN UNO O DE 10 EN 10
        if(out.pass_it.jobsInPage == out.pass_it.jobsPerPage){
            out.has_next_page = true;
        }else{
            out.has_next_page = false;
        }
        return out;
    })();




//PAGINATION
    (()=>{
        var out={};
        out.pass_it=pass_it;
        var { counter, jobsPerPage, jobsInPage } = out.pass_it;
        out.pass_it.counter+=jobsPerPage;  //PONER AQUI CUANTO VA A AUMENTAR EL COUNTER O PAGINA SI DE 1 EN UNO O DE 10 EN 10
        out.has_next_page=jobsInPage==jobsPerPage?true:false;
        return out;
    })()



    // COMPARAR LAS URL PARA VER COMO CAMBIA DE PAGINA:  SECUNDARIO COPY  LINK ADDRES.. ES LO MISMO QUE COPY AS FETHC PERO SOLO TRAE LA URL
    https://careers.groupe-rocher.com/tile-search-results/?q=&sortColumn=referencedate&sortDirection=desc&startrow=10&_=1661649148359
    https://careers.groupe-rocher.com/tile-search-results/?q=&sortColumn=referencedate&sortDirection=desc&startrow=20&_=1661649148360