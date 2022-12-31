//Extract
(async () => {
  const out = {};
  const jobs = [];
  let cont = 0;
  let totalJobs = 0;

  do {

    const resp = await fetch("https://recruiting.ultipro.com/LAR1001LARP/JobBoard/8af73840-65fe-45ef-9945-669e14c41eb9/JobBoardView/LoadSearchResults", {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "content-type": "application/json; charset=UTF-8",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-requestverificationtoken": "ic6YibFsWr1shasdPyO8Yp78g55vmIWPOJMAMv-4XNrU0N7kYGtOOQdiJwFEaB0R0ksALJiTbmKBoYcoTkoJ9rgJd_OCdobxIM00lsd9JQuZI2cXmUlUi_Dge_4Ofb4GSdH4AA2"
      },
      "referrer": "https://recruiting.ultipro.com/LAR1001LARP/JobBoard/8af73840-65fe-45ef-9945-669e14c41eb9/?q=&o=postedDateDesc&w=&wc=&we=&wpst=",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"opportunitySearch\":{\"Top\":50,\"Skip\":${cont},\"QueryString\":\"\",\"OrderBy\":[{\"Value\":\"postedDateDesc\",\"PropertyName\":\"PostedDate\",\"Ascending\":false}],\"Filters\":[{\"t\":\"TermsSearchFilterDto\",\"fieldName\":4,\"extra\":null,\"values\":[]},{\"t\":\"TermsSearchFilterDto\",\"fieldName\":5,\"extra\":null,\"values\":[]},{\"t\":\"TermsSearchFilterDto\",\"fieldName\":6,\"extra\":null,\"values\":[]}]},\"matchCriteria\":{\"PreferredJobs\":[],\"Educations\":[],\"LicenseAndCertifications\":[],\"Skills\":[],\"hasNoLicenses\":false,\"SkippedSkills\":[]}}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

    const json = await resp.json();
    const html_jobs = json.opportunities;

    if (cont === 0)
      totalJobs = json.totalCount;

    for (let elem of html_jobs) {
      const job = {};
      job.title = elem.Title;
      job.url = `https://recruiting.ultipro.com/LAR1001LARP/JobBoard/8af73840-65fe-45ef-9945-669e14c41eb9/OpportunityDetail?opportunityId=${elem.Id}`;

      job.reqid = elem.RequisitionNumber;
      job.dateposted_raw = elem.PostedDate.split('T').shift().split('-');
      job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[2]}/${job.dateposted_raw[0]}`;

      if (elem.FullTime)
        job.source_jobtype = 'Full Time';
      else
        job.source_jobtype = 'Part Time';

      job.temp = 8;

      elem.Locations.forEach(loc => {

        const jobx = { ...job };

        if (loc.Address.City && loc.Address.PostalCode) {

          jobx.source_location = `${loc.Address.City}, ${loc.Address.State.Code} ${loc.Address.PostalCode}, ${loc.Address.Country.Code}`;
          jobx.location = jobx.source_location;

        } else if (loc.Address.City && loc.Address.State) {

          jobx.source_location = `${loc.Address.City}, ${loc.Address.State.Code}, ${loc.Address.Country.Code}`;
          jobx.location = jobx.source_location;

        } else if (loc.Address.State) {

          jobx.source_location = `${loc.Address.State.Name}, ${loc.Address.Country.Code}`;
          jobx.location = jobx.source_location;

        } else {

          jobx.source_location = loc.LocalizedName;
          jobx.location = jobx.source_location;

        }

        jobs.push(jobx);

      });

    }

    cont += 50;

  } while (cont < totalJobs);

  out.jobs = jobs;
  return out;
})();

//Pagination
(() => {
  let out = {};
  out.has_next_page = false;
  out.wait = false;
  return out;
})();

//Before jobdescription
(() => {
  let out = {};
  out.waitFor = 'div.col-md-18 .row';
  return out;
})();

//Jobdescription
(() => {
  const out = {};
  const job = {};
  const full_html = document.querySelector('div.col-md-18 .row');
  const experience = [];
  const benefits = [];
  const regexSalary = /\$\d+(\.|,|-)?\d*\s?\W*\d*\s*k?\s?(to|-)?\s?\W*\d*\W*\d*\W*\d*\s?k?\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)|\$\d+\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)/i;

  if (full_html) {

    if (!pass_it.job.source_salary) {

      if (document.querySelector('span[data-automation="compensation-amount"]'))
        job.source_salary = document.querySelector('span[data-automation="compensation-amount"]').textContent.trim();
      else if (regexSalary.test(full_html.textContent))
        job.source_salary = regexSalary.exec(full_html.textContent)[0];

    }

    for (const el of full_html.querySelectorAll('p')) {

      if (el.textContent.includes('Benefits')) {

        if (el.nextElementSibling)
          benefits.push(el.nextElementSibling.textContent.trim())

        if (el.nextElementSibling?.nextElementSibling)
          benefits.push(el.nextElementSibling.nextElementSibling.textContent.trim())

        if (el.nextElementSibling?.nextElementSibling.nextElementSibling)
          benefits.push(el.nextElementSibling.nextElementSibling.nextElementSibling.textContent.trim())

        if (el.nextElementSibling?.nextElementSibling.nextElementSibling.nextElementSibling)
          benefits.push(el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent.trim())

        if (el.nextElementSibling?.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
          benefits.push(el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent.trim())

      }

    }

    if (benefits.length > 0)
      job.source_benefit = benefits.join(' - ');

    for (let li of full_html.querySelectorAll("li")) {
      if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia/i.test(li.textContent)
        && /\d|one|two|three|four|five|six|seven|eight|nine|ten/i.test(li.textContent))
        experience.push(li.textContent);
    }

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style,video")) el.remove();

    job.html = full_html.innerHTML.trim();
    job.html = cleanHTML(job.html);
    const description = document.createElement("div");
    description.innerHTML = job.html;
    job.jobdesc = description.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    if (document.querySelector('strong[data-automation="work-experience-years"]').textContent !== '')
      job.experience_required = document.querySelector('strong[data-automation="work-experience-years"]').textContent.trim();
    else if (experience.length > 0)
      job.experience_required = experience.join(" - ").trim();
    else if (tagExperienceRequired(description))
      job.experience_required = tagExperienceRequired(description);

  }

  out.job = job;
  return out;
})();

function tagExperienceRequired(description) {
  let primerFiltro = [];
  description.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && word.textContent.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine|ten/gi)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
      if (word.innerText.match(/experience|expérience|ervaring|erfahrung|esperienza/gi))
        primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
    }
    primerFiltro = primerFiltro.flat();
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
  var segundoFiltro = [];
  deleteDuplicados.forEach(elem => {
    if (elem.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && elem.match(/\d+|one|two|three|four|five|six|seven|eight|nine|ten/gi) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno/i))
      segundoFiltro.push(elem.trim());
  });
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
  return arrayFinal[0];
}