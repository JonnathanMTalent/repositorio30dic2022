(function() 
 {var out = {};
  var job = {};
  var selector = "span.jobdescription";
  var remove_selectors = [];
  //var job = pass_it["job"];

  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {$(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  for(const b of document.querySelectorAll("span.joblayouttoken-label")){
    if(b.textContent.includes("Job Location/Region")){
      var city = b.nextElementSibling.textContent.trim();
    }
    if(b.textContent.includes("Job State/Province")){
      var state = b.nextElementSibling.textContent.trim();
    }
    if(b.textContent.includes("Job Country")){
      var country = b.nextElementSibling.textContent.trim();
    }
    job.source_location = city+", "+state+", "+country;
    job.source_location = job.source_location.split("#").shift();
    job.location = city+", "+state+", "+country;
    job.location = job.location.split("#").shift();
    if(job.location.indexOf(", , ") > -1) {
      job.location =  "Melbourne, Victoria";
    }
  }  
  if(job.location.indexOf("undefined, undefined")>-1){job.location = "Melbourne, Victoria, AU"}
  if(!job.location){job.location = "Melbourne, Victoria, AU"}
  if(job.location.length < 2) { job.location = "Melbourne, Victoria, AU"; }

  /* var city= document.querySelector("div.job > div:nth-child(6)").textContent.replace("Job Location/Region:","").trim();
  var state = document.querySelector("div.job > div:nth-child(5)").textContent.replace("Job State/Province:","").trim();
  var country = document.querySelector("span.jobGeoLocation").textContent.replace("Job Country:","").trim();
  job.location = city+", "+state+", "+country;
  if(job.location.indexOf(", , ") > -1) {
    job.location =  "Melbourne, Victoria";
  }   */


  job.html = full_html.innerHTML.trim();
  job.jobdesc = full_html.textContent.trim();

  job.html = cleanHTML(job.html);
  job.jobdesc = cleanHTML(job.jobdesc);

  job.html = removeTextBefore(job.html, "Job Description", false);
  job.jobdesc = removeTextBefore(job.jobdesc, "Job Description", false);

  job.html = removeTextAfter(job.html, "Supporting a Diverse Workforce", true);
  job.jobdesc = removeTextAfter(job.jobdesc, "Supporting a Diverse Workforce", true);
  job.html = removeTextAfter(job.html, "Supporting a diverse workforce", true);
  job.jobdesc = removeTextAfter(job.jobdesc, "Supporting a diverse workforce", true);
  job.html = removeTextAfter(job.html, "BHP also requires employees in", true);
  job.jobdesc = removeTextAfter(job.jobdesc, "BHP also requires employees in", true);

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-])\/?/gi,"");  }

  job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');


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