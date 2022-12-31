    // FETCH EXTRAC BASICO

    (async () => {
        let out = {};
        // out["pass_it"] = pass_it;
        
        var jobsSelector = ``

        //   // JJJJJJ// FORMAT DATE JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
// const formatDate = (value) => {
//     let date = new Date(value);
//     const withCero = n => n < 10 ? `0${n}` : n;
//     return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
//   }
//   // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
        try {
        let jobs = [];
        const url = window.location.href
        const resp = await fetch(url, {
        "headers": {}
        });
        const data = await resp.text();
        var doc = document.createElement('div');
        doc.innerHTML = data;
        var htmlJobs = doc.querySelectorAll(jobsSelector);
        htmlJobs.forEach((elem) => {
        var job = {};
        //elem.querySelector(``).textContent.trim()
        job.title = elem.querySelector('').textContent.trim();
        job.url = elem.querySelector('').href.trim();
        job.reqid = elem.querySelector('').href.trim();
        job.source_location = elem.querySelector('').textContent.trim();
        job.location = job.source_location;
        job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.dateclosed_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('').textContent.trim();
        job.source_salary = elem.querySelector('').textContent.trim();
        job.experience_required = elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_empname = elem.querySelector('').textContent.trim();
        //     ███████████████████████████████ variables funcion █████████████████████████████████████  /*  

            // //EXPERIENCE REQUIRED          
            // let experience=[];  for (let li of tmp.querySelectorAll("p")) {
            //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
            //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
            //       experience.push(li.textContent);
            //   }
            //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
            // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp);
            
            //*/// ████████████████████████████████████████████████████████████████████



        jobs.push(job);
        })
        out["jobs"] = jobs;
        return out;
        } catch (err) {
        console.log(err)
        }
        })();
        function multiplesVariables(expReg,selector,contenedor){
            var resultado
            let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
            aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
            return resultado;
        }
        
        
        //   function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
        //     dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
          
        //     let day   =  dateRaw.split(cut)[dayPosition].trim(), 
        //         month =  dateRaw.split(cut)[monthPosition].trim(), 
        //         year  = dateRaw.split(cut)[yearPosition].trim();
          
        //     if (day < 10 && day.length < 2) {day = "0" + day;}
          
        //     if(dateRaw.search(/[a-z]/gi)>-1){ 
        //       if(month.search(/jan/i)>-1){month = "01";}
        //       if(month.search(/feb|fév/i)>-1){month = "02";}
        //       if(month.search(/mar|mär/i)>-1){month = "03";}
        //       if(month.search(/apr|avr/i)>-1){month = "04";}
        //       if(month.search(/may|mai/i)>-1){month = "05";}
        //       if(month.search(/jun|juin/i)>-1){month = "06";}
        //       if(month.search(/jul|juil/i)>-1){month = "07";}
        //       if(month.search(/aug|août/i)>-1){month = "08";}
        //       if(month.search(/sep/i)>-1){month = "09";}
        //       if(month.search(/oct|okt/i)>-1){month = "10";}
        //       if(month.search(/nov/i)>-1){month = "11";}
        //       if(month.search(/dec|dez/i)>-1){month = "12";}
        //     }
          
        //     if (year < 100 && year.length < 3) {year = "20" + year;}
          
        //     var datum = month +"/"+  day +"/"+ year;
          
        //     return datum;
        //   }



