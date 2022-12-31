// Extract con selector iframe


//Before extract

(function() {
  var out = {};
  out.iframeSelector = "iframe#iFrameResizer0";
  out.iframeWaitFor = "div#row_element > div:not(:first-child)";
  return out;
})();

//Extract

(function() {
  var out = {};
  var iframe_selector = "main > iframe";
  var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
  var html_jobs = iframeDocument.querySelectorAll("#job-list > div"); // Loop selector

  var jobs = [];
  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job  = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector('p > a').textContent.trim();
    job.reqid = elem.querySelector('p > a').href.split("job=")[1].trim();
    job.url = elem.querySelector('p > a').href.trim();
    job.location = elem.querySelector('p > span').textContent.trim();

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    
    job.temp = 122020;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();


//Job description

(function() {
  var out = {};
  var job = {};
  var selector = "td#gnewtonJobDescriptionText";
  var remove_selectors = ["a"];
  //var job = pass_it["job"];

  var iframe_selector = "iframe#gnewtonIframe";   
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var full_html = iframeDocument.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  //------------INFO----------------------------------------------------------//

  // job.location             = iframeDocument.querySelector('').textContent.trim();
  // job.source_jobtype       = iframeDocument.querySelector('').textContent.trim();
  // job.source_salary        = iframeDocument.querySelector('').textContent.trim();

  //var datePosted     = iframeDocument.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"",0,1,2);

  //--------------------------------------------------------------------------//

  //var full_html_text = full_html.textContent;
  /*
    for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.includes('Type')){ //can us search or match methods
        job.location = a.textContent.trim(); //.split(':').pop(); //another querySelector if needed
        //a.remove(); //if you want to remove this selector
      } 
    }
*/

  /*if(full_html_text.trim().length < 200){
  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{*/

  job.html    = full_html.innerHTML.trim();
  job.jobdesc = full_html.textContent.trim();

  job.html = removeTextBefore(job.html, 'Summary', false);
  job.html = removeTextBefore(job.html, 'SUMMARY', false);

  job.html = removeTextAfter(job.html, 'INDEED', true);
  job.html = removeTextAfter(job.html, 'Application Process', true);

  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];

  /*
  if(job.html.indexOf("-")>-1 && job.html.indexOf("")>-1){

    let a = job.html.indexOf("");
    let b = job.html.indexOf("");
    let x = job.html.slice(a,b);
    job.html = job.html.replace(x,"").trim();
  }
*/

  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

  //var title = pass_it["job"].title;
  //job.html  = job.html.replace(title,"");

  //CLEAN EMOJIS
  //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();


  job.html    = cleanHTML(job.html);
  job.jobdesc = job.html;
  //}

  out["job"] = job;
  return out;

})();

function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = text + " " + newHtml;
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

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g,"").trim();

  let day   =  dateRaw.split(cut)[dayPosition], 
      month =  dateRaw.split(cut)[monthPosition], 
      year  = dateRaw.split(cut)[yearPosition];

  if(dateRaw.search(/[a-z]/gi)>-1){ 
    if(month.search(/jan/i)>-1){month = "01";}
    if(month.search(/feb/i)>-1){month = "02";}
    if(month.search(/mar/i)>-1){month = "03";}
    if(month.search(/apr/i)>-1){month = "04";}
    if(month.search(/may/i)>-1){month = "05";}
    if(month.search(/jun/i)>-1){month = "06";}
    if(month.search(/jul/i)>-1){month = "07";}
    if(month.search(/aug/i)>-1){month = "08";}
    if(month.search(/sep/i)>-1){month = "09";}
    if(month.search(/oct/i)>-1){month = "10";}
    if(month.search(/nov/i)>-1){month = "11";}
    if(month.search(/dec/i)>-1){month = "12";}
  }
  var datum = month +"/"+  day +"/"+ year;
  return datum;
}

