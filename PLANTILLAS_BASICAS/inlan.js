//JOBSITE:  https://hire.myavionte.com/app/careers/#/jobs/EtnB8FiDM4U/MoaInVnOAMg//


/*
HACERLE CLICK AL ELEMENTO CAJA de los jobs Y DEVOLVERSE CON UN COMANDO DE RETORNO

INFINITY
1: PONER LA ESPERA DEL SELECTOR DE LOS JOBS CAJA EN EL INFINITY

BEFORE EXTRACT:
2: PONER SELECTOR CAJA DE LOS JOBS
3: PONER LOS SELECTORES DA LAS VARIABLES A EXTRAER
4: PONER LA ESPERA DEL SELECTOR DONDE ESTAN LOS JOBS
5:PONER EL SELECTOR DEL BOTON PARA APLICAR O ALGO QUE INDIQUE QUE YA ESTA  EN  LA DESCRIPCION
6: PONER EL SELECTOR DE LA DESCRIPCION
7: PONER EL SELECTOR DE LA DESCRIPCION
8: LIMPIAR DESCRICPION
9: REGRESANDO A LA LISTA DE LOS JOBS
10: ESPERAS POR EL SELECTOR DE LA LISTA DE JOBS
11: PONER EN AMBAS SELECTOR CAJA DE LOS JOBS
12: ESPERA POR SELECTOR CAJA DE LOS JOBS
EXTRACT:


*/


// INFINITY
(() => {
    let out = {};
    if (typeof pass_it == "undefined")
        pass_it = {};
    if (!pass_it.cont) {
        out.pass_it = {
            "cont": 0,
            "salir": false,
            "pag": false,
            "contPag": 1,
            "controlpag": 0,
            "pagActual": 0
        };
    } else {
        out.pass_it = pass_it;
    }
    out.waitFor = 'div.job-item:not([class*="job-items-header"])'; // ACCION 1
    return out;
  })();

  // BEFORE EXTRACT
  (() => {
    const out = {};
    out.pass_it = pass_it;
    let elemento = document.querySelectorAll('div.job-item:not([class*="job-items-header"])')[out.pass_it.cont] // ACCION 2
    msg('El selector es: ' + elemento);
    if (elemento) { //&& out["pass_it"].controlpag < 4){
        out.pass_it.title = elemento.querySelector('div[class*="job-item-job-title has-data"]').textContent.trim(); //ACCION 3
        out.pass_it.location = elemento.querySelector('div[class*="job-item-location has-data"]').textContent.trim();
        elemento.click();
        msg('click');
        out.wait = true;
        out.waitFor = "div#job"; //ACCION 4
    } else {
        msg("EN EL FALSE DE BEFORE");
        out.pass_it.salir = true;
    }
    return out;
})();


  // EXTRACT
  (() => {
    const out = {};
    const jobs = [];
    out.pass_it = pass_it;
    if (out.pass_it.salir) { // && out["pass_it"].controlpag >=4){
        var job = {};
        job.title = 'holaa';
        jobs.push(job);
    } else {
        if (document.querySelector('div.job-actions-apply button')) { //ACCION 5
            var job = {};
            job.title = out.pass_it.title;
            job.location = out.pass_it.location;
            //https://www.aquesst.com/current-openings/?uID=&ref=Applied+Directly&cjobid=10444886&rpid=317023&postid=r8bVHSHLyP0
            //http://aquesst.myavionte.com/staff/compas_sharejob.aspx?rIdEnc=-hg_B3LwZLE&rpIdEnc=yI1ooZ1aihc#.Xx9LHd_y7rE.twitter 
            //job.url ="http://aquesst.myavionte.com/staff/compas_sharejob.aspx?rIdEnc=qHw3d7U_uYPdcLvO4hakRQ&rpIdEnc="+jobId  
            job.url = window.location.href;
            //job.reqid = job.url.split("/ta/").pop().split(".careers?").shift();



            let full_html = document.querySelector("div#job"); //ACCION 6 SELECTOR DE LA DESCRIPCION
            job.html = full_html.innerHTML.trim();
            //job.source_jobtype = document.querySelector(' ul > li:nth-child(1) > ul > li:nth-child(3) > div.field-value.label-1').textContent.trim();
            job.html = document.querySelector("div#job").innerText.trim(); // ACCION 7 SELECTOR DE LA DESCRIPCION
            //=======================
            job.html = full_html.innerHTML.trim();
            job.html = removeTextBefore(job.html, "Description", false); //ACCION 8 LIMPIAR DESCRICPION
            job.html = removeTextAfter(job.html, "Additional Information", true);
            job.html = cleanHTML(job.html);
            let tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            //job.jobdesc = job.html.replace(/&nbsp;/g, " ").replace(/\<(.*?)\>/g, ""); // clean tags
            job.jobdesc = cleanHTML(job.jobdesc);
            // job.html = removeTextBefore(job.html, "", false);
            // job.html = removeTextAfter(job.html, "", true);
            //REGRESANDO A LA LISTA DE JOBS
            window.history.back();   //ACCUION 9 REGRESANDO A LA LISTA DE LOS JOBS
            job.temp = "20210909";
            jobs.push(job);
        }
    }
    out.waitFor = 'div.job-item:not([class*="job-items-header"])'; //ACCION 10 ESPERAS POR EL SELECTOR DE LA LISTA DE JOBS
    out.wait = true;
    out.jobs = jobs;
    return out;
})();
function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}

// PAGINATION:

(() => {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.controlpag++;
    out.pass_it.cont += 1;
    //window.location.href = 'https://hire.myavionte.com/app/careers/#/jobs/0SdZsvAH6xk/QJkIL8kQ8A4//';
    //window.history.back();
    if (out.pass_it.salir) {
        out.has_next_page = false;
    } else {
        out.has_next_page = true;
    }
    if (!out.has_next_page) {
        //if((out["pass_it"]["pagActual"]) < out["pass_it"]["totalPag"]){
        out.has_next_page = true;
        out.pass_it.cont = 0;
        out.pass_it.pagActual++;
        out.pass_it.salir = false;
        //out["pass_it"].controlpag=0;
        msg("CONTINUO PAGINA " + out.pass_it.pagActual + " DE " + out.pass_it.totalPag);
        if (document.querySelectorAll('div.job-item:not([class*="job-items-header"])')[out.pass_it.pagActual]) {//ACCION 11 PONER EN AMBAS SELECTOR CAJA DE LOS JOBS
            document.querySelectorAll('div.job-item:not([class*="job-items-header"])')[out.pass_it.pagActual].click();
        } else {
            msg("FIN PAGINACIO TOTAL");
            out.has_next_page = false;
        }
    }
    out.waitFor = 'div.job-item:not([class*="job-items-header"])'; // ACCION 12 ESPERA POR SELECTOR CAJA DE LOS JOBS
    return out;
})();