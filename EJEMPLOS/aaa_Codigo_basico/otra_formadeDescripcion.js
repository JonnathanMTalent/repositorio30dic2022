(function() {
    var out = {};
    var job = {};
    var selector = 'span[itemprop="description"]';
  
  if(document.querySelector(selector)) {
      var full_html = document.querySelector(selector);
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  //--------------------------JOB-INFO ------------------------------------//
    if(document.querySelector('meta[itemprop="validThrough"]')){
      var dateClosed = document.querySelector('meta[itemprop="validThrough"]').getAttribute("content").trim();
      if(dateClosed.split(' ')[5]!=null){
        job.dateclosed_raw = getDateFormat(dateClosed, " ", 2, 1, 5);
      }
    }
  //----------------------------------------------------------------------//
   // To Remove selectors 
   for (const a of full_html.querySelectorAll('a, img, script, style, button, div.alert')) {
      if (a){
        a.remove();
      }
    }
      
    for(const a of full_html.querySelectorAll('p')){  //Varios p
    const text = a.textContent.trim();
      if(text.search(/please/i) > -1) a.remove();
      if(text.search(/ apply/i) > -1) a.remove();
      if(text.search(/ call /i) > -1) a.remove();
      if(text.search(/click/i) > -1) a.remove();
      if(text.search(/cv/i) > -1) a.remove();
      if(text.search(/telephone/i) > -1) a.remove();
      if(text.search(/e-mail/i) > -1) a.remove();
      if(text.search(/email/i) > -1) a.remove();
      if(text.search(/https/i) > -1) a.remove();
      if(text.search(/www./i) > -1) a.remove();
      if(text.search(/@/i) > -1) a.remove();
    }
    
  //----------------------------------------------------------------------//
    job.html      = full_html.innerHTML.trim();
  
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
    
    if(job.jobdesc.trim().length < 50){
  
      msg("\x1b[45m FLAG ACTIVE\x1b[45m");
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
  
    }
  
  } else {
  
        msg('\x1b[44m NO HAY SELECTOR');
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