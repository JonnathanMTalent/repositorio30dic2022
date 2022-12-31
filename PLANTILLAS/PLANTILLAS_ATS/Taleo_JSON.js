//Extract
(function () {
  var jobs = [];
  var out = {};
  var json;

  if (!pass_it.cont) {
    out.pass_it = {
      cont: 1,
      limit: 0,
      size: 0
    };
  } else out.pass_it = pass_it;

  var data = {
    "multilineEnabled": true,
    "sortingSelection": {
      "sortBySelectionParam": "1",
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
          "id": "ORGANIZATION",
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
        },
        {
          "id": "JOB_SHIFT",
          "selectedValues": []
        }
      ]
    },
    "pageNo": out.pass_it.cont
  };

  $.ajax({
    url: 'https://tenet.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=14160110087',
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
    type: "POST",
    data: JSON.stringify(data),
    dataType: "json",
    async: false,
    success: function (result) {
      json = result.requisitionList;

      if (out.pass_it.limit === 0)
        out.pass_it.limit = result.pagingData.totalCount;

      out.pass_it.size += result.pagingData.pageSize;

      for (var elem of json) {
        var job = {};
        job.reqid = elem.jobId;
        job.title = elem.column[0];
        job.source_location = elem.column[1].replace('[\"', "").replace('"\]', '');
        job.location = job.source_location.split('-').reverse().join(', ');
        job.url = `https://tenet.taleo.net/careersection/10123/jobdetail.ftl?job=${elem.contestNo}`;
        job.temp = 88;
        jobs.push(job);
      }

    },
    error: function (error) {
      msg(error);
    },
  });

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

    if (regexJobtype.test(full_html.textContent))
      job.source_jobtype = regexJobtype.exec(full_html.textContent)[0];

    job.html = full_html.innerHTML.replace(/(http|https|ftp|ftps)?\:?\/?\/?(www)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g, '').replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/gi, '').trim();
    job.html = removeTextBefore(job.html, 'JOB SUMMARY', false);
    job.html = job.html;
    job.html = cleanHTML(job.html);
    var tmp = document.createElement("div");
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);


    if (experience.length > 0)
      job.experience_required = experience.join(" - ").trim();
    else
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