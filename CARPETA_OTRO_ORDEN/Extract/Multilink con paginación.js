//Multilink con validaciñon de URL si tiene jobs

//Caso de uso: http://boo.neuvoo.com/boo3-web/qa/app/index.php?empcode=healius&scanid=188684


//Extract


(function () {
var out = {};

if (typeof pass_it == "undefined") pass_it = {};
if (typeof msg == "undefined") msg = function (x) { return x; };

if (!pass_it["urls"]) {
  out["pass_it"] = {
    // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
    "jobs": 0,
    // Arreglo de URLs
    "urls": ["https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/medical-centres/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/pathology/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/diagnostic-imaging/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/day-surgery/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/dental/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/ivf/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/eye-clinic/",               
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/corporate-support/",
              "https://www.healius.com.au/working-with-us/healius-medical-and-support-employees-section/information-technology/"],
              

    "currentUrl": 0
  };
} else {
  out["pass_it"] = pass_it;
}


var html_jobs = document.querySelectorAll('div.ja-job-list > div');
var jobs = [];

for(var x in html_jobs){
  if(typeof html_jobs[x] =="function") continue;
  if(typeof html_jobs[x] =="number") continue;
  var job = {};
  var elem = html_jobs[x];

  job.title = elem.querySelector("h2 > a").textContent.trim();

  var job_id = elem.querySelector("h2 > a").getAttribute("data-job-id").trim();
  job.url = window.location.href + "?ja-job=" + job_id;

  if (elem.querySelector('div > ul.classifications > li:nth-child(4)')){
    job.location = elem.querySelector("div > ul.classifications > li:nth-child(3)").textContent.trim();
    job.location = job.location.replace("Other","").trim();
  }else{
    job.location = elem.querySelector("div > ul.classifications > li:nth-child(2)").textContent.trim();
    job.location = job.location.replace("Other","").trim();
  }

  var posted = elem.querySelector("p.date-posted").textContent.trim();
  posted = posted.split("/");
  job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];

  if (elem.querySelector('div > ul.classifications > li:nth-child(4)')){
    job.source_jobtype = elem.querySelector("div > ul.classifications > li:nth-child(4)").textContent.trim();
  }else{
    job.source_jobtype = elem.querySelector("div > ul.classifications > li:nth-child(3)").textContent.trim();
  }

  job.temp = 2;
  jobs.push(job);     
}

// Asigna a jobs la cantidad de trabajos que obtuvo en esta página 
if(!document.querySelectorAll('div.ja-job-list > div')){       //Valida si la url contiene o no jobs
      out["has_next_page"] = true;
} 

msg(window.location.href)   

out["pass_it"]["jobs"] = jobs.length;
out["jobs"] = jobs;
return out;

})();



//Paginación con next page


(function() {
var out = {};
var next_page_selector = 'div.ja-pager > a.next';
var clickable_elem = document.querySelector(next_page_selector);

out["pass_it"] = pass_it;

msg("\x1b[32m -----------PAGINATION--------------");

if (!clickable_elem) {
  // Pregunta si la siguiente url existe
  out["pass_it"]["currentUrl"] += 1;

  if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {

    var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }

} else {
  clickable_elem.click();
  out["has_next_page"] = true;
}

out.waitFor = "div.ja-job-list > div";
return out;
})();




//Paginación con next y slector de ultima página


(function() {
var out = {};
out["pass_it"] = pass_it;
if (typeof msg == "undefined") msg = function (x) { return x; };

var next_page_selector = "li.active + li > a"; //selector to identify the next button
var last_page_selector = "li.active + li > a.paginationItemLast"; //selector to identify the last page

var clickable_elem = document.querySelector(next_page_selector);

if (document.querySelector(last_page_selector)) {
  msg("ENTRÓ");
  out["pass_it"]["currentUrl"] += 1;
  // Pregunta si la siguiente url existe
  if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
    //out["pass_it"].cont = 0;
    msg("NUEVO LINK");
    var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;

  }
}else if(clickable_elem){
  //go to next page
  clickable_elem.click();
  out["has_next_page"] = true;
} 
out.waitFor = "tr.data-row";
//out["pass_it"]["jobs"] += per_page;
return out;
})();



// Paginación comparando cantidades

(function() {
  var out = {};

  out["pass_it"] = pass_it;


  var next_page_selector = "li.page-item.page-next a.page-link";
  var clickable_elem = document.querySelector(next_page_selector); 
  var textPaginador = document.querySelectorAll('span.pagination-info')[0].textContent.trim();

  var max = textPaginador.split(" de ").pop();
  var min = textPaginador.split(" de ").shift().split("sur").pop();
  msg(min + " ------------------- " + max);

  if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again

    out["pass_it"]["currentUrl"] += 1;
    // Pregunta si la siguiente url existe
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
      var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
  }

  out["wait"] = true;
  return out;
})();