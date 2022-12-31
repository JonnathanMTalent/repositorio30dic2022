//Inland template


//Before extract

(function() {
var out = {};
var selector_jobs = "li.job";
var selector_desc = ".job-description";
//var selector_click_Job = "a";

if (typeof pass_it == "undefined") 
    pass_it = {};
if (!pass_it["cont"]) {
    out["pass_it"] = {
        "cont": 1,
        "salir":false,
        "selector_jobs": selector_jobs,
        //    "selector_click_Job": selector_click_Job,          
        "selector_desc": selector_desc

    };
} else {
    out["pass_it"] = pass_it;
}
msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length);
var elemento = out["pass_it"]["selector_jobs"];
var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]];
if (elem){

    var title = elem.querySelector("").textContent.trim();
    //var url = elem.querySelector("").href.trim();
    var location = elem.querySelector("").textContent.trim();
        /*var fecha = elem.querySelector("").textContent.trim().split("/");
    var dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
    //var dateposted_raw = elem.querySelector("").textContent.trim();
    //var dateclosed_raw = elem.querySelector("").textContent.trim();       
    //var logo = elem.querySelector("").getAttribute("src").trim();
    //var source_apply_email = elem.querySelector("").textContent.trim();
    //var source_empname = elem.querySelector("").textContent.trim();
    //var source_jobtype = elem.querySelector("").textContent.trim();
    //var source_salary = elem.querySelector("").textContent.trim();


out["pass_it"]["title"] = title; 
out["pass_it"]["location"] = location;
//out["pass_it"]["url"] = url;
//out["pass_it"]["dateposted_raw"] = dateposted_raw;
//out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
//out["pass_it"]["logo"] = logo;
//out["pass_it"]["source_apply_email"] = source_apply_email;  
//out["pass_it"]["source_empname"] = source_empname; 
//out["pass_it"]["source_jobtype"] = source_jobtype;
//out["pass_it"]["source_salary"] = source_salary;   

if (typeof(selector_click_Job) == 'undefined'){
    elem.click();
    out.waitFor = out["pass_it"]["selector_desc"];
}else{
    elem.querySelector(selector_click_Job).click();
    out.waitFor = out["pass_it"]["selector_desc"];
}

}else{

msg("EN EL FALSE DE BEFORE");
msg(elemento);
msg(elem);
out["pass_it"]["salir"] = true;
}

return out;
})();



//Extract

(function() {
var out = {};
var jobs = [];
out["pass_it"] = pass_it;
if (out["pass_it"]["salir"]){
var job = {};
job.title = 'holaa';
jobs.push(job);
}else{

// msg(out["pass_it"]["selector"]);
if (document.querySelector(out["pass_it"]["selector_desc"])){
var job = {};
var remove_selectors = ["a", "script", "style"];

    job.title = out["pass_it"]["title"];
    job.location = out["pass_it"]["location"];
    //job.url = out["pass_it"]["url"];
    //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
    //job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];    
    //job.logo = out["pass_it"]["logo"];
    //job.source_apply_email = out["pass_it"]["source_apply_email"];
    //job.source_empname = out["pass_it"]["source_empname"];
    //job.source_jobtype = out["pass_it"]["source_jobtype"];
    //job.source_salary = out["pass_it"]["source_salary"];


    var full_html = document.querySelector(out["pass_it"]["selector_desc"]);
// remove something from the jobdatata
        if (remove_selectors.length > 0) {       
        remove_selectors.forEach(remove_selector => {
            let salir
            do{
            salir = false;
            if (full_html.querySelector(remove_selector)) {
                full_html.querySelector(remove_selector).remove();
                salir = true;
            }
            }while (salir);  
        });
    } 

job.html        = full_html.innerHTML.trim();
job.jobdesc     = full_html.textContent.trim();

//job.html = removeTextBefore(job.html, "", false);
//job.jobdesc = removeTextBefore(job.html, "", false);


//job.html = removeTextAfter(job.html, "", true);
//job.jobdesc = removeTextAfter(job.html, "", true);

job.html        = cleanHTML(job.html);
job.jobdesc     = cleanHTML(job.jobdesc);

job.temp = 1;
jobs.push(job);
    
} else
msg("en el else");
}
//out["pic"] = true;
out["jobs"] = jobs;
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


//Pagination


(function () {
    var out = {};
        
        out["pass_it"] = pass_it;
            out["pass_it"].cont += 1;
    
    
        //window.location.href = '';
            //window.history.back();
            /*if (document.querySelector("span.icon"))
                document.querySelector("span.icon").click();*/
    
    if (out["pass_it"]["salir"])
            out["has_next_page"] = false;
    else
            out["has_next_page"] = true;

    out.waitFor = out["pass_it"]["selector_jobs"];
//out["wait"] = true;
    return out;
})();
