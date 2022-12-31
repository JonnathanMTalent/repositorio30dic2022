(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.awsm-job-listing-item a');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('div h2.awsm-job-post-title').textContent.trim();
        job.url = elem.href.trim();
        job.jobtype=elem.querySelector('div.awsm-job-specification-item.awsm-job-specification-job-type').textContent.trim();
        job.source_location=elem.querySelector('div.awsm-job-specification-item.awsm-job-specification-job-location').textContent.trim();
        job.location=job.source_location+", Germany";
    
        
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj OBTENIENDO LA DESCRIPCION

        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div.querySelector('div.awsm-job-entry-content.entry-content');
        
        // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj DATOS ESTRUCTURADOS
        
         if(div.querySelector('script[type="application/ld+json"]')){
          // Extract text on the script
          var t=JSON.parse(div.querySelector('script[type="application/ld+json"]').textContent);
          var dto=t["@graph"][2].datePublished
          //convert text to json
         //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
         var date=dto.split("T").shift().split("-");
        job.dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
        }
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          job.html = removeTextAfter(job.html, "Nimm am Besten gleich Kontakt auf:", true);
          //job.html = removeTextBefore(job.html, "", false);
        
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
   var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        //console.log(xhrrequest.responseText);
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