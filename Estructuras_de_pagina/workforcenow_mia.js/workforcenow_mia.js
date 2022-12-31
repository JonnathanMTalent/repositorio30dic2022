

//infinity
(() => {
  var out = {};
  out.pass_it = {
      "counter":0,
      "jobsPerPage":0,
      "jobsInPage":0,
      "limit":0
  }
  return out;
})()


//extract 2 no cayo en problema con la locacion
(function () {
  var jobs = [];
  var out = {};
    out.pass_it=pass_it;
  var counter = 0;
  var limit = 0;
  var json;
  var cid = window.location.href.split('cid=').pop().split('&').shift();
  var ccId = window.location.href.split('ccId=').pop().split('&').shift();
  var lang = window.location.href.split('lang=').pop().split('&').shift();
  var time = new Date();
  time = Date.now();
//   do {
    //var data = {};
    $.ajax({
      url: 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=' + cid + '&timeStamp=' + time + '&lang=' + lang + '&iccFlag=yes&eccFlag=yes&ccId=' + ccId + '&locale=' + lang + '&$top=20&$skip=' + out.pass_it.counter,
      headers: {
        "accept": "*/*",
        "accept-language": lang,
        "content-type": "application/json",
        "locale": lang,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-forwarded-host": "workforcenow.adp.com",
        "x-requested-with": "XMLHttpRequest"
      },
      type: 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async: false,
      success: function (result) {
        json = result.jobRequisitions;
        if (json.length > 0) {
          out.pass_it.limit  = result.meta.totalNumber;
          for (var i = 0; i < json.length; i++) {
            var job = {};
            var elem = json[i];
            job.reqid = elem.clientRequisitionID;
            job.title = elem.requisitionTitle;
            job.url = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=' + cid + '&ccId=' + ccId + '&jobId=' + elem.customFieldGroup.stringFields[0].stringValue + '&lang=' + lang;
            job.dateposted_raw = elem.postDate.split('T').shift();
            job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
            if (elem.workLevelCode) {
              if (elem.workLevelCode.shortName) {
                job.source_jobtype = elem.workLevelCode.shortName;
              }
            }
          // job.source_location = elem.requisitionLocations[0].address.cityName;
            job.temp = 12;
            for (let a of elem.requisitionLocations) {
              var jobx = {};
              jobx = { ...job }
              jobx.location = '';
              jobx.source_location = '';
              if (a.address.cityName) {
                jobx.location += a.address.cityName;
                jobx.source_location += a.address.cityName;
              }
              if (a.address.countrySubdivisionLevel1.codeValue) {
                jobx.location += ', ' + a.address.countrySubdivisionLevel1.codeValue;
                jobx.source_location += ', ' + a.address.countrySubdivisionLevel1.codeValue;
              }
              jobs.push(jobx);
            }
          }
        } else {
          var job = {};
          job.title = 'Ghost job, probably no jobs here...' + window.location.href;
          jobs.push(job);
        }
        // counter = counter + 20;
      },
      error: function (error) {
        msg(error);
      }
    });
//   } while (counter < limit);
  out["jobs"] = jobs;
  return out;
})();


//Extract 1
(function () {
  var jobs = [];
  var out = {};
  out.pass_it=pass_it;
  var limit = 0;
  var json;
  var cid = window.location.href.split('cid=').pop().split('&').shift();
  var ccId = window.location.href.split('ccId=').pop().split('&').shift();
  var lang = window.location.href.split('lang=').pop().split('&').shift();
  var time = new Date();
  time = Date.now();
//   do {
    //var data = {};
    $.ajax({
      url: 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=' + cid + '&timeStamp=' + time + '&lang=' + lang + '&iccFlag=yes&eccFlag=yes&ccId=' + ccId + '&locale=' + lang + '&$top=20&$skip=' + out.pass_it.counter,
      headers: {
        "accept": "*/*",
        "accept-language": lang,
        "content-type": "application/json",
        "locale": lang,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-forwarded-host": "workforcenow.adp.com",
        "x-requested-with": "XMLHttpRequest"
      },
      type: 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async: false,
      success: function (result) {
        json = result.jobRequisitions;
        if (json.length > 0) {
          out.pass_it.limit = result.meta.totalNumber;
          for (var i = 0; i < json.length; i++) {
            var job = {};
            var elem = json[i];
            job.reqid = elem.clientRequisitionID;
            job.title = elem.requisitionTitle;
            job.url = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=' + cid + '&ccId=' + ccId + '&jobId=' + elem.customFieldGroup.stringFields[0].stringValue + '&lang=' + lang;
            job.dateposted_raw = elem.postDate.split('T').shift();
            job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
            job.source_location = elem.requisitionLocations[0].address.cityName +', '+ elem.requisitionLocations[0].address.countrySubdivisionLevel1.codeValue;
            if (elem.workLevelCode) {
              if (elem.workLevelCode.shortName) {
                job.source_jobtype = elem.workLevelCode.shortName;
              }
            }
            job.temp = 123;
            for (let a of elem.requisitionLocations) {
              var jobx = {};
              jobx = { ...job }
              jobx.location = '';
              if (a.address.cityName) {
                jobx.location += a.address.cityName;
              }
              if (a.address.countrySubdivisionLevel1.codeValue) {
                jobx.location += ', ' + a.address.countrySubdivisionLevel1.codeValue;
              }
              jobs.push(jobx);
            }
          }
        } else {
          var job = {};
          job.title = 'Ghost job, probably no jobs here...' + window.location.href;
          jobs.push(job);
        }
        // counter = counter + 20;
      },
      error: function (error) {
        msg(error);
      }
    });
//   } while (counter < limit);
  out["jobs"] = jobs;
  return out;
})();

