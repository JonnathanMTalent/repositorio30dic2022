  //-----------DESCRIPTION---------
  var json = JSON.parse(getDescription(job.url));    
  
  //AQUI LA DESCRIPCION:
  job.html = JSON.parse(json.structuredDataAttributes.data).description; 
  
  
  //AQUI EL DATEPOSTED_RAW
  var datepost = JSON.parse(json.structuredDataAttributes.data).datePosted;
  //msg("VARIABLE DATEPOST: "+ datepost)
  datepost= datepost.split("T").shift().split("-");
  job.dateposted_raw=datepost[1]+"/"+datepost[2]+"/"+datepost[0];
 
  
  //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  
  
  job.html = cleanHTML(job.html);
  var tmp = document.createElement("DIV");
  tmp.innerHTML = job.html;   
  

//LIMPIANDO
  
  job.jobdesc = tmp.textContent.trim();
  //job.dateclosed_raw = dateclosed_returned(tmp);  //sent element with html description - enviar elemento con el html de la descripcion.        
  if (job.html.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
  if (job.html.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
  if (job.html.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
  if (job.html.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }

  job.html = removeTextBefore(job.html, "Key responsibilities:", false);            
  job.html = removeTextAfter(job.html, "George Weston Limited recognizes", true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);


// LA FUNCION GET DESCRIPTION:

  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
  }
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
  
  