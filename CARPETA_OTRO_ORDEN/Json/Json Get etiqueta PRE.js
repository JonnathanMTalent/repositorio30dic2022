//Json Get


URL: https://jbhunt.wd5.myworkdayjobs.com/Careers/

Extract:

(function() {
  var out = {};
  // var html_jobs = document.querySelectorAll("");
  //  This gives you an HTMLElement object

  if(typeof pass_it == "undefined") pass_it = {};
  msg("***************************************");
  //msg(pass_it);
  //msg(window.location.href);
  msg("***************************************");
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 50,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  //var element = document.querySelector("pre").textContent;
  //msg(element);
  var jobs =  pass_it["json"];

  var returnedJobs = [];    
  if(!jobs){
    var element = document.querySelector("pre").textContent;
    //msg(element);
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
  }
  //msg(typeof(jobs));
  for(i in jobs) {
    var job = {};/*init*/
    // msg("Entre")
    var link	 = "https://jbhunt.wd5.myworkdayjobs.com";
    job.title 	 = jobs[i].title.instances[0].text;
    job.title	 = job.title.split("(").shift();
    job.url		 =  link + jobs[i].title.commandLink;
    job.location = jobs[i].subtitles[1].instances[0].text.split("-").reverse().join(", ");
    job.location = job.location;

    job.temp = 5;
    returnedJobs.push(job);

  }
  //msg(jobs);
  //msg(returnedJobs.length);

  out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
  return out;
})();


Paginación:

(function() {
  var out = {};

  if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  if (out["pass_it"]["jobs"] == 50) {

    //url, cambia según el JSON
    var url = "https://jbhunt.wd5.myworkdayjobs.com/Careers/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont
    + "?clientRequestID=beef1fda17f0492a9a3ffb8da9271367";
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }

  return out;
})();


Job Descriptión:

(function() {
  var out = {};
  var job = {};
  var selector = "#mainContent";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'Job Summary:', false);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
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

