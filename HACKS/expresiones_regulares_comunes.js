.replace(/ \([^)]*\) /g, "")
.replace(/<\/?[^>]+(>|$)/g, "")
//para remover parentesis con números dentro
.replace(/\(\d+\)/g,"")
//para remover corchetes y el texto dentro ->
.replace(/ \[[^)]*\] /g, "")
//para remover llaves  y el texto dentro ->
.replace(/ \{[^)]*\} /g, "")
//reemplaza todo lo indicado
.replace(/<tr>/g,"<br>")
.replace(/<\/tr>/g,"<br>")
.replace(/<\/div>/g,"<br>")
//reemplaza números
.replace(/\d/g,"")
.replace(/[0-9]+/, "")
//reemplaza letras
.replace(/\D/g,"");
//reemplaza letras mayúsculas
.replace(/ *[A-Z]*/g, "")
//Remueve caracteres especiales
.replace(/[^\w\s]/gi, '')
//Eliminar email
.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,"")




//para remover paréntesis y el texto dentro ->
.replace(/ \([^)]*\) /g, "")
.replace(/\(.*?\)/g, '')
.replace(/<\/?[^>]+(>|$)/g, "")
/\([A-Z][A-Z]\)/gi
//para remover parentesis con números dentro
.replace(/\(\d+\)/g,"")
//para remover corchetes y el texto dentro ->
.replace(/ \[[^)]*\] /g, "")
//para remover llaves y el texto dentro ->
.replace(/ \{[^)]*\} /g, "")
//reemplaza todo lo indicado
.replace(/<tr>/g,"<br>")
.replace(/<\/tr>/g,"<br>")
.replace(/<\/div>/g,"<br>")
//reemplaza números
.replace(/\d/g,"")
.replace(/[0-9]+/, "")
//reemplaza letras
.replace(/\D/g,"");
//reemplaza letras mayúsculas
.replace(/ [A-Z]/g, "")
//Remueve caracteres especiales
.replace(/[^\w\s]/gi, '')
//Eliminar email
.replace(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]+)/gi,"")


let fechas=buscOcurrenciaHTML(document,"body","",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi); //   11/01/2022   1/5/2022
let fechas=buscOcurrenciaHTML(document,"body","",/\D{1,3}\s\d{1,2}\D\s\d{1,4}/gmi); //   Nov 08, 2022

/\D{1,3}\s\d{1,2}\D\s\d{1,4}/gmi
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

ELIMINAR LO QUE HAY EN PARENTESIS CON EL PARENTESIS
var reg = new RegExp(/([(])([\w\s]+)([)])/,'img');
job.title = job.title.replace(reg,"");

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
SOLO NUMEROS
txt = "jhjh008767n870";
txt = txt.replace(/\D/g,'');
^   //esto significa que no tome esos caracteres

* // esto que tome todos esos caracteres

La g // despues del paréntesis significa que es global, osea que aplica a todo el string

[0-9] //uando son numero del 0-9

a-Z //para todo el abecedario con minúsculas y mayúsculas

//Para limpiar numeros y contenido en parentesis
.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();

//limpiar numeros
.replace(/1|2|3|4|5|6|7|8|9|0/gi, "");


// buscar palabras en mayuscula (EJEMPLO)
.search(/\b[A-Z]{1,}\b/)>-1)
\b[A-Z]{1,}\b



***************************************************************************************************
lineas para limpiar variables

if (job.html.indexOf('@') > -1) {  
    job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  
  } 
  if (job.html.indexOf('https') > -1) {  
    job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); 
  }  
  if (job.html.indexOf('http') > -1) {   
    job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     
  } 

  ***************************************************************************************************

  BORRAR SALTOS DE LINEA
  job.location = job.location.replace(/\s+/gi, ' ');

  
***************************************************************************************************

    // if (contains('p', 'Location', contentDesc) !== '') {

    //   job.source_location = contains('p', 'Location', contentDesc).split(':').pop().trim();
    //   job.location = job.source_location;

    // } 


