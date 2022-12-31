//Before extract
(() => {
  let out = {};
  out.iframeSelector = "#icims_content_iframe";
  out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable .row";
  return out;
})();

//Extract
(() => {
  let out = {};
  let iframeDocument = document.querySelector("#icims_content_iframe").contentWindow.document;
  let html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable .row");
  let jobs = [];

  for (let elem of html_jobs) {
    let job = {};
    let multilocation = "|";

    job.title = elem.querySelector("a.iCIMS_Anchor h2").textContent.trim();
    job.url = elem.querySelector("a.iCIMS_Anchor").href.trim() + "&mode=job&iis=Neuvoo";
    job.source_location = elem.querySelector(".col-xs-6.header.left span:nth-child(2)").textContent.trim();
    job.location = job.source_location;
    job.reqid = elem.querySelector('.additionalFields div:nth-child(1) dd').textContent.trim();
    job.dateposted_raw = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").trim().split(" ").shift();
    job.dateposted_raw = job.dateposted_raw.split('/');
    job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[0]}/${job.dateposted_raw[2]}`;
    job.temp = 8;

    if (job.location.indexOf(multilocation) > -1) {
      let locations = job.location.split(multilocation);
      locations.forEach((loc) => {
        let jobx = { ...job };
        jobx.location = loc.trim().split("-").reverse().join(", ");
        jobs.push(jobx);
      });
    } else {
      job.location = job.location.split("|").shift().trim();
      job.location = job.location.split("-").reverse().join(", ");
      job.location = job.location.replace(/\ , /g, ", ");
      jobs.push(job);
    }

  }

  out.jobs = jobs;
  return out;
})();

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


(() => {
  let out = {};

  if (!pass_it.cont) {
    out.pass_it = {
      cont: 1,
    };
  } else {
    out.pass_it = pass_it;
  }

  let iframe_selector = "#portal_inner #icims_content_iframe";
  let iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  let textPaginador = iframeDocument.querySelector(".pull-left > h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs")
    .textContent.trim();

  let max = textPaginador.split(" of ").pop();
  let min = textPaginador.split(" of ").shift().split("Page ").pop();

  if (parseInt(min, 10) < parseInt(max, 10)) {
    let nuevaUrl = location.protocol + "//" + location.hostname + "/jobs/search?pr=" + out.pass_it.cont +
      "&searchRelation=keyword_all";
    out.pass_it.cont++;
    location.href = nuevaUrl;
    out.has_next_page = true;
  } else out.has_next_page = false;

  //out["pic"] = true;
  //out.wait = 1;
  out.iframeSelector = iframe_selector;
  out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable .row";
  return out;
})();

//Before jobdescription
(() => {
  let out = {};
  out.iframeSelector = "#icims_content_iframe";
  out.iframeWaitFor = "div.iCIMS_JobContent";
  return out;
})();

//jobdescription
(() => {
  let out = {};
  let job = {};
  let iframeDocument = document.querySelector("#icims_content_iframe").contentWindow.document;
  let full_html = iframeDocument.querySelector("div.iCIMS_JobContent");
  const experience = [];
  const regexJobtype = /Full Time|Full-Time|Part Time|Part-Time/i;

  if (full_html) {

    for (let elem of full_html.querySelectorAll(".iCIMS_JobHeaderGroup dl dd"))
      if (regexJobtype.test(elem.textContent))
        job.source_jobtype = regexJobtype.exec(elem.textContent)[0];

    for (let li of full_html.querySelectorAll("li")) {

      if (/years|year|month|Months|anni|ans|mesi|jaar|maand/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring/i.test(li.textContent)
        && /\d|one|two|three|four|five|six|seven|eight|nine|ten/.test(li.textContent))
        experience.push(li.textContent);

    }

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style,.container-fluid.iCIMS_JobsTable,.iCIMS_Logo,.iCIMS_JobOptions")) el.remove();

    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'Benefits Summary', false);
    job.html = removeTextBefore(job.html, 'Responsibilities', false);
    job.html = removeTextAfter(job.html, 'Additional Information', true);
    job.html = cleanHTML(job.html);
    const description = document.createElement("div");
    description.innerHTML = job.html;
    job.jobdesc = description.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    if (experience.length > 0)
      job.experience_required = experience.join("\n").trim();
    else if (tagExperienceRequired(description))
      job.experience_required = tagExperienceRequired(description);

  }

  out.job = job;
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