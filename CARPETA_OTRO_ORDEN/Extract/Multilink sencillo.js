//Multilink normal

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
      "urls": ["https://icon.worldmanager.com/careers/index.php?search=change&countryID=13&state=&city=&keyword=",
               "https://icon.worldmanager.com/careers/index.php?search=change&countryID=15&state=&city=&keyword=",           
               "https://icon.worldmanager.com/careers/index.php?search=change&countryID=16&state=&city=&keyword=",
               "https://icon.worldmanager.com/careers/index.php?search=change&countryID=12&state=&city=&keyword=",
               "https://icon.worldmanager.com/careers/index.php?search=change&countryID=14&state=&city=&keyword=",
               "https://icon.worldmanager.com/careers/index.php?search=change&countryID=11&state=&city=&keyword="],
      "currentUrl": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }


  var html_jobs = document.querySelectorAll('li[class*="position textColour"]');
  var jobs = [];

  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("h2 > a").textContent.trim();
    job.url = elem.querySelector("h2 > a").href.trim();
    //job.location = elem.querySelector("span.LocationNameColour").textContent.trim();
    
    var fecha = elem.querySelector("span.PostedDateColour").textContent.trim().replace("Posted on:","").trim();
    fecha = fecha.replace(/January/gi,"/01/").replace(/February/gi,"/02/").replace(/March/gi,"/03/").trim();
    fecha = fecha.replace(/April/gi,"/04/").replace(/May/gi,"/05/").replace(/June/gi,"/06").trim();
    fecha = fecha.replace(/July/gi,"/07/").replace(/August/gi,"/08/").replace(/September/gi,"/09/").trim();
    fecha = fecha.replace(/October/gi,"/10/").replace(/November/gi,"/11/").replace(/December/gi,"/12/").trim();
    fecha = fecha.replace(" ","").replace(" ","").split("/");
    job.dateposted_raw = fecha[1] +'/'+ fecha[0] +'/'+ fecha[2];

    //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
    
    job.temp = 2;
    jobs.push(job);     
  }


  if(html_jobs.length < 1 || jobs.length < 1){
    var joby = {}; 
    joby.url = window.location.href;
    jobs.push(joby);
  }
  

  // Asigna a jobs la cantidad de trabajos que obtuvo en esta página
  out["pass_it"]["jobs"] = jobs.length;
  out["jobs"] = jobs;
  return out;
})();


//Paginación

(function () {
  var out = {};

  if (typeof msg == "undefined") msg = function (x) { return x; };

  out["pass_it"] = pass_it;

  // No tiene siguiente página!! (y se procede a preguntar por el multilink)
  out["pass_it"]["currentUrl"] += 1;
  // Pregunta si la siguiente url existe
  if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
    // Resetea el contador de la paginación

    var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }       

  return out;
})();




//Multilink con jobs fantasma

if(html_jobs.length < 1 || jobs.length < 1){
  var joby = {}; 
  joby.url = window.location.href;
  jobs.push(joby);
}


//Paginar evitando crear un job fantasma


//Definir en el step de infinite pagination el pass it:
if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["urls"]) {
    out["pass_it"] = {
    "intentos": 0,
    "urls": [ARRAY DE URLS]
  };
} else {
    out["pass_it"] = pass_it;
}
//Al final del extract colocar las siguientes validaciones:
if(html_jobs.length < 1 || jobs.length < 1){
  var url = out["pass_it"].urls.shift(); 
  window.location.href = url;
  out["has_next_page"] = true;
  out["pass_it"].intentos++;
}
if(out["pass_it"].intentos > 2) {
    var job_fantasma = {url:window.location.href};
    jobs.push(job_fantasma);
    out["pass_it"].intentos = 0;
}