JOBDESCRIPION CON MUCHAS EXPRESIONES REGULARES Y FUNCIONES BUENAS

     if (contains('p', 'Location', contentDesc) !== '') {

       job.source_location = contains('p', 'Location', contentDesc).split(':').pop().trim();
       job.location = job.source_location;

     } 


 function contains(selector, texto, elements) {
   let resultado = '';
   elements?.querySelectorAll(selector).forEach(function (elemento) { if (RegExp(texto).test(elemento.innerText)) { resultado = elemento.textContent } })
   return resultado;
 }

(() => {
  let out = {};
  let job = {};
  let full_html = document.querySelector('div[id="win0div$ICField188"]');
  const experience = [];
  const regexSalary = /\$\d+(\.|,|-)?\d*\s?\W*\d*\s*k?\s?(to|-)?\s?\W*\d*\W*\d*\W*\d*\s?k?\s?-?\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)?|\$\d+\s?-?\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)?/i;
  const regexEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.[a-zA-Z0-9._-]+)?)/;
  const regexURL = /(http|https|ftp|ftps)?\:?\/?\/?(www)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
      if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;
  if (full_html) {

    if (regexEmail.test(full_html.textContent))
      job.source_apply_email = regexEmail.exec(full_html.textContent)[0];

    if (regexSalary.test(full_html.textContent))
      job.source_salary = regexSalary.exec(full_html.textContent)[0];

    for (let el of full_html.querySelectorAll("a,input,div.alert,script,iframe,button,form,img,link,figure,style")) el.remove();

    for (let li of full_html.querySelectorAll("li")) {
      if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
        && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
        experience.push(li.textContent);
    }

    if (document.querySelector('#HRS_SCH_WRK_HRS_FULL_PART_TIME').textContent !== '')
      job.source_jobtype = document.querySelector('#HRS_SCH_WRK_HRS_FULL_PART_TIME').textContent;

    job.html = full_html.innerHTML.replace(regexEmail, '').replace(regexURL, '').trim();
    job.html = removeTextBefore(job.html, 'POSITION SUMMARY', false);
    job.html = removeTextAfter(job.html, 'How to Apply', true);
    job.html = cleanHTML(job.html);
    let description = document.createElement("div");
    description.innerHTML = job.html;
    job.jobdesc = description.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    if (experience.length > 0)
      job.experience_required = experience.join(" - ").trim();
    else
      job.experience_required = tagExperienceRequired(description);

  }

  out.job = job;
  return out;
})();

function removeTextBefore(html, text, flag) {
  let newHtml = html;
  if (newHtml.includes(text)) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  let newHtml = html;
  if (newHtml.includes(text)) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }
  }
  return newHtml;
}

function tagExperienceRequired(description) {
  let primerFiltro = [];
  description.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && word.textContent.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine|ten/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE") {
      if (word.innerText.match(/experience|expérience|ervaring|erfahrung|esperienza/gi))
        primerFiltro.push(word.innerText.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g));
    }
    primerFiltro = primerFiltro.flat();
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i);
  var segundoFiltro = [];
  deleteDuplicados.forEach(elem => {
    if (elem.match(/experience|expérience|ervaring|erfahrung|esperienza|experiencia/gi) && elem.match(/\d+|one|two|three|four|five|six|seven|eight|nine|ten/g) && elem.match(/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/gi))
      segundoFiltro.push(elem.trim());
  });
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i);
  return arrayFinal[0];
}

CONTRUIR LA EXPRESION REGULAR 
// REEMPLAZAR \ POR \\
var exp1='years';
var reg1=new RegExp("/\\(?\\d{1,2}\\)?\\s?\\+?\\s?(\\s?(-|to|–)\\s?\\d{1,2}\\+?)?\\s"+exp1+"?/gi");