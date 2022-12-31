//Before extract
(() => {
  let out = {};
  out.iframeSelector = "#icims_content_iframe";
  out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable .row";
  return out;
})();

//Extract
(async () => {
  let out = {};
  let iframeDocument = document.querySelector("#icims_content_iframe").contentWindow.document;
  let html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable .row");
  let jobs = [];

  for (let elem of html_jobs) {
    let job = {};
    job.title = elem.querySelector("a.iCIMS_Anchor h2").textContent.trim();
    job.url = elem.querySelector("a.iCIMS_Anchor").href.trim() + "&mode=job&iis=Neuvoo";
    job.source_location = elem.querySelector(".col-xs-6.header.left span:nth-child(2)").textContent.trim();
    job.location = job.source_location;
    job.reqid = elem.querySelector('.additionalFields div:nth-child(1) dd').textContent.trim();
    job.dateposted_raw = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").trim().split(" ").shift();
    job.dateposted_raw = job.dateposted_raw.split('/');
    job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[0]}/${job.dateposted_raw[2]}`;
    job.temp = 8;

    const resp = await fetch(job.url),
      html = await resp.text(),
      div = document.createElement('div');

    div.innerHTML = html;

    let full_html = div.querySelector("div.iCIMS_JobContent");
    const experience = [];
    const regexEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;
    const regexJobtype = /Full Time|Full-Time|Part Time|Part-Time/i;

    for (let elem of full_html.querySelectorAll(".iCIMS_JobHeaderGroup dl dd"))
      if (regexJobtype.test(elem.textContent))
        job.source_jobtype = regexJobtype.exec(elem.textContent)[0];

    if (regexEmail.test(full_html.textContent))
      job.source_apply_email = regexEmail.exec(full_html.textContent)[0];

    for (let li of full_html.querySelectorAll("li")) {

      if (/years|year|month|Months|anni|ans|mesi|jaar|maand/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring/i.test(li.textContent)
        && /\d|one|two|three|four|five|six|seven|eight|nine|ten/.test(li.textContent))
        experience.push(li.textContent);

    }

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style,.container-fluid.iCIMS_JobsTable,.iCIMS_Logo,.iCIMS_JobOptions")) el.remove();

    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'The Impact You Will Make', false);
    job.html = removeTextAfter(job.html, 'Grubhub is an equal opportunity employer', true);
    job.html = cleanHTML(job.html);
    const description = document.createElement("div");
    description.innerHTML = job.html;
    job.jobdesc = description.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    if (experience.length > 0)
      job.experience_required = experience.join("\n").trim();
    else if (tagExperienceRequired(description))
      job.experience_required = tagExperienceRequired(description);

    if (job.location.indexOf("|") > -1) {
      let locations = job.location.split("|");
      locations.forEach((loc) => {
        let jobx = { ...job };
        jobx.location = loc.trim().split("-").reverse().join(", ").replace('Remote, ', '');
        jobs.push(jobx);
      });
    } else {
      job.location = job.location.split("|").shift().trim();
      job.location = job.location.split("-").reverse().join(", ").replace('Remote, ', '');
      job.location = job.location.replace(/\ , /g, ", ");
      jobs.push(job);
    }

  }

  out.jobs = jobs;
  return out;
})();

function removeTextBefore(html, text, flag) {
  let newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  let newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }
  }
  return newHtml;
}

function tagExperienceRequired(description) {
  let primerFiltro = [];
  description.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia|tecrübeli/gi) && word.textContent.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
      if (word.innerText.match(/experience|expérience|ervaring|erfahrung|esperienza/gi))
        primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
    }
    primerFiltro = primerFiltro.flat();
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
  var segundoFiltro = [];
  deleteDuplicados.forEach(elem => {
    if (elem.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && elem.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/g) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|dans/gi))
      segundoFiltro.push(elem.trim());
  });
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
  return arrayFinal[0];
}

//Pagination
(function () {
  var out = {};
  var iframeDocument = document.querySelector("iframe#icims_content_iframe").contentWindow.document;
  var clickable_elem = iframeDocument.querySelector('div.iCIMS_Paginator_Bottom > div > a[class="glyph "]:nth-last-child(2)');

  if (clickable_elem) {
    clickable_elem.click();
    out.has_next_page = true;
  } else out.has_next_page = false;

  out.iframeSelector = "iframe#icims_content_iframe";
  out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable .row";
  return out;
})();





// *****************************************************************
// *****************************************************************
// *****************************************************************
// *****************************************************************
// *****************************************************************

//OTRA FORMA DE TODO EN EL EXTRACT


// *****************************************************************
// *****************************************************************

//Before extract
(() => {
  let out = {};
  out.iframeSelector = "#icims_content_iframe";
  out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable .row";
  return out;
})();




//Extract
(async () => {
  var out = {};
  var jobsSelector = ".container-fluid.iCIMS_JobsTable .row";
  var returnedJobs = [];
  var html_jobs = [];
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var iframe_selector = "iframe#icims_content_iframe";   
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  html_jobs = iframeDocument.querySelectorAll(jobsSelector);
  for (var x in html_jobs) {
    var job = {};/*init*/
    var elem = html_jobs[x];
    if (typeof elem == "function") continue;
    if (typeof elem == "number") continue;
    job.title = elem.querySelector(".col-xs-12.title h2").textContent.trim();
    job.url = elem.querySelector(".iCIMS_Anchor").href.trim()+"&mode=job&iis=Neuvoo";
    job.reqid=job.url.split("/")[4];
    job.location = elem.querySelector("div.col-xs-6.header.left > span:nth-child(2)").textContent.trim();
    //job.dateposted_raw = elem.querySelector("div:nth-child(2) > span:nth-child(2)").getAttribute("title").trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("div.col-xs-12.additionalFields > div > dl:nth-child(2) > dd > span").textContent.trim();
    //job.source_jobtype = elem.querySelector("div.col-xs-12.additionalFields > div > dl:nth-child(3) > dd > span").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = "Nov-2020";


    const resp = await fetch(job.url),
      html = await resp.text(),
      div = document.createElement('div');

    div.innerHTML = html;

    let full_html = div.querySelector("div.iCIMS_JobContent");
    const experience = [];
    const regexEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;
    const regexJobtype = /Full Time|Full-Time|Part Time|Part-Time/i;

    for (let elem of full_html.querySelectorAll(".iCIMS_JobHeaderGroup dl dd"))
      if (regexJobtype.test(elem.textContent))
        job.source_jobtype = regexJobtype.exec(elem.textContent)[0];

    if (regexEmail.test(full_html.textContent))
      job.source_apply_email = regexEmail.exec(full_html.textContent)[0];

    for (let li of full_html.querySelectorAll("li")) {

      if (/years|year|month|Months|anni|ans|mesi|jaar|maand/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring/i.test(li.textContent)
        && /\d|one|two|three|four|five|six|seven|eight|nine|ten/.test(li.textContent))
        experience.push(li.textContent);

    }

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style,.container-fluid.iCIMS_JobsTable,.iCIMS_Logo,.iCIMS_JobOptions")) el.remove();

    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'The Impact You Will Make', false);
    job.html = removeTextAfter(job.html, 'Grubhub is an equal opportunity employer', true);
    job.html = cleanHTML(job.html);
    const description = document.createElement("div");
    description.innerHTML = job.html;
    job.jobdesc = description.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    if (experience.length > 0)
      job.experience_required = experience.join("\n").trim();
    else if (tagExperienceRequired(description))
      job.experience_required = tagExperienceRequired(description);

    if(job.location.indexOf("|")>-1){
      var array = job.location.split("|");  
      //for (var i = 0; i < array.length; i++){      
      for (var i in array){
        var jobx = {};
        jobx.title = job.title
        jobx.url = job.url
      // jobx.dateposted_raw = job.dateposted_raw
        jobx.temp = job.temp
        jobx.location = array[i].trim();
        jobx.location = jobx.location.split("-").reverse().join(", ");
        jobx.location = jobx.location.replace("...","").trim();
        jobx.source_empname = job.source_empname;
        if(job.title.length > 0 && job.location.length > 0){    
        returnedJobs.push(jobx);
        }
      }
    }
    else{
      job.location = job.location.split("-").reverse().join(", ");
      job.location = job.location.replace("...","").trim();
      if(job.title.length > 0 && job.location.length > 0){    
        returnedJobs.push(job);
        }
    }

  // returnedJobs.push(job);
  }
  out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"] = returnedJobs;
  return out;
})();

function removeTextBefore(html, text, flag) {
  let newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  let newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }
  }
  return newHtml;
}

function tagExperienceRequired(description) {
  let primerFiltro = [];
  description.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia|tecrübeli/gi) && word.textContent.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
      if (word.innerText.match(/experience|expérience|ervaring|erfahrung|esperienza/gi))
        primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
    }
    primerFiltro = primerFiltro.flat();
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
  var segundoFiltro = [];
  deleteDuplicados.forEach(elem => {
    if (elem.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && elem.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/g) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|dans/gi))
      segundoFiltro.push(elem.trim());
  });
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
  return arrayFinal[0];
}


//Pagination
(function () {
  var out = {};
  var iframeDocument = document.querySelector("iframe#icims_content_iframe").contentWindow.document;
  var clickable_elem = iframeDocument.querySelector('div.iCIMS_Paginator_Bottom > div > a[class="glyph "]:nth-last-child(2)');

  if (clickable_elem) {
    clickable_elem.click();
    out.has_next_page = true;
  } else out.has_next_page = false;

  out.iframeSelector = "iframe#icims_content_iframe";
  out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable .row";
  return out;
})();




