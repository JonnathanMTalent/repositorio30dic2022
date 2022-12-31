// pagina de ejemplo:  https://apply.workable.com/careers/#jobs


//infinity
(function () {
    var out = {};
    out["pass_it"] = {
      "seguir": true,
      "counter": 0,
      "limit":0,
      "token":""
    };
    return out;
  })();
//extract 
(function() {
    var jobs = [];
    var out = {};
    out.pass_it = pass_it;
    var json;
    var Tken = '{\"token\":\"WzE2NDcyMTYwMDAwMDAsMjM2MTQxM10=\",\"query\":\"\",\"location\":[],\"department\":[],\"worktype\":[],\"remote\":[]}';
    var data = {
        "token": out.pass_it.token,
        "query": "",
        "location": [],
        "department": [],
        "worktype": [],
        "remote": []
    };
    //FUNCION AJAX DE JQUERY
    $.ajax({
        url: 'https://apply.workable.com/api/v3/accounts/alexander-dennis/jobs', //URL DEL JSON 
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-datadog-origin": "rum",
            "x-datadog-parent-id": "944339767054158473",
            "x-datadog-sampled": "1",
            "x-datadog-sampling-priority": "1",
            "x-datadog-trace-id": "2579887047790163964"
        },
        type: 'POST', //TIPO DE PETICION
        data: JSON.stringify(data), //LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
        dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
        async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
        success: function(result) { //FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
            json = result.results; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
            Tken = result.nextPage
            out.pass_it.limit = result.total;
            out.pass_it.token = result.nextPage;
            var stop_pag = json;
            //SE PREGUNTA POR LA LONGITUD DEL ARRAY DE LOS JOBS, PARA DETENER LA PAGINACION
            if (Tken == undefined) {
                msg(`---> FINAL DE PAGINACIÓN`);
            } else {
            }
            //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
            for (var i in json) {
                var job = {};
                job.title = json[i].title;
                //job.url = 'https://apply.workable.com/ipex/j/'+ json[i].id;
                job.url = `https://apply.workable.com/ipex/j/${json[i].shortcode}`;
                job.location = json[i].location.city + ', ' + json[i].location.region + ', ' + json[i].location.country;
                job.source_location = json[i].location.city + ', ' + json[i].location.region + ', ' + json[i].location.country;
                job.reqid = job.url.split("/").pop();
                job.dateposted_raw = json[i].published;
                let posted = new Date(job.dateposted_raw);
                job.dateposted_raw = posted.toLocaleDateString();
                //job.logo = json[i].;
                //job.source_apply_email = json[i].;
                //job.source_empname = json[i].;
                if (json[i].type == undefined) {
                    job.source_jobtype = '';
                } else {
                    job.source_jobtype = json[i].type + ' Time';
                }
                //job.source_salary = json[i].;
                //job.html= json[i].description + '<br>' + json[i].requirements+ '<br>' + json[i].benefits;
                //var tmp       = document.createElement('div');
                //tmp.innerHTML = job.html;
                //job.jobdesc   = tmp.textContent.trim();
                //job.jobdesc   = cleanHTML(job.jobdesc);
                job.temp = "1223-332-2233";
                jobs.push(job);
            }
            //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
        },
        error: function(error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
            msg("Hubo un error");
        }
    });
    out["jobs"] = jobs;
    return out;
})();
//pagination
(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter +=10;
    if (out.pass_it.limit > out.pass_it.counter) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//before job des
(function() {
    var out = {};
    out.waitFor = "#app > div > div > div > main > div.job-preview-styles__description--2BkR3";
    return out;
})();
//jobdes
(function() {
    var out = {};
    var job = {};
    var selector = 'div[data-ui="job-description"]';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, "Next Steps:", true);
    job.html = removeTextAfter(job.html, "Next Steps", true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    out["job"] = job;
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