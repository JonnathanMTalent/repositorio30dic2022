//Before extract
(() => {
  let out = {};
  out.waitFor = "table.jv-job-list tbody tr";
  return out;
})();

//Extract
(async () => {
  var out = {};
  var html_jobs = document.querySelectorAll("table.jv-job-list tbody tr");
  var jobs = [];
  const regexJobtype = /Full Time|Full-Time|Part Time|Part-Time/i;

  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    const locations = [];
    var elem = html_jobs[x];
    job.title = elem.querySelector("td a").textContent.trim();
    job.url = elem.querySelector("td a").href.trim() + "?__jvst=Job Board&__jvsd=talent";
    job.reqid = job.url.split("job/").pop().split("?").shift().trim();

    if (elem.querySelector("td.jv-job-list-location")) {
      job.source_location = elem.querySelector("td.jv-job-list-location").textContent.replace(/\s+/gi, " ").trim();
      job.location = job.source_location.trim();
    } else job.location = "Austin, TX, US";

    job.temp = 8;

    const resp = await fetch(job.url),
      html = await resp.text(),
      div = document.createElement('div');

    div.innerHTML = html;

    const full_html = div.querySelector('div.jv-job-detail-description');
    const experience = [];

    for (let li of full_html.querySelectorAll("li")) {
      if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|dans/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|tecrübeli/i.test(li.textContent)
        && /[1-9]|one|two|three|four|five|six|seven|eight|nine/gi.test(li.textContent))
        experience.push(li.textContent);
    }

    if (job.location.search(/Locations/ig) > -1) {

      const locs = div.querySelector('p[class="jv-job-detail-meta"]').childNodes;

      for (let i = 1; i < locs.length; i++) {

        if (locs[i].nodeType === 3)
          locations.push(locs[i].textContent.replace(/\n/gm, "").trim())

      }

    }

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style")) el.remove();

    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, "What You'll Do:", false);
    //job.html = removeTextBefore(job.html, "What You’ll Do:", false);
    //job.html = removeTextAfter(job.html, 'We are an equal opportunity', true);
    job.html = cleanHTML(job.html);
    const description = document.createElement("div");
    description.innerHTML = job.html;
    job.jobdesc = description.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    if (experience.length > 0)
      job.experience_required = experience.join("\n").trim();
    else if (tagExperienceRequired(description))
      job.experience_required = tagExperienceRequired(description);

    if (regexJobtype.test(job.jobdesc))
      job.source_jobtype = regexJobtype.exec(job.jobdesc)[0];

    if (locations.length > 0) {

      locations.forEach(loc => {

        const jobx = { ...job };
        jobx.source_location = loc.replace('                ', ' ').trim();
        jobx.location = loc.replace('                ', ' ').trim();
        jobs.push(jobx);

      });

    } else jobs.push(job);

  }

  out.jobs = jobs;
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
(() => {
  let out = {};
  let selector = document.querySelector('.jv-pagination-next');

  if (selector) {
    selector.click();
    out.has_next_page = true;
  } else out.has_next_page = false;

  out.waitFor = 'table.jv-job-list.jv-search-list > tbody > tr';
  return out;
})();