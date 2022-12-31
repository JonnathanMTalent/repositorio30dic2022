


//EXTRACT BASICO  MEJORADO EN PROCESO


(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('');
    
//   // JJJJJJ// FORMAT DATE JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
// const formatDate = (value) => {
//     let date = new Date(value);
//     const withCero = n => n < 10 ? `0${n}` : n;
//     return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
//   }
//   // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
    
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];


        job.title = elem.querySelector('').textContent.trim();
        job.url = elem.querySelector('').href.trim();
        job.reqid = elem.querySelector('').href.trim();

        job.source_location = elem.querySelector('').textContent.trim();
        let hq=""; // HEAD QUARTERS
        job.source_location=job.source_location||"";
        if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")){job.location=hq}else{
        job.location=(job.source_location)||hq; } //HEAD QUARTERS:

        job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.dateclosed_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('').textContent.trim();
        job.source_salary = elem.querySelector('').textContent.trim();
        job.experience_required = elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_empname = elem.querySelector('').textContent.trim();
        job.logo=elem.querySelector('').getAttribute("src").trim();

        var datess=elem?.querySelector('')?.textContent.trim();
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
        if(datess!=undefined){
            //let dateposted_raw=formatDate(datess);
            // let dateposted_raw= getDateFormat(datess," ",1,0,2);
            // datess=datess.split('');
            // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

            if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
            // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
            }
//     ███████████████████████████████ variables funcion █████████████████████████████████████  /*  

            //EXPERIENCE REQUIRED          
            let experience=[];  for (let li of document.querySelectorAll("p")) {
                if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
                  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
                  experience.push(li.textContent);
              }
              if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
            // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document);
            // job.logo=multiplesVariables(/logo/gmi,'li',document);
            //*/// ███████████████████████████████revision variables█████████████████████████████████████
            job.source_jobtype=buscOcurrenciaHTML(elem,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
            job.dateposted_raw=buscOcurrenciaHTML(elem,null,"",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi,false);
            // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);

            //*/// ████████████████████████████████████████████████████████████████████

        
        job.temp = 1;



        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
  }

  function multiplesVariables(expReg,selector,contenedor,nextElementSibling){
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    return resultado;
}


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

//    =Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined);
// =Limpiar(elementoaLimpiar,false,false,false,"","",false,false,false,false,false,false,"","","",false);
// =Limpiar(elementoaLimpiar,false,false,false,"","",false,false,false,false,false,false,"","","",false);
//    =Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined);
// =Limpiar(elementoaLimpiar,false,false,false,"","",false,false,false,false,false,false,"","","",false);


//LAS EXPRESIONES REGULARES NO VAN ENTRE COMILLAS
function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){
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
        if(correoUrl){ 
            
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
        if(emogis){
            elementoLimpio=elementoaLimpiar.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim(); 
            elementoaLimpiar=elementoLimpio;
        }
        if(numeros){
            elementoLimpio=elementoaLimpiar.replaceAll(/\d/gmi,"");
            elementoaLimpiar=elementoLimpio;
        }

        if(letras){
            elementoLimpio=elementoaLimpiar.replaceAll(/\D/g,"");
            elementoaLimpiar=elementoLimpio;
        }
        if(caracteresEspeciales){
            elementoLimpio=elementoaLimpiar.replaceAll(/[^\w\s]/gi, '');
            elementoaLimpiar=elementoLimpio;
        }
        if(texto!=""){
            elementoLimpio=elementoaLimpiar.replaceAll(texto, '');
            elementoaLimpiar=elementoLimpio;
        }
        if(agrupaciones){
            elementoLimpio=elementoaLimpiar.replace(/ \([^)]*\) /g, "")
            .replace(/\(.*?\)/g, '')
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/ \{[^)]*\} /g, "")
            .replace(/ \[[^)]*\] /g, "")
            .replace(/\(\d+\)/g,"")
            elementoaLimpiar=elementoLimpio;
        }
        if((splitInicio_pop!="" || splitFin_shift!="" ) && !splitUndefined){
                if(splitInicio_pop!="" && splitFin_shift==""){
                    if(elementoaLimpiar.search(splitInicio_pop)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop();  
                    }else{
                        elementoLimpio=elementoaLimpiar;
                    } 
                }
                if(splitInicio_pop=="" && splitFin_shift!=""){
                    if(elementoaLimpiar.search(splitFin_shift)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitFin_shift).shift();   
                    }else{
                        elementoLimpio=elementoaLimpiar
                    }
                }
                if(splitInicio_pop!="" && splitFin_shift!=""){ 
                    if((elementoaLimpiar.search(splitInicio_pop)>-1) && (elementoaLimpiar.search(splitFin_shift)>-1))
                    {
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().split(splitFin_shift).shift(); 
                    }else{
                        elementoLimpio=elementoaLimpiar;
                    }
                }
            }
            if((splitInicio_pop!="" || splitFin_shift!="" ) && splitUndefined){
                if(splitInicio_pop!="" && splitFin_shift==""){
                    if(elementoaLimpiar.search(splitInicio_pop)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop();  
                    }else{
                        return undefined;
                    } 
                }
                if(splitInicio_pop=="" && splitFin_shift!=""){
                    if(elementoaLimpiar.search(splitFin_shift)>-1){
                    elementoLimpio=elementoaLimpiar.split(splitFin_shift).shift();   
                    }else{
                        return undefined
                    }
                }
                if(splitInicio_pop!="" && splitFin_shift!=""){ 
                    if((elementoaLimpiar.search(splitInicio_pop)>-1) && (elementoaLimpiar.search(splitFin_shift)>-1))
                    {
                    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().split(splitFin_shift).shift(); 
                    }else{
                        return undefined;
                    }
                }
            }

        if(formatDate){
            const formatDate = (value) => {
            let date = new Date(value);
            const withCero = n => n < 10 ? `0${n}` : n;
            return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
            }
            let datess=formatDate(elementoaLimpiar);
            if(validarFormatoFecha(datess))elementoLimpio=datess;
        }
        if(addCero){
            let  date0=addCero(elementoaLimpiar,splitFecha);
            if(validarFormatoFecha(date0))elementoLimpio=date0;

        }
        if(isDate){
            if(validarFormatoFecha(elementoaLimpiar)){
                elementoaLimpiar=addCero(elementoaLimpiar,"/");
                elementoLimpio=elementoaLimpiar;
            }else{
                return undefined;
            }
        }    
        if(anular!=""){
            if(elementoaLimpiar.search(anular)>-1)  return undefined;
        }


        elementoLimpio=elementoLimpio==""?undefined:elementoLimpio.trim();
        return elementoLimpio;
    }else{
        return undefined;
    }
}

