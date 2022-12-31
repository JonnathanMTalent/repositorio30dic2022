//Plataforma icims

//Caso de uso: http://boo.neuvoo.com/boo3-web/qa/app/index.php?empcode=cibc-us&scanid=192612


//Before extract

(function() {
var out = {};
out.iframeSelector = "iframe#icims_content_iframe";
out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable > div";
out.pic = true;
return out;
})();



//Extract


(function() {
var out = {};
var iframe_selector = "iframe#icims_content_iframe";
var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable > div");
var jobs = [];

for(var x in html_jobs){
  if (typeof html_jobs[x] === "function") continue;
  if (typeof html_jobs[x] === "number") continue;
  var job = {};
  var elem = html_jobs[x];

  job.title = elem.querySelector("div.col-xs-12.title > a > span:nth-child(2)").textContent.trim();
  
  job.reqid = elem.querySelector("div.col-xs-12.title > a").href.split("/")[4].trim();
  job.url = elem.querySelector("div.col-xs-12.title > a").href.trim()+"?__jvst=Job Board&__jvsd=talent";

  job.location = elem.querySelector("dl:nth-child(4) > dd > span").textContent.trim();
  job.location = job.location.split("-").reverse().join(", ");

  job.source_jobtype = elem.querySelector('dl:nth-child(2) > dd > span').textContent.trim();

  //job.source_jobtype = elem.querySelector('').textContent.trim();
  //job.source_salary  = elem.querySelector('').textContent.trim();
  //job.experienced_required = elem.querySelector('').textContent.trim();
  //job.source_empname = elem.querySelector('').textContent.trim();
  //job.logo = elem.querySelector('').getAttribute("src").trim();


  job.temp  = 22021;

  jobs.push(job);
} 
out["jobs"]= jobs;
return out;
})();


//Before pagination

(function() {
var out = {};
out.iframeSelector = "iframe#icims_content_iframe";
out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable > div";
return out;
})();


//pagination

(function() { 
var out = {};
var next_page_selector = 'a[class="glyph "] > span[title="Next page of results"]'; //selector to identify the next button

var iframe_selector = "iframe#icims_content_iframe";   
var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
//stop condition
var clickable_elem = iframeDocument.querySelector(next_page_selector);

if(clickable_elem){
  //go to next page
  clickable_elem.click();
  out["has_next_page"] = true;
} else {
  //try again
  out["has_next_page"] = false;
}
out.iframeSelector = "iframe#icims_content_iframe";
out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable > div";
return out;
})();


//Before jobdescription


(function() {
var out = {};
out.iframeSelector = "iframe#icims_content_iframe";
out.iframeWaitFor = "div.iCIMS_JobContent";
return out;
})();


//Job description

(function() {
var out = {};
var job = {};
var iframe_selector = 'iframe#icims_content_iframe';
var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
var selector = 'div.iCIMS_JobContent'; 
var remove_selectors = ['img', 'video', 'button', 'input', 'style', 'p[style="margin-bottom: 12pt; text-align: center;"]',
                        'javascript', 'script', '.iCIMS_JobHeaderGroup'];

if (iframeDocument.querySelector(selector)) {
  var full_html = iframeDocument.querySelector(selector);
  // Remove something from the jobdatata
  if (remove_selectors.length > 0) 
    remove_selectors.forEach(function(e){ if (full_html.querySelector(e)) full_html.querySelector(e).remove();});

    
  if (typeof cleanHTML === "undefined") cleanHTML = function(x){return x};
  if (typeof msg === "undefined") msg = console.log;


  if (iframeDocument.querySelector('div.container-fluid.iCIMS_JobsTable > div > div.col-xs-6.header.left > span:nth-child(2)')){
    job.location = iframeDocument.querySelector('div.container-fluid.iCIMS_JobsTable > div > div.col-xs-6.header.left > span:nth-child(2)').textContent.trim();
    job.location = job.location.split("-").reverse().join(", ");
  }


  job.html = full_html.innerHTML.trim();    


  job.html = removeTextBefore(job.html, 'Overview', true);
  job.html = removeTextAfter(job.html, 'Options', true); 

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

  job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

  let selectorExpre = 'div.iCIMS_JobContent'; //Selector del jobdata (también puede ser p, div, span)
  let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
  for (const a of iframeDocument.querySelectorAll(selectorExpre)) {
    if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
      if (a.textContent.match(regextwo)) {
        job.experience_required = a.innerText.match(regextwo)[0];
        job.experience_required = job.experience_required.replace("18+ years","").trim();
        job.experience_required = job.experience_required.replace("50 years","").trim();
      }else{
        job.experience_required = '';
      }
    }
  }


job.html = cleanHTML(job.html);
var tmp = document.createElement('div');
tmp.innerHTML = job.html;
job.jobdesc = tmp.textContent.trim();
job.jobdesc = cleanHTML(job.jobdesc);

if (job.jobdesc.length < 120) {
  job.flag_active = 0; 
  job.html= "";  
  job.jobdesc = '';
}
} else {
job.flag_active = 0; 
job.html = ""; 
job.jobdesc = '';
}


out["job"] = job;
return out;
})();

function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) 
  newHtml = newHtml.split(text).pop();
if (!flag) 
  newHtml = "<h3>" + text + "</h3>" + newHtml;
return newHtml;
}

function removeTextAfter(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) 
  newHtml = newHtml.split(text).shift();
if (!flag) 
  newHtml = newHtml + "<p>" + text + "</p>";    
return newHtml;
}

