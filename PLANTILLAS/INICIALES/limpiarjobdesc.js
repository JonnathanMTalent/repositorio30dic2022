        // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
        
        job.html      = full_html.innerHTML.trim();    
        job.html = removeTextBefore(job.html, "RESPONSABILIDADES Y ATRIBUCIONES", false);
        job.html = removeTextAfter(job.html, "Conheça mais sobre nós", true);
        job.html = removeTextAfter(job.html, "Para mais informações:", true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);

  // Emoji cleanner
  job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();

        //LIMPIAR TITULO:

        job.title = job.title.split("|").shift().trim();


/*         if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
        
        job.html      = full_html.innerHTML.trim();    
        job.html = removeTextBefore(job.html, "Como supervisor(a) de Loja, você irá:", false);
        job.html = removeTextAfter(job.html, "Conheça mais sobre nós", true);
        job.html = removeTextAfter(job.html, "Para mais informações:", true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc); */