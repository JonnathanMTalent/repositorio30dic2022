 INDICE 

<<LOCATION
<<REQI
<<SALARY
<<EXPERIENCE
<<JOBTYPE
<<BENEFIT
<<DATEPOSTED
<<LIMPIAR DESCRIPCIONES
<<SELECTOR ERROR
<<split-inicio-fin
<<split-inicio
FUNCIONES:
|const formatDate
ion buscOcurrenciaHTML
ion getDateFormat
ion multiplesVariables
ion printJob
ion addCero
ion validarFormatoFecha
ion Limpiar
EN PROCESO
FORMAS MULTIPLES VARIABLES (SENCILLO)
tres variables automaticas
tres variables rautomaticas sencillo
<<variables con el mismo selector

jobsDB

// PONER EN LOS FETCH
console.table(jobs)
//5 funciones primordiales b<


  // =multiplesVariables(expReg,selector,contenedor,nextElementSibling);
  // =buscOcurrenciaHTML(document.body,null,"",/uno|dos/gmi,false);
  //   =getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition);
  // printJob(job);
  //  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");


🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<LOCATION 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳


//   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

job.source_location = elem.querySelector('').textContent.trim();
let hq=""; // HEAD QUARTERS
job.source_location=job.source_location||"";
if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
job.location=(job.source_location)||hq; } //HEAD QUARTERS:
job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
// if(job.location.search(//gmi)>-1){job.location="";}



🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<REQID 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳



//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj REQID jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

let reqid;
if(job.url?.split("/")) reqid=job.url?.split("/"), job.reqid=reqid[reqid.length-1];


// =Limpiar(job.url,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")

let reqid;
if(job.url?.split("apply/")){ reqid=job.url?.split("apply/"), job.reqid=reqid.pop();
if(job.reqid?.split("/")) job.reqid=job.reqid?.split("/"), job.reqid=job.reqid.shift();}

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<SALARY 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳



//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary         
let source_salary=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined)job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();




🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<EXPERIENCE🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳



// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<JOBTYPE 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳



//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

  if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);


//OTRA FORMA:
 
  var jobtype=full_html.textContent.toUpperCase().replace(/-/gi,' '); 
  if(jobtype.includes('FULL TIME'))job.source_jobtype='Full Time';
  if(jobtype.includes('FULLTIME'))job.source_jobtype='Full Time';
  if(jobtype.includes('CASUAL'))job.source_jobtype='Casual';
  if(jobtype.includes('PART TIME'))job.source_jobtype='Part Time';
  if(jobtype.includes('PARTTIME'))job.source_jobtype='Part Time'; 
  if(jobtype.includes('PERMANENT'))job.source_jobtype='Permanent';
  if(jobtype.includes('VOLLZEIT'))job.source_jobtype='Vollzeit';
  if(jobtype.includes('TEILZEIT'))job.source_jobtype='Teilzeit';
  if(jobtype.includes('CDI'))job.source_jobtype='CDI';
  if(jobtype.includes('풀 타임'))job.source_jobtype='풀 타임';
  if(jobtype.includes('파트타임'))job.source_jobtype='파트타임';
  if(jobtype.includes('파트타임'))job.source_jobtype='파트타임';
  if(jobtype.includes('계약'))job.source_jobtype='계약';
  if(jobtype.includes('フルタイム'))job.source_jobtype='フルタイム';
  if(jobtype.includes('パートタイム'))job.source_jobtype='パートタイム';
  if(jobtype.includes('onbepaalde duur'))job.source_jobtype='onbepaalde duur';



  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<BENEFIT 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳



//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj BENEFIT jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

    job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document,true);

     job.source_benefit=Limpiar(job.jobdesc,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");



     🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<DATEPOSTED 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳


//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  DATE- POSTED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document,false);
// var datess=elem?.querySelector('')?.textContent.trim();
// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
let datess=undefined;
if(datess!=undefined){
    const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;}
    function validarFormatoFecha(campo) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!='')) {return true;} else { return false;} }
    //let dateposted_raw=formatDate(datess);
    // let dateposted_raw= getDateFormat(datess," ",1,0,2);
    // datess=datess.split('');
    // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
    if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
    // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
    }



    🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳<<LIMPIAR DESCRIPCIONES🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

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

if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
    if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
});

///////////////////////////jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

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


///////////////////////////jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

job.html = cleanHTML(job.html);
var tmp = document.createElement('div');
tmp.innerHTML = job.html;
job.jobdesc = tmp.textContent.trim();
job.jobdesc = cleanHTML(job.jobdesc);

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<SELECTOR ERROR 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

    var selector = '';
    var selectorError="";
    var full_html;
    if(document?.querySelector(selector)){varfull_html = document.querySelector(selector);} else{
        full_html=document?.querySelector(selectorError);
    }

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️<<const formatDate❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
    }

    ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  // =multiplesVariables(expReg,selector,contenedor,nextElementSibling);
  function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    return resultado;
}


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

// buscOcurrenciaHTML(document.body,null,"",/uno|dos/gmi,false);
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


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

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


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

