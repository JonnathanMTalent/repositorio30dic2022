//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "jobsPerPage":0,
        "jobsInPage":0
    }
    return out;
})()

//Extract
(async () => {
    const out = {};
    const jobs = [];
    out.pass_it=pass_it;
    const resp = await fetch("https://jobs.dkb.de/search/?q=&sortColumn=referencedate&sortDirection=desc&searchby=location&d=15&startrow="+out.pass_it.counter, {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "https://jobs.dkb.de/search/?q=&sortColumn=referencedate&sortDirection=desc&searchby=location&d=15",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
    const html = await resp.text();
    const div = document.createElement("div");
    div.innerHTML = html;
    const html_jobs = div.querySelectorAll('table#searchresults tbody tr');
    out.pass_it.jobsPerPage=25;
    out.pass_it.jobsInPage = html_jobs.length;
    msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
    for (let x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        let job = {};
        let elem = html_jobs[x];
        //////EXTRACTING VARIABLES///////
        job.title = elem.querySelector("").textContent.trim();


        job.temp = 1;
        
//     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*

          var selector = `Selector de la descripcion`;
          var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
          const resp2 = await fetch(job.url, {
          "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "es-ES,es;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
          },
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
        });
          const data = await resp2.text();
          const parseDoc = new DOMParser();
          const doc = parseDoc.parseFromString(data, 'text/html')
          var full_html = doc.querySelector(selector);
          if (full_html) {
              // remove something from the jobdatata
              if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                  if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
              });
              if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                  return x
              };
              if (typeof msg == "undefined") msg = console.log;
              job.html = full_html.innerHTML.trim();
              //limpieza de las descripciones
              //job.html = removeTextBefore(job.html, ``, false);
              //job.html = removeTextAfter(job.html, ``, true);
              //job.html = removeTextAfter(job.html, ``, true);
              //job.html = removeTextAfter(job.html, ``, true);
              job.html = cleanHTML(job.html);
              var tmp = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc = tmp.textContent.trim();
              job.jobdesc = cleanHTML(job.jobdesc);
          }

//*/// ████████████████████████████████████████████████████████████████████

        job.temp = 1;
        jobs.push(job);
    }
    //out.pass_it.counter +=1;
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

//PAGINATION
    (()=>{
        var out={};
        out.pass_it=pass_it;
        var { counter, jobsPerPage, jobsInPage } = out.pass_it;
        out.pass_it.counter+=jobsPerPage;
        out.has_next_page=jobsInPage==jobsPerPage?true:false;
        return out;
    })()