// LAS EXPRESIONES REGULARES NO LLEVAN COMILLAS




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
































//EXTRACT BASICO


(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('');
    
//   // JJJJJJ// FORMAT DATE JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
// const formatDate = (value) => {
//     let date = new Date(value);
//     const withCero = n => n < 10 ? `0${n}` : n;
//     return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
//   }
//   // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
    
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];


        job.title = elem.querySelector('').textContent.trim();
        job.url = elem.querySelector('').href.trim();
        job.reqid = elem.querySelector('').href.trim();
        job.source_location = elem.querySelector('').textContent.trim();
        
        let hq=""; // HEAD QUARTERS
        job.source_location=job.source_location||"";
        if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")){job.location=hq, job.source_location="";}else{
        job.location=(job.source_location)||hq; } //HEAD QUARTERS:

        job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.dateclosed_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('').textContent.trim();
        job.source_salary = elem.querySelector('').textContent.trim();
        job.experience_required = elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_empname = elem.querySelector('').textContent.trim();
        job.logo=elem.querySelector('').getAttribute("src").trim();

        var datess=elem.querySelector('').textContent.trim();
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
        if(datess!=undefined){
            //let dateposted_raw=formatDate(datess);
            // let dateposted_raw= getDateFormat(datess," ",1,0,2);
            // datess=datess.split('');
            // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

            if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
            // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
            }
//     ███████████████████████████████ variables funcion █████████████████████████████████████  /*  

            //EXPERIENCE REQUIRED          
            let experience=[];  for (let li of document.querySelectorAll("p")) {
                if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
                  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
                  experience.push(li.textContent);
              }
              if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
            // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document);
            // job.logo=multiplesVariables(/logo/gmi,'li',document);
            //*/// ████████████████████████████████████████████████████████████████████

        
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
  }

  function multiplesVariables(expReg,selector,contenedor,nextElementSibling){
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    return resultado;
}


//   function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
//     dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
  
//     let day   =  dateRaw.split(cut)[dayPosition].trim(), 
//         month =  dateRaw.split(cut)[monthPosition].trim(), 
//         year  = dateRaw.split(cut)[yearPosition].trim();
  
//     if (day < 10 && day.length < 2) {day = "0" + day;}
  
//     if(dateRaw.search(/[a-z]/gi)>-1){ 
//       if(month.search(/jan/i)>-1){month = "01";}
//       if(month.search(/feb|fév/i)>-1){month = "02";}
//       if(month.search(/mar|mär/i)>-1){month = "03";}
//       if(month.search(/apr|avr/i)>-1){month = "04";}
//       if(month.search(/may|mai/i)>-1){month = "05";}
//       if(month.search(/jun|juin/i)>-1){month = "06";}
//       if(month.search(/jul|juil/i)>-1){month = "07";}
//       if(month.search(/aug|août/i)>-1){month = "08";}
//       if(month.search(/sep/i)>-1){month = "09";}
//       if(month.search(/oct|okt/i)>-1){month = "10";}
//       if(month.search(/nov/i)>-1){month = "11";}
//       if(month.search(/dec|dez/i)>-1){month = "12";}
//     }
  
//     if (year < 100 && year.length < 3) {year = "20" + year;}
  
//     var datum = month +"/"+  day +"/"+ year;
  
//     return datum;
//   }
































//EXTRACT BASICO

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('');

    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];


        job.title = elem.querySelector('').textContent.trim();
        job.url = elem.querySelector('').href.trim();
        job.reqid = elem.querySelector('').href.trim();
        job.source_location = elem.querySelector('').textContent.trim();
        job.location = job.source_location;
        job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.dateclosed_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('').textContent.trim();
        job.source_salary = elem.querySelector('').textContent.trim();
        job.experience_required = elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_empname = elem.querySelector('').textContent.trim();

        
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();



