//Smart recutrier


//Before extract

(function () {
var out = {};
out.waitFor = "li.opening-job > a";
//out.pic = true;
//out.html = true;
return out;
})();


//Extract


(function() {
var out = {};
var html_jobs = document.querySelectorAll("li.opening-job > a");
var jobs = [];
for(var x in html_jobs){
  
  if(typeof html_jobs[x] =="function") continue;
  if(typeof html_jobs[x] =="number") continue;
  var job = {};
  var elem = html_jobs[x];
  
  job.title = elem.querySelector("h4").textContent.trim();
  job.reqid = elem.href.split("/")[4].split("-").shift().trim();
  job.url = elem.href.trim();
  //job.location = elem.querySelector("").textContent.trim();
  
  //job.dateposted_raw = elem.querySelector("").textContent.trim();
  //job.logo = elem.querySelector("").getAttribute("src").trim();
  //job.source_apply_email = elem.querySelector("").textContent.trim();
  //job.source_empname = elem.querySelector("").textContent.trim();
  job.source_jobtype = elem.querySelector("p > span").textContent.trim();
  //job.source_salary = elem.querySelector("").textContent.trim();
  
  job.temp = 012021;
  jobs.push(job);
} 

out["jobs"]= jobs;
return out;
})();


//Infinite pagination


(function() {
var out = {};

var boton = document.querySelector('a[class="link details-desc js-more"]');
//out.pass_it["total"]= boton.length;

if (!boton) {
  //last page
  out["has_next_page"] = false;
} else if(boton){
  //go to next page
  boton.click();
  out["has_next_page"] = true;
} else {
  //try again
  out["has_next_page"] = true;
}

out.waitFor = 'a[class="link details-desc js-more"]';
return out;
})();


//Otro infinite

(function() {
    var out = {};
    var button_more = 'a.link.details-desc.js-more';  //SELECTOR DEl BOTON VER MAS JOBS
    var selector_jobs = 'li.opening-job';  //SELECTOR DE LOS JOBS

    msg(pass_it);

    if (!pass_it["heights"]) 
      out["pass_it"] = { 
        "heights": [], //NUMERO DE JOBS, ESTRAIDOS POR CICLO.
        "cont": 1 
    };
  
    else out["pass_it"] = pass_it;

    out["has_next_page"] = true;

    //CONDICION DE EXISTENCIA DEL BOTON LOADMORE
    if (document.querySelectorAll(button_more).length > 0){
        document.querySelector(button_more).click() 
          msg('---Click al botón---');
    }else{
        out["has_next_page"] = false;
    }

    var targetPage = document.querySelectorAll(selector_jobs).length;

    //CONDICION DE PARADA, VALIDANDO SI LA ULTIMA POSICION DE ARRAY ES IGUAL AL TOTAL DE JOB POR CICLO
    if (out["pass_it"]["heights"][out["pass_it"]["heights"].length - 1] == document.querySelectorAll(selector_jobs).length)
        out["has_next_page"] = false;
    else {
        out.waitForFunction = {
            "function": waitForPage.toString(),
            "args": [targetPage, selector_jobs]
        };
    }

    //GUARDA EN LA POSICION DEL ARRAY, EL NUMERO DE JOBS EXTRAIDO POR CICLO.
    out["pass_it"]["heights"].push(document.querySelectorAll(selector_jobs).length);

    //ESPERA POR EL SELECTOR LOS JOBS (IMPORTANTE)
    out.waitFor = "li.opening-job";
    out.pic = true;
    return out;
})();


function waitForPage(target, jobs) {
    var current = document.querySelectorAll(jobs).length;
    msg('Target'+parseInt(target) < 'Current'+parseInt(current));
    return parseInt(target) < parseInt(current)
}



//Jobdata


(function() {
  var out = {};
  var job = {};
  var selector = 'div[itemprop="description"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;


  if (document.querySelector('span[itemprop="address"]')){
    job.location = document.querySelector('span[itemprop="address"]').textContent.trim();
    job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();
  }else{
    job.location = "USA";
  }


  job.html      = full_html.innerHTML.trim();    

  job.html = removeTextBefore(job.html, 'Job Description', false);
  job.html = removeTextAfter(job.html, 'All your information will be kept confidential', true);


  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }


  let selectorExpre = 'div[itemprop="description"]'; //Selector del jobdata (también puede ser p, div, span)
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