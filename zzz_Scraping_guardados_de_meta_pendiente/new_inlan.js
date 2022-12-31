// no coge la descripcion 



/*
https://www.jci.sg/Positions/Index#
https://talent.com/private/tools/jobs/pageCompanyView.php?id=154786   company new
*/
//infinity
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
    out.waitFor = 'div.dx-scrollable-content tbody tr'; // ACCION 1
    return out;
  })();

  //before extract
  // BEFORE EXTRACT
  (() => {
    const out = {};
    out.pass_it = pass_it;
    let elemento = document.querySelectorAll('div.dx-scrollable-content tbody tr')[out.pass_it.cont] // ACCION 2
    msg('El selector es: ' + elemento);
    if (elemento) { //&& out["pass_it"].controlpag < 4){
        out.pass_it.title = elemento.querySelector('td:nth-child(2)').textContent.trim(); //ACCION 3
        out.pass_it.location = elemento.querySelector('td:nth-child(4)').textContent.trim();
        elemento.querySelector('td:nth-child(6) a').click();
        msg('El titulo en el pass_it: '+out.pass_it.title);
        msg('click');
        out.wait = true;
        out.waitFor = "div#PostionsViewJobDetailsContainer8"; //ACCION 4
    } else {
        msg("EN EL FALSE DE BEFORE");
        out.pass_it.salir = true;
    }
    return out;
})();

//extract
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
        if (document.querySelector('div#PostionsViewJobDetailsContainer8')) { //ACCION 5
        msg('estamos en el if');
            var job = {};
            job.title = out.pass_it.title;
            job.location = out.pass_it.location;
            //https://www.aquesst.com/current-openings/?uID=&ref=Applied+Directly&cjobid=10444886&rpid=317023&postid=r8bVHSHLyP0
            //http://aquesst.myavionte.com/staff/compas_sharejob.aspx?rIdEnc=-hg_B3LwZLE&rpIdEnc=yI1ooZ1aihc#.Xx9LHd_y7rE.twitter 
            //job.url ="http://aquesst.myavionte.com/staff/compas_sharejob.aspx?rIdEnc=qHw3d7U_uYPdcLvO4hakRQ&rpIdEnc="+jobId  
            job.url = window.location.href;
            //job.reqid = job.url.split("/ta/").pop().split(".careers?").shift();
            msg(' URL: '+job.url);


//     ████████████████████████████████████████████████████████████████████  
/*  
var full_html = document;
var div       = document.createElement("div");
div.innerHTML = full_html;
var desc = div.querySelector("div#PostionsViewJobDetailsContainer8");


for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
    if (a){ 
      a.remove(); 
    } 
  }

  job.html = desc.innerHTML.trim(); 


  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextAfter(job.html, "", false);

 //job.html = job.html.split("").shift();
 //job.html = job.html.split("").shift();

  //job.html = job.html.replace("","").trim();

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
//*/// ████████████████████████████████████████████████████████████████████
            //REGRESANDO A LA LISTA DE JOBS
            // window.history.back();   //ACCUION 9 REGRESANDO A LA LISTA DE LOS JOBS
            job.temp = "20210909";
            jobs.push(job);
            window.location.href = 'https://www.jci.sg/Positions/Index#';
            
        }
    }
    out.waitFor = 'div.dx-scrollable-content tbody tr'; //ACCION 10 ESPERAS POR EL SELECTOR DE LA LISTA DE JOBS
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


//pagination
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
        if (document.querySelectorAll('div.dx-scrollable-content tbody tr')[out.pass_it.pagActual]) {//ACCION 11 PONER EN AMBAS SELECTOR CAJA DE LOS JOBS
            document.querySelectorAll('div.dx-scrollable-content tbody tr')[out.pass_it.pagActual].click();
        } else {
            msg("FIN PAGINACIO TOTAL");
            out.has_next_page = false;
        }
    }
    out.waitFor = 'div.dx-scrollable-content tbody tr'; // ACCION 12 ESPERA POR SELECTOR CAJA DE LOS JOBS
    return out;
})();