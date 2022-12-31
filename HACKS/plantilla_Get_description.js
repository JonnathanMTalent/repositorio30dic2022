

//get description  NUEVA
var full_html = getDescription(job.url);
var div = document.createElement("div");
div.innerHTML = full_html;

//sacar las variables
job.dateposted_raw=div.querySelectorAll('span.job-info')[0].textContent.trim();


//  CUANDO ES DESDE EL JOBDESC CON EL JSON ESCONDIDO:   JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
var full_html = getDescription(job.url);
var div = document.createElement("div");
div.innerHTML = full_html;


          if(div.querySelector('script[type="application/ld+json"]')){
          // Extract text on the script
          var html=div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
          //convert text to json
          
        
          var json=JSON.parse(html);
         //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
         var date=json.datePosted.split(" ").shift().split("/");
            if(parseInt(date[0])<10 && date[0].length<2) date[0]= '0'+date[0];
            if(parseInt(date[1])<10 && date[1].length<2) date[1]= '0'+date[1];
            job.dateposted_raw=date[0]+"/"+date[1]+"/"+date[2];
            job.jobdesc=json.description;
        }


//  jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//     ██████████████████████████████DESCRIPCION██████████████████████████████████████  /*  
var full_html = getDescription(job.url);
var div       = document.createElement("div");
div.innerHTML = full_html;
var desc = div.querySelector("jobdataSelector");
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
/*
let aux = Array.from(div.querySelectorAll('li')).filter(x => x.textContent.search(/years/gmi) > -1);
aux[0]!=null ? job.experience_required=aux[0].textContent.trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('') : job.experience_required='';
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

for (const a of desc.querySelectorAll(
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
)) { // Borra todos los que encuentre
    if (a){ 
      a.remove(); 
    } 
  }

  if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
    return x
  };
  if (typeof msg == "undefined") msg = console.log;
//var job = pass_it["job"];

  job.html = desc.innerHTML.trim(); 


  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextAfter(job.html, "", false);

 //job.html = job.html.split("").shift();
 //job.html = job.html.split("").shift();

  //job.html = job.html.replace("","").trim();

  
  if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
      return x
  };
  if (typeof msg == "undefined") msg = console.log;
  
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
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;

                        //     ███████████████████████████████ variables tmp █████████████████████████████████████  /*  

        // //EXPERIENCE REQUIRED          
        // let experience=[];  for (let li of tmp.querySelectorAll("p")) {
        //     if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
        //       && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
        //       experience.push(li.textContent);
        //   }
        //   if(experience[0]!=undefined)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();;
        // //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj   
        
        //MULTIPLES VARIABLES (SENCILLO)
        
        
        // var x1=multiplesVariables(/PALABRA|palabra/gmi,'li',tmp);
        
        // var datess=multiplesVariables(/Dateposted|DATEPOSTED/gmi,'li',tmp);
        // // job.dateposted_raw=formatDate(job.dateposted_raw);
        // // if(datess!='No encontrado')datess=datess.split('');
        // // job.dateposted_raw= datess[]+"/"+datess[]+"/"+datess[];
        
        // job.source_salary=multiplesVariables(/\$|salary|SALARY|Salary/gmi,'li',tmp);
        // job.source_jobtype=multiplesVariables(/JOBTYPE|jobtype|job type|Job Type/gmi,'li',tmp);
        // job.source_benefit=multiplesVariables(/BENEFIT|benefit|Benefit/gmi,'li',tmp);
        
        //*/// ████████████████████████████████████████████████████████████████████
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
//// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//     //BENEFIT DESDE EL JOB.JOBDESC                           
// let inicioBenefit=''; let finBenefit='';
// if((job.jobdesc.search(inicioBenefit)>-1) && (job.jobdesc.search(finBenefit)>-1))job.source_benefit=job.jobdesc.split(inicioBenefit).pop().split(finBenefit).shift().trim(); 
// // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


    // job.jobdesc = cleanHTML(job.jobdesc);




//*/// ████████████████████████████████████████████████████████████████████

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

function multiplesVariables(expReg,selector,contenedor){
    var resultado
    let aux = Array.from(contenedor.querySelectorAll(selector)).filter(x => x.textContent.search(expReg) > -1);
    aux[0]!=null ? resultado=aux[0].textContent.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim() : resultado=undefined;
    return resultado;
}









// Debe colocarse la funcion ABAJO !!! 
function getDescription(url) {
var xhrrequest = new XMLHttpRequest();
xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
//xhrrequest.setRequestHeader(header, value);
var response = "";
xhrrequest.onreadystatechange = function() {
if (xhrrequest.readyState == 4 && xhrrequest.status == 200) { 
    //console.log(xhrrequest.responseText);
    response = xhrrequest.responseText;
}
};
xhrrequest.send();
return response;
}

























// ANTIGUA 

//get description
var full_html = getDescription(job.url);
var div = document.createElement("div");
div.innerHTML = full_html;

//sacar las variables
job.dateposted_raw=div.querySelectorAll('span.job-info')[0].textContent.trim();


//  CUANDO ES DESDE EL JOBDESC CON EL JSON ESCONDIDO:   JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
var full_html = getDescription(job.url);
var div = document.createElement("div");
div.innerHTML = full_html;


          if(div.querySelector('script[type="application/ld+json"]')){
          // Extract text on the script
          var html=div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
          //convert text to json
          
        
          var json=JSON.parse(html);
         //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
         var date=json.datePosted.split(" ").shift().split("/");
            if(parseInt(date[0])<10 && date[0].length<2) date[0]= '0'+date[0];
            if(parseInt(date[1])<10 && date[1].length<2) date[1]= '0'+date[1];
            job.dateposted_raw=date[0]+"/"+date[1]+"/"+date[2];
            job.jobdesc=json.description;
        }


//  jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//     ██████████████████████████████DESCRIPCION██████████████████████████████████████  /*  
var full_html = getDescription(job.url);
var div       = document.createElement("div");
div.innerHTML = full_html;
var desc = div.querySelector("jobdataSelector");
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
/*
let aux = Array.from(div.querySelectorAll('li')).filter(x => x.textContent.search(/years/gmi) > -1);
aux[0]!=null ? job.experience_required=aux[0].textContent.trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('') : job.experience_required='';
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
    if (a){ 
      a.remove(); 
    } 
  }

  job.html = desc.innerHTML.trim(); 


  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextAfter(job.html, "", false);

 //job.html = job.html.split("").shift();
 //job.html = job.html.split("").shift();

  //job.html = job.html.replace("","").trim();

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
//     ██████████████████████████████DESCRIPCION██████████████████████████████████████  /* 
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

//*/// ████████████████████████████████████████████████████████████████████









// Debe colocarse la funcion ABAJO !!! 
function getDescription(url) {
var xhrrequest = new XMLHttpRequest();
xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
//xhrrequest.setRequestHeader(header, value);
var response = "";
xhrrequest.onreadystatechange = function() {
if (xhrrequest.readyState == 4 && xhrrequest.status == 200) { 
    //console.log(xhrrequest.responseText);
    response = xhrrequest.responseText;
}
};
xhrrequest.send();
return response;
}