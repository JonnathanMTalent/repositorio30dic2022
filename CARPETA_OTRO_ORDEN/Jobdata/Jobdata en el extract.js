
//Job descripción desde el extract removiendo selectores

(function() {
    var out = {};
    var jobs = [];
    var html_jobs = document.querySelectorAll("div.position-card");
    // .replace(/\(.*?\)/g, '')

    for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        var remove_selectors = ["h3"];
        job.title = elem.querySelector("h3").textContent.trim();
        job.url = window.location.href;
        job.location = "Correggio, Italia";
        /*var fecha = elem.querySelector("").textContent.trim().split("/");
        job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.html = elem;

        if (remove_selectors.length > 0) {       
            remove_selectors.forEach(remove_selector => {
                let salir
                do{
                salir = false;
                if (job.html.querySelector(remove_selector)) {
                    job.html.querySelector(remove_selector).remove();
                    salir = true;
                }
                }while (salir);  
            });
        } 
        
        job.html = job.html.innerHTML.trim()

        //job.html = removeTextBefore(job.html, '', false);
        job.html = removeTextAfter(job.html, "Gli interessati", true);

        job.html = cleanHTML(job.html);
        job.jobdesc 	= job.html;

        job.temp = 1;
        jobs.push(job);
    }  

    out["jobs"]= jobs;
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


//Otra forma

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("");
    var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
  
        //job.title    = elem.querySelector("").textContent.trim();
        //job.location = elem.querySelector("").textContent.trim();
        job.url      = window.location.href; /*elem.querySelector("").href.trim();*/
  
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary  = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.logo               = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.dateposted_raw     = elem.querySelector("").textContent.trim();
      
          //-----JOB-DESC-------------------------------------------------------
          
        var remove_selectors = []; 
        var full_html = elem;
            // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        
        job.html    = full_html.innerHTML.trim();    
        job.jobdesc = full_html.textContent.trim();
         
        //job.html = removeTextBefore(job.html, "", false);  
        //job.html = removeTextAfter(job.html, "", true);
          
        //job.jobdesc	=	removeTextBefore(job.jobdesc, "", false);
        //job.jobdesc	=	removeTextAfter(job.jobdesc, "", true);
          
        job.html    = cleanHTML(job.html);
        job.jobdesc = cleanHTML(job.jobdesc);
 
        job.temp = "1";
        
        //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
        jobs.push(job);
        //}
    } 
    out["jobs"]= jobs;
    return out;
  })();