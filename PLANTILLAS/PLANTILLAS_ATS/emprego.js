(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.content-display.adjust.clearfix ul');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('h3 a').textContent.trim();
        job.url = elem.querySelector('h3 a').href.trim();
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj OBTENIENDO LA DESCRIPCION

        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html;
        var desc = div.querySelector('div.content-col-1-2');
        job.location=anclas_texto_nodo(div,"Local",0,0,"li")[0].querySelectorAll('span')[1].textContent.trim()+", Angola";
        var datess=anclas_texto_nodo(div,"Publicado",0,0,"li")[0].querySelectorAll('span')[1].textContent.trim().split('.');
        job.dateposted_raw= datess[1]+"/"+datess[0]+"/"+datess[2];


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