//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":10,
        "jobsPerPage":0,
        "jobsInPage":0,
        "totaljobs":0
    }
    return out;
})()


//2 formas de extract
(async () => {
    let out = {};
    out.pass_it= pass_it;
    var jobsSelector = `div[class="oracletaleocwsv2-accordion oracletaleocwsv2-accordion-expandable clearfix"]`
    try {
    let jobs = [];
    // const url = window.location.href
    const resp = await fetch("https://phe.tbe.taleo.net/phe02/ats/careers/v2/searchResults?next&rowFrom="+out.pass_it.counter+"&act=null&sortColumn=null&sortOrder=null", {
  "headers": {
    "accept": "text/html, */*; q=0.01",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://phe.tbe.taleo.net/phe02/ats/careers/v2/searchResults?org=CENTRAL&cws=49",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
    const data = await resp.text();
    var doc = document.createElement('div');
    doc.innerHTML = data;
    var htmlJobs = doc.querySelectorAll(jobsSelector);
    
    
         out.pass_it.jobsPerPage=10;
         out.pass_it.jobsInPage = htmlJobs.length;
         
         msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
         
    htmlJobs.forEach((elem) => {
    var job = {};
    //elem.querySelector(``).textContent.trim()
    	job.title = elem.querySelector("h4 > a").textContent.trim();
    	job.url = elem.querySelector("h4 > a").href.trim();
    	job.location = elem.querySelector(" div.oracletaleocwsv2-accordion-head-info > div:nth-child(2)").textContent.trim().split(" - ");
      	job.location = job.location[1]+", "+job.location[0]+ ', US';
      	if(job.location.includes('undefined')){
         job.location = 'Walnut Creek, California, US' 
        }
      job.source_location = elem.querySelector(" div.oracletaleocwsv2-accordion-head-info > div:nth-child(2)").textContent
      
      	job.reqid = job.url.split('rid=').pop().trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		job.source_jobtype = elem.querySelector("div.oracletaleocwsv2-accordion-head-info > div:nth-child(3)").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1013232332232216;



    jobs.push(job);
    })
    out.pass_it.totaljobs+=jobs.length;
    out["jobs"] = jobs;
    return out;
    } catch (err) {
    console.log(err)
    }
    })();


//PAGINATION
(()=>{
    var out={};
    out.pass_it=pass_it;
    var { counter, jobsPerPage, jobsInPage, totaljobs } = out.pass_it;
    out.pass_it.counter+=10;
    out.has_next_page=totaljobs==counter?true:false;
    return out;
})()



//jobdescription

//fetch job data sin decoder
(async () => {
    let out = {};
    var job = {};
    var selector = `div[name="cwsJobDescription"]`;
    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
    try {
        const url = window.location.href
        const resp = await fetch(url, {
            "headers": {
                "accept": "*/*"
            }
        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html')

              // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            
              let experience=[];  for (let li of doc.querySelectorAll("li")) {
                if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
                  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
                  experience.push(li.textContent);
              }
              job.experience_required=experience[0];
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

let auxbenefit = Array.from(doc.querySelectorAll('p')).filter(x => x.textContent.search(/BENEFITS PACKAGE /gmi) > -1);
//auxbenefit[0]!=null ? job.source_benefit=auxbenefit[0].textContent.trim() : job.source_benefit='';
auxbenefit[0]!=null ? job.source_benefit=auxbenefit[0].nextElementSibling.textContent.trim() : job.source_benefit='';

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        

        
        
        var full_html = doc.querySelector(selector);
        if (full_html) {
                var jobtype=full_html.textContent.toUpperCase().replace(/-/gi,' '); 
                if(jobtype.includes('FULL TIME'))job.source_jobtype='Full Time';
                if(jobtype.includes('FULLTIME'))job.source_jobtype='Full Time';
                if(jobtype.includes('CASUAL'))job.source_jobtype='Casual';
                if(jobtype.includes('PART TIME'))job.source_jobtype='Part Time';
                if(jobtype.includes('PARTTIME'))job.source_jobtype='Part Time'; 
                if(jobtype.includes('PERMANENT'))job.source_jobtype='Permanent';
                if(jobtype.includes('VOLLZEIT'))job.source_jobtype='Vollzeit';
                if(jobtype.includes('TEILZEIT'))job.source_jobtype='Teilzeit';
                if(jobtype.includes('CDI'))job.source_jobtype='CDI';
            
            
            
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
            
            
              if (job.html.length < 200) {job.flag_active = 0; job.html="";  job.jobdesc ='';}

        }else
              {
              job.flag_active = 0; job.html=""; job.jobdesc ='';
              }
    } catch (err) {
        console.log(err)
    }
    out["job"] = job;
    console.table(job)
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