// DOBLE-fetch NUEVA CON MEJORAS

      //Extract
      (async () => {
        const out = {};
        const jobs = [];
          // JJJJJJ// FORMAT DATE JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
        out.pass_it=pass_it;
        const url = window.location.href
            if (out.pass_it.count === 1) {
            let limitPage = document.querySelector('.bti-result-count-display').textContent.trim();
            out.pass_it.limit = Number(limitPage);
        }
            
            
            const resp = await fetch("https://careers.childrenshospitals.net/searchv5/views/results/ajax.cfm?page="+out.pass_it.count+"&_=1667999067678", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://careers.childrenshospitals.net/jobs?page=3",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
        // const html = await resp.text();
        // const div = document.createElement("div");
        // div.innerHTML = html;
        // const html_jobs = div.querySelectorAll('');
        
        
        const Data = await resp.json();
        const htmlDom = new DOMParser().parseFromString(Data.results, 'text/html').body;
        const html_jobs = htmlDom.querySelectorAll('div[id*=bti-job-]');
        out.pass_it.total += html_jobs.length;
        // out.pass_it.jobsPerPage=25;
        // out.pass_it.jobsInPage = html_jobs.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for (let x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            let job = {};
            let elem = html_jobs[x];
            //////EXTRACTING VARIABLES///////
             if(elem.querySelector("div.card-title > a")){
          job.title = elem.querySelector("div.card-title").textContent.trim();
          job.url = elem.querySelector("div.card-title > a").href.trim();
          if(elem.querySelector("div.bti-grid-search-contentarea > p")?.textContent.trim()){
            job.source_location = elem.querySelector("div.bti-grid-search-contentarea > p").textContent.trim();
            job.location = job.source_location.trim();
            if(job.location.indexOf("Nationwide")>-1)job.location="Columbus, Ohio, US";
            if(job.location.indexOf("New York")>-1)job.location="New York, US";
          }else{
            job.location = 'Lenexa, Kansa';
            //job.location = job.source_location;
          }
          job.reqid = job.url.split('jobs/').pop().split('/').shift(); 
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          var dom_logo = "https://careers.childrenshospitals.net"
          if(elem.querySelector(".card-img-holder > img")){
            job.logo = dom_logo + elem.querySelector(".card-img-holder > img").getAttribute("src").trim();
          }
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          job.source_empname = elem.querySelector(".card-subtitle").textContent.trim();
          if(job.source_empname.indexOf('-')>-1)job.source_empname=job.source_empname.split("-").shift();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          job.temp = 19;
            
            
            // job.title = elem.querySelector('').textContent.trim();
            // job.url = elem.querySelector('').href.trim();
            // job.reqid = elem.querySelector('').href.trim();
            // job.source_location = elem.querySelector('').textContent.trim();
            // job.source_location=job.source_location||"";
            // job.location=(job.source_location)||"HEAD QUARTERS"; //HEAD QUARTERS:
            // job.dateposted_raw = elem.querySelector('').textContent.trim();
            // job.dateclosed_raw = elem.querySelector('').textContent.trim();
            // job.source_jobtype = elem.querySelector('').textContent.trim();
            // job.source_salary = elem.querySelector('').textContent.trim();
            // job.experience_required = elem.querySelector('').textContent.trim();
            // job.source_benefit=elem.querySelector('').textContent.trim();
            // job.source_empname = elem.querySelector('').textContent.trim();
            // job.logo=elem.querySelector('').getAttribute("src").trim();
    
    
            job.temp = 1;
            
    //     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*
    
              var selector = `div.job-embedded-link-container`;
                  const remove_selectors = [
    'a',
    'i',
    'img',
    'svg',
    'link',
    'iframe',
    'form',
    'noscript',
    'figure',
    'video',
    'button',
    'input',
    'style',
    'javascript',
    'script',
];
              const resp2 = await fetch(job.url, {
                    "headers": {
                        "accept": "*/*"
                    }
            });
              const data = await resp2.text();
              const parseDoc = new DOMParser();
              const doc = parseDoc.parseFromString(data, 'text/html')
              
            //     ███████████████████████████████ variables del doc █████████████████████████████████████  /*  

            // job.source_location = doc.querySelector('').textContent.trim();
            // job.source_location=job.source_location||"";
            // job.location=(job.source_location)||"HEAD QUARTERS";   //HEAD QUARTERS:
                // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
        const jobType = [...doc.querySelectorAll('.bti-grid-searchDetails-side p')].find(e => e.textContent.match(/type:/gi))?.textContent.trim().split(':').pop().trim();
    if(jobType) job.source_jobtype = jobType;

    const salary = [...doc.querySelectorAll('.bti-grid-searchDetails-side p')].find(e => e.textContent.match(/Salary:/gi))?.textContent.trim().split(':').pop().trim();
    if(salary && salary.match(/\$/gi)) job.source_salary = salary;

    const datePosted = [...doc.querySelectorAll('.bti-grid-searchDetails-side p')].find(e => e.textContent.match(/posted:/gi))?.textContent.trim().split(':').pop().trim();
    if(datePosted) job.dateposted_raw = formatDate(datePosted);
            
            
            
            //EXPERIENCE REQUIRED          
            let experience=[];  for (let li of doc.querySelectorAll("p,li")) {
                if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
                  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
                  experience.push(li.textContent);
              }
              if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
            //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',doc);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',doc);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',doc);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',doc);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',doc);
            
            //*/// ████████████████████████████████████████████████████████████████████              
              
              
              var full_html = doc.querySelector(selector);
              if (full_html) {
                  // remove something from the jobdatata
                  if (remove_selectors.length > 0){
                      for (let x in remove_selectors){
                          if (full_html.querySelector(remove_selectors[x])) full_html.querySelector(remove_selectors[x]).remove();
                      }
                  }
                  
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
                  
                  
                  job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
                if(job.html.indexOf('@')>-1){
                    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                    job.html = job.html.replace(eliminar,'');
                  }
                
                  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
                  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
                  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
                  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
              
              
                  
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = job.html;
                                        //     ███████████████████████████████ variables tmp █████████████████████████████████████  /*  
        // job.source_location = tmp.querySelector('').textContent.trim();
        // job.source_location=job.source_location||"";
        // job.location=(job.source_location)||"HEAD QUARTERS";   //HEAD QUARTERS:

            // //EXPERIENCE REQUIRED          
            // let experience=[];  for (let li of tmp.querySelectorAll("p")) {
            //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
            //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
            //       experience.push(li.textContent);
            //   }
            //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
            // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp);
            
            //*/// ████████████████████████████████████████████████████████████████████
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
                  //// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    //     //BENEFIT DESDE EL JOB.JOBDESC                           
                    // let inicioBenefit=''; let finBenefit='';
                    // if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
                    // // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
              }
    
    //*/// ████████████████████████████████████████████████████████████████████
    
            job.temp = 1;
            jobs.push(job);
             }
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
        
        function multiplesVariables(expReg,selector,contenedor){
        var resultado
        let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
        aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
        return resultado;
    }
//   function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
//     dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
  
//     let day   =  dateRaw.split(cut)[dayPosition].trim(), 
//         month =  dateRaw.split(cut)[monthPosition].trim(), 
//         year  = dateRaw.split(cut)[yearPosition].trim();
  
//     if (day < 10 && day.length < 2) {day = "0" + day;}
  
//     if(dateRaw.search(/[a-z]/gi)>-1){ 
//       if(month.search(/jan/i)>-1){month = "01";}
//       if(month.search(/feb|fév/i)>-1){month = "02";}
//       if(month.search(/mar|mär/i)>-1){month = "03";}
//       if(month.search(/apr|avr/i)>-1){month = "04";}
//       if(month.search(/may|mai/i)>-1){month = "05";}
//       if(month.search(/jun|juin/i)>-1){month = "06";}
//       if(month.search(/jul|juil/i)>-1){month = "07";}
//       if(month.search(/aug|août/i)>-1){month = "08";}
//       if(month.search(/sep/i)>-1){month = "09";}
//       if(month.search(/oct|okt/i)>-1){month = "10";}
//       if(month.search(/nov/i)>-1){month = "11";}
//       if(month.search(/dec|dez/i)>-1){month = "12";}
//     }
  
//     if (year < 100 && year.length < 3) {year = "20" + year;}
  
//     var datum = month +"/"+  day +"/"+ year;
  
//     return datum;
//   }


   





        //version nueva

        // DOBLE-fetch 


      //Extract
      (async () => {
        const out = {};
        const jobs = [];
        out.pass_it=pass_it;
            const url = window.location.href
            const resp = await fetch(url, {
            "headers": {}
            });
        const html = await resp.text();
        const div = document.createElement("div");
        div.innerHTML = html;
        const html_jobs = div.querySelectorAll('div#pro-gallery-margin-container')[0].querySelectorAll('div[class="gallery-item-container visible hover-animation-fade-in"]');
        // out.pass_it.jobsPerPage=25;
        // out.pass_it.jobsInPage = html_jobs.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for (let x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            let job = {};
            let elem = html_jobs[x];
            //////EXTRACTING VARIABLES///////
            job.title = elem.querySelector('a[class]').textContent.trim();
            job.url = elem.querySelector('a[class]').href.trim();
    
    
            job.temp = 1;
            
    //     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*
    
              var selector = `selector de la descripcion`;
                  const remove_selectors = [
    'a',
    'i',
    'img',
    'svg',
    'link',
    'iframe',
    'form',
    'noscript',
    'figure',
    'video',
    'button',
    'input',
    'style',
    'javascript',
    'script',
];
              const resp2 = await fetch(job.url, {
                    "headers": {
                        "accept": "*/*"
                    }
            });
              const data = await resp2.text();
              const parseDoc = new DOMParser();
              const doc = parseDoc.parseFromString(data, 'text/html')
              
            //     ███████████████████████████████ variables del doc █████████████████████████████████████  /*  
            
            // //EXPERIENCE REQUIRED          
            // let experience=[];  for (let li of doc.querySelectorAll("p")) {
            //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
            //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
            //       experience.push(li.textContent);
            //   }
            //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
            //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',doc);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',doc);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',doc);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',doc);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',doc);
            
            //*/// ████████████████████████████████████████████████████████████████████              
              
              
              var full_html = doc.querySelector(selector);
              if (full_html) {
                  // remove something from the jobdatata
                  if (remove_selectors.length > 0){
                      for (let x in remove_selectors){
                          if (full_html.querySelector(remove_selectors[x])) full_html.querySelector(remove_selectors[x]).remove();
                      }
                  }
                  
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
                  
                  
                  job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
                if(job.html.indexOf('@')>-1){
                    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
                    job.html = job.html.replace(eliminar,'');
                  }
                
                  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
                  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
                  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
                  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
              
              
                  
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = job.html;
                                        //     ███████████████████████████████ variables tmp █████████████████████████████████████  /*  

            // //EXPERIENCE REQUIRED          
            // let experience=[];  for (let li of tmp.querySelectorAll("p")) {
            //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
            //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
            //       experience.push(li.textContent);
            //   }
            //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
            // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp);
            
            //*/// ████████████████████████████████████████████████████████████████████
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
                  //// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    //     //BENEFIT DESDE EL JOB.JOBDESC                           
                    // let inicioBenefit=''; let finBenefit='';
                    // if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
                    // // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
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
        
        function multiplesVariables(expReg,selector,contenedor){
        var resultado
        let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
        aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
        return resultado;
    }
//   function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
//     dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
  
//     let day   =  dateRaw.split(cut)[dayPosition].trim(), 
//         month =  dateRaw.split(cut)[monthPosition].trim(), 
//         year  = dateRaw.split(cut)[yearPosition].trim();
  
//     if (day < 10 && day.length < 2) {day = "0" + day;}
  
//     if(dateRaw.search(/[a-z]/gi)>-1){ 
//       if(month.search(/jan/i)>-1){month = "01";}
//       if(month.search(/feb|fév/i)>-1){month = "02";}
//       if(month.search(/mar|mär/i)>-1){month = "03";}
//       if(month.search(/apr|avr/i)>-1){month = "04";}
//       if(month.search(/may|mai/i)>-1){month = "05";}
//       if(month.search(/jun|juin/i)>-1){month = "06";}
//       if(month.search(/jul|juil/i)>-1){month = "07";}
//       if(month.search(/aug|août/i)>-1){month = "08";}
//       if(month.search(/sep/i)>-1){month = "09";}
//       if(month.search(/oct|okt/i)>-1){month = "10";}
//       if(month.search(/nov/i)>-1){month = "11";}
//       if(month.search(/dec|dez/i)>-1){month = "12";}
//     }
  
//     if (year < 100 && year.length < 3) {year = "20" + year;}
  
//     var datum = month +"/"+  day +"/"+ year;
  
//     return datum;
//   }




// version antigua

    // FETCH EXTRAC BASICO

    (async () => {
        let out = {};
        // out["pass_it"] = pass_it;
        var jobsSelector = ``
        try {
        let jobs = [];
        const url = window.location.href
        const resp = await fetch(url, {
        "headers": {}
        });
        const data = await resp.text();
        var doc = document.createElement('div');
        doc.innerHTML = data;
        var htmlJobs = doc.querySelectorAll(jobsSelector);
        htmlJobs.forEach((elem) => {
        var job = {};
        //elem.querySelector(``).textContent.trim()
        job.title = elem.querySelector('').textContent.trim();
        job.url = elem.querySelector('').href.trim();
        job.reqid = elem.querySelector('').href.trim();
        job.source_location = elem.querySelector('').textContent.trim();
        job.location = job.source_location;
        job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.dateclosed_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('').textContent.trim();
        job.source_salary = elem.querySelector('').textContent.trim();
        job.experience_required = elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_empname = elem.querySelector('').textContent.trim();



        jobs.push(job);
        })
        out["jobs"] = jobs;
        return out;
        } catch (err) {
        console.log(err)
        }
        })();

   



// fetch extract con doble llamado para la descripcion.

        //Extract
(async () => {
    const out = {};
    const jobs = [];
    out.pass_it=pass_it;
        const url = window.location.href
        const resp = await fetch(url, {
        "headers": {}
        });
    const html = await resp.text();
    const div = document.createElement("div");
    div.innerHTML = html;
    const html_jobs = div.querySelectorAll('div#pro-gallery-margin-container')[0].querySelectorAll('div[class="gallery-item-container visible hover-animation-fade-in"]');
    // out.pass_it.jobsPerPage=25;
    // out.pass_it.jobsInPage = html_jobs.length;
    // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
    for (let x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        let job = {};
        let elem = html_jobs[x];
        //////EXTRACTING VARIABLES///////
        job.title = elem.querySelector('a[class]').textContent.trim();
        job.url = elem.querySelector('a[class]').href.trim();


        job.temp = 1;
        
//     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*

          var selector = `selector de la descripcion`;
          var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
          const resp2 = await fetch(job.url, {
                "headers": {
                    "accept": "*/*"
                }
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



