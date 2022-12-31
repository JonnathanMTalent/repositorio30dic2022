(function() { // Agosto 27, 2022

    var out = {};
    var job = {};
    
    //var selector  = '';
    //var full_html = document.querySelector(selector);
    
          let descPart1 = document.querySelector('div[id="einleitung"]');
          let descPart2 = document.querySelector('div[id="facts"]');
          let descPart3 = document.querySelector('div[id="anforderungen"]');
          let descPart4 = document.querySelector('div[id="aufgaben"]');
          let descPart5 = document.querySelector('div[id="kundendetails"]');
    
              
          let job_description = "";
          let array_desc = Array();
    
          if(descPart1 !== null) array_desc.push(descPart1.innerHTML);
          if(descPart2 !== null) array_desc.push(descPart2.innerHTML);
          if(descPart3 !== null) array_desc.push(descPart3.innerHTML);
          if(descPart4 !== null) array_desc.push(descPart4.innerHTML);
          if(descPart5 !== null) array_desc.push(descPart5.innerHTML);
    
              
          if(array_desc.length) job_description = array_desc.join("<br>");
    
          let desc      = job_description; // string
          let div       = document.createElement("div"); // Se crea un elemento HTML determinado  
          div.innerHTML = desc // Se setea el contenido HTML en la etiqueta div
    
         var full_html = div;
         
         if(descPart2 !== null){
            job.source_benefit = descPart2.innerText;
            //msg(job.source_benefit )
         }
    
    
    
    // To remove elements
    for (const a of full_html.querySelectorAll('h1, div.info, a, img, script, style, button, input')) {
        if (a){
          a.remove();
        }
    }
    
    
       job.html = full_html.innerHTML.trim();
    
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
    
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
    
      // Emoji cleanner
      // job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
    
      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc);
    
    
    out["job"] = job;
    return out;
    
    })();
    
    function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
    newHtml = text + " " + newHtml;
    }
    }
    return newHtml;
    }