//INFINITY PAGINATION

(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 1,
        "limit": 0,
        "jobsCount": 0
    };
    return out;
})();

// EXTRACT

(function() {
    let out = {};
    let jobs = [];
    out["pass_it"] = pass_it;
    let json;
    
   /* if(out.pass_it.offSet==23){
        out.pass_it.offSet=out.pass_it.offSet+1;
        out.pass_it.jobsCoun=out.pass_it.jobsCoun+9;
        
        
    }
    */
    $.ajax({
        url : 'https://www.mil.be/umbraco/api/content/searchjoboffers?query=%7B%22pageSize%22%3A9%2C%22pageNr%22%3A'+out.pass_it.offSet+'%2C%22language%22%3A%22nl%22%2C%22filters%22%3A%7B%22studyAtDefence%22%3A-1%7D%7D', // 
        headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "if-modified-since": "Fri, 01 Jul 2022 01:50:14 GMT",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(result) {
            
            json = result.joboffers;
            out.pass_it.limit = result.total;
            if (json.length > 0) {
                msg('Hay jobs');
                for (var elem of json) {
                    var job = {};
                
                    
            job.title = elem.title  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO
            job.url = elem.url;
            var datess = elem.registrationStartDate.split(' ').shift().split('-');
            job.dateposted_raw=datess[1]+"/"+datess[2]+"/"+datess[0];
            job.reqid=elem.id;
            //out["pic"] = true;
            job.temp = 96;
            jobs.push(job);
            out.pass_it.jobsCount += 1;
            msg(job.title+"  "+job.reqid);
            msg('JOBSCOUNT: '+out.pass_it.jobsCount+'__ LIMIT:'+out.pass_it.limit+' __OFSET: '+out.pass_it.offSet);
                }
            } else {
                msg('No hay Jobs');
                /*
                out.pass_it.limit = 0;
                var job = {};
                job.title = '5K limit reached. Ghost Job for: ';
                jobs.push(job);
                msg('JOBFANTASMA');
                */
            }
                            
                var job = {};
                job.title = 'ghost job for '+out.pass_it.offSet;
                jobs.push(job);
               
        },
        error: function(error) {
            msg(error);
        }
    });
    out["jobs"] = jobs;
    return out;
})();

// PAGINATION

(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.jobsCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = true;
    return out;
})();

//JOBDESCRIPTION
(function() {
    var out = {};
    var job = {};
    var selector = "div.o-info-block__description.o-info-block__description--large";
  
  if(document.querySelector(selector)) {
      var full_html = document.querySelector(selector);
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  
  //----------------------------------------------------------------------//
   // To Remove selectors 
   for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
      if (a){
        a.remove();
      }
    }
  //----------------------------------------------------------------------//
    job.html      = full_html.innerHTML.trim();
    job.html      = job.html.replace(/([0-9])/g, '').replace('()', ''); //Estructura de Telefonos fijos
  
  // --------------- removeTextBefore -----------
  
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
  
  // --------------- removeTextAfter -----------
  
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
  
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
  
  } else {
  
        msg('\x1b[44m NO HAY SELECTOR\x1b[44m');
        job.flag_active =  0;
        job.html        = "";
        job.jobdesc     = "";
     
  }
  
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

  //EXTRACT MEJORADO

  (function() {
    let out = {};
    let jobs = [];
    //out["pass_it"] = pass_it;
    out.pass_it = pass_it;
    let json;
    
   /* if(out.pass_it.offSet==23){
        out.pass_it.offSet=out.pass_it.offSet+1;
        out.pass_it.jobsCoun=out.pass_it.jobsCoun+9;
        
        
    }
    */
    $.ajax({
        url : 'https://www.mil.be/umbraco/api/content/searchjoboffers?query=%7B%22pageSize%22%3A9%2C%22pageNr%22%3A'+out.pass_it.offSet+'%2C%22language%22%3A%22nl%22%2C%22filters%22%3A%7B%22studyAtDefence%22%3A-1%7D%7D', // 
        headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "if-modified-since": "Fri, 01 Jul 2022 01:50:14 GMT",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(result) {
            
            json = result.joboffers;
            out.pass_it.limit = result.total;
            if (json.length > 0) {
                msg('Hay jobs');
                for (var elem of json) {
                    var job = {};
                
                    
            job.title = elem.title  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO
            job.url = 'https://www.mil.be/'+elem.url;
            var datess = elem.registrationStartDate.split(' ').shift().split('-');
            job.dateposted_raw=datess[1]+"/"+datess[2]+"/"+datess[0];
            job.reqid=elem.id;
            //out["pic"] = true;
            job.temp = 96;
            
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
var full_html = getDescription(job.url);
var div       = document.createElement("div");
div.innerHTML = full_html;
var locacion="";
if(anclas_texto_nodo(div,"Locatie",0,0,"div.o-metabox__parameter")!=[]){
     locacion=anclas_texto_nodo(div,"Locatie",0,0,"div.o-metabox__parameter");
     if(locacion[0]!=null){
         job.source_location=locacion[0].textContent.trim();
         job.source_location=job.source_location.replace('Locatie','');
     }else{
         job.source_location='';
     }
     job.location=job.source_location;
}else{
    locacion='';
    job.source_location='';
    job.location='';
}

job.location=job.source_location;
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            
            jobs.push(job);
            out.pass_it.jobsCount += 1;
            msg(job.title+"  "+job.reqid);
            msg('JOBSCOUNT: '+out.pass_it.jobsCount+'__ LIMIT:'+out.pass_it.limit+' __OFSET: '+out.pass_it.offSet);
                }
            } else {
                msg('No hay Jobs');
                /*
                out.pass_it.limit = 0;
                var job = {};
                job.title = '5K limit reached. Ghost Job for: ';
                jobs.push(job);
                msg('JOBFANTASMA');
                */
            }
                            
                var job = {};
                job.title = 'ghost job for '+out.pass_it.offSet;
                jobs.push(job);
               
        },
        error: function(error) {
            msg(error);
        }
    });
    out["jobs"] = jobs;
    return out;
})();
        function anclas_texto_nodo(div,ancladeTexto,quitarPrimeras, quitarUltimas,grupo_etiquetas){
            // anclas_texto_nodo(string, int, int, string)
            ; // "a, p, h1, span"  PONER TODAS LAS ETIQUETAS DONDE ESTE EL SIMBOLO O TEXTO GUIA
            var anclas=[];
            var grupo=[];
            var selectores=div.querySelectorAll(grupo_etiquetas);
            
            
            for (var x in selectores){
                // console.log(etiquetas[x])
                if(selectores[x].textContent){
                if (selectores[x].textContent.indexOf(ancladeTexto) > -1) {  
                    grupo.push(selectores[x]);
                      }
                    }
            }
            
            for(var i=0+quitarPrimeras; i < grupo.length-quitarUltimas; i++){
                anclas.push(grupo[i])
            }
            return anclas;
            }
        
function getDescription(url) {
var xhrrequest = new XMLHttpRequest();
xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
//xhrrequest.setRequestHeader(header, value);
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