//URL: https://bombardier.taleo.net/careersection/2/moresearch.ftl

//Before extract:

(function() {
var out = {};
out.waitFor = "div.editablesection";
out.pic=true;
return out;
})();


//Extract:

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.editablesection");
    var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        
        job.title = elem.querySelector("h3").textContent.trim();
        
        var urlBase = "https://bombardier.taleo.net/careersection/jobdetail.ftl?job="
        var id = elem.querySelector('span[id*="requisitionListInterface.reqContestNumberValue"').textContent.trim();
        var lang = "&lang=en"
        
        job.url = urlBase + id + lang
        
        job.location = elem.querySelector('span[id*="requisitionListInterface.reqBasicLocation"]').textContent.trim();
        job.location = job.location.split("-").reverse().join(", ");
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


//Paginación:

(function(){
    var out = {};
    var cli = 'a[title="Go to the next page"]';
    if (msg == "undefined") msg = console.log;

    var num = "span.pagerlabel"; //selector con el texto que indica la cantidad de jobs en el jobsite 
    var textPaginador = document.querySelector(num).textContent.trim();

    var max = textPaginador.trim().split("of")[1]; 
    var min = textPaginador.trim().split("Page")[1].split("out")[0]; 
    //var rex = /\d+(?!\.)/;  
    //var max = rex.exec(max);  

    //msg("\x1b[43m MAX: \x1b[0m"+max);
    //msg("\x1b[43m MIN: \x1b[0m"+min);

    if(parseInt(min, 10) == parseInt(max, 10)){
        msg('\x1b[41m Fin de la paginacion \x1b[0m');
        out["has_next_page"] = false;
    } else {
        document.querySelector(cli).click();
        msg('\x1b[43m'+min+" - "+ max+'\x1b[0m');

        out["has_next_page"] = true; 
    } 

    out["wait"] = 10000;
    out["pic"] = true;
    return out;
})(); 


//Job description:

(function() {
    var out = {};
    var job = {};
    var selector = "div.editablesection";
    var remove_selectors = [".contentlinepanel:first-child"];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;

    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'DESCRIPTION', false);  
    job.html = removeTextAfter(job.html, 'All internal employees', true);
    job.html = removeTextAfter(job.html, 'We thank all applicants for their interest', true);

    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);

    out["job"] = job;
    return out;

})();

function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
        newHtml = "<h2>" + text + "</h2>" + newHtml;
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


//Spider config:

{
"options": {
    "inactivateJQuery": true,
    "ignoreLoadErrors": false,
    "waitForResources":  true,
    "waitForPageLoadEvent": true
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}