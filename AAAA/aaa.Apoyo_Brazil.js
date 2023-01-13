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
<<VARIABLE CON FOR
<<split-inicio-fin
<<split-inicio
rautomaticas
jobsDB

EXPERIMENTALES

<<var_filtrada      // filtrar una variable cuando hay varios selectores en la misma etiqueta se filtra con un carater o texto
<<limpiar etiquetas printJob,li etc; en full_html de palabras claves, con un for
<<cuando viene un td tr
<<limpiar los selectores p con palabras especiales.
// buscar con palabras las ats
http://index02.neuvoo.com/dash/class/portfolios/async.php?action=get-scanids-by-jobsiteurl-fragment&debug=1&fragment=
  //BENEFIT DESDE EL JOB.JOBDESC 
🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
FUNCIONES:
<<para aprender a usar
ion dateEstructurados
<<formatDate
ion buscOcurrenciaHTML
ion getDateFormat
ion multiplesVariables
ion printJob
ion checkJob
ion checkContenedor
ion checkAll
ion addCero
ion validarFormatoFecha
n removeEmojis
ion Limpiar
ion getDesc
EN PROCESO
FORMAS MULTIPLES VARIABLES (SENCILLO)
tres variables automaticas
<<variables con el mismo selector
🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

PLANTILLAS WEB SCRAPING



//JSON FETCH COMPLETO
//JSON FETCH BASICA

//EXTRACT BASICO   COMPLETO
//EXTRACT BASICO

// FETCH EXTRAC BASICO COMPLETO
// FETCH EXTRAC BASICO

//JOBDESCRIPTION COMPLETO
//JOBDESCRIPTION BASICO

 //FETCH JOBDATA sin decoder  COMPLETO
//FETCH JOBDATA -sin decoder BASICO

// DOBLE-fetch  COMPLETO
// DOBLE fetch BASICO



🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<Error jobsErrorLog
//linea para extraer el texto completo del error en jobs Error log 
const textoError=document.querySelectorAll('#table-63b5c414c9126 > tbody > tr:nth-child(1) > td:nth-child(4)')[0].textContent.trim(); textoError;

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

// PONER EN LOS FETCH
console.table(jobs)
//5 funciones primordiales b<


  // =multiplesVariables(expReg,selector,contenedor,nextElementSibling);
  // =buscOcurrenciaHTML(document.body,null,"",/uno|dos/gmi,false);
  //   =getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition);
  // printJob(job);
  //  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");

  msg("\x1b[42m verde");
  msg("\x1b[46m azul");
  msg("\x1b[41m zanahoria");
  msg("\x1b[32m letra verde");
  

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<LOCATION 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳


//   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

job.source_location = elem.querySelector('').textContent.trim();
let hq=""; // HEAD QUARTERS
job.source_location=job.source_location||"";
if((job.source_location.search(/remote|headquarter|head quarter|remoto|sede|quartel general|escritório|home office/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
job.location=(job.source_location)||hq; } //HEAD QUARTERS:
job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "").replace(",,",", ").replace(", ,",", ");
// if(job.location.search(//gmi)>-1){job.location="";}

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳<<var_filtrada🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
//variable filtrada


let busqueda= [...elem?.querySelectorAll("footer span")]?.filter(x => x?.textContent?.includes("/"))[0]?.textContent?.trim();
if(busqueda)job.source_=busqueda;
// let html_jobs= [...document?.querySelectorAll("footer span")]?.filter(x => x?.textContent?.includes("/"))


//cuando acumulamos los textos que contienen la palabra
let busqueda=[...document?.querySelectorAll("p")]?.filter(x => x?.textContent?.search(/benefit/gmi)>-1);
let arr=[]; for(x in busqueda)arr.push(busqueda[x].textContent.trim());arr=arr.join(", ");
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
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|salário|pagamento|remuneração|Faixa horária/gmi.test(li.textContent) && /\$|¢|€| BRL |R$/i.test(li.textContent)
      && /\d/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined)job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();




🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<EXPERIENCE🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳



// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|experiência/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);

  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  //BENEFIT DESDE EL JOB.JOBDESC   🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

  //BENEFIT DESDE EL JOB.JOBDESC                           
let inicioBenefit=''; let finBenefit='';
if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<VARIABLE CON FOR 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
  for (const a of full_html.querySelectorAll('div[style*="-webkit-tap"]')) {

    if (a.textContent.search(/We offer GREAT benefits/ig) > -1) {
        job.source_benefit = a.textContent.split(/We offer/ig).pop().split('.').shift().trim();
    }

}

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<JOBTYPE 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

  if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|cdd|cdi|/gmi,false);


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


////////////////////////////////////////// resumido///////////

    // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document,false);
// var datess=elem?.querySelector('')?.textContent.trim();
// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
let datess=undefined;

if(datess!=undefined){
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



///////////////////////////jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
job.html = full_html.innerHTML.trim();
// job.html = removeTextBefore(job.html, '', false);
// job.html = removeTextAfter(job.html, '', true);
job.html = cleanHTML(job.html);
var tmp = document.createElement('div');
tmp.innerHTML = job.html;
job.jobdesc = tmp.textContent.trim();
job.jobdesc = cleanHTML(job.jobdesc);

///////////////////////////jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


for (const a of full_html.querySelectorAll('p')) {  // Varios p
    const text = a.textContent.trim();
    if (text.search(/please/i) > -1) a.remove();
    if (text.search(/apply/i) > -1) a.remove();
    if (text.search(/call /i) > -1) a.remove();
    if (text.search(/click/i) > -1) a.remove();
    if (text.search(/cv/i) > -1) a.remove();
    if (text.search(/telephone/i) > -1) a.remove();
    if (text.search(/e-mail/i) > -1) a.remove();
    if (text.search(/email/i) > -1) a.remove();
    if (text.search(/https/i) > -1) a.remove();
    if (text.search(/www./i) > -1) a.remove();
    if (text.search(/@/i) > -1) a.remove();
  }

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳 <<SELECTOR ERROR 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

    var selector = '';
    var selectorError="";
    var full_html;
    if(document?.querySelector(selector)){var full_html = document.querySelector(selector);} else{
        full_html=document?.querySelector(selectorError);
    }

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️<<formatDate❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
    }

    ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  // =multiplesVariables(/buscar/gmi,selector,contenedor,2);
  function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    switch (nextElementSibling) {
        case 0:
            aux[0]!=null ? resultado=aux[0]?.textContent?.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
          break;
        case 1:
            aux[0]!=null ? resultado=aux[0]?.nextElementSibling?.textContent?.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
          break;
        case 2:
            aux[0]!=null ? resultado=aux[0]?.nextElementSibling?.nextElementSibling?.textContent?.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
        break;
        case 3:
            aux[0]!=null ? resultado=aux[0]?.nextElementSibling?.nextElementSibling?.nextElementSibling?.textContent?.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
            break;
        case 4:
            aux[0]!=null ? resultado=aux[0]?.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.textContent?.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
            break;
        default:
            aux[0]!=null ? resultado=aux[0]?.textContent?.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
      }
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

