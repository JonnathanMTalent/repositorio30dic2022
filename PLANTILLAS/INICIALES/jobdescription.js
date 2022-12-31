(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];
    var full_html = document.querySelector('div.csa_jobadText');
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
      if (typeof cleanHTML == "undefined") cleanHTML = function (x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;
      job.source_jobtype = document.querySelector("div.csa_jobadRight > div > div:nth-child(2) > span");
      if(job.source_jobtype)	{
          job.source_jobtype = job.source_jobtype.textContent.trim();
      }
  
      job.html = full_html.innerHTML.trim();
  
      job.html = removeTextBefore(job.html, 'De werkzaamheden bestaan onder andere uit:', false);
      job.html = removeTextBefore(job.html, 'Wat ga je doen?', false);
      job.html = removeTextBefore(job.html, 'Jouw profiel:', false);
      job.html = removeTextAfter(job.html, 'Enthousiast?', true);
      job.html = removeTextAfter(job.html, 'Geïnteresseerd?', true);
  
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
      //validacion para los caracteres
      if (job.jobdesc.length < 50) {
        job.flag_active = 0;
        job.html = " ";
        job.jobdesc = " ";
      }
    } else {
      job.flag_active = 0;
      job.html = " ";
      job.jobdesc = " ";
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