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
        const resp = await fetch("https://www.advancegroup.com/api/v1/en/careers", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client": "WEB"
  },
  "referrer": "https://www.advancegroup.com/career",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
        const data = await resp.json();
        // out.pass_it.jobsPerPage=20;
        // out.pass_it.jobsInPage = contenedor.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.data.careers.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.data.careers[x];  //poner tambien el contenedor de los jobs
            let job = {};
            job.title = elem.title;
            job.url = 'https://www.advancegroup.com/career';
            job.source_location = elem.office;
            job.location = job.source_location;
            job.source_jobtype=elem.job_type;
            
            //DESCRIPCION:
            let desc1=elem.qualifications;  // SOLO MODIFICAR ESTAS DESC#
            let desc2=elem.responsibilities;
            let desc='<div id="jobdesc"><h3>'+desc1+'</h3> <br> <h3>'+desc2+'</h3></div>';
            const parseDoc = new DOMParser();
            const doc = parseDoc.parseFromString(desc, 'text/html')
            const full_html = doc.querySelector('div#jobdesc'); 
            msg('En el html hay: '+full_html);
            
            
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
          if (full_html) {
               //remove something from the jobdatata
              if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                  if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
              });
              if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                  return x
              };
              if (typeof msg == "undefined") msg = console.log;
               job.html =full_html.innerHTML.trim();
              //limpieza de las descripciones
              job.html = removeTextBefore(job.html, `What is your mission?`, false);
              //job.html = removeTextAfter(job.html, ``, true);
              //job.html = removeTextAfter(job.html, ``, true);
              //job.html = removeTextAfter(job.html, ``, true);
              job.html = cleanHTML(job.html);
              var tmp = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc = tmp.textContent.trim();
              job.jobdesc = cleanHTML(job.jobdesc);
              
              // EXTRAER AQUI LAS VARIABLES DEL HTML CON tmp COMO CONTENEDOR:
              const auxExperience = [...tmp.querySelectorAll('p')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
                if (auxExperience) {
                    job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
                }
              
          }
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

            job.temp = `jonnathan M`;
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