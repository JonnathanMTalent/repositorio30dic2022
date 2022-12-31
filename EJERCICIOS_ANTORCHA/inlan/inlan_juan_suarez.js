//https://secure2.entertimeonline.com/ta/BTFCCINC.careers?rnd=MOK&JobsSearch=1
//////////////////infinity pagiantion////////////////
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
    out.waitFor = "div.job-details";
    return out;
  })();
    //////////////Before//////////////////////
    (() => {
      const out = {};
      out.pass_it = pass_it;
      let elemento = document.querySelectorAll('li.list-item > button')[out.pass_it.cont]
      msg('El selector es: ' + elemento);
      if (elemento) { //&& out["pass_it"].controlpag < 4){
          out.pass_it.title = elemento.querySelector("h4.list-item-title").textContent.trim();
          out.pass_it.location = elemento.querySelector("ul > li > span.field-text").textContent.trim();
          elemento.click();
          msg('click');
          out.wait = true;
          out.waitFor = "div.job-details";
      } else {
          msg("EN EL FALSE DE BEFORE");
          out.pass_it.salir = true;
      }
      return out;
  })();
    ///////////////////////////extract/////////////
    (() => {
      const out = {};
      const jobs = [];
      out.pass_it = pass_it;
      if (out.pass_it.salir) { // && out["pass_it"].controlpag >=4){
          var job = {};
          job.title = 'holaa';
          jobs.push(job);
      } else {
          if (document.querySelector('button[class="btn btn-primary apply-action"]')) {
              var job = {};
              job.title = out.pass_it.title;
              job.location = out.pass_it.location;
              //https://www.aquesst.com/current-openings/?uID=&ref=Applied+Directly&cjobid=10444886&rpid=317023&postid=r8bVHSHLyP0
              //http://aquesst.myavionte.com/staff/compas_sharejob.aspx?rIdEnc=-hg_B3LwZLE&rpIdEnc=yI1ooZ1aihc#.Xx9LHd_y7rE.twitter 
              //job.url ="http://aquesst.myavionte.com/staff/compas_sharejob.aspx?rIdEnc=qHw3d7U_uYPdcLvO4hakRQ&rpIdEnc="+jobId  
              job.url = window.location.href;
              job.reqid = job.url.split("/ta/").pop().split(".careers?").shift();
              for (const a of document.querySelectorAll("li")) {
                  if (a.textContent.includes("Base Pay")) {
                      job.source_salary = a.textContent.replace("Base Pay", "").replace(":", "").trim();
                  }
              }
              let date_p = document.querySelector("tbody > tr:nth-child(6) > td:nth-child(2) > p");
              if (date_p) {
                  job.dateposted_raw = date_p.textContent.trim();
              }
              let date_c = document.querySelector("tbody > tr:nth-child(6) > td:nth-child(4) > p");
              if (date_c) {
                  job.dateclosed_raw = date_c.textContent.split("at").shift().trim();
              }
              let full_html = document.querySelector("div.job-details"); //SELECTOR DE LA DESCRIPCION
              job.html = full_html.innerHTML.trim();
              job.source_jobtype = document.querySelector(' ul > li:nth-child(1) > ul > li:nth-child(3) > div.field-value.label-1').textContent.trim();
              job.html = document.querySelector("div.job-details").innerText.trim();
              //=======================
              job.html = full_html.innerHTML.trim();
              job.html = removeTextBefore(job.html, "Description", false);
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
              document.querySelector('div.back-action > button').click();
              job.temp = "20210909";
              jobs.push(job);
          }
      }
      out.waitFor = 'li.list-item > button';
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
    /////////////pagination/////////////
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
          if (document.querySelectorAll("li.paging-item > a")[out.pass_it.pagActual]) {
              document.querySelectorAll("li.paging-item > a")[out.pass_it.pagActual].click();
          } else {
              msg("FIN PAGINACIO TOTAL");
              out.has_next_page = false;
          }
      }
      out.waitFor = 'li.list-item > button';
      return out;
  })();