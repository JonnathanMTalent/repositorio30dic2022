//Para extraer datos en el extract desde el jobdata



var full_html = getDescription(job.url);
var temp_html = document.createElement("div");
temp_html.innerHTML = full_html;
job.source_jobtype = temp_html.querySelector('dl:nth-child(3) > dd > span').textContent.trim();
/*
        var full_html = getDescription(job.url);
      var htlm = $("section.opsomming > div > div > div > div", full_html);
      
            if(!htlm){
                job.dateclosed_raw='01/01/2012';
            }
var full_html = getDescription(job.url);
  var div = document.createElement("div");
  div.innerHTML = full_html; 
  */

function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}






//Ensayo para traer la multilocación.



job.temp = 2;

    /*if(job.location.search(/[0-9]/g) > -1){
      msg("\x1b[32m Contain Multilocation =>");

      //Hago la peticion a la descripcion
      const full_html = getDescription(job.url); 
      let div = document.createElement("html"); 
      div.innerHTML = full_html
      msg(full_html)
      msg(div)

      // Traigo el array de las locaciones  
      const locs = div.querySelector('body'); 
      msg(locs)
      //Hago el multilocation
      /*for(let loc of locs){
                  let jobx = {};
                  jobx.title = job.title;
                  jobx.url = job.url;
                  jobx.dateposted_raw = job.dateposted_raw;
                  jobx.location = loc.textContent.trim();
                  jobx.temp = job.temp;
                  jobs.push(jobx)
                }

    }else{
      job.location = job.location//"Naperville, Illinois, US";
      jobs.push(job);
    } */
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


/* Request to Description for extract job location*/
function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  await xhrrequest.open("GET", url, true);     
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) response = xhrrequest.responseText;    
  };
  xhrrequest.send(); 
  return response;
}




//Para testear en la consola del navegador


function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}
var response = getDescription('aqui la url')
console.log(response);