printJob(job);
            

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


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️





function addCero(fecha,splitearCon){ // jjms
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


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
  }

  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")

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


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   

FORMAS MULTIPLES VARIABLES (SENCILLO)


var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document);

var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document);
// job.dateposted_raw=formatDate(job.dateposted_raw);
// if(datess!='No encontrado')datess=datess.split('');
// job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document);
job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document);
job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document);

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽 <<variables con el mismo selector 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
const findScript = (
    text_to_find,
    selector = 'script[type="text/javascript"]'
  ) => {
    let script;
    const query = document.querySelectorAll(selector);
    if (!query) return undefined;
    script = [...query].find((item) =>
      item.innerText.trim().includes(text_to_find)
    );
    return script;
  };
👽👽👽👽👽👽👽👽👽  EN PROCESO  👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽



let dateposted_raw=buscOcurrenciaHTML(document.body,null,"",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi,false);
dateposted_raw=Limpiar(dateposted_raw,"formatDate-","isDate-Y","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");
if(source_jobtype) job.source_jobtype=source_jobtype;
if(dateposted_raw) job.dateposted_raw=dateposted_raw;
// job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  


// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE-DATEPOSTED  11/01/2022   1/5/2022  Nov 08, 2022 jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
if(!job.dateposted_raw) job.dateposted_raw=buscOcurrenciaHTML(document.body,null,"",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi,false); //   11/01/2022   1/5/2022
if(!job.dateposted_raw) { //  //   Nov 08, 2022 
    let date=buscOcurrenciaHTML(document.body,null,"",/\D{1,3}\s\d{1,2}\D\s\d{1,4}/gmi);
    date=date.replaceAll(",","").replaceAll(".","").replace(/[^\w\s]/gi, '').trim();
    date=getDateFormat(date," ",1,0,2);
    if(date)job.dateposted_raw=date;
} 
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 




👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽 tres variables automaticas

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of document.querySelectorAll("p")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
  else{
     experience=[];  for (let li of document.querySelectorAll("li")) {
        if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
          && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
          experience.push(li.textContent);
      }
      if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
  }
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary     
if(!job.source_salary) {
let source_salary=[];  for (let li of document.querySelectorAll("p")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}else
{       
 source_salary=[];  for (let li of document.querySelectorAll("li")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined)job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();
}

}


 // tres variables rautomaticas sencillo

//idiomas: ingles, sueco,
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(document.body,null,"",/deltid|heltid|fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön/i.test(li.textContent) && /\$|¢|€|kr|SEK/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽 jobsDB 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

//palabras en location:
flag_active:1 AND scanid:163207 AND (location:"location" OR location:"locations" OR location:"more" OR location:"Remote" OR location:"remote" OR location:"+" OR location:"0" OR location:"1" )




//  BUSCAR BENEFITS:
flag_active:1 AND scanid:212647 AND (jobdesc: "benefits" OR jobdesc: "perks" OR jobdesc: "Benefits" OR jobdesc: "Perks" OR jobdesc: "we offer" OR jobdesc: "WE OFFER")


// VALIDAR LOCACION NUMS, MORE, LOCATION,S, REMOTE, ()  [] {}
flag_active:1 AND scanid:163207 AND (location:"location" OR location:"locations" OR location:"more" OR location:"More" OR location:"MORE" OR location:"Remote" OR location:"remote" OR location:"+"  OR location:"[" OR location:"{" OR location:"0" OR location:"1" OR location:"2" OR location:"3" OR location:"4" OR location:"5" OR location:"6" OR location:"7" OR location:"8" OR location:"9")


VALIDADOS

//descripciones que no insertan:
flag_active:1 AND scanid:120941 AND (-flag_html:2)

//buscar una palabra en la descripcion:
flag_active:1 AND scanid:212647 AND jobdesc: "Apply"

//REQID:
flag_active:1 AND scanid:163207 AND (jobdesc:"reqid" OR jobdesc:"req id" OR jobdesc:" id " OR jobdesc:" id:" )

//poner en el jobs db para ver si esta indexado o es ats:
flag_active:1 AND link.link_analyzed: ""

//buscar varias palabras ERRONEAS en la descripcion:
flag_active:1 AND scanid:212647 AND (jobdesc: "Apply" OR jobdesc: "contact" OR jobdesc: "email"  OR jobdesc: "www.")

flag_active:1 AND scanid:163207 AND (location:"location" OR location:"locations" OR location:"more" OR location:"More" OR location:"MORE" OR location:"+"  OR location:"[" OR location:"{" OR location:"0" OR location:"1" OR location:"2" OR location:"3" OR location:"4" OR location:"5" OR location:"6" OR location:"7" OR location:"8" OR location:"9")

// para revisar que no tenga multilocation:
AND (location:"more" OR location:"More" OR location:"MORE" OR location:"mais"  OR location:"outros"  OR location:"+")
👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽 <<split-inicio-fin 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

const splitInicio_pop="";
const splitFin_shift="";
const elementoaLimpiar= job.jobdesc;
let elementoLimpio;
if(splitInicio_pop!="" && splitFin_shift!=""){ 
    if((elementoaLimpiar.search(splitInicio_pop)>-1) && (elementoaLimpiar.search(splitFin_shift)>-1))
    {
    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().split(splitFin_shift).shift(); 
    }else{
        elementoLimpio=undefined;
    }
}
if(elementoLimpio)job.source_benefits=elementoLimpio;

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽  👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽 <<split-inicio 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

const splitInicio_pop="";
const elementoaLimpiar= job.jobdesc;
let elementoLimpio;
if(splitInicio_pop!=""){ 
    if(elementoaLimpiar.search(splitInicio_pop)>-1)
    {
    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().trim(); 
    }else{
        elementoLimpio=undefined;
    }
}
if(elementoLimpio)job.source_benefits=elementoLimpio;

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽  👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

//mas limpiezas nuevas

full_html.innerHTML = full_html.innerHTML.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
full_html.innerHTML = full_html.innerHTML.replace(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g, ''); //Remove email
full_html.innerHTML = full_html.innerHTML.replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
full_html.innerHTML = full_html.innerHTML.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

job.html = full_html.innerHTML.trim();
job.html = job.html.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');




for (const a of full_html.querySelectorAll('p')) { //Varios p
    const text = a.textContent.trim();
    if (text.search(/please/i) > -1) a.remove();
    if (text.search(/apply/i) > -1) a.remove();
    if (text.search(/call/i) > -1) a.remove();
    if (text.search(/click/i) > -1) a.remove();
    if (text.search(/cv/i) > -1) a.remove();
    if (text.search(/telephone/i) > -1) a.remove();
    if (text.search(/contact to/i) > -1) a.remove();
    if (text.search(/email/i) > -1) a.remove();
    if (text.search(/https/i) > -1) a.remove();
    if (text.search(/www./i) > -1) a.remove();
    if (text.search(/@/i) > -1) a.remove();
}

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽  👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
if (/P|H1|H2|H3|H4|H5|H6/.test(el.tagName) && /Was wir bieten|Benefits|Oferujemy|Co Vám můžeme nabídnout|Co ti nabídneme/i.test(el.textContent) && el.parentElement?.nextElementSibling)
job.source_benefit = el.parentElement.nextElementSibling.textContent.trim();

}


