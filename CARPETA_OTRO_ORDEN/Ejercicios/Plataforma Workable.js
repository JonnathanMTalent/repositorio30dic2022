//Plataforma apply workable

//Before extract

(function () {
  var out = {};
  out.waitFor = 'li[data-ui="job-opening"]';
  //out.pic = true;
  //out.html = true;
  return out;
})();


//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('li[data-ui="job-opening"]');
  var jobs = [];
  for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("h3").textContent.trim().split(" - ").shift();
    job.reqid = elem.querySelector('span[data-ui="job-code"]').textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = elem.querySelector('span[data-ui="job-location"]').textContent.trim();
    job.source_location = elem.querySelector('span[data-ui="job-location"]').textContent.trim();
    var posted = elem.querySelector("small.careers-jobs-list-styles__date--1CDxx").textContent.trim();
    job.dateposted_raw = dateAgo(posted," ",1,2)

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector('span[data-ui="job-type"]').textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();

    job.temp = 12021;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();

function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;}
  if (mm<10){mm ='0'+ mm;}
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}


//Infinite pagination

(function() {
    var out = {};
    var button_more = 'button[data-ui="load-more-button"]'; //1) SELECTOR DEl BOTON VER MAS JOBS
  
    //msg(pass_it);
    if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };
    else out["pass_it"] = pass_it;
  
    out["has_next_page"] = true;
    if (out["pass_it"]["heights"].length > 3) {
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
      if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
    }
  
    if (document.querySelectorAll(button_more).length == 1)
      document.querySelector(button_more).click();
  
    out["wait"] = true;
    out["pass_it"]["heights"].push(document.querySelectorAll('li[data-ui="job-opening"]').length); // selector de los jobs
    return out;
  })();


  //Jobdata


  (function() {
    var out = {};
    var job = {};
    var selector = 'div[data-ui="job-description"] > div';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
  
  
    job.html = removeTextBefore(job.html, 'About the Role', false);
    job.html = removeTextBefore(job.html, 'Description', false);
    
    job.html = removeTextAfter(job.html, 'Why AutoNexus', true);
  
  
    if(job.html.indexOf('@')>-1){
      var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
      job.html = job.html.replace(eliminar,'');
    }
  
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  
  
    let selectorExpre = 'li'; //Selector del jobdata (también puede ser p, div, span)
    let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
    for (const a of document.querySelectorAll(selectorExpre)) {
      if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
        if (a.textContent.match(regextwo)) {
          job.experience_required = a.innerText.match(regextwo)[0];
          job.experience_required = job.experience_required.replace("18+ years","").trim();
          job.experience_required = job.experience_required.replace("50 years","").trim();
        }else{
          job.experience_required = '';
        }
      }
    }
  
  
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
  
    out["job"] = job;
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


  // caso de paginacion que tiende a infinito//
  //***caso especial *******//

    //*extract*//

  (function () {
  var jobs = [];
  var out = {};
  var counter = 20;
  var counter0=1;
  var seguir = true;
  var json;
  //var Tken = '=';
  do {

    //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
    //var data = {};

    $.ajax({
      url: 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=7259b73c-68ed-4ba6-bf41-9557fa90640b&timeStamp=1640101629484&lang=en_US&iccFlag=yes&eccFlag=yes&ccId=19000101_000001&locale=en_US&$skip='+counter0+'&$top='+counter, 
      headers: {
        "accept": "*/*",
        "accept-language": "en_US",
        "content-type": "application/json",
        "locale": "en_US",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-forwarded-host": "workforcenow.adp.com",
        "x-requested-with": "XMLHttpRequest"
      },
      type: 'GET', //TIPO DE PETICION
      //data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
      dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
      async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
      success: function (result) {//FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
        // out["expected_jobs"] = result.totalCount;
        json = result.jobRequisitions; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS

        var total_jobs = result.meta.totalNumber;
        msg("total jobs "+total_jobs+" Counter "+counter);

        //var stop_pag = json;
        if (counter > total_jobs){
          seguir = false;
          msg(`---> FINAL DE PAGINACIÓN`);
        }
        //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
        for (var i in json) {
          var job = {};

          job.title = json[i].requisitionTitle;
          job.reqid = json[i].customFieldGroup.stringFields[0].stringValue;
          job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=7259b73c-68ed-4ba6-bf41-9557fa90640b&ccId=19000101_000001&jobId="+json[i].customFieldGroup.stringFields[0].stringValue+"&lang=en_US";
          job.location = json[i].requisitionLocations[0].nameCode.shortName;
          var posted = json[i].postDate;
          posted = posted.split("T").shift().trim();
          posted = posted.split("-");
          job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];

          //job.logo = json[i].;
          //job.source_apply_email = json[i].;
          //job.source_empname = json[i].;
          if(json[i].workLevelCode){
            job.source_jobtype = json[i].workLevelCode.shortName;
          }
          //job.source_salary = json[i].;
          //job.html= json[i].;
          //job.jobdesc = job.html;;

          job.temp = 1;
          jobs.push(job);
        }
        //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
        counter = counter+20;
        counter0 = counter0+20;
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
      },
      error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
        msg(error);
      }
    });
  } while (seguir);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
  out["jobs"] = jobs;
  return out;
})();

//job data//


(function() {
  var out = {};
  var job = {};
  var selector = 'div[class="job-description-data"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);

  //job.source_jobtype = document.querySelector("#resumator-job-employment").textContent.trim();
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'THE OPPORTUNITY ', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);

  //job.html = removeTextAfter(job.html, '', true);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);


  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  }

  job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

  let selectorExpre = 'section[class="section-vacancy_detail bg-gray-100 relative  pt-75 lg:pt-[100px]"] div.container'; //Selector del jobdata (también puede ser p, div, span)
  let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
  for (const a of document.querySelectorAll(selectorExpre)) {
    if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
      if (a.textContent.match(regextwo)) {
        job.experience_required = a.innerText.match(regextwo)[0];
        job.experience_required = job.experience_required.replace("18+ years","").trim();
        job.experience_required = job.experience_required.replace("50 years","").trim();
      }else{
        job.experience_required = '';
      }
    }
  }

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  out["job"] = job;
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
