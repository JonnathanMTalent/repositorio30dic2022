//Query para revisar si ta esta indexado

flag_active: 1 AND link.link_analyzed: "jobs.nombreDeLaEmpresa"


//Para llamar un atributo
  
elem.querySelector("td:nth-child(3) > div > div").getAttribute("title").trim();



//Para remover algo y limpiar la info


//para remover paréntesis y el texto dentro ->
.replace(/ \([^)]*\) /g, "")
.replace(/<\/?[^>]+(>|$)/g, "")
//para remover parentesis con números dentro
.replace(/\(\d+\)/g,"")
//para remover corchetes y el texto dentro ->
.replace(/ \[[^)]*\] /g, "")
//para remover llaves  y el texto dentro ->
.replace(/ \{[^)]*\} /g, "")
//reemplaza todo lo indicado
.replace(/<tr>/g,"<br>")
.replace(/<\/tr>/g,"<br>")
.replace(/<\/div>/g,"<br>")
//reemplaza números
.replace(/\d/g,"")
.replace(/[0-9]+/, "")
//reemplaza letras
.replace(/\D/g,"");
//reemplaza letras mayúsculas
.replace(/ *[A-Z]*/g, "")
//Remueve caracteres especiales
.replace(/[^\w\s]/gi, '')
//Eliminar email
.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,"")




//Para conocer el id de un job y evitar reindexacion

job.temp = 2020;

job.jobid = MD5(job.title+job.location+job.source_empname+job.source_jobtype+job.dateposted_raw+job.temp)

$job['jobid'] = md5($job['title'].$job['location'].$job['source_empname'].$job['dateposted_raw'].$job['client_tag'].$job['temp'].$id);
    
job.jobid = MD5(job.title + job.location + job.temp + id).toString();

jobs.push(job);




//Para eliminar jobs candidatura esponyanea

job.temp = 1;

  if(job.title.indexOf("10 Rocker / euse")==-1)
    if(job.title.indexOf("mission de 6 à 24 mois")==-1)
      if(job.title.indexOf("Expression of Interest")==-1)
        {
          jobs.push(job);
        }


        
        if(job.title !="PROVOST and VICE-PRESIDENT (Academic)"){
          jobs.push(job);
        }





    table#ctl00_MainContentPlaceHolder_LatestVacanciesDataGrid>tbody>tr:not(:last-child):not(:nth-child(1))

    table#ctl00_MainContentPlaceHolder_LatestVacanciesDataGrid>tbody>tr:not(:nth-child(22)):not(:nth-child(1))>td>a



    //Revisar error job data en el spider

    flag_active:1 AND -flag_html:2 AND scanid:196422




    //Expected jobs

    (function() {
      var out = {};
      var selector = "span > span";
      var regex = /\d+/;
    
      if (typeof msg === 'undefined') msg = console.log;
      var expected_jobs_str = document.querySelector(selector).textContent.trim();
      var expected_jobs = expected_jobs_str;
    
      out["expected_jobs"] = expected_jobs;
    
      return out;
    })();


//Eliminar el titulo en el jobdata

  var title = pass_it["job"].title;
  job.html  = job.html.replace(title,"");



  

  if(job.title.indexOf("-")>-1){
    let splitOnLastHyphen = job.title.split("-").pop();

    job.title = job.title.replace(splitOnLastHyphen,"").trim();

    let lastChar = job.title.substr(job.title.length -1);
    if(lastChar === "-" || lastChar === ","){job.title = job.title.slice(0,-1);}
    //}
  }


  



