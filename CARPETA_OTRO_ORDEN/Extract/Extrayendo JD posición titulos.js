//Extract con descripción extraida desde la posición de los titulos


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div#WebPartZone1_Page1 h3");
  var y = 1;
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    
    /*
    if(document.querySelector("h3#DirMI")){
    document.querySelector("h3#DirMI").remove();
    }
    */
    
    job.title = elem.textContent.trim();
    job.url = window.location.href;
    job.location = 'Paris, France';
    var full_html = document.querySelector('div#WebPartZone1_Page1 div[class="ma4 mt0"]');
    var partial_description = full_html.textContent.split(/Market Analyst - Phosphates/gi)

    //   job.html1 = partial_description[1];
    //   job.html2 = partial_description[2];

    job.html = partial_description[x];

    job.html = removeTextBefore(job.html, 'Position Overview', false);
    job.html = removeTextAfter(job.html, 'Application', true);

    //job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');true
    tmp.innerHTML = job.html;
    //  job.jobdesc = tmp.textContent.trim();

    // job.jobdesc = cleanHTML(job.jobdesc);

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  }
  out["jobs"] = jobs;
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