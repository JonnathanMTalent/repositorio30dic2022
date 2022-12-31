//Extract sencillo descripción en la misma pagina:

(function() {
var out = {};
var html_jobs = document.querySelectorAll("");
var jobs = [];
for(var x in html_jobs){
    
if(typeof html_jobs[x] =="function") continue;
if(typeof html_jobs[x] =="number") continue;
var job = {};
var elem = html_jobs[x];
var desc = document.querySelectorAll('')[x];

job.title = elem.querySelector("h2").textContent.trim();
job.url = window.location.href;
job.location = "Cherry Hill, NJ, Estados Unidos";

//job.dateposted_raw = elem.querySelector("").textContent.trim();
//job.logo = elem.querySelector("").getAttribute("src").trim();
//job.source_empname = elem.querySelector("").textContent.trim();
//job.source_jobtype = elem.querySelector("").textContent.trim();
//job.source_salary = elem.querySelector("").textContent.trim();

    
job.html      = desc.innerHTML.trim();    
    
//job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
//job.html = removeTextAfter(job.html, 'Application Instructions', true);

if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

  
job.html      = cleanHTML(job.html);
var tmp       = document.createElement('div');
tmp.innerHTML = job.html;
job.jobdesc   = tmp.textContent.trim();
job.jobdesc   = cleanHTML(job.jobdesc);

job.temp = 2;
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
