//2 formas de extract
(async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    var jobsSelector = `div.oracletaleocwsv2-accordion`
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
    job.title = elem.querySelector("h4 a").textContent.trim().split('-').shift();
    job.url = elem.querySelector("h4 a").href.trim();
    job.reqid = elem.querySelector("h4 a").href.split('rid=').pop().trim();
    job.source_location= elem.querySelector(' div[class="oracletaleocwsv2-accordion-head-info"] div:nth-child(4)').textContent.trim() ;
    job.location=job.source_location;
    if(job.location.includes('NY'))job.location='New York, US';
    job.source_jobtype=elem.querySelector('div[class="oracletaleocwsv2-accordion-head-info"] div:nth-child(3)').textContent.trim();            
     
     

    //job.location = elem.querySelector("div.oracletaleocwsv2-accordion-head-info > div:nth-child(3)").textContent.trim() + ', ' + elem.querySelector("div.oracletaleocwsv2-accordion-head-info > div:nth-child(4)").textContent.trim();
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
       job.temp = 1012167;



    jobs.push(job);
    })
    out["jobs"] = jobs;
    return out;
    } catch (err) {
    console.log(err)
    }
    })();



// (function() {



//     var out = {};


//     var html_jobs = document.querySelectorAll('div.oracletaleocwsv2-accordion-group.oracletaleocwsv2-has-footer div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable.clearfix');
//     var jobs = [];
//     for (var x in html_jobs) {
//         if (typeof html_jobs[x] == "function") continue;
//         if (typeof html_jobs[x] == "number") continue;
//         var job = {};
//         var elem = html_jobs[x];
//         job.title = elem.querySelector('h4 a').textContent.trim();
//         job.url = elem.querySelector('h4 a').href.trim();


//         job.location = elem.querySelector('div.oracletaleocwsv2-accordion-head-info > div:nth-child(4)').textContent.trim();

//         job.location = job.location.replace(/, ?([A-z]+)? [A-z]+,/g, match => {
//             return `, ${match.replaceAll(',', '')}; `;
//         });


//         job.source_location = elem.querySelector('div.oracletaleocwsv2-accordion-head-info > div:nth-child(4)').textContent.trim();



//         job.reqid = job.url.split('rid=')[1].trim();
//         job.source_jobtype = elem.querySelector('div.oracletaleocwsv2-accordion-head-info > div:nth-child(3)').textContent.trim();


//         job.temp = "07/28/2022";

//         if (job.location.indexOf(";") > -1) {
//             job.location = job.location.split(";");
//             for (var i = 0; i < job.location.length; i++) {
//                 var jobx = {};
//                 jobx = {...job};                
//                 jobx.location = job.location[i].trim();               
//                 jobs.push(jobx);
//             }
//         } else {
//             jobs.push(job);
//         }


//         /*
//         if (job.location.indexOf(";") > -1) {
//             job.location = job.location.split(";");
//             for (var i = 0; i < job.location.length; i++) {
//                 var jobx = {};
//                 jobx = {
//                     ...job
//                 };
//                 jobx.location = job.location[i].trim();
//                 jobs.push(jobx);
//             }
//         } else {
//             job.source_location = elem.querySelector('div.oracletaleocwsv2-accordion-head-info > div:nth-child(4)').textContent.trim();
//             jobs.push(job);
//         }*/
//     }
//     out["jobs"] = jobs;
//     return out;
// })();


//Pagination
(function () {
    var out = {};
    var selector = "a.jscroll-next";  // selector donde esta la paginacion
	var texto = 'next';  //parte del texto (siguiente)
  out["has_next_page"] = false;

      	
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == texto){                
              	//msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
              	out["has_next_page"] = true;
            }
        });  

    out.waitFor = 'div.oracletaleocwsv2-accordion';
    return out;
})();



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




// (function () {
    
//     var out = {};
//     var job = {};
  
  
//     var full_html = document.querySelector('div[name="cwsJobDescription"]');
  
//     if (full_html) {
  
  
//       var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
  
//       if (remove_selectors.length > 0) {
//         remove_selectors.forEach(remove_selector => {
//           for (const a of full_html.querySelectorAll(remove_selector)) {
//             a.remove();
//           }
//         });
//       }
  
//       for (const a of full_html.querySelectorAll('p')) {
//         if (a.textContent.search(/benefits which includes/ig) > -1) {
//             job.source_benefit = a.textContent.split(/benefits which includes/ig).pop().split('.').shift().trim();
//         }
//       }
  
//       if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
//       if (typeof msg == "undefined") msg = console.log;
  
//       job.html = full_html.innerHTML.trim();
  
//       //job.html = removeTextBefore(job.html, '', false);
//       job.html = removeTextAfter(job.html, 'Apply by sending', true);
  
//       job.html = cleanHTML(job.html);
//       var tmp = document.createElement('div');
//       tmp.innerHTML = job.html;
//       job.jobdesc = tmp.textContent.trim();
//       job.jobdesc = cleanHTML(job.jobdesc);
//     }
//     out["job"] = job;
//     return out;
  
// })();
// function removeTextBefore(html, text, flag) {
//     var newHtml = html;
//     if (newHtml.search(text) > -1) {
//       newHtml = newHtml.split(text).pop();
//       if (!flag) {
//         newHtml = "<h3>" + text + "</h3>" + newHtml;
//       }
//     }
//     return newHtml;
//   }
// function removeTextAfter(html, text, flag) {
//     var newHtml = html;
//     if (newHtml.search(text) > -1) {
//       newHtml = newHtml.split(text).shift();
//       if (!flag) {
//         newHtml = newHtml + "<p>" + text + "</p>";
//       }
//     }
//     return newHtml;
// }