// job.dateclosed_raw=dateEstructurados(document,"closed");
// job.dateposted_raw=dateEstructurados(document,"posted");


function dateEstructurados(contenedor,datetype) { //jjms
    if (typeof msg == "undefined") msg = console.log;
    var date1,date2;
  if(datetype=="posted" || datetype=="closed"){
    datetype=="posted"?(date1="datePosted",date2="datePublished"):(date1="validThrough",date2="dateClosed")
  
  }else{
    return msg("el datetype ingresado no es valido");
  }
  const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  
  
  if(contenedor.querySelector('script[type="application/ld+json"]')){
    // Extract text on the script
    var html=contenedor.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  
   var json=JSON.parse(html);
    var date=''; var dateInJsonGraph={};var dateInJsonGraph2={}; var dateInJson={}; 
  
  
    var tipo=0;
  //GRAPH    
  
  
  dateInJsonGraph=json['@graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
  if(dateInJsonGraph){ tipo=1}else{
    dateInJsonGraph2=json['graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
    if(dateInJsonGraph2){tipo=2} else{
        dateInJson=json;
        if(dateInJson)tipo=3;
    }
    }  
  
  //   dateInJsonGraph? tipo=1:
  //   dateInJsonGraph2? tipo=2:
  //   dateInJson? tipo=3: tipo=0;
  
  switch (tipo) {
    case 1:
        
            if(date1=="datePosted"&&date2=="datePublished"){dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
                dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
                date=undefined;}
  
            if(date1=="validThrough"&&date2=="dateClosed"){dateInJsonGraph.validThrough?date=dateInJsonGraph.validThrough:
                dateInJsonGraph.dateClosed?date=dateInJsonGraph.dateClosed:
                date=undefined;}
        
      break;
  
    case 2:
            if(date1=="datePosted"&&date2=="datePublished"){
                dateInJsonGraph2.datePosted?date=dateInJsonGraph2.datePosted:
                dateInJsonGraph2.datePublished?date=dateInJsonGraph2.datePublished:
                date=undefined;}
  
            if(date1=="validThrough"&&date2=="dateClosed"){
                dateInJsonGraph2.validThrough?date=dateInJsonGraph2.validThrough:
                dateInJsonGraph2.dateClosed?date=dateInJsonGraph2.dateClosed:
                date=undefined;}
        
      break;
    case 3:
        if(date1=="datePosted"&&date2=="datePublished"){
            dateInJson.datePosted?date=dateInJson.datePosted:
            dateInJson.datePublished?date=dateInJson.datePublished:
            date=undefined;}
  
        if(date1=="validThrough"&&date2=="dateClosed"){
            dateInJson.validThrough?date=dateInJson.validThrough:
            dateInJson.dateClosed?date=dateInJson.dateClosed:
            date=undefined;}
        break;
  
        
  
    // Se pueden incluir todos los casos que quieras
  
    default:
      msg("No se encontro el tipo de date");
  }
  
  
  
  var resultado=date?formatDate(date):undefined;
  }
  return resultado  //jjms
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

var clavesG=checkJob(job,"benefit,benefits,perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$");

function checkJob(job,palabras) { //jjms
    var claves = Object.keys(job);
        
    msg(`\n \x1b[31m <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  JOB  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if (claves[i] == "jobdesc" || claves[i] == "html") {
            if(claves[i]=="jobdesc"){
                msg(`${"\x1b[33m El tamaño de la descripcion es: "+job[clave].length}:`)
            if(palabras.includes(',') && job[clave].length>0){
                var arrayPalabras = palabras.split(',');
                for(var z=0;z<arrayPalabras.length;z++){
                    if(job[clave].toLowerCase().indexOf(arrayPalabras[z].trim())>-1)msg(`${"\x1b[41m En jobdesc existe la palabra: "+arrayPalabras[z].trim()}:`);
                }
                }else{
                    if(job[clave].toLowerCase().indexOf(palabras)>-1)msg(`${"\x1b[41m En jobdesc existe la palabra: "+palabras}:`);
                }
            }
            if(claves[i]=="html")msg(`${"\x1b[33m El tamaño del html es: "+job[clave].length}:`)
            continue
        }
        msg(`${"\x1b[32m"+claves[i]}:`)
        msg(job[clave])
    }
    msg(`\x1b[31m />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
    return claves;
}
❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
var clavesG=checkJob(job,"perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$");
msg("Claves Actuales: "+clavesG);
checkContenedor(document.body,clavesG);

checkContenedor(document.body);

//FUNCIONES:

function checkContenedor(contenedor,claves) { //jjms
    var nombre="";

    // regex:
    let benefitsRegex=/benefit|benefits|perks|beneficios|ventajas|We Offer/gmi;
    let jobtypeRegex=/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi;
    let fechasRegex=/\D{1,3}\s\d{1,2}\D\s\d{1,4}|\d{1,2}\.\d{1,2}\.\d{1,4}|script[type="application/ld+json"]/gmi;
    let mesesRegex=/enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/gmi;
    let salaryRegex=/salary|salarial|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária|\$|¢|€| BRL |R\$/gmi;
    let experienceRegex=/experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/gmi;
    let datepostedRegex=/posted/gmi;
    let dateclosedRegex=/closed/gmi
    let limpiarRegex=/mail|correo|phone|telefono|more|locations|\+|dirección|/gmi;

    let arrayRegex=[benefitsRegex,jobtypeRegex,fechasRegex,mesesRegex,limpiarRegex,salaryRegex,experienceRegex];

    if (typeof msg == "undefined") msg = console.log;
    msg(`\n \x1b[35m <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  CONTENEDOR  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
    for(x in arrayRegex){
        
        if(arrayRegex[x]==benefitsRegex){nombre="source_benefit";}
        if(arrayRegex[x]==experienceRegex){nombre="experience_required";}
        if(arrayRegex[x]==salaryRegex){nombre="source_salary";}
        if(arrayRegex[x]==mesesRegex){nombre="date";}
        if(arrayRegex[x]==fechasRegex){nombre="date";}
        if(arrayRegex[x]==jobtypeRegex){nombre="source_jobtype";}
        if(arrayRegex[x]==dateclosedRegex){nombre="dateclosed_raw";}
        if(arrayRegex[x]==datepostedRegex){nombre="dateposted_raw";}
        
        let ocurrencia=buscOcurrenciaHTML(contenedor,null,"",arrayRegex[x],false);
        if(ocurrencia){
            if(claves.includes(nombre)|| (nombre=="date"&&(claves.includes("dateposted_raw")||claves.includes("dateclosed_raw")))){
            msg(`${"\x1b[32m "+ocurrencia+" ...... variable: "+nombre}:`);
        }else{
            msg(`${"\x1b[45m "+ocurrencia+" ......Nueva variable: "+nombre}:`);
        }
    }
    nombre="";
}
msg(`\n \x1b[35m />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);

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

}


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


checkAll(job,"http,https,.com,apply,perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$",document.body);

checkAll(job,"http,https,.com,apply,perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$",iframeDocument.body);

// contenedores:document.body;  document ; iframeDocument.body ;doc, tmp, etc,  colocarlo preferiblemente despues de job.jobdesc donde agarre bien tanto el job como el contenedor.

// checkAll(job,"http,https,.com,apply,perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$",doc);

//funcion poner al final
function checkAll(job,palabrasJobdesc,contenedor){ //jjms
    var clavesG=checkJob(job,palabrasJobdesc);
    msg("Claves Actuales: "+clavesG);
    checkContenedor(contenedor,clavesG);
    ///jjjjjjjjjjjjjjjjjjjj FUNCIONES
    function checkContenedor(contenedor,claves) { //jjms
        var nombre="";
    
        // regex:
        let benefitsRegex=/benefit|benefits|perks|beneficios|ventajas|We Offer/gmi;
        let jobtypeRegex=/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi;
        let fechasRegex=/\D{1,3}\s\d{1,2}\D\s\d{1,4}|\d{1,2}\.\d{1,2}\.\d{1,4}|script[type="application/ld+json"]/gmi;
        let mesesRegex=/enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/gmi;
        let salaryRegex=/salary|salarial|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária|\$|¢|€| BRL |R\$/gmi;
        let experienceRegex=/experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/gmi;
        let datepostedRegex=/posted/gmi;
        let dateclosedRegex=/closed/gmi
        let limpiarRegex=/mail|correo|phone|telefono|more|locations|\+|dirección|/gmi;
    
        let arrayRegex=[benefitsRegex,jobtypeRegex,fechasRegex,mesesRegex,limpiarRegex,salaryRegex,experienceRegex];
    
        if (typeof msg == "undefined") msg = console.log;
        msg(`\n \x1b[35m <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  CONTENEDOR  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
        for(x in arrayRegex){
            
            if(arrayRegex[x]==benefitsRegex){nombre="source_benefit";}
            if(arrayRegex[x]==experienceRegex){nombre="experience_required";}
            if(arrayRegex[x]==salaryRegex){nombre="source_salary";}
            if(arrayRegex[x]==mesesRegex){nombre="date";}
            if(arrayRegex[x]==fechasRegex){nombre="date";}
            if(arrayRegex[x]==jobtypeRegex){nombre="source_jobtype";}
            if(arrayRegex[x]==dateclosedRegex){nombre="dateclosed_raw";}
            if(arrayRegex[x]==datepostedRegex){nombre="dateposted_raw";}
            
            let ocurrencia=buscOcurrenciaHTML(contenedor,null,"",arrayRegex[x],false);
            if(ocurrencia){
                if(claves.includes(nombre)|| (nombre=="date"&&(claves.includes("dateposted_raw")||claves.includes("dateclosed_raw")))){
                msg(`${"\x1b[32m "+ocurrencia+" ...... variable: "+nombre}:`);
            }else{
                msg(`${"\x1b[45m "+ocurrencia+" ......Nueva variable: "+nombre}:`);
            }
        }
        nombre="";
    }
    msg(`\n \x1b[35m />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
    
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
    
    }
    function checkJob(job,palabras) { //jjms
        var claves = Object.keys(job);
            
        msg(`\n \x1b[31m <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  JOB  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (claves[i] == "jobdesc" || claves[i] == "html") {
                if(claves[i]=="jobdesc"){
                    msg(`${"\x1b[33m El tamaño de la descripcion es: "+job[clave].length}:`)
                if(palabras.includes(',') && job[clave].length>0){
                    var arrayPalabras = palabras.split(',');
                    for(var z=0;z<arrayPalabras.length;z++){
                        if(job[clave].toLowerCase().indexOf(arrayPalabras[z].trim())>-1)msg(`${"\x1b[41m En jobdesc existe la palabra: "+arrayPalabras[z].trim()}:`);
                    }
                    }else{
                        if(job[clave].toLowerCase().indexOf(palabras)>-1)msg(`${"\x1b[41m En jobdesc existe la palabra: "+palabras}:`);
                    }
                }
                if(claves[i]=="html")msg(`${"\x1b[33m El tamaño del html es: "+job[clave].length}:`)
                continue
            }
            msg(`${"\x1b[32m"+claves[i]}:`)
            msg(job[clave])
        }
        msg(`\x1b[31m />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
        return claves;
    }
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
  function removeEmojis(element) {
    var cleanItem = element.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF])|\u270B|\uD83D[\uDC00-\uDFFF]/g,'');
    cleanItem = cleanItem.replace(/[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|\uD83D[\uDC00-\uDFFF]/g, '').trim();
    return cleanItem;
  }
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//Limpiar


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
// Usar solo cuando las fechas estan ordenadas,  ya que , de no ser asi puede presentarse el problema de que en unas corridas no suba ningun job y en otras si y se muera el test o el run

job.dateposted_raw = '06/12/2021';
if (validationDate(job.dateposted_raw) <= 180) jobs.push(job);
//////////////// Function
function validationDate(date) {
    const result = Math.abs(new Date() - new Date(date));
    return Math.trunc(result / (1000 * 3600 * 24));
}
// OUT:
// 437 días
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
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total/gmi,false);
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
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/gmi.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
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

//idiomas: ingles, sueco,portugues
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
let jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi,false);
if(!job.source_jobtype){ if(jobtype)job.source_jobtype=jobtype;}
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad|years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){if(experience[0].length<400)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/salary|salarial|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária/i.test(li.textContent) && /\$|¢|€| BRL |R$/i.test(li.textContent)
      && /\d/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary){if(job.source_salary.length<300)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽 jobsDB 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

//palabras en location:
flag_active:1 AND scanid:163207 AND (location:"location" OR location:"locations" OR location:"more" OR location:"Remote" OR location:"remote" OR location:"+" OR location:"0" OR location:"1" )




//  BUSCAR BENEFITS:
flag_active:1 AND scanid:212647
 AND (jobdesc: "benefits" OR jobdesc: "perks" OR jobdesc: "Benefits" OR jobdesc: "Perks" OR jobdesc: "we offer" OR jobdesc: "WE OFFER")


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
function split_Inicio_Fin(splitInicio_pop="",splitFin_shift="", texto){
const elementoaLimpiar= texto;
let elementoLimpio;
if(splitInicio_pop!="" && splitFin_shift!=""){ 
    if((elementoaLimpiar.search(splitInicio_pop)>-1) && (elementoaLimpiar.search(splitFin_shift)>-1))
    {
    elementoLimpio=elementoaLimpiar.split(splitInicio_pop).pop().split(splitFin_shift).shift(); 
    }else{
        elementoLimpio=undefined;
    }
}
if(elementoLimpio)return elementoLimpio;
}

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
if(elementoLimpio)job.source_benefit=elementoLimpio;

👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽  👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺
//JOBDESCRIPTION COMPLETO
(function() {
    var out = {};
    var job = {};
    var selector = '';
    var selectorError="";
    var full_html;
    if(document?.querySelector(selector)){ full_html = document.querySelector(selector);} else{
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
// //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

// job.source_location = elem.querySelector('').textContent.trim();
// let hq=""; // HEAD QUARTERS
// job.source_location=job.source_location||"";
// if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
// job.location=(job.source_location)||hq; } //HEAD QUARTERS:
// job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
// // if(job.location.search(//gmi)>-1){job.location="";}

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
let jobtype;
if(!job.source_jobtype) jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
if(jobtype)job.source_jobtype=jobtype;
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
}  

//MULTIPLES VARIABLES (SENCILLO)


// var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document,false);

// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document,false);
// // job.dateposted_raw=formatDate(job.dateposted_raw);
// // if(datess!='No encontrado')datess=datess.split('');
// // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

// job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document,false);
// job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document,false);
// job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document,false);

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
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  DATE- POSTED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document,false);
// var datess=elem?.querySelector('')?.textContent.trim();
// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
let datess=undefined;
if(datess!=undefined){
    const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
    }
    function validarFormatoFecha(campo) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!='')) {
              return true;
        } else {
              return false;
        }
      }
    //let dateposted_raw=formatDate(datess);
    // let dateposted_raw= getDateFormat(datess," ",1,0,2);
    // datess=datess.split('');
    // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
    if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
    // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
    }

    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);

    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);
    
    //job.html = job.html.split("").shift();
    //job.html = job.html.split("").shift();

    job.html=Limpiar(job.html,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-Y","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");
    
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    let benefit;
    if(!job.source_benefit)benefit=Limpiar(job.jobdesc,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-Y","anular si existe esta expresion regular","What we offer","Equitable Bank","splitUndefined-Y");
    if(benefit)job.source_benefit=benefit;

    out["job"] = job;
    printJob(job);
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
// printJob(job);  // activar el msg en config
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
function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
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

//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")
function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
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

🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

//JOBDESCRIPTION BASICO
(function() {
    var out = {};
    var job = {};
    var selector = '';
    var selectorError="";
    var full_html;
    if(document?.querySelector(selector)){full_html = document.querySelector(selector);} else{
        full_html=document?.querySelector(selectorError);
    }




    //////////////////////////////////////////////////////////////////////////
    let jobtype=buscOcurrenciaHTML(document.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi,false);
    if(!job.source_jobtype){ if(jobtype)job.source_jobtype=jobtype;}
    // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
    if(!job.experience_required){
    let experience=[];  for (let li of document.querySelectorAll("p,li")) {
        if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad|years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/i.test(li.textContent)
          && /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
          experience.push(li.textContent);
      }
      if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
    }
    //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
    //source salary   
    if(!job.source_salary) {      
    let source_salary=[];  for (let li of document.querySelectorAll("p,li")) {
        if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária/i.test(li.textContent) && /\$|¢|€| BRL |R$/i.test(li.textContent)
          && /\d/gi.test(li.textContent))
          source_salary.push(li.textContent);
      }
      if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
    if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
    }
    //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

    //////////////////////////////////////////////////////////////////////////
    

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
    printJob(job);
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


🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

//JSON FETCH COMPLETO
//fetch limpia 
(async () => {
    let out = {};
    //   // JJJJJJ// FORMAT DATE JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
// const formatDate = (value) => {
//     let date = new Date(value);
//     const withCero = n => n < 10 ? `0${n}` : n;
//     return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
//   }
//   // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
    //  out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://apiteams.goobee.com.br/api/publicavaga"+out.pass_it.counter+"/vagas/SITE_CADMUS", {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Content-Type": "application/json",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site"
            },
            "referrer": "https://cadmus.com.br/",
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.json();
        // out.pass_it.jobsPerPage=20;
        // out.pass_it.jobsInPage = contenedor.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.contenedor.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.contenedor[x];  //poner tambien el contenedor de los jobs
            let job = {};
 
            job.title = elem.     ;
            job.url = elem.     ;
            job.reqid = elem.     ;
            job.source_location = elem.     ;

            //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

            let hq=""; // HEAD QUARTERS
            job.source_location=job.source_location||"";
            if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
            job.location=(job.source_location)||hq; } //HEAD QUARTERS:
            job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
            // if(job.location.search(//gmi)>-1){job.location="";}

            job.dateposted_raw = elem.     ;
            job.dateclosed_raw = elem.     ;
            job.source_jobtype = elem.     ;
            job.source_salary = elem.     ;
            job.experience_required = elem.     ;
            job.source_benefit=elem.     ;
            job.source_empname = elem.     ;
            job.logo = elem.     ;

            var datess=elem.    ;
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp.false);
            if(datess!=undefined){
                //let dateposted_raw=formatDate(datess);
                // let dateposted_raw= getDateFormat(datess," ",1,0,2);
                // datess=datess.split('');
                // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

                if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
                // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
                }

            job.temp = 44545;
            jobs.push(job)
        }
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();
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
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
  }
//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")
function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
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


🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺
//JSON FETCH BASICA

//fetch limpia 
(async () => {
    let out = {};
     out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://apiteams.goobee.com.br/api/publicavaga"+out.pass_it.counter+"/vagas/SITE_CADMUS", {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Content-Type": "application/json",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site"
            },
            "referrer": "https://cadmus.com.br/",
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.json();
        out.pass_it.jobsPerPage=20;
        out.pass_it.jobsInPage = contenedor.length;
        msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.contenedor.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.contenedor[x];  //poner tambien el contenedor de los jobs
            let job = {};
 
            job.title = elem.     ;
            job.url = elem.     ;
            job.reqid = elem.     ;
            job.source_location = elem.     ;
            job.location = job.source_location;
            job.dateposted_raw = elem.     ;
            job.dateclosed_raw = elem.     ;
            job.source_jobtype = elem.     ;
            job.source_salary = elem.     ;
            job.experience_required = elem.     ;
            job.source_benefit=elem.     ;
            job.source_empname = elem.     ;

            job.temp = 44545;
            jobs.push(job)
        }
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();


🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺


//EXTRACT BASICO   COMPLETO


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

        //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

        job.source_location = elem.querySelector('').textContent.trim();
        let hq=""; // HEAD QUARTERS
        job.source_location=job.source_location||"";
        if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
        job.location=(job.source_location)||hq; } //HEAD QUARTERS:
        job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
        // if(job.location.search(//gmi)>-1){job.location="";}

        job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.dateclosed_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype = elem.querySelector('').textContent.trim();
        job.source_salary = elem.querySelector('').textContent.trim();
        job.experience_required = elem.querySelector('').textContent.trim();
        job.source_benefit=elem.querySelector('').textContent.trim();
        job.source_empname = elem.querySelector('').textContent.trim();
        job.logo=elem.querySelector('').getAttribute("src").trim();

        var datess=elem?.querySelector('')?.textContent.trim();
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp,false);
        if(datess!=undefined){
            //let dateposted_raw=formatDate(datess);
            // let dateposted_raw= getDateFormat(datess," ",1,0,2);
            // datess=datess.split('');
            // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

            if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
            // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
            }
