(function () {
    var out = {};
    var job = {};
    var selector =
        '[data-metadata-id="richTextArea.jobPosting.jobDescription"] > .GWTCKEditor-Disabled';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    if (full_html) {
      // remove something from the jobdatata
      if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
      full_html.querySelectorAll('a, img, link, script, style, button, iframe, figure, picture').forEach(e => e.remove());
      //[...full_html.querySelectorAll('*')].filter(e => e.textContent.match(/www|https?|@/gi)).forEach(e => e.remove());
  
      const $expReq = [...full_html.querySelectorAll('p,li')].find(e => e?.textContent.match(/\(?[0-9]{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?[0-9]{1,2}\+?)?\syears?/gi) && e.textContent.match(/experience/gi));
      if ($expReq) {
        job.experience_required = $expReq.textContent.match(/\(?[0-9]{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?[0-9]{1,2}\+?)?\syears?/gi)[0];
        [...$expReq.childNodes].find(e => e.textContent.match(/\(?[0-9]{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?[0-9]{1,2}\+?)?\syears?/gi))?.remove();
      }
  
      /*const $dateClosed = [...full_html.querySelectorAll('p')].find(e => e.textContent.match(/closing date/gi));
      if($dateClosed && $dateClosed.textContent.match(/[0-9]/gi)) {
        const dateClosed = $dateClosed.textContent.trim().split(':').pop().replace(',','');
        job.dateclosed_raw = formatDate(dateClosed, ' ', 0, 1, 2);
        $dateClosed.remove();
      }*/
  
      const $jobType = document.querySelector('[aria-label*="time"]');
      if ($jobType) job.source_jobtype = $jobType?.textContent.trim();
  
      full_html.innerHTML = full_html.innerHTML.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
      full_html.innerHTML = full_html.innerHTML.replace(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g, ''); //Remove email
      full_html.innerHTML = full_html.innerHTML.replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
      full_html.innerHTML = full_html.innerHTML.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');
  
  
      job.html = full_html.innerHTML.trim();
      //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
      job.html = removeTextAfter(job.html, "We are an equal opportunity employer", true);
      job.html = removeTextAfter(job.html, "Our Mission", true);
      job.html = removeTextAfter(job.html, "About IDEXX", true);
      job.html = removeTextAfter(job.html, "Why IDEXX", true);
  
      job.html = cleanHTML(job.html);
      var tmp = document.createElement("div");
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
    }
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
  
  function formatDate(get_date, sC, pMes, pDia, pAno) {  //Ingreso String con fecha;caracter separador;posicion Mes, Dia y Año
    get_date = get_date.replace(/\,/g, "").trim();
    let monthJob = get_date.split(sC)[pMes].substring(0, 3).trim().toLowerCase();
    let dia = parseInt(get_date.split(sC)[pDia], 10); dia = dia < 10 ? '0' + dia : dia;
    let dateEN = { "jan": "01", "feb": "02", "mar": "03", "apr": "04", "may": "05", "jun": "06", "jul": "07", "aug": "08", "sep": "09", "oct": "10", "nov": "11", "dec": "12" }
    typeof dateEN[monthJob] != 'undefined' ? monthJob = dateEN[monthJob] : monthJob = parseInt(monthJob, 10) < 10 ? '0' + monthJob : monthJob;
    return monthJob + "/" + dia + "/" + get_date.split(sC)[pAno].trim();
  }