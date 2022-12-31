(function() {
  var out = {};
  var job = {};
  var selector = 'div.card-block'; //description selector
  var remove_selectors = ["div.we-tab > div > div:nth-child(1)" , "div.we-tab > div > div > div.row.bg-info"]; //array of selectors to delete
  //var job = pass_it["job"];
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  var full_html = document.querySelector(selector);

  if(full_html){ //verification of selector desrcription existance
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;

    //////////////////////email extraction
    for (const a of full_html.querySelectorAll("p")) {
      if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){//search, match, includes, indexOf can be used
        if(a.textContent.search(/CV|resume|cover letter|curriculum/gi)>-1)
          job.source_apply_email = a.textContent.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-z]{2,12}(?:\.[a-z]{2})?/gi)[0];
        console.log(job.source_apply_email);
        //a.remove(); //removes the selector that contains the email
      } 
    }


    if(document.querySelector('div:nth-child(4) > div > div:nth-child(1) > div:nth-child(3) > div')){
      job.location = document.querySelector(' div:nth-child(4) > div > div:nth-child(1) > div:nth-child(3) > div').textContent.trim();
    }else{
      job.location = 'Stavanger, NO';
    }
    msg(job.location);


    job.dateposted_raw = document.querySelector('').textContent.trim();
    //job.dateclosed_raw = document.querySelector('').textContent.trim();
    //job.logo = document.querySelector('').getAttribute('src').trim();
    //job.source_apply_email = document.querySelector('').textContent.trim();
    //job.source_empname = document.querySelector('').textContent.trim();
    //job.source_jobtype = document.querySelector('').textContent.trim();
    //job.source_salary = document.querySelector('').textContent.trim();

    // remove something from the jobdatata
    if (remove_selectors.length > 0) 
      remove_selectors.forEach(remove_selector => {
        if(full_html.querySelector(remove_selector)){ 
          for (const a of full_html.querySelectorAll(remove_selector)) {
            a.remove();
          } 
        }
      });

    //////////////////////remove a selector ones
    //if (full_html.querySelector('')) full_html.querySelector('').remove(); //another way to remove a singular selector

    job.html 		= full_html.innerHTML.trim();    

    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);

    job.html 		  = cleanHTML(job.html);
    var tmp       = document.createElement('DIV');
    tmp.innerHTML = job.html;
    job.jobdesc 	= tmp.textContent.trim();
    job.jobdesc 	= cleanHTML(job.jobdesc);

    //to inactivate the job with poor description
    // if(job.jobdesc.length < 250)
    //   job.dateclosed_raw = '01/01/1999';

  }/*else{
    msg("Job Inactivo");
    job.flag_active = 0;
    job.dateclosed_raw = '01/01/1999';
  }*/

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