(function() {
    var out = {};
    var job = {};
    var selector = "div.iCIMS_JobContent";
    var remove_selector = "a";
    //var job = pass_it["job"];
  
    var iframe_selector = "#icims_iframe_span > iframe";   
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  
    var full_html = iframeDocument.querySelector(selector);
    // remove something from the jobdatata 
    if (remove_selector != "") full_html.querySelector(remove_selector).remove();
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
     if(iframeDocument.querySelectorAll("div.iCIMS_JobHeaderGroup > dl:nth-child(4)").length > 0){    
    var jobtype = iframeDocument.querySelector("div.iCIMS_JobHeaderGroup > dl:nth-child(4)").textContent.trim();
    if(jobtype.indexOf("Employee Type") > -1) {
    job.source_jobtype = iframeDocument.querySelector("div.iCIMS_JobHeaderGroup > dl:nth-child(4) > dd").textContent.trim();  
    }
    }
    
    for (const a of full_html.querySelectorAll("a")) {        
            if (a.textContent.includes("https")){//tambien se puede usar search o match
          a.remove();
      }
      }
    
    job.html 		= full_html.innerHTML.trim();
    job.jobdesc 	= full_html.textContent.trim();
    
    job.html = removeTextBefore(job.html, "Overview", false);
    //job.jobdesc = removeTextBefore(job.jobdesc, "Overview", false);
    job.html = removeTextAfter(job.html, "Application FAQs", true);
    //job.jobdesc = removeTextAfter(job.jobdesc, "Application FAQs", true);
    job.html =  removeTextAfter(job.html, "Options", true);
    //job.jobdesc = removeTextAfter(job.jobdesc, "Options", true);
    job.html =  removeTextAfter(job.html, "FM Global is an Equal Opportunity", true);
    //job.jobdesc = removeTextAfter(job.jobdesc, "FM Global is an Equal Opportunity", true);
    //job.html =  removeTextAfter(job.html, "FM Global is an Equal Opportunity", true);
    job.html = job.html.replace("Join us for thirty minutes by clicking the link below","");
    
    job.html 		= cleanHTML(job.html);
    job.jobdesc 	= job.html;
  
    /*job.html = removeTextBefore(job.html, "Overview", false);
    job.jobdesc = removeTextBefore(job.jobdesc, "Overview", false);
    job.html = removeTextAfter(job.html, "Application FAQs", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "Application FAQs", true);
    job.html =  removeTextAfter(job.html, "Options", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "Options", true);
    job.html =  removeTextAfter(job.html, "FM Global is an Equal Opportunity", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "FM Global is an Equal Opportunity", true);*/
    
    out["job"] = job;
    return out;
  
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
  })();