(function() {
    var out = {};
    var job = {};
    var selector = 'div.csa_jobadText';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    if(document.querySelector('span[data-fact-id="deadline"]')){
     var aux = document.querySelector('span[data-fact-id="deadline"]').textContent.split(',').shift().trim().split('-');
     if(aux != 'Zo spoedig mogelijk')
      job.dateclosed_raw = aux;
         job.dateclosed_raw = job.dateclosed_raw[1]+'/'+job.dateclosed_raw[0]+'/'+job.dateclosed_raw[2];  
    }
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Meer weten?', true);
    job.html = removeTextAfter(job.html, 'Solliciteren?', true);
    job.html = removeTextAfter(job.html, 'Solliciteren', true);
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