*EXPERIENCIA

// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  inglés jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/years|year|month|Months|anni|ans/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);

  // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  español jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/año|años|meses|mensual|anual|/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


    // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  francés jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/an |années|mois|mois|mensuel|annuel/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);



      // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  alemán jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/Jahr|Jahre|Monat|Monate|monatlich|jährlich/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  japonés jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/年|年|月|月|毎月|通年/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|一つ|二つ|三|四|五|六|セブン|八|九|テン/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  chino jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/年|年|月|个月|每月|年度的|個月/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|一|二|三|四|五|六|七|八|九|十/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  portugués jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/ano|anos|mês|meses|por mês|anual/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  finlandés jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/vuosi|vuotta|kuukausi|kuukaudet|kuukausittain|vuosittain/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|yksi|kaksi|kolme|neljä|viisi|kuusi|seitsemän|kahdeksan|yhdeksän|kymmenen/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED  Gaélico escocés jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
         
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
    if (/bliadhna|bliadhnaichean|mìos|mìosan|mìosail|bliadhnail/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
      && /\d|aon|dhà|trì|ceithir|còig|sia|seachd|ochd|naoi|deich/gi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
  // job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);


  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