//PAGINATION
(()=>{
  var out={};
  out.pass_it=pass_it;
  var { counter, jobsPerPage, jobsInPage, limit } = out.pass_it;
  out.pass_it.counter+=20;
  out.has_next_page=counter<limit?true:false;
  return out;
})()

//jobdescription

(function () {
  var out = {};
  var job = {};
  var jobid = pass_it["job"].link.split("jobId=").pop().split('&').shift();
  var cid = pass_it["job"].link.split('cid=').pop().split('&').shift();
  var ccId = pass_it["job"].link.split('ccId=').pop().split('&').shift();
  var lang = pass_it["job"].link.split('lang=').pop().split('&').shift();
  var time = new Date();
  time = Date.now();
  var endpoint = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions/" + jobid + "?cid=" + cid + "&timeStamp=" + time + "&lang=en_US&ccId=" + ccId + "&locale=" + lang;
  //msg(endpoint);
  $.ajax({
    url: endpoint,
    headers: {
      "accept": "*/*",
      "accept-language": lang,
      "content-type": "application/json",
      "locale": "en_US",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-forwarded-host": "workforcenow.adp.com",
      "x-requested-with": "XMLHttpRequest"
    },
    type: 'GET',
    async: false,
    success: function (result) {
      if (result.payGradeRange) {
        //if(result.payGradeRange.maximumRate.amountValue.match(/[0-9]/) && result.payGradeRange.minimumRate.amountValue.match(/[0-9]/)){​
        job.source_salary = result.payGradeRange.minimumRate.amountValue + ' to ' + result.payGradeRange.maximumRate.amountValue;
        //}
      }
      /*if (result.workLevelCode) {
        if (result.workLevelCode.shortName) {
          job.source_jobtype = result.workLevelCode.shortName;
        }
      }*/
      var full_html = document.createElement("DIV");
      full_html.innerHTML = result.requisitionDescription;
      
      
      
      // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
      
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
      var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
      if (remove_selectors.length > 0) {
        remove_selectors.forEach(remove_selector => {
          for (const a of full_html.querySelectorAll(remove_selector)) {
            a.remove();
          }
        });
      }
      for (const a of full_html.querySelectorAll('p, span, li')) {
        if (a.textContent.search(/@|http|www./ig) > -1) {
          a.remove();
        }
      }
      job.html = full_html.innerHTML.trim();
      //job.html = removeTextBefore(job.html, '', false);
      job.html = removeTextAfter(job.html, /How to Apply/g, true);
      job.html = cleanHTML(job.html);
      var tmp = document.createElement("DIV");
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
    if((job.jobdesc.search(/We Also Offer…/)>-1) && (job.jobdesc.search(/Professional Development/)>-1))job.source_benefit=job.jobdesc.split('We Also Offer…').pop().split('Professional Development').shift().trim(); 

    },
    error: function (error) {
      msg(error);
    }
  });
  out["job"] = job;
  return out;
})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }
  }
  return newHtml;
}

