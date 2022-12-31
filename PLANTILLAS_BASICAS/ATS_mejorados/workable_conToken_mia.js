//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "jobsPerPage":0,
        "jobsInPage":0,
        "token":"",
        "tok":""
        
    }
    return out;
})()


//fetch limpia 
(async () => {
    let out = {};
     out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://apply.workable.com/api/v3/accounts/agility/jobs", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en",
    "content-type": "application/json",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://apply.workable.com/agility/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{"+out.pass_it.token+"\"query\":\"\",\"location\":[],\"department\":[],\"worktype\":[],\"remote\":[]}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
        const data = await resp.json();
        out.pass_it.jobsPerPage=10;
        out.pass_it.jobsInPage = data.results.length;
        out.pass_it.tok=data.nextPage;
        msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.results.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.results[x];  //poner tambien el contenedor de los jobs
            let job = {};
            job.title = elem.title;
            job.url = 'https://apply.workable.com/agility/j/'+elem.shortcode;
            job.reqid = elem.id;
            job.source_location = elem.city+', '+elem.country+', '+elem.countryCode;
            job.location = job.source_location;
            job.dateposted_raw = elem.published;

// OTRA FORMA DE LA MISMA PLANTILLA
            // let {city,region,country} = elem.location ;
            
            // job.location = `${city}, ${region}, ${country}`;
            // let code = elem.shortcode ;
            // let date = elem.published.split('T').shift().split('-') ;
            // job.url = `https://apply.workable.com/erincondren/j/${code}/`;  
            // job.location=job.location.replace(", null,","");
            // job.dateposted_raw = `${date[1]}/${date[2]}/${date[0]}`;
            
            job.temp = `j151656`;
            jobs.push(job)
        }
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();


//PAGINATION
(()=>{
    var out={};
    out.pass_it=pass_it;
    var { counter, jobsPerPage, jobsInPage } = out.pass_it;
    out.pass_it.counter+=jobsPerPage;
    out.pass_it.token="\"token\":\""+out.pass_it.tok+"\",";
    out.has_next_page=jobsInPage==jobsPerPage?true:false;
    return out;
})()


//Before jobdesc
(function() {
    var out = {};
    //out.wait = true;
    out.waitFor = '[data-ui="job-description"]';
    return out;
  })();


 // Jobdescription
 (function() {
  var out = {};
  var job = {};
  var selector = '[data-ui="job-description"]';
  var remove_selectors = ['[class="button--2de5X button--14TuV tertiary--1JsWJ styles--2HTwh styles--eqtxl"]'];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  
  const auxExperience = [...document.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
if (auxExperience) {
    job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
}
  
  
 if(document.querySelector('[data-ui="job-type"]')) job.source_jobtype=document.querySelector('[data-ui="job-type"]').textContent.trim();
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'Description', false);
  job.html = removeTextAfter(job.html, 'About this Company', true);
  job.html = removeTextAfter(job.html, 'Statement of Non-Inclusivity:', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  //BENEFIT DESDE EL JOB.JOBDESC                           Y 
let inicioBenefit='Benefits'; let finBenefit='Learn more about working';
if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  
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


