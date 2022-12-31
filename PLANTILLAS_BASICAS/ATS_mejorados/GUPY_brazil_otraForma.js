
GUPY CON ESTA OTRA FORMA
https://vemseromni.gupy.io/

(async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch('https://vemseromni.gupy.io/', {
            "credentials": "include",
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "es-419,es;q=0.5",
                "cache-control": "max-age=0",
                "if-none-match": "\"13a3a-8WqjlbhFHvSLFsdTunBcjBdVsMU\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "sec-gpc": "1",
                "upgrade-insecure-requests": "1"
            },
            "referrer": "https://talent.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",

        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html')
        const html_jobs = doc.querySelectorAll('[data-testid = "job-list__listitem"]');
        for (let x = 0; x < html_jobs.length; x++) {
            let elem = html_jobs[x];
            let job = {};
            job.title = elem.querySelector('a').textContent.trim();
            job.url = elem.querySelector('a').href.trim();
            job.reqid = job.url.split("job/").pop().split('?').shift().trim();
            // job.reqid = elem.querySelector('').href.split('').pop().trim(); //elem.getAttribute('').split('').pop();
            job.source_location = 'São Paulo, Brazil';
            job.location = 'São Paulo, Brazil';
            //job.dateposted_raw = elem.querySelector('').textContent.trim();
            //job.dateclosed_raw = elem.querySelector('').textContent.trim();
            //job.logo = elem.querySelector('img').getAttribute("src").trim();
            //job.source_empname = elem.querySelector('').textContent.trim();
            job.source_jobtype = elem.querySelector('[class="sc-10520c58-6 jkueFl"]')?.textContent.trim();
            //job.experience_required = elem.querySelector('').textContent.trim();
            //job.source_salary = elem.querySelector('').textContent.trim();
            job.temp = 12;
            jobs.push(job);
        }
        out["jobs"] = jobs;
        console.table(jobs)
        return out;
    } catch (err) {
        throw err;
    }
})();



/////////////////////////////////////////////////////// jobdescription

(function () {
    var out = {};
    var job = {};
    if(document.querySelector('#__next > main > section:nth-child(3)')){
      var selector = '#__next > main > section:nth-child(3)';
    }/*else{
      var selector = "div.maincontent.mb-2.mb-sm-0";
    }*/
  
    if (document.querySelector(selector)) {
      var full_html = document.querySelector(selector);
      if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
      if (typeof msg == "undefined") msg = console.log;
      //--------------------------JOB-INFO ------------------------------------//
  
      //----------------------------------------------------------------------//
      // To Remove selectors 
      for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
        if (a) {
          a.remove();
        }
      }
  
      for (const a of full_html.querySelectorAll('p')) {  // Varios p
        const text = a.textContent.trim();
        if (text.search(/please/i) > -1) a.remove();
        if (text.search(/apply/i) > -1) a.remove();
        if (text.search(/call /i) > -1) a.remove();
        if (text.search(/click/i) > -1) a.remove();
        if (text.search(/cv/i) > -1) a.remove();
        if (text.search(/telephone/i) > -1) a.remove();
        if (text.search(/e-mail/i) > -1) a.remove();
        if (text.search(/email/i) > -1) a.remove();
        if (text.search(/https/i) > -1) a.remove();
        if (text.search(/www./i) > -1) a.remove();
        if (text.search(/@/i) > -1) a.remove();
      }
      
      if (full_html.textContent.search(/Requirements and qualifications/gmi) > -1) {
          job.experience_required = full_html.innerHTML.trim();
          job.experience_required = removeTextBefore(job.experience_required, 'Requirements and qualifications', true);
          job.experience_required = removeTextAfter(job.experience_required, 'Se você é apaixonado', true);
          var tmp = document.createElement('div');
          tmp.innerHTML = job.experience_required;
          job.experience_required = tmp.textContent.trim();
      } 
     
      //----------------------------------------------------------------------//
      job.html = full_html.innerHTML.trim();
  
      // --------------- removeTextBefore -----------
      //job.html = removeTextBefore(job.html, "", false);
      job.html = removeTextBefore(job.html, "Job description", false);
  
  
      // --------------- removeTextAfter -----------
      //job.html = removeTextAfter(job.html, "", true);
      job.html = removeTextAfter(job.html, "Se você é apaixonado", true);
  
  
      if (job.html.indexOf('@') > -1) { //Existen algunos jobdata que no estan estructurados por párrafos o selectores.
        var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
        job.html = job.html.replace(eliminar, '');
      }
  
      if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
      if (job.html.indexOf('http') > -1) { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
      if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
      if (job.html.indexOf('HTTP') > -1) { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
      if (job.html.indexOf('www') > -1) { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
  
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
  
    } else {
  
      
      job.flag_active = 0;
      job.html = "";
      job.jobdesc = "";
  
    }
  
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
  
  
  