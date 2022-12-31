    //FETCH JOBDATA -sin decoder  

    
    (async () => {
        let out = {};
        var job = {};
        var selector = ``;
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
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;
    //var job = pass_it["job"];
    
        try {
            const url = window.location.href
            const resp = await fetch(url, {
                "headers": {
                    "accept": "*/*"
                }
            });
            const data = await resp.text();
            const parseDoc = new DOMParser();
            const doc = parseDoc.parseFromString(data, 'text/html');
            if (!!doc.querySelector(selector)) {
                
                
                //     ███████████████████████████████ variables directas █████████████████████████████████████  /*  

            //EXPERIENCE REQUIRED          
            let experience=[];  for (let li of document.querySelectorAll("p")) {
                if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
                  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
                  experience.push(li.textContent);
              }
              if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
            //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document);
            
            //*/// ████████████████████████████████████████████████████████████████████


            var full_html = doc.querySelector(selector);
            //if (full_html) {
                // remove something from the jobdatata
                if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                    if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
                });

                job.html = full_html.innerHTML.trim();
                //limpieza de las descripciones
                //job.html = removeTextBefore(job.html, ``, false);
                //job.html = removeTextAfter(job.html, ``, true);
                //job.html = removeTextAfter(job.html, ``, true);
                //job.html = removeTextAfter(job.html, ``, true);
                if(job.html.indexOf('@')>-1){
                    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
                    job.html = job.html.replace(eliminar,'');
                  }
                
                  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
                  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
                  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
                  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                  job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
                            
                
                
                
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
                
 
            }else
                  {
                  job.flag_active = 0;
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











//FETCH JOBDATA -sin decoder  ANTIGUO
    
    (async () => {
        let out = {};
        var job = {};
        var selector = ``;
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
            const doc = parseDoc.parseFromString(data, 'text/html');
            if (!!doc.querySelector(selector)) {
            var full_html = doc.querySelector(selector);
            //if (full_html) {
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