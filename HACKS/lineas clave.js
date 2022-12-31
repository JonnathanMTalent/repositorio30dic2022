LAS_MAS_RARAS:


let varq=job.location;
let limp = varq.substring(limp.lastIndexOf(","));
job.location=limp;

////////////////////////////////////////////////////////////////////////////////

let loc = "";
let array_loc = Array();

if(city !== null) array_loc.push(city);
if(country !== null) array_loc.push(country);
          
if(array_loc.length) loc = array_loc.join(", ");

 job.location = loc;
////////////////////////////////////////////////////////////////////////////////

if(job.title.includes("General Applications")) continue;

// //////////////////////////////////////////////////////////

} catch (error) {
  msg(`\x1B[32m Error: ${error.message}`);
  msg(`\x1B[31m Line: ${error.stack}`);
}

out.jobs = jobs;
return out;
})();
// //////////////////////////////////////////////////////////

// FORMA DE HACER EL FORMATO DE FECHA DESDE EL OBJETO DATE
new Date(job.dateclosed_raw).toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

FILTRAR ERRORES

job.temp = "07/06/2022";
if (job.url.search(/83852/g) > -1)
    job.google_error = 1;

if (job.title.search(/Banco de Talentos|Talent Pool/ig) == -1) {
    jobs.push(job);
}
// VALIDAR ALGO EN TODO EL DOCUMENT
for (const a of document.querySelectorAll('p, span, li, div[class="spanpanel2"]')) {

  if (a.textContent.search(/@|http|www./ig) > -1) {
      a.remove();
  }
  if (a.textContent.search(/Québec/i) > -1) {
      job.location = 'Québec, Québec, CA';
      job.source_location = a.textContent.trim();
  }else{
  if (a.textContent.search(/charlesbourg/i) > -1) {
      job.location = 'charlesbourg, Québec, CA';
      job.source_location = a.textContent.trim();
  }else{
      job.location = 'Québec, CA';
      job.source_location = '';
      }
  }
}

// ████████████████████████████████████████████████████████████████████
SALARY

for (const a of document.querySelectorAll('p')) {
  if (a.textContent.includes('Salary:')){ //can use search or match methods
    var salary = a.textContent.replace('Salary:','').trim();
    if(salary.search(/\£|\¥|\€|\$|\¢/g) > -1){
      job.source_salary = salary;//replace('Apply Before','').split(',').shift().trim(); //another querySelector if needed
      //a.remove(); //if you want to remove this selector
    }
  }
}

//     ██████████████████████████████ Definir clean html██████████████████████████████████████  /*  
      if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;
