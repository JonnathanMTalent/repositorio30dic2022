//jobsite url: https://currentopportunities.bchousing.org/psc/hcm/EMPLOYEE/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_SCHJOB_FL&Action=U

//Infinite pagination
(() => {
  let out = {};

  if (!pass_it.heights)
    out.pass_it = {
      heights: [],
      flag: 0
    };
  else
    out.pass_it = pass_it;

  if (document.querySelector('a[id="#ICOK"]'))
    document.querySelector('a[id="#ICOK"]').click();

  if (out.pass_it.flag === 0) {

    if (document.querySelector('span[title="Search"] a'))
      document.querySelector('span[title="Search"] a').click();

    out.pass_it.flag = 1;

  }

  out.has_next_page = true;
  if (out.pass_it.heights.length > 3) {
    let last_three_heights = out.pass_it.heights.slice(out.pass_it.heights.length - 3);
    if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
      out.has_next_page = false;
  }

  document.querySelector('.ps_box-grid.ps_scrollable.sbar.sbar_v.ps_scrollable_v').scrollBy(0, document.querySelector('.ps_box-grid.ps_scrollable.sbar.sbar_v.ps_scrollable_v').scrollHeight);

  out.wait = true;
  out.waitFor = 'div[class="ps_box-grid-list psc_wrap psc_gridlist-standard psc_grid-norowcount psc_grid-notitle psc_gridlist-bordertop psc_show-actionable"]';
  out.pass_it.heights.push(document.querySelectorAll('div[title="Search Results List"] ul > li').length);
  return out;
})();

//o

//jobsite url: https://currentopportunities.bchousing.org/psc/hcm/EMPLOYEE/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Action=U&FOCUS=Applicant&SiteId=3

//Infinite pagination
(() => {
  let out = {};

  if (!pass_it.heights)
    out.pass_it = {
      heights: [],
      flag: 0
    };
  else
    out.pass_it = pass_it;


  /*if (document.querySelector('a[id="#ICOK"]'))
    document.querySelector('a[id="#ICOK"]').click();*/

  if (out.pass_it.flag === 0) {

    if (document.querySelector("#HRS_SCH_WRK\\$0_row_0"))
      document.querySelector("#HRS_SCH_WRK\\$0_row_0").click();

    /*if (document.querySelector('span[title="Search"] a'))
      document.querySelector('span[title="Search"] a').click();*/

    out.pass_it.flag = 1;

  }

  out.has_next_page = true;
  if (out.pass_it.heights.length > 3) {
    let last_three_heights = out.pass_it.heights.slice(out.pass_it.heights.length - 3);
    if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
      out.has_next_page = false;
  }

  document.querySelector('.ps_box-grid.ps_scrollable.sbar.sbar_v.ps_scrollable_v')?.scrollBy(0, document.querySelector('.ps_box-grid.ps_scrollable.sbar.sbar_v.ps_scrollable_v').scrollHeight);

  out.wait = true;
  out.waitFor = 'div[class="ps_box-grid-list psc_wrap psc_gridlist-standard psc_grid-norowcount psc_grid-notitle psc_gridlist-bordertop psc_show-actionable"]';
  out.pass_it.heights.push(document.querySelectorAll('div[title="Search Results List"] ul > li').length);
  return out;
})();

//Extract
(() => {
  let out = {};
  let jobs = [];
  let html_jobs = document.querySelectorAll('.ps_grid-row.psc_rowact.psc_disabled');

  for (let elem of html_jobs) {
    let job = {};
    job.title = elem.querySelector('span[id*="SCH_JOB_TITLE"]').textContent.trim();
    job.reqid = elem.querySelector('span[id*="JOB_OPENING_ID"]').textContent.trim();
    job.url = `https://careers.pps.net/psc/career/SELFSRV/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_JBPST_FL&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=${job.reqid}&PostingSeq=1`;
    job.dateposted_raw = elem.querySelector('span[id*="SCH_OPENED"]').textContent.trim().split('/');
    job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[0]}/${job.dateposted_raw[2]}`;

    if (/\d/.test(elem.querySelector('span[id*="HRS_CLS_DT_DESCR"]').textContent)) {
      job.dateclosed_raw = elem.querySelector('span[id*="HRS_CLS_DT_DESCR"]').textContent.trim().split('/');
      job.dateclosed_raw = `${job.dateclosed_raw[1]}/${job.dateclosed_raw[0]}/${job.dateclosed_raw[2]}`;
    }

    job.source_location = elem.querySelector('span[id*="LOCATION"]').textContent.trim();
    job.location = 'Portland, Oregon, US';
    job.temp = 8;
    jobs.push(job);
  }

  out.jobs = jobs;
  return out;
})();

//Pagination
(() => {
  const out = {};
  out.has_next_page = false;
  out.wait = false;
  return out;
})();

//Before Jobdescription
(() => {
  let out = {};
  out.waitFor = 'div[id="win0div$ICField188"]';
  return out;
})();

//Jobdescription
(() => {
  let out = {};
  let job = {};
  let full_html = document.querySelector('div[id="win0div$ICField188"]');
  const experience = [];
  const regexSalary = /\$\d+(\.|,|-)?\d*\s?\W*\d*\s*k?\s?(to|-)?\s?\W*\d*\W*\d*\W*\d*\s?k?\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)?|\$\d+\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)?/i;

  job.logo = full_html.querySelector('img').src;

  for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style")) el.remove();

  for (let li of full_html.querySelectorAll("li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }

  if (document.querySelector('#HRS_SCH_WRK_HRS_FULL_PART_TIME').textContent !== '')
    job.source_jobtype = document.querySelector('#HRS_SCH_WRK_HRS_FULL_PART_TIME').textContent;

  job.html = full_html.innerHTML.trim();
  job.html = removeTextBefore(job.html, 'POSITION SUMMARY', false);
  job.html = removeTextAfter(job.html, 'For more information', true);
  job.html = cleanHTML(job.html);
  let description = document.createElement("div");
  description.innerHTML = job.html;
  job.jobdesc = description.textContent.trim();
  job.jobdesc = cleanHTML(job.jobdesc);

  if (regexSalary.test(job.jobdesc))
    job.source_salary = regexSalary.exec(job.jobdesc)[0];

  if (experience.length > 0)
    job.experience_required = experience.join(" - ").trim();
  else
    job.experience_required = tagExperienceRequired(description);

  out.job = job;
  return out;
})();

function removeTextBefore(html, text, flag) {
  let newHtml = html;
  let re = new RegExp(text, 'i');
  if (re.test(html.toLowerCase())) {
    newHtml = html.split(text).pop();
    if (!flag) {
      newHtml = "<strong>" + text + "</strong>" + newHtml;
    }
  }
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  let newHtml = html;
  let re = new RegExp(text, 'i');
  if (re.test(html.toLowerCase())) {
    newHtml = html.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<strong>" + text + "</strong>";
    }
  }
  return newHtml;
}

function tagExperienceRequired(description) {
  let primerFiltro = [];
  description.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && word.textContent.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine|ten/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
      if (word.innerText.match(/experience|expérience|ervaring|erfahrung|esperienza/gi))
        primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
    }
    primerFiltro = primerFiltro.flat();
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
  var segundoFiltro = [];
  deleteDuplicados.forEach(elem => {
    if (elem.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && elem.match(/\d+|one|two|three|four|five|six|seven|eight|nine|ten/g) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/gi))
      segundoFiltro.push(elem.trim());
  });
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
  return arrayFinal[0];
}