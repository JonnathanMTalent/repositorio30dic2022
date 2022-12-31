https://careers.hprod.onehcm.usg.edu/psc/careers/CAREERS/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_SCHJOB_FL&Action=U&FOCUS=Applicant&SiteId=12000&PortalActualURL=https%3a%2f%2fcareers.hprod.onehcm.usg.edu%2fpsc%2fcareers%2fCAREERS%2fHRMS%2fc%2fHRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL%3fPage%3dHRS_APP_SCHJOB_FL%26Action%3dU%26FOCUS%3dApplicant%26SiteId%3d12000&PortalRegistryName=CAREERS&PortalServletURI=https%3a%2f%2fcareers.hprod.onehcm.usg.edu%2fpsp%2fcareers%2f&PortalURI=https%3a%2f%2fcareers.hprod.onehcm.usg.edu%2fpsc%2fcareers%2f&PortalHostNode=APPLICANT&NoCrumbs=yes&PortalKeyStruct=yes&

//infinite pagination
(function() {
    //--------------------------------NOTA IMPORTANTE-------------------------------------------------------
    //Por favor verificar, si la empresa no tiene filtro cambiar el selector por el de "limpiar busqueda"
    //Para realizar test, se recomienda comentar desde la línea 38 (else if (out.pass_it.pasos == 1) {) hasta la linea 56 (})
    var out = {};
    let selector = `a[id="NAV_PB$0"]` //cambiar este selector para entrar al jobsite 
    let filtro = `input[id="PTS_SELECT$0"]` //cambiar este selector para aplicar el filtro de la empresa que se está indexando.
    let selectorscroll = 'div[id="win0divHRS_AGNT_RSLT_I$grid$0"]'; //cambiar el selector del scroll
    if (pass_it["pasos"]) {
        out["pass_it"] = pass_it;
    } else {
        out["pass_it"] = {
            "pasos": 0,
            "heights": []
        };
    }
    if (out.pass_it.pasos == 0) {
        //vamos al jobsite
        if (document.querySelector(selector)) {
            document.querySelector(selector).click();
        }
        out.has_next_page = true;
        out.waitFor = `div[title="Search Results List"] > ul > li`
        out.pass_it.pasos += 1;
    } else if (out.pass_it.pasos == 1) {
        //seleccionamos el filtro
        if (document.querySelector(filtro)) {
            document.querySelector(filtro).click();
        }
        out.has_next_page = true;
        out.pass_it.pasos++;
    } 
    else if (out.pass_it.pasos == 2) {
        if (document.querySelector(selectorscroll)) {
            document.querySelector(selectorscroll).scrollBy(0, document.querySelector('div[id="win0divHRS_AGNT_RSLT_I$grid$0"]').scrollHeight);
            out["has_next_page"] = true;
        }
        out["has_next_page"] = true;
        if (out["pass_it"]["heights"].length > 3) {
            var last_three_heights = out["pass_it"]["heights"].slice(-3);
            if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2]) {
                out["has_next_page"] = false;
            }
        }
        out["pass_it"]["heights"].push(document.querySelector(selectorscroll).scrollHeight);
    }
    // if (document.querySelector('a[id="PTS_FACET_DV_COUNT$1"]')) {
    //     document.querySelector('a[id="PTS_FACET_DV_COUNT$1"]').click();
    // }
    msg(out.pass_it.heights)
    out["wait"] = true;
    return out;
})();
//before extract
(function() {
    var out = {};
    out.waitFor = 'div[title="Search Results List"] > ul > li';
    return out;
})();
//Extract
(function() {
    //------------NOTA---------------
    //POR FAVOR CAMBIAR LAS URL, DEPENDIENDO DEL SITIO SE FORMAN DE MANERAS DISTINTAS, USE EL BOTON DEL EVIAR VIA E-MAIL PARA OBTENER EL LINK.
    var out = {};
    var html_jobs = document.querySelectorAll('div[title="Search Results List"] > ul > li');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.reqid = elem.querySelector('div[id*="win0divHRS_APP_JBSCH_I_HRS_JOB_OPENING_ID$"] span[class="ps_box-value"]').textContent.trim(); //elem.getAttribute('').split('').pop();
        job.title = elem.querySelector('div[id*="win0divSCH_JOB_TITLE$"] span[class="ps_box-value"]').textContent.replace(/ *\([^)]*\) */g, "").trim();
        job.url = `https://www.careers.wisconsin.edu/psp/careers/EMPLOYEE/UW_TAM/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_JBPST_FL&SiteId=15&JobOpeningId=${job.reqid}&PostingSeq=1`
        job.source_location = elem.querySelector('div[id*="win0divLOCATION$"] span[class="ps_box-value"]').textContent.trim();
        job.location = elem.querySelector('div[id*="win0divLOCATION$"] span[class="ps_box-value"]').textContent.trim();
        job.dateposted_raw = elem.querySelector('div[id*="win0divSCH_OPENED$"] span[class="ps_box-value"]').textContent.trim();
        if (elem.querySelector('div[id*="win0divHRS_JO_PST_CLS_DT$"] span[class="ps_box-value"]')) {
            job.dateclosed_raw = elem.querySelector('div[id*="win0divHRS_JO_PST_CLS_DT$"] span[class="ps_box-value"]').textContent.trim();
        }
        job.temp = `08/30/2022 Juan Bermudez`;
        jobs.push(job);
    }
    out["jobs"] = jobs;
    return out;
})();
//pagination
(function() {
    var out = {};
    out["has_next_page"] = false;
    return out;
})();
//Before JobData
(function () {
    var out = {};
    out.waitFor = 'div[class="ps_box-scrollarea"]';
    return out;
})();
//Jobdata
(function() {
    var out = {};
    var job = {};
    //var job = pass_it["job"];
    var full_html = document.querySelector('div[class="ps_box-scrollarea"]');
    if(document.querySelector(`div[id="win0divHRS_SCH_WRK_HRS_FULL_PART_TIMElbl"]`));
    {
        job.source_jobtype = document.querySelector(`div[id="win0divHRS_SCH_WRK_HRS_FULL_PART_TIMElbl"]`).textContent.trim();
    }
    if (full_html) {
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                }
            });
        }
        for (const a of full_html.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
        }
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim();
        job.html = removeTextBefore(job.html, `JOB DUTIES:`, false);
        //job.html = removeTextBefore(job.html, ``, false);
        //job.html = removeTextBefore(job.html, ``, false);
        job.html = removeTextAfter(job.html, /Equal Employment Opportunity|CAMPUS INFORMATION:|ORGANIZATION INFORMATION:|HOW TO APPLY:|College Information:/g, true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
    out["job"] = job;
    return out;
})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}


Team Buenos días, les dejo por acá la reconstrucción de la plantilla para los casos que tienen este formato: En caso de que tengan la desdicha de encontrarlo, por favor verifiquen los comentaros que he dejado en cada step, ya que de esto depende que el spider pueda extraer la mayor cantidad de jobs, algunos de ellos son:El jobsite principal, (en el spider) debe ser aquel que nos sitúe en esta página: 
2. Verificar que los selectores del step "infinite pagination" coincidan con los mismos que ustedes tienen, en caso de no ser así, cambiarlos. 
3. Construir bien las URL, estas se hacen entrando en un job y presionando el botón con ícono de e-mail. 
4. Intentar ingresar en algunos jobs para verificar que estos no redirecciones a otras páginas. 
Por último y no menos importante, recuerde que siempre y cuando se encuentre con un caso de estos, es válido orarle al Dios de su preferencia para que lo llene de sabiduría y buena suerte