//     ███████████████████████████████ variables funcion █████████████████████████████████████  /*  


            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document,false);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document,false);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document,false);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document,false);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document,false);
            // job.logo=multiplesVariables(/logo/gmi,'li',document,false);
            //*/// ███████████████████████████████revision variables█████████████████████████████████████
           if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(elem,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
           if(!job.dateposted_raw) job.dateposted_raw=buscOcurrenciaHTML(elem,null,"",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi,false);
        //    if(!job.source_empname)job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);

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

  function multiplesVariables(expReg,selector,contenedor,nextElementSibling){  // jjms
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

//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")

function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
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



🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺
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

🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

 // DOBLE-fetch  COMPLETO


      //Extract
      (async () => {
        const out = {};
        const jobs = [];
        out.pass_it=pass_it;
            const url = window.location.href
            const resp = await fetch(url, {
            "headers": {}
            });
        const html = await resp.text();
        const div = document.createElement("div");
        div.innerHTML = html;
        const html_jobs = div.querySelectorAll('div#pro-gallery-margin-container')[0].querySelectorAll('div[class="gallery-item-container visible hover-animation-fade-in"]');
        // out.pass_it.jobsPerPage=25;
        // out.pass_it.jobsInPage = html_jobs.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for (let x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            let job = {};
            let elem = html_jobs[x];
            //////EXTRACTING VARIABLES///////
            job.title = elem.querySelector('').textContent.trim();
            job.url = elem.querySelector('').href.trim();
            job.reqid = elem.querySelector('').href.trim();
            //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

            job.source_location = elem.querySelector('').textContent.trim();
            let hq=""; // HEAD QUARTERS
            job.source_location=job.source_location||"";
            if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
            job.location=(job.source_location)||hq; } //HEAD QUARTERS:
            job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
            // if(job.location.search(//gmi)>-1){job.location="";}

            job.dateposted_raw = elem.querySelector('').textContent.trim();
            job.dateclosed_raw = elem.querySelector('').textContent.trim();
            job.source_jobtype = elem.querySelector('').textContent.trim();
            job.source_salary = elem.querySelector('').textContent.trim();
            job.experience_required = elem.querySelector('').textContent.trim();
            job.source_benefit=elem.querySelector('').textContent.trim();
            job.source_empname = elem.querySelector('').textContent.trim();
            job.logo=elem.querySelector('').getAttribute("src").trim();

            var datess=elem.querySelector('').textContent.trim();
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp,false);
            if(datess!=undefined){
                //let dateposted_raw=formatDate(datess);
                // let dateposted_raw= getDateFormat(datess," ",1,0,2);
                // datess=datess.split('');
                // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

                if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
                // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
                }
    
    
            job.temp = 1;
            
    //     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*
    
              var selector = `selector de la descripcion`;
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
              const resp2 = await fetch(job.url, {
                    "headers": {
                        "accept": "*/*"
                    }
            });
              const data = await resp2.text();
              const parseDoc = new DOMParser();
              const doc = parseDoc.parseFromString(data, 'text/html')
              
            //     ███████████████████████████████ variables del doc █████████████████████████████████████  /*  
            // //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

            // job.source_location = elem.querySelector('').textContent.trim();
            // let hq=""; // HEAD QUARTERS
            // job.source_location=job.source_location||"";
            // if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
            // job.location=(job.source_location)||hq; } //HEAD QUARTERS:
            // job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
            // // if(job.location.search(//gmi)>-1){job.location="";}
            
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(doc,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of doc.querySelectorAll("p,li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of doc.querySelectorAll("p,li")) {
    if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      source_salary.push(li.textContent);
  }
  if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
} 
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',doc,false);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',doc,false);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',doc,false);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',doc,false);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',doc,false);
            
            //*/// ████████████████████████████████████████████████████████████████████              
              
              
              var full_html = doc.querySelector(selector);
              if (full_html) {
                  // remove something from the jobdatata
                  if (remove_selectors.length > 0){
                      for (let x in remove_selectors){
                          if (full_html.querySelector(remove_selectors[x])) full_html.querySelector(remove_selectors[x]).remove();
                      }
                  }
                  
                  if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                      return x
                  };
                  if (typeof msg == "undefined") msg = console.log;
                  job.html = full_html.innerHTML.trim();
                  //limpieza de las descripciones
                  //job.html = removeTextBefore(job.html, ``, false);
                  //job.html = removeTextAfter(job.html, ``, true);
                  //job.html = removeTextAfter(job.html, ``, true);
                  //job.html = removeTextAfter(job.html, ``, true);
                  
                  
                  job.html=Limpiar(job.html,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-Y","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");
              
              
                  
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = job.html;
                                        //     ███████████████████████████████ variables tmp █████████████████████████████████████  /*  
        // job.source_location = tmp.querySelector('').textContent.trim();
        // job.source_location=job.source_location||"";
        // job.location=(job.source_location)||"HEAD QUARTERS";   //HEAD QUARTERS:

            // //EXPERIENCE REQUIRED          
            // let experience=[];  for (let li of tmp.querySelectorAll("p,li")) {
            //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
            //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
            //       experience.push(li.textContent);
            //   }
            //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
            // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
            
            //MULTIPLES VARIABLES (SENCILLO)
            
            
            // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp,false);
            
            // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp,false);
            // // job.dateposted_raw=formatDate(job.dateposted_raw);
            // // if(datess!='No encontrado')datess=datess.split('');
            // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
            
            // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp,false);
            // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp,false);
            // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp,false);
            
            //*/// ████████████████████████████████████████████████████████████████████
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
                  //// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    //     //BENEFIT DESDE EL JOB.JOBDESC                           
                    // let inicioBenefit=''; let finBenefit='';
                    // if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
                    // // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
              }
    
    //*/// ████████████████████████████████████████████████████████████████████
    
            job.temp = 1;
            jobs.push(job);
        }
        //out.pass_it.counter +=1;
        out.jobs = jobs;
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
        function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
            var resultado
            let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
            if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
            if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
            return resultado;
        }
    function validarFormatoFecha(campo) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!='')) {
              return true;
        } else {
              return false;
        }
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
//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")
function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
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


🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺
// DOBLE fetch BASICO
      //Extract
      (async () => {
        const out = {};
        const jobs = [];
        out.pass_it=pass_it;
            const url = window.location.href
            const resp = await fetch(url, {
            "headers": {}
            });
        const html = await resp.text();
        const div = document.createElement("div");
        div.innerHTML = html;
        const html_jobs = div.querySelectorAll('div#pro-gallery-margin-container')[0].querySelectorAll('div[class="gallery-item-container visible hover-animation-fade-in"]');
        // out.pass_it.jobsPerPage=25;
        // out.pass_it.jobsInPage = html_jobs.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for (let x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            let job = {};
            let elem = html_jobs[x];
            //////EXTRACTING VARIABLES///////
            job.title = elem.querySelector('a[class]').textContent.trim();
            job.url = elem.querySelector('a[class]').href.trim();
    
    
            job.temp = 1;
            
    //     ████████████████████████████████ DESCRIPCION ████████████████████████████████████  /*
    
              var selector = `selector de la descripcion`;
              var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
              const resp2 = await fetch(job.url, {
                    "headers": {
                        "accept": "*/*"
                    }
            });
              const data = await resp2.text();
              const parseDoc = new DOMParser();
              const doc = parseDoc.parseFromString(data, 'text/html')
              var full_html = doc.querySelector(selector);
              if (full_html) {
                  // remove something from the jobdatata
                  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                      if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
                  });
                  if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                      return x
                  };
                  if (typeof msg == "undefined") msg = console.log;
                  job.html = full_html.innerHTML.trim();
                  //limpieza de las descripciones
                  //job.html = removeTextBefore(job.html, ``, false);
                  //job.html = removeTextAfter(job.html, ``, true);
                  //job.html = removeTextAfter(job.html, ``, true);
                  //job.html = removeTextAfter(job.html, ``, true);
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = job.html;
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
              }
    
    //*/// ████████████████████████████████████████████████████████████████████
    
            job.temp = 1;
            jobs.push(job);
        }
        //out.pass_it.counter +=1;
        out.jobs = jobs;
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

 🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

  //FETCH JOBDATA sin decoder  COMPLETO

    
  (async () => {
    let out = {};
    var job = {};
    var selector = ``;
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

    try {
        const url = window.location.href
        const resp = await fetch(url, {
            "headers": {
                "accept": "*/*"
            }
        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html');
        if (!!doc.querySelector(selector)) {
            
            
            //     ███████████████████████████████ variables directas █████████████████████████████████████  /*  
//   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

// job.source_location = elem.querySelector('').textContent.trim();
// let hq=""; // HEAD QUARTERS
// job.source_location=job.source_location||"";
// if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
// job.location=(job.source_location)||hq; } //HEAD QUARTERS:
// job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
// // if(job.location.search(//gmi)>-1){job.location="";}

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(doc,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of doc.querySelectorAll("p,li")) {
if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
  experience.push(li.textContent);
}
if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of doc.querySelectorAll("p,li")) {
if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
  source_salary.push(li.textContent);
}
if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
}   
        
        //MULTIPLES VARIABLES (SENCILLO)
        
        
        // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document,false);
        
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document,false);
        // // job.dateposted_raw=formatDate(job.dateposted_raw);
        // // if(datess!='No encontrado')datess=datess.split('');
        // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
        
        // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',document,false);
        // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document,false);
        // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',document,false);
         // job.logo=multiplesVariables(/logo/gmi,'li',document,false);
        
        //*/// ████████████████████████████████████████████████████████████████████


        var full_html = doc.querySelector(selector);
        //if (full_html) {
            // remove something from the jobdatata
            if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
            });

            job.html = full_html.innerHTML.trim();
            //limpieza de las descripciones
            //job.html = removeTextBefore(job.html, ``, false);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            job.html=Limpiar(job.html,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-Y","emogis-Y","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
                                  //     ███████████████████████████████ variables tmp █████████████████████████████████████  /* 
        // //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

        // job.source_location = elem.querySelector('').textContent.trim();
        // let hq=""; // HEAD QUARTERS
        // job.source_location=job.source_location||"";
        // if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
        // job.location=(job.source_location)||hq; } //HEAD QUARTERS:
        // job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
        // // if(job.location.search(//gmi)>-1){job.location="";}

        // //EXPERIENCE REQUIRED          
        // let experience=[];  for (let li of tmp.querySelectorAll("p,li")) {
        //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
        //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
        //       experience.push(li.textContent);
        //   }
        //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
        // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
        
        //MULTIPLES VARIABLES (SENCILLO)
        
        
        // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp,false);
        
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp,false);
        // // job.dateposted_raw=formatDate(job.dateposted_raw);
        // // if(datess!='No encontrado')datess=datess.split('');
        // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
        
        // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp,false);
        // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp,false);
        // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp,false);
        
        //*/// ████████████████████████████████████████████████████████████████████
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            // job.source_benefit=Limpiar(job.jobdesc,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y");
            

            

        }else
              {
              msg("sin selector");
              }
    } catch (err) {
        console.log(err)
    }
    out["job"] = job;
    printJob(job);
    console.table(job);
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
  function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    return resultado;
}
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
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
//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")
function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
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


🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

 //FETCH JOBDATA -sin decoder BASICO
 (async () => {
    let out = {};
    var job = {};
    var selector = ``;
    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {return x};
    if (typeof msg == "undefined") msg = console.log;
    try {
        const url = window.location.href
        const resp = await fetch(url, {
            "headers": {
                "accept": "*/*"
            }
        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html');
        if (!!doc.querySelector(selector)) {

    //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
    let jobtype=buscOcurrenciaHTML(doc.body,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi,false);
    if(!job.source_jobtype){ if(jobtype)job.source_jobtype=jobtype;}
    // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
    if(!job.experience_required){
    let experience=[];  for (let li of doc.querySelectorAll("p,li")) {
        if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad|years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/i.test(li.textContent)
        && /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
        experience.push(li.textContent);
    }
    if(experience[0]!=undefined){if(experience[0].length<400)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
    }
    //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
    //source salary   
    if(!job.source_salary) {      
    let source_salary=[];  for (let li of doc.querySelectorAll("p,li")) {
        if (/salary|salarial|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung|betalning|lön|salário|pagamento|remuneração|Faixa horária/i.test(li.textContent) && /\$|¢|€| BRL |R$/i.test(li.textContent)
        && /\d/gi.test(li.textContent))
        source_salary.push(li.textContent);
    }
    if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
    if(job.source_salary){if(job.source_salary.length<300)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}}
    }
    //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 


        var full_html = doc.querySelector(selector);
        //if (full_html) {
            // remove something from the jobdatata
            if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
            });
            if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                return x
            };
            if (typeof msg == "undefined") msg = console.log;
            job.html = full_html.innerHTML.trim();
            //limpieza de las descripciones
            //job.html = removeTextBefore(job.html, ``, false);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);

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

            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            // checkAll(job,"http,https,.com,apply,perks,telefone,phone,conctact,e-mail,correo,$,@,¢,€,R$",doc);
            

        }else
              {
                msg("No hay Selector");
              }
    } catch (err) {
        console.log(err)
    }
    out["job"] = job;
    console.table(job)
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

  🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

  // FETCH EXTRAC BASICO COMPLETO
  (async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    
    var jobsSelector = ``

    //   // JJJJJJ// FORMAT DATE JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
// const formatDate = (value) => {
//     let date = new Date(value);
//     const withCero = n => n < 10 ? `0${n}` : n;
//     return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
//   }
//   // JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
    try {
    let jobs = [];
    const url = window.location.href
    const resp = await fetch(url, {
    "headers": {}
    });
    const data = await resp.text();
    var doc = document.createElement('div');
    doc.innerHTML = data;
    var htmlJobs = doc.querySelectorAll(jobsSelector);
    htmlJobs.forEach((elem) => {
    var job = {};
    //elem.querySelector(``).textContent.trim()
    job.title = elem.querySelector('').textContent.trim();
    job.url = elem.querySelector('').href.trim();
    job.reqid = elem.querySelector('').href.trim();
    //   //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SOURCE AND LOCATIONjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

    job.source_location = elem.querySelector('').textContent.trim();
    let hq=""; // HEAD QUARTERS
    job.source_location=job.source_location||"";
    if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")||(job.source_location.length>70)){job.location=hq;}else{
    job.location=(job.source_location)||hq; } //HEAD QUARTERS:
    job.location=job.location.replace(/\d/gi,"").replace(/\(\d+\)/g,"").replace(/ \([^)]*\) /g, "").replace(/\(.*?\)/g, '').replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s]/gi, '').replace(/ \{[^)]*\} /g, "").replace(/ \[[^)]*\] /g, "");
    // if(job.location.search(//gmi)>-1){job.location="";}

    job.dateposted_raw = elem.querySelector('').textContent.trim();
    job.dateclosed_raw = elem.querySelector('').textContent.trim();
    job.source_jobtype = elem.querySelector('').textContent.trim();
    job.source_salary = elem.querySelector('').textContent.trim();
    job.experience_required = elem.querySelector('').textContent.trim();
    job.source_benefit=elem.querySelector('').textContent.trim();
    job.source_empname = elem.querySelector('').textContent.trim();
    job.logo=elem.querySelector('').getAttribute("src").trim();

        var datess=elem.querySelector('').textContent.trim();
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp,false);
        if(datess!=undefined){
            //let dateposted_raw=formatDate(datess);
            // let dateposted_raw= getDateFormat(datess," ",1,0,2);
            // datess=datess.split('');
            // let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

            if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
            // if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
            }
            
    //     ███████████████████████████████ variables funcion █████████████████████████████████████  /*  
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj JOBTYPE jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.source_jobtype) job.source_jobtype=buscOcurrenciaHTML(doc,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of doc.querySelectorAll("p,li")) {
if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
  experience.push(li.textContent);
}
if(experience[0]!=undefined){job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj SALARY jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
//source salary   
if(!job.source_salary) {      
let source_salary=[];  for (let li of doc.querySelectorAll("p,li")) {
if (/salary|Échelle de traitement|Hourly Range|payment|remuneration|salaire|paiement|salaire|salaris|uitbetaling|bezoldiging|Gehaltszahlung|Gehaltsvergütung/i.test(li.textContent) && /\$|¢|€/i.test(li.textContent)
  && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
  source_salary.push(li.textContent);
}
if(source_salary[0]!=undefined){job.source_salary=source_salary[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
if(job.source_salary)job.source_salary=job.source_salary.replace("Hourly Range:","").trim();}
} 
        
        //MULTIPLES VARIABLES (SENCILLO)
        
        
        // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp,false);
        
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp,false);
        // if(datess!=undefined){
        //     //let dateposted_raw=formatDate(datess);
        //     let dateposted_raw= getDateFormat(datess," ",1,0,2);
        //     datess=datess.split('');
        //     let dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

        //     if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
        //     }
        
        // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp,false);
        // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp,false);
        // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp,false);
        // job.logo=multiplesVariables(/logo/gmi,'li',tmp,false);
        //*/// ████████████████████████████████████████████████████████████████████



    jobs.push(job);
    })
    out["jobs"] = jobs;
    return out;
    } catch (err) {
    console.log(err)
    }
    })();
    function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
        var resultado
        let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
        if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
        if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
        return resultado;
    }
    
    function validarFormatoFecha(campo) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!='')) {
              return true;
        } else {
              return false;
        }
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
//  =Limpiar(elementoaLimpiar,"formatDate-","isDate-","addCero-","splitFecha-","borrar este texto","numeros-","letras-","agrupaciones-","caracteresEspeciales-","correoUrl-","emogis-","anular si existe esta expresion regular","splitInicio_pop","splitFin_shift","splitUndefined-Y")
function Limpiar(elementoaLimpiar,formatDate,isDate,addCero,splitFecha,texto,numeros,letras,agrupaciones,caracteresEspeciales,correoUrl,emogis,anular,splitInicio_pop,splitFin_shift,splitUndefined){ // jjms
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

🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺

 // FETCH EXTRAC BASICO

 (async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    var jobsSelector = ``
    try {
    let jobs = [];
    const url = window.location.href
    const resp = await fetch(url, {
    "headers": {}
    });
    const data = await resp.text();
    var doc = document.createElement('div');
    doc.innerHTML = data;
    var htmlJobs = doc.querySelectorAll(jobsSelector);
    htmlJobs.forEach((elem) => {
    var job = {};
    //elem.querySelector(``).textContent.trim()
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

    job.temp=4545;

    jobs.push(job);
    })
    out["jobs"] = jobs;
    return out;
    } catch (err) {
    console.log(err)
    }
    })();

    🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺







































🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺 PARA REVISAR DESPUES 🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺🦺
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


/////////////////////////////////////////////////////////////////////////////////////

  function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}


/////////////////////////////////////////////////////////////////////////////////////

if (out.pass_it.attempts >= 3) {
    const out = {
        title: 'No jobs!'
    };
    jobs.push();
}

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
LOCATION CURIOSA

if(job.location.match(/ and /gi)) {
    for(const loc of job.location.split(/ and /gi).filter(e => e?.trim()?.length)) jobs.push({ ...job, location: loc.trim() });
    
} else jobs.push(job); 


🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
//forma de agarrar multiples selectores en un array

var selector1 = "#description";
var selector2 = "#Requirements";
var selector3 = "#Benefits";
var full_html = Array.from(document.querySelectorAll(`${selector1},${selector2},${selector3}`));

job.html      = full_html.filter(item => item).map(item => item.innerHTML).join("\n").trim();

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

var {
    html,
    jobdesc,
    jobtype,
    dateclose,
    exp
} = getDesc(job.reqid);


function getDesc(id) {

    var html, jobdesc, jobtype, dateclose, exp;

    $.ajax({
        url: 'https://epiw.fa.la1.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitionDetails?expand=all&onlyData=true&finder=ById;Id=%22' + id + '%22,siteNumber=CX_1',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function(result) {

            html = result.items[0].ExternalDescriptionStr;
            if (result.items[0].ContractType) jobtype = result.items[0].ContractType;
            if (result.items[0].ExternalPostedEndDate) {
                dateclose = result.items[0].ExternalPostedEndDate.split("T").shift().split("-");
                dateclose = dateclose[1] + "/" + dateclose[2] + "/" + dateclose[0];
            }

            var regex = /\d{1,}\+? year[s]?|\d{1,}\+? ?-? ?\d{1,}\+? year[s]?|\d{1,}\+? año[s]?|\d{1,}\+? ?-? ?\d{1,}\+? año[s]?/gi;
            if (html.search(/experience/gi) > -1 && html.search(regex) > -1) {
                exp = html.match(regex)[0];
            }

            html = removeTextBefore(html, 'Descrição do Cargo', false);
            //html = removeTextBefore(html, '', false);
            //html = removeTextBefore(html, '', false);
            //html = removeTextBefore(html, '', false);
            //html = removeTextBefore(html, '', false);

            html = removeTextAfter(html, 'Sobre Nós', true);
            html = removeTextAfter(html, 'Base – Local de Trabalho', true);
            //html = removeTextAfter(html, '', true);
            //html = removeTextAfter(html, '', true);
            //html = removeTextAfter(html, '', true);

            //html = cleanFromPointAtoB(html, "", "");
            //html = cleanFromPointAtoB(html, "", "");

            html = cleanHTML(html);
            var tmp = document.createElement('div');
            tmp.innerHTML = html;
            jobdesc = tmp.textContent.trim();
            jobdesc = cleanHTML(jobdesc);
            jobdesc = jobdesc.replace(/<[^>]*>?/g, "");


        },
        error: function(error) {
            msg(error);
        }
    });

    return {
        html,
        jobdesc,
        jobtype,
        dateclose,
        exp
    };

}



    ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️ <<limpiar etiquetas printJob,li etc; en full_html de palabras claves, con un for 

