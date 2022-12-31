/*
Yo con fetch he notado 2 cosas.

Si se hace doble petición (por extract y jobdata) no se puede usar forEach

En algunos casos de forma extraña, fetch puede fallar en la petición aunque todo 
esté bien (tuve un caso en el que funcionaba solo en ocaciones y en consola también sucedía lo mismo)
pero uso ajax o xmlhttp y funciona sin problemas, entonces ps, quien sabe ahi
*/


//FETCH PARA USAR EN JSON

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
        out.pass_it.limit=data.noOfPages;
        for(let x = 0 ; x < data.contenedor.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.contenedor[x];  //poner tambien el contenedor de los jobs
            let job = {};
            job.title = elem.name;

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

//


//infinity
(function() {
    var out = {};
    out.pass_it = {
    "page": 0,
    "jobs": 0,
    "totalJobs": 0
    }
    return out;
    })();



    //extract
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
    jobs.push(job);
    })
    out["jobs"] = jobs;
    return out;
    } catch (err) {
    console.log(err)
    }
    })();



// RECORDAR QUE LOS SELECTORES NO SIEMPRE SON LOS MISMOS Y TOCA BUSCARLOS CON UN MSG
    //extract con json post como respuesta de un HTML
    (async () => {
        let out = {};
        out["pass_it"] = pass_it;
        var jobsSelector = `div[class*="joblist-item jobpost-detail"]`
        try {
            let jobs = [];
            const resp = await fetch("https://www.scp-health.com/wp-admin/admin-ajax.php", {
                "credentials": "include",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                    "Accept": "*/*",
                    "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "X-Requested-With": "XMLHttpRequest",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin"
                },
                "referrer": "https://www.scp-health.com/clinicians/clinician-careers/career-results/",
                "body": `action=retrive_job_list&position_type_id=&specialty_id=&input_page_num=${out.pass_it.page}&search_text=&location_code=&city_name=`,
                "method": "POST",
                "mode": "cors"
            });
            const data = await resp.json();
            const json_jobs = data.html
            out.pass_it.totalJobs = data.result_str.split(` `).shift().trim();
            var doc = document.createElement('div');
            doc.innerHTML = json_jobs;
            var htmlJobs = doc.querySelectorAll(jobsSelector);
            htmlJobs.forEach((elem) => {
                var job = {};
                //elem.querySelector(``).textContent.trim()
                job.title = elem.querySelector(`div[class*="jobitem-title"] a`).textContent.trim();
                job.url = elem.querySelector(`div[class*="jobitem-title"] a`).href.trim();
                job.reqid = job.url.split(`-`).pop().replace(`/`, ``)
                if (elem.querySelector(`div[class="jobitem-desc"] p`)) {
                    job.source_location = elem.querySelector(`div[class="jobitem-desc"] p`).textContent.trim()
                    job.location = elem.querySelector(`div[class="jobitem-desc"] p`).textContent.trim();
                }else{
                    job.source_location = job.title;
                    job.location = Locacion(job.title.split(` – `).pop().trim())+`, US`;
                }
                job.temp = `07/06/2022 Juan Bermudez`;
                jobs.push(job);
            })
            out["jobs"] = jobs;
            return out;
        } catch (err) {
            console.log(err)
        }
    })();




    //pagination
    //button next 
    (function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.page +=5; 
    var next_page_selector = 'a[class="list-controls__pagination__item paginationNextLink"]'; //selector to identify the next button
    var clickable_elem = document.querySelector(next_page_selector);
    //stop condition
    if (!clickable_elem) {
    //last page
    out["has_next_page"] = false;
    } else {
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
    }
    return out;
    })();





    //fetch job data con decoder
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
          const data = await resp.arrayBuffer()
          let decoder = new TextDecoder();
          let text = decoder.decode(data)
          const parseDoc = new DOMParser();
          const doc = parseDoc.parseFromString(text, 'text/html')
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




    //fetch job data sin decoder
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




    //fetch job data con decoder
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
        const data = await resp.arrayBuffer()
        let decoder = new TextDecoder();
        let text = decoder.decode(data)
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(text, 'text/html')
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






// descripcion en un json
  //https://www.tdcx.com/careers/details?jobId=89904&country=Malaysia&page=1

//fetch limpia 
(async () => {
    let out = {};
    var job = {};
    try {
        let jobs = [];
        const resp = await fetch("https://api.tdcx.com/jobs/89904", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "if-none-match": "W/\"140c-P/Ar2IYADgocFNFjLqt9EQN9Ukk\"",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://www.tdcx.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
        const data = await resp.json();
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        //out.pass_it.limit=data.noOfPages;
        for(let x = 0 ; x < data.job.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.job[x];  //poner tambien el contenedor de los jobs
            let job = {};
            var htmlin = elem.description;
            job.temp = `jonnathan M`;
            // jobs.push(job)
        }
        var div       = document.createElement("div");
        div.innerHTML = htmlin;
        var full_html= div
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
          }
          jobs.push(job)
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        
        out["job"] = jobs[0];
        console.table(job)
        return out;
    } catch (err) {
        throw err;
        console.log(err);
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
