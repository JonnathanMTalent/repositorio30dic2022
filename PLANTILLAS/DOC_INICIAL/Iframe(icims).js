/* 1) puedo trabajar dentro del iframe directamente abriendo el iframe e indexandolo en su propia pagina dar click en secundario en open in new tag sobre la ruta, se toma esta nueva ruta como jobsite
2) si redirecciona hacia la misma pagina y sigue saliendo el iframe primero creo una variable donde meto el documento del iframe
Jobsite del iframe: Search Jobs | The Executive Wing Toronto & Hamilton
Pagina del iframe: https://www2.pcrecruiter.net/pcrbin/regmenu.aspx?uid=the executive wing.theexecutivewing
CUANDO EL IFRAME NO PERMITE EXTRAER LOS JOBS */

(function() {
 var out = {};
 var iframeDocument = document.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
 var html_jobs = iframeDocument.querySelectorAll('div[class="container-fluid iCIMS_JobsTable"] > div');
 var jobs = [];for(var x in html_jobs){
 if(typeof html_jobs[x] =="function") continue;
 if(typeof html_jobs[x] =="number") continue;
 var job = {};
 var elem = html_jobs[x];
 job.title = elem.querySelector('a h2').textContent.trim();
 job.url = elem.querySelector('a').href.trim();
 //job.location = elem.querySelector("").textContent.trim();
 //job.dateposted_raw = elem.querySelector("").textContent.trim();
 //job.logo = elem.querySelector("").getAttribute("src").trim();
 //job.source_apply_email = elem.querySelector("").textContent.trim();
 //job.source_empname = elem.querySelector("").textContent.trim();
 //job.source_jobtype = elem.querySelector("").textContent.trim();
 //job.source_salary = elem.querySelector("").textContent.trim();
 job.temp = 1;
 jobs.push(job);
 }

 out["jobs"]= jobs;
 return out;
 })();