/////////////////////////////////////////////////////////////////////////////////////


function tagExperienceRequired(description) {
    let primerFiltro = [];
    description.querySelectorAll('*').forEach((word) => {
      if ((word.textContent.match(/experience|Experience|esperienza|expérience|werkervaring|ervaring|experiencia|erfahrung|tecrübeli|doświadczenia|Experiência|arbeidserfaring|tapasztalat|Zkušenosti/gi) && word.textContent.match(/[1-9]/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
        if (word.innerText.match(/experience|Experience|esperienza|expérience|werkervaring|ervaring|experiencia|erfahrung|tecrübeli|doświadczenia|Experiência|arbeidserfaring|tapasztalat|Zkušenosti/gi))
          primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
      }
      primerFiltro = primerFiltro.flat();
    });
    var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
    var segundoFiltro = [];
    deleteDuplicados.forEach(elem => {
      if (elem.match(/experience|Experience|esperienza|expérience|werkervaring|ervaring|experiencia|erfahrung|tecrübeli|doświadczenia|Experiência|arbeidserfaring|tapasztalat|Zkušenosti/gi) && elem.match(/[1-9]/g) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|lata|letnie|dans|anos|ano|mois|années|års|év|hónap|rok|Měsíc/gi))
        segundoFiltro.push(elem.trim());
    });
    var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
    return arrayFinal[0];
  }

/////////////////////////////////////////////////////////////////////////////////////



  if (full_html) {

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style")) el.remove();

    for (let el of full_html.querySelectorAll("li,div,span,p,h1,h2,h3,h4,h5,h6")) {

      if (/LI|SPAN/.test(el.tagName) && experience.length < 1)
        if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|lata|letnie|dans|anos|ano|mois|années|års|év|hónap|rok|Měsíc/i.test(el.textContent) && /experience|Experience|esperienza|expérience|werkervaring|ervaring|experiencia|erfahrung|tecrübeli|doświadczenia|Experiência|arbeidserfaring|tapasztalat|Zkušenosti|Zkušenosti/i.test(el.textContent)
          && /[1-9]|one|two|three|four|five|six|seven|eight|nine/gi.test(el.textContent))
          experience.push(el.textContent);

      if (/P|H1|H2|H3|H4|H5|H6/.test(el.tagName) && /Was wir bieten|Benefits|Oferujemy|Co Vám můžeme nabídnout|Co ti nabídneme/i.test(el.textContent) && el.parentElement?.nextElementSibling)
        job.source_benefit = el.parentElement.nextElementSibling.textContent.trim();

    }

  }
    
/////////////////////////////////////////////////////////////////////////////////////

  if (/(Full|Part)\s?-?Time/i.test(job.title))
  job.source_jobtype = /(Full|Part)\s?-?Time/i.exec(job.title)[0];