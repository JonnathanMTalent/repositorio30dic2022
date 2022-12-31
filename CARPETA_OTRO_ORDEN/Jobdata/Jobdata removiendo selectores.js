(function() {
    var out = {};
    var job = {};
    var selector = '';
    //var iframeDocument = document.querySelector('#').contentWindow.document;//Obtener el html del iframe apartir del selector.
    var remove_selectors = [];
      //var job = pass_it["job"];
      
     //var full_html = iframeDocument.querySelector(selector);//HTML que obtiene la variable iframeDocument
 
 ////// Valida si el selector existe, si no, lo innactiva /////////
if(document.querySelector(selector)){
 
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log; 
 
        for(const a of full_html.querySelectorAll('input, javascript, script, style')){
        a.remove();//remueve selectores de style, js e inputs
    }
      
      ////// Obtener correos para Apply y removerlos ////////
        /*for (const a of full_html.querySelectorAll("p")) {
            if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){//search, match, includes, indexOf can be used
              if(a.textContent.search(/CV|resume|cover letter|curriculum/gi)>-1)
                job.source_apply_email = a.textContent.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0];
                msg(job.source_apply_email);
                a.remove(); //removes the selector that contains the email
            } 
          }*/
/*
        ////// REMOVER CORREOS ////////
        for (const a of full_html.querySelectorAll("font")) {
            if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){//search, match, includes, indexOf can be used
                a.remove(); //removes the selector that contains the email
            }
          }
  */
  //////////// REMOVER PAGINAS WEB///////////////////////////////
/*
       for (const a of full_html.querySelectorAll("font")) {
            if (a.textContent.search(/http:/gi)>-1){//search, match, includes, indexOf can be used
                a.remove(); //removes the selector that contains the email
            }
          }
  */
       
         ////// Extraer salario y removerlo///////     
        /*for(const a of full_html.querySelectorAll('')){
            const text = a.textContent.trim();
            if(text.search(/palabra/i) > -1){
                    let auxSalary = text.split(/palabra/i).pop().trim();
                if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
                    job.source_salary = auxSalary;
                    //job.source_salary = job.source_salary.split(' PALABRA ').pop().trim();
                    a.remove();//remueve el selector si coincide con la palabra clave.
                }
            }
        }*/
         ////// Extraer jobtype y removerlo///////     
        /*for(const a of full_html.querySelectorAll('')){
            const text = a.textContent.trim();
            if(text.search(/palabra/i) > -1){
                //job.source_jobtype = text.split(/palabra/i).pop().split(/palabra/).shift().trim();
                //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
              a.remove();//remueve el selector si coincide con la palabra clave.
            }
        }*/
 /*
  var palabra_corte_inicial = 'expérience ';
    var palabra_corte_final = ' ans';
    for(const a of full_html.querySelectorAll('p')){
        const text = a.textContent.trim();
      if (/expérience /i.test(text) && /[0-9]/g.test(text) && / ans/.test(text)) {
        job.experience_required = text.split(/expérience /i).pop().split(/ ans/).shift().trim();
        if (true) {
          job.experience_required = palabra_corte_inicial + job.experience_required + palabra_corte_final ;
          msg('experience_required agregado')
        }       
      }
    }
*/
/*
  let selectorExpre = 'div.classified-summary'; //Selector del jobdata (también puede ser p, div, span)
  let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
  for (const a of document.querySelectorAll(selectorExpre)) {
    if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
      if (a.textContent.match(regextwo)) {
        job.experience_required = a.innerText.match(regextwo)[0];
      }else{
        job.experience_required = '';
      }
    }
  }
  msg('\x1b[44mjob.experience_required :'+ job.experience_required);
  */
     
    job.html        = full_html.innerHTML.trim();
    job.jobdesc     = full_html.textContent.trim();
  
    job.html        = cleanHTML(job.html);
    
    //job.html = removeTextBefore(job.html, '', false);
    //job.html = removeTextAfter(job.html, '', true);
 
   var tmp          = document.createElement('DIV');
   tmp.innerHTML    = job.html;
   job.jobdesc      = tmp.textContent.trim();
   job.jobdesc      = cleanHTML(job.jobdesc);
 
/////// Valida si la descripcion no es valida e innactiva el job ////////
   /*if(job.jobdesc.indexOf('') > -1 || job.jobdesc.length < 200){
        job.flag_active = 0;
        out["job"] = job;
        return out; 
    }*/
  
    out["job"] = job;
    return out;
 
}else{
 
    job.flag_active = 0;
    job.html = ''
    job.jobdesc = job.html; 
    out["job"] = job;
    return out; 
 
     }  
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