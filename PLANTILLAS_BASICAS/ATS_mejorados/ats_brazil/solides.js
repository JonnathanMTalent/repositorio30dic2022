//solides.jobs


// EXTRACT:

(function() {
    var jobs = [];
    var out = {};
    var pages = 1;
    var json;
    var data_length = 0;
    const BASE_URL = 'https://api.solides.jobs/v2/vacancy/search?reference_id=86032&search=';
  
    do {
      let data = `reference_id=86032&search=&page=${pages}&pagination=25&vacancyType=jobs`;
      $.ajax({
        url: BASE_URL,
        headers: {
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'GET',
        dataType: "json",
        data: data,
        //data: JSON.stringify(data),
        async: false,
        success: function(result) {
  
          json = result.data;
          var totalJobs = result.totalVacancies;
  
          data_length = json.length;
          msg('\x1b[42m JSON received  -----> ' + data_length);
          msg('\x1b[45m EXPECTED JOBS by Json  -----> ' + totalJobs);
          msg(' Waiting next page -> ' + pages);
  
          if (data_length > 0) {
  
            for (var i = 0; i < data_length; i++) {
              var job = {};
              let elem = json[i];
              job.title = elem.name;
              job.reqid = elem.id;
              job.url = elem.linkVacancy;
  
              var city = elem.city.name;
              var state = elem.state.name;
              var loc = "";
              var array_loc = [];
  
              if (city) array_loc.push(city);
              if (state) array_loc.push(state);
              if (array_loc.length) loc = array_loc.join(", ");
  
              job.location = loc;
              job.source_location = loc;
              if (job.location == "") {
                job.location = ' São Paulo, SP, BR';
              }
              if (!job.location.includes("BR")) job.location = job.location + ", BR";
              // job.dateposted_raw = elem.date;
              //job.source_empname = elem.company.name;
              job.temp = "03/14/2022";
              jobs.push(job);
            }
  
            pages++;
          } else {
            msg('\x1b[33m THERE IS NO NEED TO EXTRACT ---- NO JOBS -> ' + data_length);
          }
        },
        error: function(error) {
          msg(error);
        }
      });
  
    } while (data_length > 0);
  
    out["jobs"] = jobs;
    return out;
  })();


//BEFORE JOBDESC

//ESPERAS


(function() {
    var out = {};
    out.waitFor = 'div#vacancyDescription > div > div > div:nth-child(3)';
  //   msg("Esperando 3 segundos..............");              
  //   out.wait = 3000;
  //   out["html"] = true;
  //   out["pic"] = true;

 // out.iframeSelector = "iframe#pcrframe";
 // out.iframeWaitFor = "div#jdesc";

    return out;
})();

// JOBDESCTRIPTION:

(function() {
    var out = {};
    var job = {};
    var selector = 'div#vacancyDescription > div > div > div:nth-child(3)';

    if (document.querySelector(selector)) {



        let benefits = multiplesVariables(/Benefícios:/gmi, "p", document, true);
        if (benefits) {
            job.source_benefit = benefits;
        } else {
            benefits = multiplesVariables(/Benefícios/gmi, "div.sc-jqIZGH.kaTcDn", document, false);
            if (benefits) job.source_benefit = benefits
        }
        //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
        let jobtype = buscOcurrenciaHTML(document.body, null, "", /fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi, false);
        if (!job.source_jobtype) {
            if (jobtype) job.source_jobtype = jobtype;
        }
        // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
        if (!job.experience_required) {
            let experience = [];
            for (let li of document.querySelectorAll("p,li")) {
                if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad|years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/i.test(li.textContent) &&
                    /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
                    experience.push(li.textContent);
            }
            if (experience[0] != undefined) {
                job.experience_required = experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
            }
        }
        //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
        //source salary   
        if (!job.source_salary) {
            let source_salary = [];
            for (let li of document.querySelectorAll("p,li")) {
                if (/VR de|salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária/i.test(li.textContent) && /\$|¢|€| BRL |R$/i.test(li.textContent) &&
                    /\d/gi.test(li.textContent))
                    source_salary.push(li.textContent);
            }
            if (source_salary[0] != undefined) {
                job.source_salary = source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
                if (job.source_salary) job.source_salary = job.source_salary?.split("dia").shift().trim()+" dia";
            }
        }
        //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 



        var full_html = document.querySelector(selector);
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;

        var remove_selectors = ["a", "script", "style", "img", "i"];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                let salir
                do {
                    salir = false;
                    if (full_html.querySelector(remove_selector)) {
                        full_html.querySelector(remove_selector).remove();
                        salir = true;
                    }
                } while (salir);
            });
        }

        for (const a of full_html.querySelectorAll("p")) {
            if (a.textContent.search(/A sede de trabalho será/gi) > -1) a.remove();
        }

        job.html = full_html.innerHTML.replace(/&nbsp;/g, " ").trim();

        if (job.html.indexOf('@') > -1) {
            job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi, "");
        }
        if (job.html.indexOf('https') > -1) {
            job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        }
        if (job.html.indexOf('http') > -1) {
            job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        }
        if (job.html.indexOf('HTTPS') > -1) {
            job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        }
        if (job.html.indexOf('HTTP') > -1) {
            job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        }
        if (job.html.indexOf('www') > -1) {
            job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        }
        if (job.html.indexOf('WWW') > -1) {
            job.html = job.html.replace(/(WWW?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        }

        job.html = removeTextBefore(job.html, 'Atividades a serem desenvolvidas:', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);

        job.html = removeTextAfter(job.html, 'PROPOSTA', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);

        //job.html = cleanFromPointAtoB(job.html, "", "");
        //job.html = cleanFromPointAtoB(job.html, "", "");

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        job.jobdesc = job.jobdesc.replace(/<[^>]*>?/g, "");
        out["job"] = job;
        checkJob(job, "benefit,benefits,perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$");

    } else {
        msg("no hay selector");
    }
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
function cleanFromPointAtoB(text, a, b) {
    if (text.indexOf(a) > -1 && text.indexOf(b) > -1) {
        let a_b = text.slice(text.indexOf(a), text.indexOf(b));
        text = text.replace(a_b, "").replace(b, "").trim();
    }
    return text;
}
function buscOcurrenciaHTML(contenedor, selector, string, expR, verHTML) { // jjms
    let resultado;
    let revisar;

    if (contenedor != null && selector != null) {
        revisar = contenedor?.querySelector(selector)?.innerHTML;
        if (verHTML) return revisar;
        if (revisar?.match(expR)?.length) {
            resultado = revisar?.match(expR)[0];
        }
    } else {
        if (contenedor != null && selector == null) {
            revisar = contenedor?.innerHTML;
            if (verHTML) return revisar;
            if (revisar?.match(expR)?.length) {
                resultado = revisar?.match(expR)[0];
            }

        } else {
            if (verHTML) return string;
        }
        if (string?.match(expR)?.length) {
            resultado = string?.match(expR)[0];
        }
    }
    return resultado;
}
function checkJob(job, palabras) {


    let claves = Object.keys(job);
    msg(`\n \x1b[31m INICIO JOB.....\x1b[39m`)
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if (claves[i] == "jobdesc" || claves[i] == "html") {
            if (claves[i] == "jobdesc") {
                msg(`${"\x1b[33m El tamaño de la descripcion es: "+job[clave].length}:`)
                if (palabras.includes(',') && job[clave].length > 0) {
                    var arrayPalabras = palabras.split(',');
                    for (var z = 0; z < arrayPalabras.length; z++) {
                        if (job[clave].toLowerCase().indexOf(arrayPalabras[z].trim()) > -1) msg(`${"\x1b[41m En jobdesc existe la palabra: "+arrayPalabras[z].trim()}:`);
                    }
                } else {
                    if (job[clave].toLowerCase().indexOf(palabras) > -1) msg(`${"\x1b[41m En jobdesc existe la palabra: "+palabras}:`);
                }
            }
            if (claves[i] == "html") msg(`${"\x1b[33m El tamaño de la html es: "+job[clave].length}:`)
            continue
        }
        msg(`${"\x1b[32m"+claves[i]}:`)
        msg(job[clave])
    }
    msg(`\x1b[31m FIN JOB.....\n \x1b[39m`)
}
function multiplesVariables(expReg, selector, contenedor, nextElementSibling) { // jjms
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    if (!nextElementSibling) aux[0] != null ? resultado = aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado = undefined;
    if (nextElementSibling) aux[0] != null ? resultado = aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado = undefined;
    return resultado;
}