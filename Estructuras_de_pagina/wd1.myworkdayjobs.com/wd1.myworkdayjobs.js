


// BEFORE EXTRACT

(function() {
    var out = {};
    out.waitFor = "li.css-1q2dra3"
    return out;
  })();



  //EXTRACT


  (function() {
    var out = {};
       var html_jobs = document.querySelectorAll("li.css-1q2dra3");
      var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("a.css-19uc56f").textContent.trim();
        job.url =  elem.querySelector("a.css-19uc56f").href.trim();
         job.source_location = elem.querySelector(" div.css-248241 > div > div > dl > dd").textContent.trim();
          let hq="Salt Lake City, UT, US"; // HEAD QUARTERS
          job.source_location=job.source_location||"";
          if((job.source_location.search(/remote|headquarter|head quarter/gmi)>-1)||(job.source_location=="")){job.location=hq, job.source_location="";}else{
          job.location=(job.source_location)||hq; } //HEAD QUARTERS:
        
        
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("ul.listing-details li:nth-last-of-type(1)").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
          job.reqid =  elem.querySelector("li.css-h2nt8k").textContent.trim();
           job.temp = 21;
        jobs.push(job);
      } 
    
    out["jobs"]= jobs;
      return out;
  })();



  //PAGINATION
(function() {
    var out = {};
  var next_page_selector = "#mainContent > div > div.css-uvpbop > section > div.css-3z7fsk > nav > div > button:nth-child(3)"; //selector to identify the next button
  var last_page_selector = "#mainContent > div > div.css-uvpbop > section > div.css-3z7fsk > nav > div > button:nth-child(3) > span > svg > g > path"; //selector to identify the last page
   
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (!document.querySelector(last_page_selector)) {
        //last page
      out["has_next_page"] = false;
  } else if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = true;
  }

    out.waitFor = "li.css-1q2dra3";// Selector de los jobs
    return out;
})();









//ESPERAS


(function() {
  var out = {};
  out.waitFor = 'div[data-automation-id*="jobPostingDescription"]';
//   msg("Esperando 3 segundos..............");              
//   out.wait = 3000;
//   out["html"] = true;
//   out["pic"] = true;

// out.iframeSelector = "iframe#pcrframe";
// out.iframeWaitFor = "div#jdesc";

  return out;
})();









//JOBDESCRIPTION BASICO

(function() {
  var out = {};
  var job = {};
  var selector = 'div[data-automation-id*="jobPostingDescription"]';
  
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

job.dateposted_raw=dateEstructurados(document,"datePublished", "datePosted");

//EXPERIENCE REQUIRED          
let experience=[];  for (let li of document.querySelectorAll("p, li")) {
  if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
    && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
    experience.push(li.textContent);
}
if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;


job.source_jobtype=Jobtype(document.querySelector('Body').textContent);
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   

//MULTIPLES VARIABLES (SENCILLO)


// var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',document);

// var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',document);
// // job.dateposted_raw=formatDate(job.dateposted_raw);
// // if(datess!='No encontrado')datess=datess.split('');
// // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];

job.source_salary=multiplesVariables(/\$|\/hour|SALARY|Salary/gmi,'p',document);
// job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',document);
job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'p',document,true);

//*/// ████████████████████████████████████████████████████████████████████

  var full_html = document.querySelector(selector);


  // full_html.find('div.claseaeliminar').remove().end().html();
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
  job.html = removeTextBefore(job.html, 'Description', false);

  // job.html = removeTextAfter(job.html, '', true);
  // job.html = removeTextAfter(job.html, '', true);
  job.html = removeTextAfter(job.html, 'Equal Opportunity and Diversity', true);
  
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();


  //clean emogis
  job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  if(job.html.indexOf('@')>-1){
      var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
      job.html = job.html.replace(eliminar,'');
    }
  
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

  //   job.html = job.html.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

  
  job.html = cleanHTML(job.html);
  var tmp = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc = tmp.textContent.trim();
  job.jobdesc = cleanHTML(job.jobdesc);

  //job.source_benefit = getBenefits(job.jobdesc, /BENEFITS:/g, /How to Apply/g)
//// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//     //BENEFIT DESDE EL JOB.JOBDESC                           
// let inicioBenefit=''; let finBenefit='';
// if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
// // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
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

function multiplesVariables(expReg,selector,contenedor,nextElementSibling){
  var resultado
  let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
  if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
  if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
  return resultado;
}

function Jobtype(jobtyp) {
  var Jobtype=jobtyp.toLowerCase().trim();
  
  var s_jobtype="";
  //var s_jobtype = 'Headquarters';  // Convertir la locacion en hq cuando no este en los if
  
/*  PARA SACAR MAS:  en minuscula la de indexOf
  if (Jobtype.indexOf("") > -1) {
      s_jobtype = (", ");
  }; 
  //Full-time, Part-time, Temporary, Permanent;
*/
  if (Jobtype.indexOf("full time") > -1) {
      s_jobtype = ("Full Time");
  };
  if (Jobtype.indexOf("full-time") > -1) {
      s_jobtype = ("Full Time");
  };
  if (Jobtype.indexOf("fulltime") > -1) {
      s_jobtype = ("Full Time");
  };
  if (Jobtype.indexOf("part-time") > -1) {
      s_jobtype = ("Part Time");
  };
  if (Jobtype.indexOf("parttime") > -1) {
      s_jobtype = ("Part Time");
  };
  if (Jobtype.indexOf("part time") > -1) {
      s_jobtype = ("Part Time");
  };
  if (Jobtype.indexOf("temporary") > -1) {
      s_jobtype = ("Temporary");
  };
  if (Jobtype.indexOf("permanent") > -1) {
      s_jobtype = ("Permanent");
  };
  if(s_jobtype=="")s_jobtype=undefined;

  
  return s_jobtype;
}


function dateEstructurados(contenedor,date1, date2) {
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
      dateInJson=json.datePosted;
      if(dateInJson)tipo=3;
  }
  }  

  




//   dateInJsonGraph? tipo=1:
//   dateInJsonGraph2? tipo=2:
//   dateInJson? tipo=3: tipo=0;

switch (tipo) {
  case 1:
      
          dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
          dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
          date=undefined;
      
    break;

  case 2:
      
          dateInJsonGraph2.datePosted?date=dateInJsonGraph2.datePosted:
          dateInJsonGraph2.datePublished?date=dateInJsonGraph2.datePublished:
          date=undefined;
      
    break;
  case 3:
      date=dateInJson;
      break;

  // Se pueden incluir todos los casos que quieras

  default:
    msg("No se encontro el tipo de date");
}



var resultado=date?formatDate(date):undefined;
}
return resultado  //jjms
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

function getBenefits(html, recorteArriba, recorteAbajo) {
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



