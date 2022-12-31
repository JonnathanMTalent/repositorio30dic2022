(function() {
    var out = {};
    var job = {};
  
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    // estas dos variables es lo mismo que en el extrac pero en el concat le cambio job.url por window.location
    var concat = window.location.href.split("job/").pop().trim();
    var company_site = window.location.href.split("/job").shift().trim();
    var json_desc = JSON.parse(getDescription(`https://compassion.wd5.myworkdayjobs.com/wday/cxs/compassion/CompassionCareers/job/${concat}`));
  
    var full_html = json_desc.jobPostingInfo.jobDescription;
  
    job.html      = full_html.trim();    
  
    //Other
    job.html = removeTextAfter(job.html, 'Why work here?', true);
  
    job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\d{3,}|www\.\S+|(https|http):\/\/\S+|\(\d+\)/gi, "");
    job.html = job.html.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,"");
  
  
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
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
  
  
    xhrrequest.send(); 
    return response;
  }