for(const a of full_html.querySelectorAll('p')){  // Varios p
    const text = a.textContent.trim();
      if(text.search(/please|apply|call|click|cargo:|cv|telephone|e-mail|email|www.|@|https/i) > -1) a.remove();
  }

  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️  html_jobs con includes
  var html_jobs = [...document.querySelectorAll("div > a")].filter(x => x.textContent.includes("apply"))

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️  <<cuando viene un td tr

doc.querySelectorAll('td').forEach(tag => {
    if (tag.textContent.match(/Locations/i) && tag.nextElementSibling){
        job.source_location = tag.nextElementSibling.textContent.trim();
        job.location = job.source_location.trim();
    }
    if (tag.textContent.match(/Posted/i) && tag.nextElementSibling)
        job.dateposted_raw = new Date(tag.nextElementSibling.textContent.trim()).toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    if (tag.textContent.match(/Type/i) && tag.nextElementSibling)
        job.source_jobtype = tag.nextElementSibling.textContent.trim();
    if (tag.textContent.match(/Position/i) && tag.nextElementSibling)
        job.reqid = tag.nextElementSibling.textContent.trim();    
});



//OTRA FORMA:
 

//UNITARIO
arraynodos = Array.from(document.querySelectorAll("td")).find(aux => aux.innerText.search(/ref/gi) > -1);
if (arraynodos) {
    job.reqid = arraynodos.nextElementSibling.textContent.trim();
}


