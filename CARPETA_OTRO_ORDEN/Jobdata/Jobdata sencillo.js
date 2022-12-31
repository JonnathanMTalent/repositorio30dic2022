//Job description


(function() {
  var out = {};
  var job = {};
  var selector = "";
  var remove_selectors = [];
  //var job = pass_it["job"];

  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html 		= full_html.innerHTML.trim();
  job.jobdesc 	= full_html.textContent.trim();

  //job.html = removeTextBefore(job.html, "", false);  
  //job.html = removeTextAfter(job.html, "", true);
          
  //job.jobdesc	=	removeTextBefore(job.jobdesc, "", false);
  //job.jobdesc	=	removeTextAfter(job.jobdesc, "", true);

  job.html 		= cleanHTML(job.html);
  job.jobdesc 	= cleanHTML(job.jobdesc);

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