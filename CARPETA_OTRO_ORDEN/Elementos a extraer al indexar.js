//ERlemtos a extraer en la indexaciòn



job.title = elem.querySelector("").textContent.trim();
job.url = elem.querySelector("").href.trim();
//job.url = elem.querySelector("").href.trim()+"?utm_source=neuvoo";
job.location = elem.querySelector("").textContent.trim();

//job.dateposted_raw = elem.querySelector("").textContent.trim();
//job.dateclosed_raw = elem.querySelector("").textContent.trim();
//job.source_jobtype = elem.querySelector("").textContent.trim();
//job.source_salary = elem.querySelector("").textContent.trim();
//job.source_empname = elem.querySelector("").textContent.trim();
//job.logo = elem.querySelector("").getAttribute("src").trim();
//job.source_apply_email = elem.querySelector("").textContent.trim();
//job.experience_required = elem.querySelector("").textContent.trim();  

//job.reqid = elem.querySelector("").textContent.trim();
 

//Chicos a partir de ahora todos los spiders que indexen de jobvite deben tener concatenado en  job.url el siguiente tracker:

//?__jvst=Job Board&__jvsd=talent

//Recordandoles también el caso de icims donde el tracker que deben concatenar en ese ats es este:  ?mode=job&iis=Neuvoo"

//Dato importante de cultura general de programación: el primer parámetro que se pasa en la url es el que lleva un ?, si no es el primero se sustituye el ? por un &