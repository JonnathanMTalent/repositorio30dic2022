// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
 /*
 // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
109273 NUM 542 DE LA HOJA
  no me dio el llamado de ajax,, hasta el titulo toca de la descripcion
109273--->(1/3)  empcode: heliview-holding-b-v empname: Heliview Holding B.V   estrategia:   puente de QA *******HORA I:(10:34)****F() 
               *****************************************************

[stratagy: QA bridge, 16/06/2022 ] old scanid(109273), inactive old jobs(Y)
logo(OK); version Boo:(2) ,scanid asociado (no):  
found?(y): homepage(https://heliview.be/), 
found?(y): jobsite(https://heliview.nl/conferences/vacatures/),  
jobsite was indexed before ?(no),
QA bridge was necessary?(no), innactivated "boo2"(y),
indexed?(no)-->status  "Dinamic"(), 
RuntimeAvg:() Country(NL)NETHERLANDS pagination(no pag , only one page)
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj



(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.lgx-brand-btn-area.text-left');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        //job.title = elem.querySelector('').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        //job.location = elem.querySelector('').textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
/*
        if(div.querySelector('script[type="application/ld+json"]')){
          // Extract text on the script
          var t=JSON.parse(div.querySelector('script[type="application/ld+json"]').textContent);
          var dto=t["@graph"][3].datePublished
          //convert text to json
         //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
         var date=dto.split("T").shift().split("-");
          var dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
        }
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
/*

         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextAfter(job.html, "Nimm am Besten gleich Kontakt auf:", true);
          //job.html = removeTextBefore(job.html, "", false);
        
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);


//*/ //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

        
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

