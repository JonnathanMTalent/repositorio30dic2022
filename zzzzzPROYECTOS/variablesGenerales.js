let job={}; 
let cajaexp; for (let exp of document.querySelectorAll("li")) {
   if (/year|years|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(exp.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(exp.textContent)
     && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(exp.textContent))
     cajaexp=(exp.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
}
job.experience_required=cajaexp[0];



//EN PROCESO

// EXPERIENCE CON GUION
var exp1='months';
var reg1=new RegExp("/\\(?\\d{1,2}\\)?\\s?\\+?\\s?(\\s?(-|to|–)\\s?\\d{1,2}\\+?)?\\s"+exp1+"?/gi");

let job={} //poner esto si se va a probar en consola
let expresion=/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\months?/gi;
const auxExperience = [...document.querySelectorAll('li')].find(e => e?.textContent.match(expresion));
if (auxExperience) {
    job.experience_required = auxExperience.textContent.match(expresion)[0];
}


//   SACANDO TODO DE UN VECTOR            MUY VACANO

var arr=['hola',document.querySelector('div#created').textContent,2,3,4]
text='Sat Sep 24 12:30:10 EDT 2022';
arr.includes(text);
var resultado=arr.indexOf(text)