//Extract
(async () => {
  var jobs = [];
  var out = {};
  var json;
  const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }

  if (!pass_it.cont) {
    out.pass_it = {
      cont: 1,
      limit: 0,
      size: 0
    };
  } else out.pass_it = pass_it;

  var data = {
    "multilineEnabled": false,
    "sortingSelection": {
      "sortBySelectionParam": "3",
      "ascendingSortingOrder": "false"
    },
    "fieldData": {
      "fields": {
        "KEYWORD": "",
        "LOCATION": ""
      },
      "valid": true
    },
    "filterSelectionParam": {
      "searchFilterSelections": [
        {
          "id": "POSTING_DATE",
          "selectedValues": []
        },
        {
          "id": "LOCATION",
          "selectedValues": []
        },
        {
          "id": "JOB_FIELD",
          "selectedValues": []
        },
        {
          "id": "JOB_TYPE",
          "selectedValues": []
        },
        {
          "id": "JOB_SCHEDULE",
          "selectedValues": []
        },
        {
          "id": "JOB_LEVEL",
          "selectedValues": []
        }
      ]
    },
    "advancedSearchFiltersSelectionParam": {
      "searchFilterSelections": [
        {
          "id": "LOCATION",
          "selectedValues": []
        },
        {
          "id": "JOB_FIELD",
          "selectedValues": []
        },
        {
          "id": "JOB_NUMBER",
          "selectedValues": []
        },
        {
          "id": "URGENT_JOB",
          "selectedValues": []
        },
        {
          "id": "EMPLOYEE_STATUS",
          "selectedValues": []
        },
        {
          "id": "WILL_TRAVEL",
          "selectedValues": []
        }
      ]
    },
    "pageNo": out.pass_it.cont
  };

  const resp = await fetch('https://tenet.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=14160110087', {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
      "content-type": "application/json",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="92", "Opera GX";v="78"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      tz: "GMT-05:00",
      tzname: "America/Bogota",
      "x-requested-with": "XMLHttpRequest",
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  const result = await resp.json();

  json = result.requisitionList;

  if (out.pass_it.limit === 0)
    out.pass_it.limit = result.pagingData.totalCount;

  out.pass_it.size += result.pagingData.pageSize;

  for (var elem of json) {
    var job = {};
    job.reqid = elem.jobId;
    job.title = elem.column[0];
    job.url = `https://syngenta.taleo.net/careersection/unitedstates/jobdetail.ftl?job=${elem.contestNo}`;
    job.dateposted_raw = new Date(elem.column[2]).toLocaleDateString('en-US');
    job.dateposted_raw=formatDate(job.dateposted_raw);
    job.temp = 8;
    jobs.push(job);
  }

  out["jobs"] = jobs;
  return out;
})();




//Pagination
(() => {
  let out = {};

  out.pass_it = pass_it;

  if (out.pass_it.size <= out.pass_it.limit) {

    out.pass_it.cont += 1;
    out.has_next_page = true;

  } else out.has_next_page = false;

  return out;
})();

//Before job description
(function () {
  var out = {};
  out.waitFor = 'div.mastercontentpanel3 > table[role="presentation"]';
  out.wait = true;
  return out;
})();

//Job description
(function () {
  var out = {};
  var job = {};
  var full_html = document.querySelector('div.mastercontentpanel3 > table[role="presentation"]');
  const regexJobtype = /Full Time|Full-Time|Part Time|Part-Time/i;

  if (full_html) {

    const experience = [];

    for (let li of full_html.querySelectorAll("li")) {

      if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|lata|letnie|dans|anos|ano/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|tecrübeli|doświadczenia|Experiência/i.test(li.textContent)
        && /[1-9]|one|two|three|four|five|six|seven|eight|nine/gi.test(li.textContent))
        experience.push(li.textContent);

    }

    if (/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/.test(full_html.textContent))
      job.source_apply_email = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/.exec(full_html.textContent)[0];

    for (const el of full_html.querySelectorAll('div')) {

      if (/Work Location/i.test(el.textContent)) {

        job.source_location = el.textContent.split(':').pop().trim();
        job.location = job.source_location.split('-');
        job.location.shift();
        job.location = job.location.join(', ');

      }

    }

    if (!job.location || job.location === '')
      job.location = 'Ginebra, CH';

    if (full_html.textContent.search(/What we offer/) > -1) {

      job.source_benefit = full_html.textContent;
      job.source_benefit = removeTextBefore(job.source_benefit, 'What we offer', true);
      job.source_benefit = removeTextAfter(job.source_benefit, 'Welcome to SITA', true);

    }

    if (regexJobtype.test(full_html.textContent))
      job.source_jobtype = regexJobtype.exec(full_html.textContent)[0];

    job.html = full_html.innerHTML.replace(/(http|https|ftp|ftps)?\:?\/?\/?(www)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g, '').replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/gi, '').trim();
    job.html = removeTextBefore(job.html, 'Description', false);
    job.html = removeTextAfter(job.html, 'Welcome to SITA', true);
    job.html = job.html;
    job.html = cleanHTML(job.html);
    var tmp = document.createElement("div");
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);


    if (experience.length > 0)
      job.experience_required = experience.join("\n");
    else if (tagExperienceRequired(tmp))
      job.experience_required = tagExperienceRequired(tmp);

  }

  out["job"] = job;
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
    if ((word.textContent.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia|tecrübeli|doświadczenia|Experiência/gi) && word.textContent.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
      if (word.innerText.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia|Experiência/gi))
        primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
    }
    primerFiltro = primerFiltro.flat();
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
  var segundoFiltro = [];
  deleteDuplicados.forEach(elem => {
    if (elem.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia|doświadczenia|Experiência/gi) && elem.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/g) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|lata|letnie|dans|anos|ano/gi))
      segundoFiltro.push(elem.trim());
  });
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
  return arrayFinal[0];
}