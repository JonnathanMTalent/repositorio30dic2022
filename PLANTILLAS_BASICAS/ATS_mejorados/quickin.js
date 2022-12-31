(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("table.table tr");
    var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.reqid = job.url.split("jobs/").pop().trim();
    job.location = elem.querySelector("td:nth-child(2)").textContent.trim();
      
    if(job.location.toLowerCase() === 'home office'){
      job.location = 'Osasco, São Paulo';
    }
    job.location = job.location.replace(/remote/gi, '').trim();
      
    job.source_location = elem.querySelector("td:nth-child(2)").textContent.trim();
      
    if (job.title.search(/Banco de Talentos|Talent Pool/ig) == -1) {
        jobs.push(job);
    }
  
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = '03/11/2022';
    
  } 

out["jobs"]= jobs;
  return out;
})();

//jobdesc mia  jjms

(function() {
	var out = {};
	var job = {};
  	var selector = "div.container.container-md";
  	const remove_selectors = [

    
    'a',
    'i',
    'img',
    'svg',
    'link',
    'iframe',
    'form',
    'noscript',
    'figure',
    'video',
    'button',
    'input',
    'style',
    'javascript',
    'script',
];
  	//var job = pass_it["job"];
    for(const a of document.querySelectorAll('p')) {
      if (a.textContent.includes('Prazo de inscrição')) {
        var datec = a.textContent.trim().split(":").pop().trim();
        var cut = "/";   

        let day   =   datec.split(cut)[0];
        let month =   datec.split(cut)[1];
        let year  =   datec.split(cut)[2];
        job.dateclosed_raw  = month +"/"+  day +"/"+ year;
        let date = new Date(job.dateclosed_raw);
        job.dateclosed_raw = `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
    }
      

	var full_html = document.querySelector(selector);
  if(full_html){   //VALIDAR SI DESCRIPCION NO ES NULL
  
  


//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(full_html,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total/gmi,false);
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of full_html.querySelectorAll("p,li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad|years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of full_html.querySelectorAll("p,li")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária/i.test(li.textContent) && /\$|¢|€| BRL |R$/i.test(li.textContent)
      && /\d/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 


  	// remove something from the jobdatata

	  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) 	full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;

    //REMOVER SELECTORES
    //===================
    removeSelector('script, style, a, img',document);
    //removeSelector('selector1, selector2,selectorN',document);
    //removeSelector('selector1, selector2,selectorN',document);


    //REMOVER SELECTORES POR TEXTO
    //=============================
    //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')
    //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')  


	job.html 	    = full_html.innerHTML.trim();
	job.jobdesc 	= full_html.innerHTML.trim();

    //REPLACE ELIMINAR URL
    //======================
    //job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

    //OBTENER EMAIL DE APPLY
    //=======================
    //if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    //  job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    //}


    // --------------- removeTextBefore -----------
    job.html = removeTextBefore(job.html, "Como será o seu dia", false);
    job.html = removeTextBefore(job.html, "Principais responsabilidades", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);

    // ------------ -- removeTextAfter -----------
    // job.html = removeTextAfter(job.html, /Benefits/gi, true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //-----------------FILTRADO POR SPLIT----------------
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    
        //LIMPIAR DESCRIPCIONES


    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {return x};
    if (typeof msg == "undefined") msg = console.log;
    
    //clean emogis
    job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
    if(job.html.indexOf('@')>-1){
        var eliminar = job.html?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
    if(eliminar)job.html=eliminar;
    
    
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

    job.html        = cleanHTML(job.html);
    job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
    job.jobdesc     = cleanHTML(job.jobdesc);
    let benefit=Limpiar(job.jobdesc,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-","anular si existe esta expresion regular","Benefits","Vagas afirmativas","splitUndefined-Y")
    if(benefit){job.source_benefit=benefit;}else{
            benefit=Limpiar(job.jobdesc,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-","anular si existe esta expresion regular","Benefits","About the company","splitUndefined-Y")
            if(benefit)job.source_benefit=benefit;
    }
    
    }else{
  msg("no hay selector");
    }


        out["job"] = job;
        printJob(job);
        return out;

   
})();
function printJob(job) {


    let claves = Object.keys(job);
    msg(`\n \x1b[31m INICIO JOB.....\x1b[39m`)
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if (claves[i] == "jobdesc" || claves[i] == "html") {
            continue
        }
        msg(`${"\x1b[32m"+claves[i]}:`)
        msg(job[clave])
    }
    msg(`\x1b[31m FIN JOB.....\n \x1b[39m`)
}

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


function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
}    

function removeTextSelector(textSelector,elements){
  let selectors = textSelector.split(',');
  selectors.forEach(function(selector){
  let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
    elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
}

function removeSelector(selectorDom, elements){
  selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
}

function cambiofecha(get_date, sC, pMes, pDia, pAno) {  //Ingreso Strin con fecha;caracter separador;posicion Mes, Dia y Año
   get_date = get_date.trim();
   var monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   var dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   var dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}


function withCero( n ) {
  return n < 10 ? '0'+n : n;
}

//buscOcurrenciaHTML


function buscOcurrenciaHTML(contenedor,selector,string,expR,verHTML) { // jjms
    let resultado;
    let revisar;

    if(contenedor!=null && selector!=null){
        revisar=contenedor?.querySelector(selector)?.innerHTML;
        if(verHTML)return revisar;
        if(revisar?.match(expR)?.length){
        resultado=revisar?.match(expR)[0];
        }
        }else{
            if(contenedor!=null && selector==null){
                revisar=contenedor?.innerHTML;
                if(verHTML)return revisar;
                if(revisar?.match(expR)?.length){
                resultado=revisar?.match(expR)[0];
                }

            }else{
                if(verHTML)return string;}
                if(string?.match(expR)?.length){
                resultado=string?.match(expR)[0];
        }
    }
     return resultado;
}

function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
    // jjms
    var elementoLimpio="";
    function validarFormatoFecha(campo) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!='')) {
              return true;
        } else {
              return false;
        }
      }
      function addCero(fecha,splitearCon){
        var nDate=[];
        var nuevaFecha="";
        var tt;

        for(let j=0;j<3;j++){
            tt=fecha.split(splitearCon)[j].trim()
            if(tt.length<2){
                for (let i=1;i<10; i++){
                    tt= tt.replace(i,"0"+i).replace(/[^\w\s]/gi, '').trim();
                }
            }else{
                tt.replace(/[^\w\s]/gi, '').trim();
            }
                
            nDate.push(tt);
            }
        nuevaFecha=nDate.join("/");
        return nuevaFecha;
    }
    if(elementoaLimpiar){
        if(correoUrl=="correoUrl-Y"){ 
            
                if (elementoaLimpiar.indexOf('https') > -1) { elementoaLimpiar = elementoaLimpiar.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");} 
                if (elementoaLimpiar.indexOf('http') > -1) {   elementoaLimpiar = elementoaLimpiar.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");}  
                if (elementoaLimpiar.indexOf('HTTP') > -1) { elementoaLimpiar = elementoaLimpiar.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                if (elementoaLimpiar.indexOf('HTTPS') > -1) { elementoaLimpiar = elementoaLimpiar.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");}
                if (elementoaLimpiar.indexOf('www') > -1)  { elementoaLimpiar = elementoaLimpiar.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                elementoaLimpiar=elementoaLimpiar.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim(); 
                elementoLimpio=elementoaLimpiar;
                if (elementoaLimpiar.indexOf('@') > -1) {  
                    elementoLimpio = elementoaLimpiar?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
                if(elementoLimpio)elementoaLimpiar=elementoLimpio;
        }
        if(emogis=="emogis-Y"){
            elementoLimpio=elementoaLimpiar.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim(); 
            elementoaLimpiar=elementoLimpio;
        }
        if(numeros=="numeros-Y"){
            elementoLimpio=elementoaLimpiar.replaceAll(/\d/gmi,"");
            elementoaLimpiar=elementoLimpio;
        }

        if(letras=="letras-Y"){
            elementoLimpio=elementoaLimpiar.replaceAll(/\D/g,"");
            elementoaLimpiar=elementoLimpio;
        }
        if(caracteresEspeciales=="caracteresEspeciales-Y"){
            elementoLimpio=elementoaLimpiar.replaceAll(/[^\w\s]/gi, '');
            elementoaLimpiar=elementoLimpio;
        }
        if(texto!="borrar este texto"){
            elementoLimpio=elementoaLimpiar.replaceAll(texto, '');
            elementoaLimpiar=elementoLimpio;
        }
        if(agrupaciones=="agrupaciones-Y"){
            elementoLimpio=elementoaLimpiar.replace(/ \([^)]*\) /g, "")
            .replace(/\(.*?\)/g, '')
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/ \{[^)]*\} /g, "")
            .replace(/ \[[^)]*\] /g, "")
            .replace(/\(\d+\)/g,"")
            elementoaLimpiar=elementoLimpio;
        }
        if((splitInicio_pop!="splitInicio_pop" || splitFin_shift!="splitFin_shift" ) && splitUndefined=="splitUndefined-F"){
                if(splitInicio_pop!="splitInicio_pop" && splitFin_shift=="splitFin_shift"){
                    if(elementoaLimpiar.search(splitInicio_pop)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop();  
                    }else{
                        elementoLimpio=elementoaLimpiar;
                    } 
                }
                if(splitInicio_pop=="splitInicio_pop" && splitFin_shift!="splitFin_shift"){
                    if(elementoaLimpiar.search(splitFin_shift)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitFin_shift).shift();   
                    }else{
                        elementoLimpio=elementoaLimpiar
                    }
                }
                if(splitInicio_pop!="splitInicio_pop" && splitFin_shift!="splitFin_shift"){ 
                    if((elementoaLimpiar.search(splitInicio_pop)>-1) && (elementoaLimpiar.search(splitFin_shift)>-1))
                    {
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().split(splitFin_shift).shift(); 
                    }else{
                        elementoLimpio=elementoaLimpiar;
                    }
                }
            }
            if((splitInicio_pop!="splitInicio_pop" || splitFin_shift!="splitFin_shift" ) && splitUndefined=="splitUndefined-Y"){
                if(splitInicio_pop!="splitInicio_pop" && splitFin_shift=="splitFin_shift"){
                    if(elementoaLimpiar.search(splitInicio_pop)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop();  
                    }else{
                        return undefined;
                    } 
                }
                if(splitInicio_pop=="splitInicio_pop" && splitFin_shift!="splitFin_shift"){
                    if(elementoaLimpiar.search(splitFin_shift)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitFin_shift).shift();   
                    }else{
                        return undefined
                    }
                }
                if(splitInicio_pop!="splitInicio_pop" && splitFin_shift!="splitFin_shift"){ 
                    if((elementoaLimpiar.search(splitInicio_pop)>-1) && (elementoaLimpiar.search(splitFin_shift)>-1))
                    {
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().split(splitFin_shift).shift(); 
                    }else{
                        return undefined;
                    }
                }
            }

        if(formatDate=="formatDate-Y"){   
            const formatDate = (value) => {
            let date = new Date(value);
            const withCero = n => n < 10 ? `0${n}` : n;
            return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
            }
            let datess=formatDate(elementoaLimpiar);
            if(validarFormatoFecha(datess))elementoLimpio=datess;
        }
        if(addCero=="addCero-Y"){
            let  date0=addCero(elementoaLimpiar,splitFecha);
            if(validarFormatoFecha(date0))elementoLimpio=date0;

        }
        if(isDate=="isDate-Y"){
            if(validarFormatoFecha(elementoaLimpiar)){
                elementoaLimpiar=addCero(elementoaLimpiar,"/");
                elementoLimpio=elementoaLimpiar;
            }else{
                return undefined;
            }
        }    
        if(anular!="anular si existe esta expresion regular"){
            if(elementoaLimpiar.search(anular)>-1)  return undefined;
        }


        elementoLimpio=elementoLimpio==""?undefined:elementoLimpio.trim();
        return elementoLimpio;
    }else{
        return undefined;
    }
}




// JOBDESC

(function() {
	var out = {};
	var job = {};
  	var selector = "div.container.container-md";
  	var remove_selectors = ['a'];
  	//var job = pass_it["job"];
    for(const a of document.querySelectorAll('p')) {
      if (a.textContent.includes('Prazo de inscrição')) {
        var datec = a.textContent.trim().split(":").pop().trim();
        var cut = "/";   

        let day   =   datec.split(cut)[0];
        let month =   datec.split(cut)[1];
        let year  =   datec.split(cut)[2];
        job.dateclosed_raw  = month +"/"+  day +"/"+ year;
        let date = new Date(job.dateclosed_raw);
        job.dateclosed_raw = `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
    }
      

	var full_html = document.querySelector(selector);
  if(full_html){   //VALIDAR SI DESCRIPCION NO ES NULL

  	// remove something from the jobdatata

	  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) 	full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;

    //REMOVER SELECTORES
    //===================
    removeSelector('script, style, a, img',document);
    //removeSelector('selector1, selector2,selectorN',document);
    //removeSelector('selector1, selector2,selectorN',document);


    //REMOVER SELECTORES POR TEXTO
    //=============================
    //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')
    //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')  


	job.html 	    = full_html.innerHTML.trim();
	job.jobdesc 	= full_html.innerHTML.trim();

    //REPLACE ELIMINAR URL
    //======================
    //job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

    //OBTENER EMAIL DE APPLY
    //=======================
    //if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    //  job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    //}


    // --------------- removeTextBefore -----------
    job.html = removeTextBefore(job.html, "Dia a dia ", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);

    // ------------ -- removeTextAfter -----------
    job.html = removeTextAfter(job.html, /Benefits/gi, true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //-----------------FILTRADO POR SPLIT----------------
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];

    job.html        = cleanHTML(job.html);
    job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
    job.jobdesc     = cleanHTML(job.jobdesc);
    
    }else{
        job.html 		= '';   //SI DESCRIPCION ES NULL SE LE ASIGNA CERO(0) CARACTERES
        job.jobdesc 	= '';
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


function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
}    

function removeTextSelector(textSelector,elements){
  let selectors = textSelector.split(',');
  selectors.forEach(function(selector){
  let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
    elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
}

function removeSelector(selectorDom, elements){
  selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
}

function cambiofecha(get_date, sC, pMes, pDia, pAno) {  //Ingreso Strin con fecha;caracter separador;posicion Mes, Dia y Año
   get_date = get_date.trim();
   var monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   var dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   var dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}


function withCero( n ) {
  return n < 10 ? '0'+n : n;
}






🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// plantilla de Yuliana Gaviria

//Extract
(function() {
    var out = {};
     var html_jobs = document.querySelectorAll("table.table tr");
      var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.reqid = job.url.split("jobs/").pop().trim();
    job.location = elem.querySelector("td:nth-child(2)").textContent.trim();
      
    if(job.location.toLowerCase() === 'home office'){
      job.location = 'Curitiba, PR, BR';
    }
      job.location = job.location.replace(/remote/gi, '').trim();
      
    job.source_location = elem.querySelector("td:nth-child(2)").textContent.trim();
      
    if (job.title.search(/Banco de Talentos|Talent Pool/ig) == -1) {
        jobs.push(job);
      }
  
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
       job.temp = '05022020';
    
  } 

out["jobs"]= jobs;
  return out;
})();



//Extract V2

(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  do {
    var data = {};
    $.ajax({
      url : "https://api.quickin.io/public/5c2aad80f69cb1b7b5eea4cc/jobs?page="+counter+"&sort=-created_at&limit=10",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      type : 'GET',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.docs;
        limit = result.total;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          var elem = json[i];
          job.title = elem.title;
          job.source_location = elem.city +","+ elem.country;
          job.location = job.source_location;
          if(!job.location) { job.location = "Curitiba, Paraná"; }
          if (job.location.indexOf("100%") > -1) {job.location = "Curitiba, Paraná";}
          if (job.location.indexOf("Presencial") > -1) {job.location = "Curitiba, Paraná";}
          job.url = elem.career_url;        
          job.reqid = job.url.split("/").reverse()[0];
          job.source_empname = elem.company_id.name;
          //job.dateposted_raw = elem.positionOfDatePosted;
          //job.dateclosed_raw = elem.positionOfDateClosed;
          //job.source_jobtype = elem.positionOfJobtype;
          //job.source_salary = elem.positionOfSalary;         
          //job.source_empname = elem.positionOfEmpname;
          //job.logo = elem.positionOfLogo;
          //job.source_apply_email = elem.positionOfEmail;

          job.temp = 1;
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
  } while (counter < limit);

  out["jobs"]= jobs;
  return out;
})();


//Extract v3

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('tbody tr');
  var jobs = [];
  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.reqid =job.url.split('/').pop().trim();
    job.location = elem.querySelector("td").textContent.trim() + ', BR';


    job.source_location = elem.querySelector("td").textContent.trim();
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);

    
  } 

  out["jobs"]= jobs;
  return out;
})();



//Pagination para el extract 3

(function() {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;
  if (!pass_it["count"]) {
    out["pass_it"] = {"count": 2};
  } else {
    out["pass_it"] = pass_it;
  }
  var clickable_elem = document.querySelectorAll('ul[class="pagination"] li a span:not([style="display:none;"])');
  for(var z=0;z<clickable_elem.length;z++){
    msg("Pagina actual: "+out["pass_it"]["count"]);
    var elemento = clickable_elem[z].textContent.trim();
    if(elemento == out["pass_it"]["count"]){
	  msg("CLICK EN EL NUMERO");
      clickable_elem[z].parentElement.click();
      out["has_next_page"] = true;
      out["pass_it"]["count"] += 1;
      return out;
    }else{
      out["has_next_page"] = false;
    }
  }
  if(clickable_elem[clickable_elem.length-2].textContent.trim().includes("»")){
    clickable_elem[clickable_elem.length-2].parentElement.click();
	msg("CLICK EN EL SIGNO");
    out["has_next_page"] = true;
    out["pass_it"]["count"] += 1;
    return out;
  }
  return out;
})();




//JobDescription

(function() {
	var out = {};
	var job = {};
  	var selector = "div.container.container-md";
  	var remove_selectors = ['a'];
  	//var job = pass_it["job"];
    for(const a of document.querySelectorAll('p')) {
      if (a.textContent.includes('Prazo de inscrição')) {
        var datec = a.textContent.trim().split(":").pop().trim();
        var cut = "/";   

        let day   =   datec.split(cut)[0];
        let month =   datec.split(cut)[1];
        let year  =   datec.split(cut)[2];
        job.dateclosed_raw  = month +"/"+  day +"/"+ year;
        let date = new Date(job.dateclosed_raw);
        job.dateclosed_raw = `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
    }
      

	var full_html = document.querySelector(selector);
  if(full_html){   //VALIDAR SI DESCRIPCION NO ES NULL

  	// remove something from the jobdatata

	  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) 	full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;

    //REMOVER SELECTORES
    //===================
    removeSelector('script, style, a, img',document);
    //removeSelector('selector1, selector2,selectorN',document);
    //removeSelector('selector1, selector2,selectorN',document);


    //REMOVER SELECTORES POR TEXTO
    //=============================
    //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')
    //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')  


	job.html 	    = full_html.innerHTML.trim();
	job.jobdesc 	= full_html.innerHTML.trim();

    //REPLACE ELIMINAR URL
    //======================
    //job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

    //OBTENER EMAIL DE APPLY
    //=======================
    //if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    //  job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    //}


    // --------------- removeTextBefore -----------
    job.html = removeTextBefore(job.html, "Como será o seu dia", false);
    job.html = removeTextBefore(job.html, "Principais responsabilidades", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);

    // ------------ -- removeTextAfter -----------
    job.html = removeTextAfter(job.html, /Benefits/gi, true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);
    //-----------------FILTRADO POR SPLIT----------------
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];
    //job.html 		= job.html.split('')[0];

    job.html        = cleanHTML(job.html);
    job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
    job.jobdesc     = cleanHTML(job.jobdesc);
    
    }else{
        job.html 		= '';   //SI DESCRIPCION ES NULL SE LE ASIGNA CERO(0) CARACTERES
        job.jobdesc 	= '';
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


function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
}    

function removeTextSelector(textSelector,elements){
  let selectors = textSelector.split(',');
  selectors.forEach(function(selector){
  let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
    elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
}

function removeSelector(selectorDom, elements){
  selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
}

function cambiofecha(get_date, sC, pMes, pDia, pAno) {  //Ingreso Strin con fecha;caracter separador;posicion Mes, Dia y Año
   get_date = get_date.trim();
   var monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   var dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   var dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}


function withCero( n ) {
  return n < 10 ? '0'+n : n;
}


// JobDescription v2

(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];
  var full_html = document.querySelector('div[class="mb-4"]');
  if (full_html) {
    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe'];
    if (remove_selectors.length > 0) {
      remove_selectors.forEach(remove_selector => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }

    for(const a of document.querySelectorAll("span")){
      let text =a.textContent.trim();
      if(text.includes("R$")){
        job.source_salary = text;
      }
    }

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, '', true);
    //job.html = removeTextAfter(job.html, 'Benefícios', true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
  } else {
    job.html = "";
    job.jobdesc = "";
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