//*/// ████████████████████████████████████████████████████████████████████
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
url del json de greenhouse
Lo armas con esta url: https://api.greenhouse.io/v1/boards/companyName/jobs?content=true

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
msg(JSON.stringify(out)); 
Con esta forma si podemos imprimir el out.pass_it, ya 
que de la forma normal sin el json.strinfy nos muestra 
un undefined
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
let date_c = elem.querySelector('li[class^="application-deadline"]') ;
if( date_c ){
  date_c = date_c.textContent.split(':').pop().trim() ;
  date_c = new Date( date_c ) ;
  job.dateclosed_raw = date_c.toLocaleDateString('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }) ; 

}

  LIMPIAR EMOGIS
  job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  funcion de correcciones/*
function getCapitalOrFalse(country) {
  var capitals = {
    Afghanistan: "Kabul", Albania: "Tirana", Algeria: "Algiers", Zambia: "Lusaka", Zimbabwe: "Harare"
  };
   if (capitals[country]) { return capitals[country] } else { return false };
};
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
OTRA FORMA DE HACER EL EXPERIENCE REQUIRED con el guion -

const auxExperience = [...full_html.querySelectorAll('p')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
if (auxExperience) {
    job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
}
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
OTRA FORMA DE HACER EL EXPERIENCE REQUIRED
for (const a of document.querySelectorAll('li')) {
  if (a.textContent.search(/experience|years Required|años de experiencia/i)>-1 && a.textContent.search(/[0-9]/g)>-1){
    job.experience_required = a.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
  } 
}

LINEAS PARA ARMAR DESCRIPCION EN JSON

for (var i = 0; i < result.fields.length; i++) {
  // Ignorar las dos primeras posiciones porque son como basura...
  if (result.fields[i].label == 'Employment Status') {
      job.source_jobtype = result.fields[i].content;
  }
  if (result.fields[i].label == 'Position Description') {
      full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
      full_html += "<br/>";
  }
}
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
sacar propiedades de una lista iterandola
    //let job=[] //poner esto si se va a probar en consola
document.querySelectorAll("div").forEach(p =>{ 
  let text = p.textContent.trim();
  if(text.includes("Employment Type:")){
    job.source_jobtype = text.trim().replace("Employment Type:","").trim();
  }   
})
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

que un solo Query selector me tome dos selectores 
elem.querySelector('a,div').remove();
que elimine esos dos sin tener que hacer el for 

var ben = [...elem.querySelectorAll('a,div')].find(e => e.remove());

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
    //let job=[] //poner esto si se va a probar en consola
    let aux = Array.from(document.querySelectorAll('li')).filter(x => x.textContent.search(/years/gmi) > -1);
    aux[0]!=null ? job.experience_required=aux[0].textContent.trim() : job.experience_required='';
    //aux[0]!=null ? job.experience_required=aux[0].textContent.trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('') : job.experience_required='';
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

Buscar palabras
let ben = Array.from(document.querySelectorAll('h2')).filter(x => x.textContent.search(/Wij bieden jou|Wat bieden wij/gmi) > -1)

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
BUSCA DENTRO DE LA DESCRIPCION UN TEXTO CON FORMA  NUMERO + PALABRA=YEAR
//var job=[]; // AGREGAR ESTA LINEA PARA PROBAR EN CONSOLA
for (const a of elem.querySelectorAll('li')) {
  if (a.textContent.includes('experience')){ //can use search or match methods
    job.experience_required = a.textContent.trim().match(/\d-\d\s|\d\s|(\d)|year/ig)?.join('')
  } 
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

eliminar tag HTML
//job.jobdesc = job.jobdesc.replace(/<[^>]*>?/g, '');
//job.html = job.html.replace(/<[^>]*>?/g, '');

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

    //let job=[] //poner esto si se va a probar en consola
if( job.location.search(/Singapore|Remote/gmi) > -1 ) job.location = 'Singapore, Singapore' ;

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

VALIDAR VARIABLES QUE NO SEAN NULAS O EL SELECTOR NO SEA VACIO
if( document.querySelector('')==null){
  =''; 
}else{
  =document.querySelector('');
}

//con operador ternario:
document.querySelector('')==null ? aux=document.querySelector('').textContent.trim() : aux='No encontrado';

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

var datess=document.querySelector('').textContent().split('');
var dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

ver vonito el console en consola 
console.table(jobs) //poner despues del push de los jobs
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

NEXT ELEMENT SIBLING
let text = element.nextElementSibling.innerHTML;
let text = document.getElementById("item1").nextElementSibling.innerHTML; 
document.getElementById("demo").innerHTML = text;

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

BUSQUEDA
if(job.title.search(/Open sollicitatie/i)>-1){job.title = '';}

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

var urlaqui=window.location.href;  // Entrega la info de la url del sitio actual
window.location.href="https://www.w3schools.com/";  //cambia la url del sitio actual y se pasa a la pagina indicada

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
PARENT ELEMENT
//Con esta linea podemos devolvernos hacia la clase contenedor o elemento contenedor si el disabled esta marcado alli.
var html_jobs = document.querySelectorAll("").parentElement.classList.contains(“disabled”);
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

JOB FANTASMA
if(jobs.length==0){
    var job={title:window.location.href};
}

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

GET ATTRIBUTE
var url = document.querySelector('tr[class*="clickable-row"]').getAttribute('data-href');

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

SLICE, TOMAR UN STRING CON INICIO Y FIN
string.slice(start, end) //toma el string conteniendo el start sin contener end
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

window.scrollBy(0, document.body.scrollHeight);   //LINEA PARA BAJAR EL SCROLL A LA ALTURA DEL SCROLL


/* enla siguiente linea se hace un ejemplo demasiado interesante de agregarle al location mas elementos que 
estan en un atributo title, para no tener que darle click al boton mas para que me salgan mas, se concatene
 el texto extraido desde el selector a la descripcion de la variable location  */
job.location=job.location+", "+elem.querySelector("selectordondehaymasinfo").getAttribute("title").split(",")[1];


y cuando necesiten traer las location que tengan codigo postal con mas comas ejemplo= Dallas, TX, USA, 256546, <==>
job.source_location = elem.querySelector().textContent.trim();
job.location = job.source_location.trim().split(" ").splice(1,3).join(", ");


chicos les coparto el código cuando necesite tomar el id de esta url y sin complicaciones => 
https://www.joinwellspan.org/jobs/A_Matter_of_Balance_Coach/York_Pennsylvania/100/283327/ <==> 
job.reqid = job.url.split("/")[job.url.split("/").length-2].trim();

***************************************************************************************************
CONTAINS Y CLASSLIST
//Con esta linea podemos verificar el estado del selector de next si esta activo o no:
var html_jobs = document.querySelectorAll("").classList.contains(“disabled”);

if(clickable_elem..classList.contains(“disabled”)){};//

//Con esta linea podemos devolvernos hacia la clase contenedor o elemento contenedor si el disabled esta marcado alli.
var html_jobs = document.querySelectorAll("").parentElement.classList.contains(“disabled”);

//Condicion de parada que solo genera esto ['19','35']
let condition = document.querySelector('span[class="paginationLabel"]').textContent.trim().split('–').pop().replaceAll(' ', '').split('of');

***************************************************************************************************
FECHAS

/* CON LA SIGUIENTE PUEDO REEMPLAZAR POR EJEMPLO FECHAS
12) REPLACE ALL: */
job.dateposted_raw=document.querySelector('selector').innerText.trim().replace(',',' ').replaceAll(' ','/')


.replace('Jan','1').replace('Feb','2').replace('Mar','3').replace('Apr','4').replace('May','5').replace('Jun','6').replace('Jul','7').replace('Aug','8').replace('Sep','9').replace('Oct','10').replace('Nov','11').replace('Dec','12');


//PARA EL DATEPOSTED RAW:
job.dateposted_raw=document.querySelector('').innerText.trim().replace(',','')replace('Jan','1').replace('Feb','2').replace('Mar','3').replace('Apr','4').replace('May','5').replace('Jun','6').replace('Jul','7').replace('Aug','8').replace('Sep','9').replace('Oct','10').replace('Nov','11').replace('Dec','12').split(’ ’);

Job.dateposted_raw=job.dateposted_raw[1]+”/”+ job.dateposted_raw[0]+”/”+ job.dateposted_raw[2];



***************************************************************************************************
***************************************************************************************************

LIMPIAR JOBDESCRIPTION 

if (job.html.indexOf('@') > -1) { //Existen algunos jobdata que no estan estructurados por párrafos o selectores.
  var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
  job.html = job.html.replace(eliminar, '');
}

if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
if (job.html.indexOf('http') > -1) { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
if (job.html.indexOf('HTTP') > -1) { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
if (job.html.indexOf('www') > -1) { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }

LIMPIAR JOBDESCRIPTION 

  full_html.find('a').remove().end().html();
  full_html.find('input').remove().end().html();
  full_html.find('div.alert').remove().end().html();
  full_html.find('img').remove().end().html();
  full_html.find('script').remove().end().html();


var full_html = full_html.html();
  ***************************************************************************************************
  ***************************************************************************************************
  ***************************************************************************************************
PARTE ENTERA ALTA
  Math.ceil(1.4)

  .replace(/boorra lo que haya aqui todo/g, ' ');

  BORRAR SALTOS DE LINEA
  job.location = job.location.replace(/\s+/gi, ' ');

***************************************************************************************************

Fectch:

const resp = await fetch(job.url),
  html = await resp.text(),
  div = document.createElement('div');
div.innerHTML = html;
const full_html = div.querySelector('');

***************************************************************************************************


//SACAR MULTIPLES VARIABLES

// VARIABLE X
let job={} //poner esto si se va a probar en consola

let var1; let aux1 = Array.from(document.querySelectorAll('li')).filter(x => x.textContent.search(/BENEFIT|benefit|Benefit/gmi) > -1);
//aux1[0]!=null ? var1=aux1[0].textContent.trim() : var1='';
aux1[0]!=null ? var1=aux1[0].nextElementSibling.textContent.trim() : var1='';
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//BENEFIT
let job={} //poner esto si se va a probar en consola

let auxbenefit = Array.from(document.querySelectorAll('li')).filter(x => x.textContent.search(/BENEFIT|benefit|Benefit/gmi) > -1);
//auxbenefit[0]!=null ? job.source_benefit=auxbenefit[0].textContent.trim() : job.source_benefit='';
auxbenefit[0]!=null ? job.source_benefit=auxbenefit[0].nextElementSibling.textContent.trim() : job.source_benefit='';

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//JOBTYPE
let job={} //poner esto si se va a probar en consola

let auxjobtype = Array.from(document.querySelectorAll('li')).filter(x => x.textContent.search(/JOBTYPE|jobtype|job type|Job Type/gmi) > -1);
//auxjobtype[0]!=null ? job.source_jobtype=auxjobtype[0].textContent.trim() : job.source_jobtype='';
auxjobtype[0]!=null ? job.source_jobtype=auxjobtype[0].nextElementSibling.textContent.trim() : job.source_jobtype='';

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//EXPERIENCE REQUIRED BASICO
let job={} //poner esto si se va a probar en consola

let auxexperience = Array.from(document.querySelectorAll('li')).filter(x => x.textContent.search(/years/gmi) > -1);
auxexperience[0]!=null ? job.experience_required=auxexperience[0].textContent.trim() : job.experience_required='';
//aux[0]!=null ? job.experience_required=aux[0].textContent.trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('') : job.experience_required='';
    
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

// EXPERIENCE CON GUION
let job={} //poner esto si se va a probar en consola

const auxExperience = [...document.querySelectorAll('p')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
if (auxExperience) {
    job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
}

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

// SALARY
let job={} //poner esto si se va a probar en consola

    let auxsalary = Array.from(document.querySelectorAll('tbody tr td')).filter(x => x.textContent.search(/\$|salary|SALARY|Salary/gmi) > -1);
    auxsalary[0]!=null ? job.source_salary=auxsalary[0].textContent.trim() : job.source_salary='';
    
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

// DATEPOSTED_RAW (Format Date)
let job={} //poner esto si se va a probar en consola

const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }

    let auxdate = Array.from(document.querySelectorAll('div.spanpanel1')).filter(x => x.textContent.search(/Dateposted|DATEPOSTED|dateposted|date posted|Date Posted/gmi) > -1);
    auxdate[0]!=null ? job.dateposted_raw=formatDate(auxdate[0].nextElementSibling.textContent.trim()) : job.dateposted_raw='';

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// DATEPOSTED_RAW (SPLITEADA)
let job={} //poner esto si se va a probar en consola

let datess; let auxdate = Array.from(document.querySelectorAll('div.spanpanel1')).filter(x => x.textContent.search(/Dateposted|DATEPOSTED|dateposted|date posted|Date Posted/gmi) > -1);
auxdate[0]!=null ? datess=auxdate[0].nextElementSibling.textContent.trim() : datess='No';
if(datess!='No')datess=datess.split('');
job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️