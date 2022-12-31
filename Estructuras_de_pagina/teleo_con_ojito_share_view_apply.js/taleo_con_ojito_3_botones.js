

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
    job.source_location= elem.querySelector('h4 a').textContent.trim() ;
      let preLocationSel = elem.querySelector("h4.oracletaleocwsv2-head-title");
    if (preLocationSel) {
        let preLocation = elem.querySelector("h4.oracletaleocwsv2-head-title").textContent.trim();
          if ( preLocation.search(/\w+\s?\w*,\s?[A-Z]{2}/g) > -1 ) {
          job.location = preLocation.match(/\w+\s?\w*,\s?[A-Z]{2}/g).pop().trim();
        }
          else {
          job.location = "Munich, DE";
        }
    }
      else {
          job.location = "Munich, DE";
    }
    if(job.source_location.indexOf('US')>-1)job.location=job.location+', US';
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
// 	var out = {};
//   	out.wait = true;
//   	//out.pic = true;
  	
//     return out;
// })();


// (function() {
// 	var out = {};
//     var html_jobs = document.querySelectorAll("div.oracletaleocwsv2-accordion");
//   	var jobs = [];for(var x in html_jobs){
//     	if(typeof html_jobs[x] =="function") continue;
//       	if(typeof html_jobs[x] =="number") continue;
//     	var job = {};
//     	var elem = html_jobs[x];
//     	job.title = elem.querySelector("h4 a").textContent.trim().split('-').shift();
//     	job.url = elem.querySelector("h4 a").href.trim();
//         job.reqid = elem.querySelector("h4 a").href.split('rid=').pop().trim();
//         job.source_location= elem.querySelector('h4 a').textContent.trim() ;
//       	let preLocationSel = elem.querySelector("h4.oracletaleocwsv2-head-title");
//         if (preLocationSel) {
//             let preLocation = elem.querySelector("h4.oracletaleocwsv2-head-title").textContent.trim();
//           	if ( preLocation.search(/\w+\s?\w*,\s?[A-Z]{2}/g) > -1 ) {
//               job.location = preLocation.match(/\w+\s?\w*,\s?[A-Z]{2}/g).pop().trim();
//             }
//           	else {
//               job.location = "Munich, DE";
//             }
//         }
//       	else {
//               job.location = "Munich, DE";
//         }
//     	//job.location = elem.querySelector("div.oracletaleocwsv2-accordion-head-info > div:nth-child(3)").textContent.trim() + ', ' + elem.querySelector("div.oracletaleocwsv2-accordion-head-info > div:nth-child(4)").textContent.trim();
//         //job.dateposted_raw = elem.querySelector("").textContent.trim();
//         //job.logo = elem.querySelector("").getAttribute("src").trim();
// 		//job.source_apply_email = elem.querySelector("").textContent.trim();
// 		//job.source_empname = elem.querySelector("").textContent.trim();
// 		//job.source_jobtype = elem.querySelector("").textContent.trim();
// 		//job.source_salary = elem.querySelector("").textContent.trim();
//       	job.temp = 1012167;
//     	jobs.push(job);
//   	} 

// 	out["jobs"]= jobs;
//   	return out;
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
        
              const auxExperience = [...doc.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
            if (auxExperience) {
                job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
            }
        
        
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





// (function() {
//   var out = {};
//   var job = {};
//   var selector =  'div[name="cwsJobDescription"]';
//   //var remove_selectors = [];
//   //var job = pass_it["job"];
//   if(document.querySelector(selector))
//   {
//       const auxExperience = [...document.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
// if (auxExperience) {
//     job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
// }

//     var full_html = document.querySelector(selector);
//     var jobtype=full_html.textContent.toUpperCase().replace(/-/gi,' '); 
//     if(jobtype.includes('FULL TIME'))job.source_jobtype='Full Time';
//     if(jobtype.includes('FULLTIME'))job.source_jobtype='Full Time';
//     if(jobtype.includes('CASUAL'))job.source_jobtype='Casual';
//     if(jobtype.includes('PART TIME'))job.source_jobtype='Part Time';
//     if(jobtype.includes('PARTTIME'))job.source_jobtype='Part Time'; 
//     if(jobtype.includes('PERMANENT'))job.source_jobtype='Permanent';
//     if(jobtype.includes('VOLLZEIT'))job.source_jobtype='Vollzeit';
//     if(jobtype.includes('TEILZEIT'))job.source_jobtype='Teilzeit';
//     if(jobtype.includes('CDI'))job.source_jobtype='CDI';



//     // remove something from the jobdatata
//     //if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
//     if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
//     if (typeof msg == "undefined") msg = console.log;



//     var location = document.querySelector("p:nth-child(6) > span > span > b > span > span");
//     if(location){
//       job.location = location.textContent.split("/").shift().trim();
//     }
//       /*for (const a of document.querySelectorAll('#contactmail')) {
//       if (a.textContent.includes('Employer')){ //can use search or match methods
//       //job.source_empname = a.textContent.trim().split("Employer:").pop().split('Type').shift(); //another querySelector if needed
//       a.remove(); //if you want to remove this selector
//       } 
//       }*/

//     let links = document.querySelectorAll('a,script,input,button,img,style')
//     links.forEach(elemento => elemento.remove()); 

//     job.html      = full_html.innerHTML.trim(); 

//   if(job.html.search(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
//   job.source_apply_email = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
//   }

//   job.html = removeTextAfter(job.html, "Further information", false);
//   //job.html = removeTextBefore(job.html, "", false);
//   //job.html = removeTextBefore(job.html, "", false);
//   //job.html = removeTextBefore(job.html, "", false);

//   job.html = job.html.split("We are an equal opportunity")[0];
//   //job.html = job.html.split("")[0];
//   //job.html = job.html.split("")[0];
//   //job.html = job.html.split("")[0];

//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");

//   if (job.html.indexOf('@') > -1) {   job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  }  if (job.html.indexOf('https') > -1) {   job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('http') > -1) {   job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('HTTPS') > -1) {   job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('HTTP') > -1) {   job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }


//     job.html      = cleanHTML(job.html);
//     var tmp       = document.createElement('div');
//     tmp.innerHTML = job.html;
//     job.jobdesc   = tmp.textContent.trim();
//     job.jobdesc   = cleanHTML(job.jobdesc);



//   if (job.html.length < 200) {job.flag_active = 0; job.html="";  job.jobdesc ='';}
//   }
//   else
//   {
//   job.flag_active = 0; job.html=""; job.jobdesc ='';
//   }
//   out["job"] = job;
//   return out;

// })();
// function removeTextBefore(html, text, flag) {
//   var newHtml = html;
//   if (newHtml.indexOf(text) > -1) {
//     newHtml = newHtml.split(text).pop();
//     if (!flag) {
//       newHtml = "<h3>" + text + "</h3>" + newHtml;
//     }       
//   }
//   return newHtml;
// }
// function removeTextAfter(html, text, flag) {
//   var newHtml = html;
//   if (newHtml.indexOf(text) > -1) {
//     newHtml = newHtml.split(text).shift();
//     if (!flag) {
//       newHtml = newHtml + "<p>" + text + "</p>";
//     }       
//   }
//   return newHtml;
// }