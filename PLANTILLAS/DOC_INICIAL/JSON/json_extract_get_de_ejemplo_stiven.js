(function () {
    var jobs = [];
    var out = {};
    var cont = 1; //contador de paginas
    var json;
    // do {
    //paso 1: La data: buscar en los headers request Payload (el último header)
    var data = {};
    $.ajax({
      url: 'https://api.solides.jobs/v2/vacancy/search?reference_id=93850&search=&page=1&pagination=25&vacancyType=jobs=page=',  // paso 2) url
      headers: { // paso 3) headers
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9",
        "jtoken": "",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      type: 'GET',    // 4) tipo
      dataType: "json", // 5) data que retorna
      //data: data, //Solo descomentar esta linea en los casos donde la respuesta sea un html
      data: JSON.stringify(data), //El método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON
      async: false,
      success: function (result) {
        msg("SUCCES");
        json = result.data;  //6) ruta de los trabajos
        msg(json.length);
        //msg(json);
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].name;
          job.location = json[i].city.name;
          job.source_location = json[i].city.name;
          job.url = json[i].linkVacancy;
          job.reqid = json[i].id;
          //job.logo = json[i].;
          //job.source_empname = json[i];
          //job.source_jobtype = json[i].;
          //job.source_salary = json[i].;
          //job.dateposted_raw = json[i].post_date.split(" ").shift().split("-")
          //job.dateposted_raw = job.dateposted_raw;
          //job.dateposted_raw = job.dateposted_raw[1] +"/"+job.dateposted_raw[0] +"/"+job.dateposted_raw[2];
          //job.dateclosed_raw = json[i].;
          //Description
          //job.jobdesc = json[i].;
          //job.jobdesc = removeTextBefore(job.jobdesc, 'Lyon, Francia', true);
          //job.jobdesc = removeTextAfter(job.jobdesc, 'Amsterdam, Netherlands', true);
          job.temp = 2022;
          jobs.push(job);
        }
        cont++;
      },
      error: function (error) {
        msg(error);
      }
    });
    //} while (json.length > 0);  // 7) condicion de parada
    out["jobs"] = jobs;
    return out;
   })();
   
   
   
   
   
   
   
   // (function() {
   //   var out = {};
   //   var html_jobs = document.querySelectorAll('div[class="sc-fQkuQJ fzEIob"]');
   //   var jobs = [];
   //   for(var x in html_jobs){
   //     if(typeof html_jobs[x] =="function") continue;
   //     if(typeof html_jobs[x] =="number") continue;
   //     var job = {};
   //     var elem = html_jobs[x];
   //     job.title = elem.querySelector('a').textContent.trim()//.replace(':','');
   //     job.url = elem.querySelector('a').href.trim()
   //   // job.reqid = elem.querySelector("ul li").textContent.trim().split('Código').pop().trim();
   //     job.source_location =elem.querySelector('div[class="sc-dphlzf gYdCux"]').textContent.trim()//.split(':').pop().trim().replace(' / ',', ')
   //     job.location = job.source_location; //.querySelector("ul li:nth-child(2)").textContent.trim().split(':').pop().trim().replace(' / ',', ')+', BR';
   //     //job.dateposted_raw = elem.querySelector("").textContent.trim();
   //     //job.logo = elem.querySelector("").getAttribute("src").trim();
   //     //job.source_apply_email = elem.querySelector("").textContent.trim();
   //     //job.source_empname = elem.querySelector("").textContent.trim();
   //     //job.source_jobtype = elem.querySelector("").textContent.trim();
   //     var salary = elem.querySelector('div[class="sc-dBaXSw ijUKm"]').textContent.trim();
   //     if(salary.includes('Salário')) job.source_salary = salary.split('Informações adicionais').pop().trim().split('Salário inicial de').pop().split('Salário inicial').pop().split('Salário').pop().split('Benefícios').shift().split('Horário de trabalho').shift().split('Prêmio de Participação').shift().trim().replaceAll(':','');
   
   //     var full_html = elem;
   
   //       var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe'];
   //       if (remove_selectors.length > 0) {
   //         remove_selectors.forEach(remove_selector => {
   //           for (const a of full_html.querySelectorAll(remove_selector)) {
   //             a.remove();
   //           }
   //         });
   //       }
   //       if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
   //       if (typeof msg == "undefined") msg = console.log;
   //       job.html = full_html.innerHTML.trim();
   //       job.html = removeTextBefore(job.html, 'Perfil:', false);
   //       //job.html = removeTextAfter(job.html, '', true);
   //       job.html = cleanHTML(job.html);
   //       var tmp = document.createElement('div');
   //       tmp.innerHTML = job.html;
   //       job.jobdesc = tmp.textContent.trim();
   //       job.jobdesc = cleanHTML(job.jobdesc);
   //       if (job.jobdesc.length < 50) {
   //         job.flag_active = 0;
   //         job.html = "";
   //         job.jobdesc = "";
   //       }
   
   
   
   //     job.temp = 1;
   //     jobs.push(job);
   //   }
   
   //   out["jobs"]= jobs;
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
   