//Pagination 
//instrucciones: Usar el job site asi: https://mckesson.wd3.myworkdayjobs.com/External_Careers
//extract
(async () => {
  var jobs = [];
  var out = {};

  out["pass_it"] = pass_it;

  var json;
  var jsonDesc;
  var data = {
    "limit": 20,
    "offset": out.pass_it.offSet,
    "searchText": "",
    "appliedFacets": {}
  };

  const resp = await fetch(window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + '/jobs', {

    headers: {
      "accept": "application/json",
      "accept-language": "en-US",
      "content-type": "application/json",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    method: 'POST',
    body: JSON.stringify(data)

  });

  const result = await resp.json();

  if (out.pass_it.offSet == 0)
    out.pass_it.limit = result.total;

  json = result.jobPostings;

  for (var elem of json) {
    var job = {};
    job.reqid = elem.bulletFields[0];
    job.title = elem.title;
    job.url = window.location.origin + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + elem.externalPath;
    job.temp = 8;
    ///////////////////////////////

    const resp2 = await fetch(window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + elem.externalPath, {

      headers: {
        "accept": "application/json",
        "accept-language": "en-US",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      method: 'GET'

    });

    const result2 = await resp2.json();

    jsonDesc = result2.jobPostingInfo;
    job.source_jobtype = jsonDesc.timeType;
    job.dateposted_raw = jsonDesc.startDate;
    job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
    var full_html = document.createElement("div");
    full_html.innerHTML = jsonDesc.jobDescription;

    if (full_html) {

      const experience = [];

      for (let li of full_html.querySelectorAll("li")) {

        if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|dans/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|tecrübeli/i.test(li.textContent)
          && /[1-9]|one|two|three|four|five|six|seven|eight|nine/gi.test(li.textContent))
          experience.push(li.textContent);

      }

      if (/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/.test(full_html.textContent))
        job.source_apply_email = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/.exec(full_html.textContent)[0];

      for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style")) el.remove();

      for (const p of full_html.querySelectorAll('p'))
        if (p.textContent.includes('Operating Company'))
          job.source_empname = p.nextSibling.textContent.trim();

      job.html = full_html.innerHTML.replace(/(http|https|ftp|ftps)?\:?\/?\/?(www)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g, '').replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/gi, '').trim();
      job.html = removeTextBefore(job.html, 'Job Description', false).replace(':', '');
      job.html = removeTextAfter(job.html, 'Envista and all Envista Companies', true);
      job.html = removeTextAfter(job.html, 'Envista and its family of companies', true);
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
    if (jsonDesc.additionalLocations) {

      job.source_location = jsonDesc.location;
      job.location = job.source_location;
      jobs.push(job);

      for (let auxLoc of jsonDesc.additionalLocations) {
        var jobx = {};
        jobx = { ...job }
        jobx.source_location = auxLoc.trim();
        jobx.location = jobx.source_location;
        jobs.push(jobx);
      }

    } else {
      job.source_location = jsonDesc.location.trim();
      job.location = jsonDesc.location.trim();
      jobs.push(job);
    }

  }

  out.jobs = jobs;
  return out;
})();

function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
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

//pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 20;
  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();

//infinity
(function () {
  var out = {};
  out["pass_it"] = {
    "offSet": 0,
    "limit": 0
  };
  return out;
})();

//Multi link
//infinite
(function () {
  var out = {};
  out["pass_it"] = {
    "offSet": 0,
    "limit": 0,
    "multiLinks": ['https://lewisandclark.wd5.myworkdayjobs.com/es/student'],
    cont: 0
  };
  return out;
})();

//Pagination Multi link
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 20;

  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else if (out.pass_it.cont < out.pass_it.multiLinks.length) {

    location.href = out.pass_it.multiLinks[out.pass_it.cont];
    out.pass_it.offSet = 0;
    out.pass_it.limit = 0;
    out.pass_it.cont++;
    out.has_next_page = true;

  } else {
    out["has_next_page"] = false;
  }

  out["wait"] = false;
  return out;
})();