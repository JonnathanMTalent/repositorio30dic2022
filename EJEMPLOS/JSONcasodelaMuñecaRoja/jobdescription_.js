(function() {
    var out = {};
    var job = {};
    var selector = ".posting .content";
    var remove_selectors = [];
    let removeSelectors = document.querySelectorAll("a,script,input,button,img,div.alert,form,footer,style");
    removeSelectors.forEach((elemento) => elemento.remove());
    
     if(document.querySelector(selector)){
  
    //Elimina selectores con un texto en particular
    let elements = document.querySelectorAll("p");
    elements.forEach((elemnt) => {
      if (elemnt.textContent.match(/www/gi)) elemnt.remove();
    });
  
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'This job opportunity is with one of our', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    
    if (job.jobdesc.length<50){ job.flag_active = 0}
       
       }
    else {job.flag_active = 0}
    
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