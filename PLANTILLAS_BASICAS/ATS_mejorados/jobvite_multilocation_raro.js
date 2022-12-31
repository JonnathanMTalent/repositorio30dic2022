// EXTRACT

// DOBLE fetch BASICO
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
        const html_jobs = div.querySelectorAll('div.jv-wrapper ul.list-unstyled.jv-job-list.jv-search-list > li.row');
        // out.pass_it.jobsPerPage=25;
        // out.pass_it.jobsInPage = html_jobs.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for (let x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            let job = {};
            let elem = html_jobs[x];
            //////EXTRACTING VARIABLES///////
    	job.title = elem.querySelector("a").textContent.split("(").shift().trim();
    	job.url = elem.querySelector("a").href.trim() + "?_jvst=Job Board&_jvsd=talent";
    	
    	job.reqid = elem.querySelector('div[class="jv-job-id"]').textContent.split("#").pop().replace(")","").trim();
// 		job.location = elem.querySelector(".jv-job-list-location").textContent.trim();
    //   	if(job.location.indexOf(",")>-1)
    //       job.location = job.location.split(",")[0].trim()+", "+ job.location.split(",")[1].trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.dateclosed_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();

    
    
            job.temp = 1;
            
    //     ████████████████████████████████ locacion ████████████████████████████████████  /*
    

              const resp2 = await fetch(job.url, {
                    "headers": {
                        "accept": "*/*"
                    }
            });
              const data = await resp2.text();
              const parseDoc = new DOMParser();
              const doc = parseDoc.parseFromString(data, 'text/html')

                  
                  var exp=doc.querySelector('p.jv-job-detail-meta').innerHTML.trim();
                  exp=exp.split('<span class="jv-inline-separator"></span>');
                  exp=exp.join("-");
                  exp=exp.replaceAll(" ","").replaceAll("\n","");
                  let reqid=exp.split("-").pop();
                  let ini=exp.split("-").shift();
                  exp=exp.replace(ini+"-","");
                  exp=exp.replace("-"+reqid,"");
                  job.location=exp;
                  

    
    //*/// ████████████████████████████████████████████████████████████████████
    
            job.temp = 1;
            
    //  job.location = job.location.replace(/ or | and | \&/gi,",");

if(job.location.includes('-')){
    var locations = job.location.split('-');
    for(var z=0;z<locations.length;z++){
    var jobx = {...job};
    jobx.location = locations[z].trim();
    // jobx.location = jobx.location.split('-').reverse().join(', ');
    jobs.push(jobx);
    }
    }else{
    // job.location = job.location.split('-').reverse().join(', ');
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


        // PAGINACION

        (function() {
            var out = {};
            var next_page_selector = '[class="jv-pagination-next"]'; //selector to identify the next button
            //var last_page_selector = ""; //selector to identify the last page
        
            var clickable_elem = document.querySelector(next_page_selector);
        
            //stop condition
            if (!document.querySelector(next_page_selector)) {
                //last page
                out["has_next_page"] = false;
            } else if(clickable_elem){
                //go to next page
                clickable_elem.click();
                out["has_next_page"] = true;
            } else {
                //try again
                out["has_next_page"] = true;
            }
            out.waitFor = "div.jv-wrapper ul.list-unstyled.jv-job-list.jv-search-list > li.row";
            return out;
        })();


        // JOBDESCRIPTION

        (function() {
            var out = {};
            var job = {};
            var selector = 'div[class="jv-job-detail-description"]';
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
            //var job = pass_it["job"];
            var iframeDocument = document//.querySelector("#jv_careersite_iframe_id").contentWindow.document;
            var full_html = iframeDocument.querySelector(selector);
            // remove something from the jobdatata
            if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
            if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
            if (typeof msg == "undefined") msg = console.log;
            var fields = iframeDocument.querySelectorAll("#main > div > div.jv-job-detail-description");
            for(var y in fields){
              var field = fields[y].textContent;
              if(field!=undefined){
                if(field.indexOf("Close Date")!=-1){
                    field = field.trim();
                    job.dateclosed_raw = field;
                    job.dateclosed_raw = job.dateclosed_raw.replace("Close Date", "");
                }
                if(field.indexOf("Job Type")!=-1){
                    field = field.trim();
                    job.source_jobtype = field;
                    job.source_jobtype = job.source_jobtype.replace("Job Type", "");
                }
              }
            }
            
            for (const a of full_html.querySelectorAll('p')) {
              if (a.innerText.search(/Rewards include:/)>-1 && a.nextElementSibling){
                job.source_benefit = a.nextElementSibling.innerText;
                //a.remove();
              }
            }
            
            job.html      = full_html.innerHTML.trim();
            job.html = removeTextBefore(job.html, 'Position Summary:', false);
            job.html = removeTextAfter(job.html, 'When Applying', true);
            //job.html = removeTextAfter(job.html, 'All applications will be reviewed', true);
            //job.html = removeTextAfter(job.html, 'Who we are', true);
            job.html = removeTextAfter(job.html, 'Options', true);
            
                //LIMPIAR DESCRIPCIONES
          
          
              if (typeof cleanHTML == "undefined") cleanHTML = function(x) {return x};
              if (typeof msg == "undefined") msg = console.log;
              
              //clean emogis
              job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
              if(job.html.indexOf('@')>-1){
                  var eliminar = job.html?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
              if(eliminar)job.html=eliminar;
              
              
              if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
              if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
              if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
              if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
              if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
            
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
            out["job"] = job;
            printJob(job);
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
          
          function printJob(job) {
          
          
              let claves = Object.keys(job);
              msg(`\n \x1b[31m INICIO JOB.....\x1b[39m`)
              for (let i = 0; i < claves.length; i++) {
                  let clave = claves[i];
                  if (claves[i] == "jobdesc" || claves[i] == "html") {
                      continue
                  }
                  msg(`${"\x1b[32m"+claves[i]}:`)
                  msg(job[clave])
              }
              msg(`\x1b[31m FIN JOB.....\n \x1b[39m`)
          }