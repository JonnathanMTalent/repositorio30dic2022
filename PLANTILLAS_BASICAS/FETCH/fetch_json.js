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
        const resp = await fetch("https://apiteams.goobee.com.br/api/publicavaga"+out.pass_it.counter+"/vagas/SITE_CADMUS", {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Content-Type": "application/json",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site"
            },
            "referrer": "https://cadmus.com.br/",
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.json();
        out.pass_it.jobsPerPage=20;
        out.pass_it.jobsInPage = contenedor.length;
        msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.contenedor.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.contenedor[x];  //poner tambien el contenedor de los jobs
            let job = {};
 
            job.title = elem.     ;
            job.url = elem.     ;
            job.reqid = elem.     ;
            job.source_location = elem.     ;
            job.location = job.source_location;
            job.dateposted_raw = elem.     ;
            job.dateclosed_raw = elem.     ;
            job.source_jobtype = elem.     ;
            job.source_salary = elem.     ;
            job.experience_required = elem.     ;
            job.source_benefit=elem.     ;
            job.source_empname = elem.     ;

            job.temp = 44545;
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
    out.has_next_page=jobsInPage==jobsPerPage?true:false;
    return out;
})()




// extract con la descripcion en un elemento del json

//fetch limpia 
(async () => {
    let out = {};
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
     out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://talentnet-api-v6.as.talentnet.community/api/community/jobs/search?limit=12&page="+out.pass_it.counter, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en",
    "cache-control": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-requested-with": "XMLHttpRequest",
    "x-spa-type": "community",
    "x-tenant": "facebook-sg"
  },
  "referrer": "https://sg.meta.talentnet.community/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
        const data = await resp.json();
        out.pass_it.jobsPerPage=12;
        out.pass_it.jobsInPage = data.data.length;
        msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.data.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.data[x];  //poner tambien el contenedor de los jobs
            let job = {};
            job.title = elem.title.name;
            job.reqid=elem.id;
            job.url='https://sg.meta.talentnet.community/jobs/'+job.reqid;
            job.source_location=elem.location.city+', '+elem.location.country;
            job.location=job.source_location;
            job.dateposted_raw=formatDate(elem.startDate);
            job.dateclosed_raw=formatDate(elem.endDate);
            //job.html=elem.description;
            job.temp = `jonnathan M`;
            
            // DESCRIPCION:
            
            
            var full_html = elem.description;
            var div       = document.createElement("div");
            div.innerHTML = full_html;
            var desc = div;
            const auxExperience = [...div.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
                if (auxExperience) {
                    job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
                }
            
            for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
                if (a){ 
                  a.remove(); 
                } 
              }
              job.html = desc.innerHTML.trim();
              //job.html = removeTextBefore(job.html, "", false);
              //job.html = removeTextAfter(job.html, "", false);
            
             //job.html = job.html.split("").shift();
             //job.html = job.html.split("").shift();
            
              //job.html = job.html.replace("","").trim();
            
              job.html      = cleanHTML(job.html);
              var tmp       = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc   = tmp.textContent.trim();
              job.jobdesc   = cleanHTML(job.jobdesc);
          
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





    //fetch JSON CON RESPUESTA HTML
(async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://careers.butler.edu/en-us/listing/?_ga=&page=2&page-items=20&ts=1659753162838", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
            "Accept": "*/*",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://careers.butler.edu/en-us/listing/?_ga=",
        "method": "POST",
        "mode": "cors"
    });
    const data = await resp.json();
    // const parseDoc = new DOMParser();
    // const doc = parseDoc.parseFromString(data.results, 'text/html')
    // const html_jobs = doc.querySelectorAll(''); 
    for (let x = 0; x < html_jobs.length; x++) {
        let elem = html_jobs[x];
        let job = {};
        job.title = elem.querySelector(``).textContent.trim();
        job.temp = `Juan Bermudez`;
        jobs.push(job)
    }
    out["jobs"] = jobs;
    return out;
} catch (err) {
    throw err;
}
})();