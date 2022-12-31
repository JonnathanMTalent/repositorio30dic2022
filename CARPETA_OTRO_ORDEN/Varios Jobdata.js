//Varios tips


//Para eliminar tags

job.html = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags


//Eliminar palabras atravesadas

if(job.html.indexOf("word_start")>-1 && job.html.indexOf("word_end")>-1){

let a = job.html.indexOf("word_start");
let b = job.html.indexOf("word_end");
let x = job.html.slice(a,b);

job.html = job.html.replace(x ,"").trim();
}


//Eliminar correos y paginas en el jobdata 

//var job = pass_it["job"];






if(job.html.indexOf('@')>-1){
  var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
  job.html = job.html.replace(eliminar,'');
}

if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');


//Extraer tipo de trabajo


if (document.querySelector('span[class*="work-type"]')){
job.source_jobtype = document.querySelector('span[class*="work-type"]').textContent.trim();
}


for(const a of document.querySelectorAll('div')) {
  if (a.textContent.includes('Employment Type')) {
    job.source_jobtype = a.textContent.trim().replace("Employment Type",'');
  }
}



for(const a of document.querySelectorAll('li')) {
  if (a.textContent.includes('maximaal €')) {
    job.source_salary = a.textContent.trim().split("maximaal").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('maximum van €')) {
    job.source_salary = a.textContent.trim().split("maximum van").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('minimaal €')) {
    job.source_salary = a.textContent.trim().split("minimaal").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('uurloon van €')) {
    job.source_salary = a.textContent.trim().split("uurloon van").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('salaris van €')) {
    job.source_salary = a.textContent.trim().split("salaris van").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('stagevergoeding van €')) {
    job.source_salary = a.textContent.trim().split("stagevergoeding van").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('tussen de €')) {
    job.source_salary = a.textContent.trim().split("tussen de").pop().split(")").shift().split("(").shift();
  }
  if (a.textContent.includes('tussen €')) {
    job.source_salary = a.textContent.trim().split("tussen").pop().split(")").shift().split("(").shift();
  }
}



//Extraer salario

var salario = document.querySelector("#T303F270_VACANCY_SYNOPSIS > p:nth-child(3)").textContent.trim();

if(salario.indexOf('Salary')>-1){
  job.source_salary = salario;
  job.source_salary = job.source_salary.split("Salary").pop().trim();
  job.source_salary = job.source_salary.split("plus").shift().trim(); 
}



for(const a of full_html.querySelectorAll('[class="viewLabel"]')){
const text = a.textContent.trim();
if(text.search(/Job type:/i) > -1)job.source_jobtype = a.nextElementSibling.textContent.trim();
if(text.search(/Salary:/i) > -1){
  var source_salary = a.nextElementSibling.textContent.trim();
  if(source_salary.match(/\d/)) job.source_salary = source_salary;
}
}


//Extraer el logo

if (document.querySelector("div.img > img")){
  job.logo = document.querySelector("div.img > img").src.trim();
}


//Extraer experiencia

job.experience_required = document.querySelector("").textContent.trim();

document.querySelector('div[class="emploi"]').textContent.split('\n').filter(elem=>elem.indexOf("Années d'expérience")>-1)


let links = document.querySelectorAll('a,script,input,button,img')
links.forEach(elemento => elemento.remove()); 




//Para asignar correo y luego eliminarlo

for (const a of full_html.querySelectorAll("p")) {
  if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){//search, match, includes, indexOf can be used
    if(a.textContent.search(/CV|resume|cover letter|curriculum/gi)>-1)
      job.source_apply_email = a.textContent.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-z]{2,12}(?:\.[a-z]{2})?/gi)[0];
    console.log(job.source_apply_email);
    a.remove(); //removes the selector that contains the email
  } 
}



//Para eliminar un selector

if (typeof msg == "undefined") msg = console.log;
for (const a of full_html.querySelectorAll("p")) {
  if (a.textContent.includes("Please reference")) { //tambien se puede usar search o match
    a.remove();
  }
  if (a.textContent.includes("Please ask for")) { //tambien se puede usar search o match
    a.remove();
  }
}



//Experience


for (const a of full_html.querySelectorAll('p,li')){
  const text = a.textContent.trim();
  let experienceRegex = /[0-9] years|[0-9] months|[0-9][0-9] years|[0-9] to [0-9] years/gi;
  if (text.search(/Experience/ig) > -1 && text.search(experienceRegex) > -1) {
    job.experience_required = text.match(experienceRegex)[0].trim();
  }
}




let selectorExpre = 'section.job-description'; //Selector del jobdata (también puede ser p, div, span)
let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
for (const a of document.querySelectorAll(selectorExpre)) {
if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
  if (a.textContent.match(regextwo)) {
    job.experience_required = a.innerText.match(regextwo)[0];
    job.experience_required = job.experience_required.replace("18+ years","").trim();
    job.experience_required = job.experience_required.replace("50 years","").trim();
  }else{
    job.experience_required = '';
  }
}
}
msg('\x1b[46mjob.experience_required :'+ job.experience_required);


//Experiencia en neerlandes

let selectorExpre = 'section.job-description'; //Selector del jobdata (también puede ser p, div, span)
let regextwo = '[0-9]{1,2}[+] jaar|[0-9]{1,2} jaar|[0-9]{1,2}jaar|[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
for (const a of document.querySelectorAll(selectorExpre)) {
if (a.textContent.match(/years in|expérience|experience|Experience|Expérience|werkervaring|ervaring/gi)) {
  if (a.textContent.match(regextwo)) {
    job.experience_required = a.innerText.match(regextwo)[0];
    job.experience_required = job.experience_required.replace("18+ years","").trim();
    job.experience_required = job.experience_required.replace("50 years","").trim();
  }else{
    job.experience_required = '';
  }
}
}


for(const a of full_html.querySelectorAll('li')){
const text = a.textContent.trim();
if(text.search(/Salary:/i) > -1){
  let auxSalary = text.split(/Salary:/i).pop().trim();
  if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
    job.source_salary = auxSalary;
    //job.source_salary = job.source_salary.split(' PALABRA ').pop().trim();
    a.remove();
  }
}
}




if (full_html.textContet.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
if (full_html.textContet.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
if (full_html.textContet.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
if (full_html.textContet.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }


if (job.title.search(/part time/gi) > -1) { job.source_jobtype = "Part time"; }
if (job.title.search(/part-time/gi) > -1) { job.source_jobtype = "Part time"; }
if (job.title.search(/full time/gi) > -1) { job.source_jobtype = "Full time"; }
if (job.title.search(/full-time/gi) > -1) { job.source_jobtype = "Full time"; }


var type  = contains('p','Employment Type',full_html);
if(type!="")job.source_jobtype = type;

var  experience = containss('p','Seniority Level',full_html).replace("Seniority Level","").replace("experience in a similar role","").replace("At least","");
if(experience!="") job.experience_required = experience.trim();


job.source_jobtype = $("div.col-xs-12.fontalign-left:contains(Contract Type)").text().split(":").pop().trim();

let datum = $("li:contains(Posting Date:)").text().trim().split(":").pop();


Puente con QA:  http://51.79.83.21/service/get_fgc.php?url=



//Validar job data

if (document.querySelector(selector)) {
 
} else {
job.flag_active = 0; 
job.html = ""; 
job.jobdesc = '';
}