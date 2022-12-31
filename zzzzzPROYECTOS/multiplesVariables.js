❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//MULTIPLES VARIABLES1 (DOBLE VALIDACION)
job.experience_required=multiplesVariables(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi, 'li',document)
job.experience_required=multiplesVariables(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\smonths?/gi, 'li',document)


function multiplesVariables(expReg,selector, contenedor) {
    var  resultado;
    const aux = [...contenedor.querySelectorAll(selector)].find(e => e?.textContent.match(expReg));
    aux?resultado = aux.textContent.match(expReg)[0] :resultado='No encontrado';
  return resultado;
}

████████████████████████████████████████████████████████████████████  
//MULTIPLES VARIABLES2 (SENCILLO)

job.dateposted_raw=multiplesVariables2(/Dateposted|DATEPOSTED|dateposted|date posted|Date Posted/gmi,'li',document)
job.dateclosed_raw=multiplesVariables2(/Dateposted|DATEPOSTED|dateposted|date posted|Date Posted/gmi,'li',document)
job.source_salary=multiplesVariables2(/\$|salary|SALARY|Salary/gmi,'li',document)
job.source_jobtype=multiplesVariables2(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document)
job.source_benefit=multiplesVariables2(/BENEFIT|benefit|Benefit/gmi,'li',document)



function multiplesVariables2(expReg,selector,contenedor){
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    aux[0]!=null ? resultado=aux[0].textContent.trim() : resultado='No encontrado';
    return resultado;
}

████████████████████████████████████████████████████████████████████  

function validarContenido(variableaIgualar,variableaValidar){
    PENDIENTE
}

████████████████████████████████████████████████████████████████████  

const regexSalary = /\$\d+(\.|,|-)?\d*\s?\W*\d*\s*k?\s?(to|-)?\s?\W*\d*\W*\d*\W*\d*\s?k?\s?-?\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)?|\$\d+\s?-?\s?(yearly|yr|hr|hourly|hour|per hour|per year|per month|monthly|month|year|Annually|per annum|annual)?/i;
if (regexSalary.test(full_html.textContent))
job.source_salary = regexSalary.exec(full_html.textContent)[0];

████████████████████████████████████████████████████████████████████  

  const experience = [];
for (let li of full_html.querySelectorAll("li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
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