// CON MULTIPLES VARIABLES
const arraynodos = Array.from(document.querySelectorAll("td"));

let varx=arraynodos.find(aux => aux.innerText.search(/Salary/gi) > -1)?.nextElementSibling?.textContent.trim();
varx=arraynodos.find(aux => aux.innerText.search(/referencia/gi) > -1)?.nextElementSibling?.textContent.trim();
varx=arraynodos.find(aux => aux.innerText.search(/Posted on/gi) > -1)?.nextElementSibling?.textContent.trim();
varx=arraynodos.find(aux => aux.innerText.search(/jobtype/gi) > -1)?.nextElementSibling?.textContent.trim();

if(varx)job.source_salary= varx
if(varx)job.reqid= varx
if(varx)job.dateposted_raw= varx
if(varx)job.source_jobtype= varx
❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️ funcion nueva de juan.bermudez para el script json

let all = doc.querySelectorAll(`script[type="application/ld+json"]`);
for (let x of all) {
    if (x.textContent.match(/"@type":"JobPosting"|"@type": "JobPosting"|"@type":"JobPosting"/ig)) { //cambiar el como se ve el json
        var dataJson = JSON.parse(x.textContent.trim())
        var full_html = document.createElement(`div`);
        full_html.innerHTML = dataJson.description; //cambiar la etiqueta en la que viene eljson
        if (dataJson.hiringOrganization) { //cambiar los demás datos a extraer. 
            job.source_empname = dataJson.hiringOrganization.name;
        }
        if (dataJson.validThrough) {
            var dateAux = new Date(dataJson.validThrough);
            job.dateclosed_raw = dateAux.toLocaleDateString("en-US");
        }
        if (dataJson.baseSalary && dataJson.baseSalary.value.minValue && dataJson.baseSalary.value.minValue != 0) {
            job.source_salary = dataJson.baseSalary.value.minValue
        }
        if (dataJson.datePosted) {
            let dateAux2 = new Date(dataJson.datePosted);
            job.dateposted_raw = dateAux2.toLocaleDateString("en-US");
        }
        if (dataJson.employmentType && dataJson.employmentType.length >1) {
            job.source_jobtype = dataJson.employmentType
        }
        if (dataJson.identifier) {
            job.reqid = dataJson.identifier.value
        }
    }
}


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

for (const a of full_html.querySelectorAll('p, span, li')) {
    if (a.textContent.search(/@|http|www./ig) > -1) {
        a.remove();
    }
}


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


job.source_benefit = getBenefits(job.jobdesc,/Offers:/g,/##/g);

function getBenefits(html, recorteArriba, recorteAbajo) {
    //benefit
    var newHtml = html;
    if (newHtml.search(recorteArriba) > -1) {
        newHtml = removeTextBefore(newHtml, recorteArriba, true);
        newHtml = removeTextAfter(newHtml, recorteAbajo, true);
        newHtml = newHtml.trim();
    } else {
        newHtml = undefined
    }

    return newHtml
}


❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
let patron="bla bla bla";
let texto; // variable donde va a venir el texto a limpiar
texto.replace(new RegExp(patron,"gmi"),"");

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️ <<limpiar los selectores p con palabras especiales.
for(const a of full_html.querySelectorAll('p')){  // Varios p
    const text = a.textContent.trim();
    if(text.search(/ klick| solliciteren| solliciteer| cv| tel.| vragen| formulier| contact|mailen|www.|@|https/i) > -1) a.remove();
  }

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
<<para aprender a usar

CONSOLE
//COMODINES #s
console.log(`hola soy %s y tengo #s años`,nombre,edad);
//muestra el mensaje cuando la pruba falla
console.assert(x>y , {x,y, "mensaje del error"});
//cuenta y muestra cada vez que se ejecuta alguan parte de codigo
console.count("mensaje");
//muestra tabla
console.table(Object.entries("poneraquiobjetoSinComillas"));
//
throw new Error("mensaje personalizado del error");
//se mueve hacia el elemento hijo con el indice
.children[i];

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️