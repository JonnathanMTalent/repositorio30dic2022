//JOBDESCRIPTION BASICO

(function() {
    var out = {};
    var job = {};
    var selector = '';
    var selectorError="";
    var full_html;
    if(document?.querySelector(selector)){varfull_html = document.querySelector(selector);} else{
        full_html=document?.querySelector(selectorError);
    }
    
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
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;
    //var job = pass_it["job"];
//     ███████████████████████████████ variables directas █████████████████████████████████████  /*  
// job.source_location = elem.querySelector('').textContent.trim();


// let hq=""; // HEAD QUARTERS
// job.source_location=job.source_location||"";
// if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq}else{
// job.location=(job.source_location)||hq; } //HEAD QUARTERS:
// job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
// // if(job.location.search(/palabra para buscar/gmi)>-1){job.location="";}


//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary         
let source_salary=[];  for (let li of document.querySelectorAll("p")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined)job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//EXPERIENCE REQUIRED          
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);
//   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  
  let source_jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
  let dateposted_raw=buscOcurrenciaHTML(document.body,null,"",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi,false);
  dateposted_raw=Limpiar(dateposted_raw,"formatDate-","isDate-Y","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");
  if(source_jobtype) job.source_jobtype=source_jobtype;
  if(dateposted_raw) job.dateposted_raw=dateposted_raw;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);
  //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   

//MULTIPLES VARIABLES (SENCILLO)


// var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document);

// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document);
// // job.dateposted_raw=formatDate(job.dateposted_raw);
// // if(datess!='No encontrado')datess=datess.split('');
// // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

// job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document);
// job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document);
// job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document);

//*/// ████████████████████████████████████████████████████████████████████

    // var full_html = document.querySelector(selector);


    // full_html.find('div.claseaeliminar').remove().end().html();
    for (const a of full_html.querySelectorAll('a')) {
        a.remove(); //if you want to remove this selector
    }


    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;



    job.html = full_html.innerHTML.trim();

    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);

    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);
    
    //job.html = job.html.split("").shift();
    //job.html = job.html.split("").shift();

job.html=Limpiar(job.html,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-Y","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")

    
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    // job.source_benefit=Limpiar(job.jobdesc,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")


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

//5 funciones primordiales b<


  // =multiplesVariables(expReg,selector,contenedor,nextElementSibling);
  // =buscOcurrenciaHTML(document.body,null,"",/uno|dos/gmi,false);
  //   =getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition);
  // printJob(job);
  //  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");


  // =multiplesVariables(expReg,selector,contenedor,nextElementSibling);
function multiplesVariables(expReg,selector,contenedor,nextElementSibling){
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    return resultado;
}


// buscOcurrenciaHTML(document.body,null,"",/uno|dos/gmi,false);
function buscOcurrenciaHTML(contenedor,selector,string,expR,verHTML) {
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

//   =getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition)
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    if(dateRaw.indexOf(",")>-1){     
     let commas = dateRaw.match(/\,/g).length;
       if(commas == 1){dateRaw = dateRaw.replace(/\,/g,"").trim();}
    }
    if(dateRaw.indexOf(".")>-1){
       let periods = dateRaw.match(/\./g).length;
       if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
    }
     let day   = dateRaw.split(cut)[dayPosition].trim(), 
         month = dateRaw.split(cut)[monthPosition].trim(), 
         year  = dateRaw.split(cut)[yearPosition].trim();

         day = day.replace(/nd|rd|st|th/gi,"").trim();    
      if(day < 10 && day.length < 2){day = "0" + day;}
      if(year.length == 2){year = "20" + year;}
 
     if(dateRaw.search(/[a-z]/gi)>-1){//English, German, Dutch, French, Portuguese 
         if(month.search(/jan/i)>-1){month = "01";}
         if(month.search(/feb|fév/i)>-1){month = "02";}
         if(month.search(/mar|maar/i)>-1){month = "03";}
         if(month.search(/apr|avr/i)>-1){month = "04";}
         if(month.search(/may|mai|mei/i)>-1){month = "05";}
         if(month.search(/jun|juin/i)>-1){month = "06";}
         if(month.search(/jul|juil/i)>-1){month = "07";}
         if(month.search(/aug|août/i)>-1){month = "08";}
         if(month.search(/sep/i)>-1){month = "09";}
         if(month.search(/oct|okt/i)>-1){month = "10";}
         if(month.search(/nov/i)>-1){month = "11";}
         if(month.search(/dec|déc/i)>-1){month = "12";}
     }
let datum = month +"/"+  day +"/"+ year;
 return datum;
}

// printJob(job);
            

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

//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")

function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){
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




//JOBDESCRIPTION BASICO


(function() {
    var out = {};
    var job = {};
    var selector = '';
    var selectorError="";
    var full_html;
    if(document?.querySelector(selector)){var full_html = document.querySelector(selector);} else{
        full_html=document?.querySelector(selectorError);
    }

        //LIMPIAR DESCRIPCIONES
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
    for (const a of full_html.querySelectorAll('a')) {
        a.remove(); //if you want to remove this selector
    }
    for (const a of full_html.querySelectorAll('script')) {
        a.remove(); //if you want to remove this selector
    }
    for (const a of full_html.querySelectorAll('style')) {
        a.remove(); //if you want to remove this selector
    }

    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;



    job.html = full_html.innerHTML.trim();

    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);

    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);

    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
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

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
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