// jobdescription con dos formas de benefit y validaciones desde el document
(function() {
  var out = {};
  var job = {};
  var selector = "div.job-description-data";
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
  /*var endpoint = pass_it["job"].url;
  msg(endpoint)*/
  
  //Rautomatic

let experience= multiplesVariables(/Experience:/gmi,"p",document,true);
if(experience)job.experience_required=experience;
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

  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
  if (typeof cleanHTML == "undefined") cleanHTML = function(x) { return x };
  if (typeof msg == "undefined") msg = console.log;

  if (document.querySelector('span.job-description-salary')) {
    job.source_salary = document.querySelector('span.job-description-salary').textContent.trim();
  }
  job.html = full_html.innerHTML.trim();
  job.html = removeTextBefore(job.html, "The Opportunity", false);
  job.html = removeTextBefore(job.html, "Job Description", false);
  job.html = removeTextAfter(job.html, "The Rewards", true);
  
  //Organizational Structure:
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

  var temp_html = document.createElement("div");
  temp_html.innerHTML = job.html;

  job.jobdesc = temp_html.textContent.trim();

  job.html = cleanHTML(job.html);
  job.jobdesc = cleanHTML(job.jobdesc);
  
  if(!job.source_benefit){
  const splitInicio_pop="We Offer";
const splitFin_shift="Experience:";
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
if(elementoLimpio)job.source_benefit=elementoLimpio;}
if(!job.source_benefit){
  const splitInicio_pop="We offer";
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
}

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

function multiplesVariables(expReg,selector,contenedor,nextElementSibling){ // jjms
  var resultado
  let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
  if(!nextElementSibling)aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
  if(nextElementSibling)aux[0]!=null ? resultado=aux[0].nextElementSibling.textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
  return resultado;
}

OTRA FORMA

// Extract 
(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
      if (!pass_it["cont"]) {
        out["pass_it"] = {
          "cont": 1,
          "jobs": 0
         
        };
      } else {
        out["pass_it"] = pass_it;
      }
    
   
  
      var element = document.querySelector("pre").textContent;
      var json = JSON.parse(element);
      var jobs = json.jobRequisitions;
      const formatDate = (value) => {
      let date = new Date(value);
      const withCero = n => n < 10 ? `0${n}` : n;
      return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
    }
    
   
    var returnedJobs = [];  
    for(i in jobs) {
          var job = {};/*init*/
      
            //Values taken from current URL in spider info/dev comment
      
        var currentURLdomConstant = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?";
        var cidTillType           = "cid=2da02aeb-616b-486b-a131-0677c8d9c9b5&ccId="; 
        var jobId                 = jobs[i].itemID;
        var lang                  = "&lang=en_US";
          
        job.title = jobs[i].requisitionTitle;
        job.reqid = jobs[i].itemID;
        
      
         // Multi-location 
         if(jobs[i].requisitionLocations[0].nameCode.shortName){
  
        var locs = jobs[i].requisitionLocations; 
        for (var w in locs) {
      
   
        job.location += "/" + locs[w].nameCode.shortName + "/";
          
        job.location = job.location.replace(/undefined/gi).trim();
        
        var lastCharLoc = job.location.substr(job.location.length -1);
        if(lastCharLoc === "/"){job.location = job.location.slice(0,-1).trim();}
          
      
       }
           
          
        }else{
          job.location = "US";
        }
      
        if(job.location.indexOf("/")>-1){           
  
  
            let splitOnFirstCommaLoc = job.location.split("/").shift().trim(); 
                job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();
                            
                let firstCharLoc = job.location.charAt(0);
                if(firstCharLoc === "/"){job.location = job.location.slice(1).trim();}
  
      }    
   
        job.url = currentURLdomConstant + cidTillType + "&jobId=" + jobId  + lang;
        
        
        
        //----------DATE-POSTED-------------------------------------
       
       var datum  = jobs[i].postDate;
       job.dateposted_raw = formatDate(datum);
  
       //---------------------------------------------------------
  
        
      
      
        job.temp = "Jul/2020";
  
        if(job.location.indexOf("Billings, MT, Billings,")>-1){job.location = "Billings, MT, US";}
        if(job.location.indexOf("McPherson, KS, McPherson,")>-1){job.location = "McPherson, KS, US";}
      
      
          if(job.location.indexOf(",")>-1){           
         
         let numberOfCommas = job.location.match(/\,/g).length;  
         if(numberOfCommas == 2){ 
  
           
           var state   = job.location.split(",")[1].trim();
           job.title = job.title.split(state).shift().trim();
                               
                               }
  
         } 
      
      
        if (job.location.indexOf("/") > -1) {
  
  
          var locclean = job.location;
  
          var locs = locclean;
  
          locs = locs.split('/');
          for (l in locs) {
  
            var jobx = {};
  
            jobx.title    = job.title;
            jobx.url      = job.url;
            jobx.location = locs[l].trim();
            jobx.temp     = job.temp;
            jobx.dateposted_raw = job.dateposted_raw;
            jobx.reqid = job.reqid;
            
  
            if(jobx.location.length > 0){returnedJobs.push(jobx);}
             
        }
        
        }else {
          job.location = job.location; 
          returnedJobs.push(job);
        }
   
    }
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
  
  // PAGINATION
  (function() {
    var out = {};
    
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;

      if (out["pass_it"]["jobs"] < 20) { 
        //last page
 
        
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 20;
      
      var domConstant = window.location.origin + window.location.pathname;
      var cidTillTop  = "?cid=ea6ad8b3-049c-4b27-85bc-1879605fc905&timeStamp=1595352062585&lang=en_US&ccId=19000101_000001&locale=en_US&$top=20";
      
      var url = domConstant + cidTillTop + "&$skip=" + out["pass_it"].cont;

   

     
      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    return out;
    })();

    //DESCRIPCION:
    (function() {
        var out = {};
        var job = {};
        var selector = 'div[name="jobDescriptionView"] .job-description-content';
        var remove_selectors = [];
        //var job = pass_it["job"];
        var full_html = document.querySelector(selector);
        // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
      
        job.html      = full_html.innerHTML.trim();    
        job.html = removeTextBefore(job.html, 'JOB DESCRIPTION', false);
        job.html = removeTextBefore(job.html, 'DESCRIPTION', false);
        job.html = removeTextAfter(job.html, 'Equal Opportunity Employer', true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
        
        
        const auxExperience = [...tmp.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
      if (auxExperience) {
          job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
      }
        
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
      



