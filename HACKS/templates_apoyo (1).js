/*

TEMPLATES APOYO
Actualizado Mayo 3, 2022


1. EXTRACT 
2. JOBDATA JS PLANO
3. JOBDTA JQuery
4. MULTI-LOCATION. 
    CASO A. SIMPLE
    CASO B. PARA ITERAR UN nodeList
5. OBTENIENDO DESCRIPCIÓN DESDE EL EXTRACT: SIMPLE (DESDE LA MISMA PÁGINA), JSON, AJAX
6. IFRAME
7. JOB FANTASMA
8. CLICKING A BUTTON TO ACCESS JOBS LIST
9. PAGINACIONES: 
                 9.1 NEXT 
                 9.2 POR NÚMEROS
                 9.3 URL

10. STRING TO DATE (POSTED AND CLOSED) 

11. CODIGO DE APOYO RESUMIDO

                            #1 TITLE
                            #2 LOCATION
                            #3 JOBTYPE
                            #4 E-MAIL
                            #5 URL
                            #6 VALIDACIONES
                            #7 EXPERIENCE
                            #8 ESPERAS
                            #9 DESCRIPTION ARRAY. Arreglo cuando la descripción está separada en distintos tags. EJ.: "Details" and "Benefits"
                            #10 AJAX CALL
                            #11 MÉTODO FILTER


*/



// 0. SPIDER CONFIG ----------------------------------------------------------------------------------------------------------------------------------------------//

{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": false,
"waitForResources": false
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}

// 1. EXTRACT ----------------------------------------------------------------------------------------------------------------------------------------------//

(function() {
  var out = {};

      var html_jobs = document.querySelectorAll(''); 
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector('').textContent.trim();
      job.url      = elem.querySelector('').href.trim();
      job.location = elem.querySelector('').textContent.trim();

      //job.source_location = elem.querySelector('').textContent.trim();

      //job.reqid = elem.querySelector('').textContent.trim();   

      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experience_required = elem.querySelector('').textContent.trim();

      //job.source_empname = elem.querySelector('').textContent.trim();
      //job.logo           = elem.querySelector('').getAttribute("src").trim();
      
      //let datePosted     = elem.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted," ",0,1,2); 

      //let dateClosed     = elem.querySelector('selectorDeLaFechaDeCierre').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);

      job.temp  = "2022";

      //if(job.source_empname.search(//i)>-1){job.title = '';}
     
      //if(job.title.length > 0){
      jobs.push(job);
      //}
    
    } 
  
  out["jobs"]= jobs;
  //console.table(jobs)
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       if(dateRaw.indexOf(",")>-1){     
       dateRaw = dateRaw.replace(/\,/g,"");
       }
       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/nd|rd|st|th/gi,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch, French
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
  var datum = month +"/"+  day +"/"+ year;
    return datum;
}

  // 2. JOBDATA JS PLANO ----------------------------------------------------------------------------------------------------------------------------------------------//

(function() { //Nov-2021

var out = {};
var job = {};

var selector  = '';

var full_html = document.querySelector(selector); 
//var job = pass_it["job"];

// Validación de selector. 
// Nota: Si no se valida el selector el código entrara en error y no subira el job en cuestión.
/*
let type = document.querySelector('selectorDelJobType');
if(type !== null){
 job.source_jobtype = type.textContent.trim();
}
*/

  // To Remove selectors 
for (const a of full_html.querySelectorAll('a, img, script, style, button, input')) {
    if (a){
      a.remove();
    }
}

/*
for (const a of document.querySelectorAll('')) {
    if (a.innerText.search(//)>-1){
    
  }
}
*/
   job.html = full_html.innerHTML.trim();

  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();

  // Emoji cleanner
  //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);


out["job"] = job;
return out;

})();

function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       if(dateRaw.indexOf(",")>-1){     
       dateRaw = dateRaw.replace(/\,/g,"");
       }
       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/nd|rd|st|th/gi,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch, French
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
  var datum = month +"/"+  day +"/"+ year;
    return datum;
}

// 3. JOBDATA JQuery -----------------------------------------------------------------------------------------------------------------------------------------------//

(function() {

  var out = {};
  var job = {};

  var selector  = ""; 

  var full_html = $(selector);
  var html_2    = $(selector).text();

  //------------INFO--------------------------------------//

  // job.location           = $('').text().trim();
  // job.source_jobtype     = $('').text().trim();
  // job.source_salary      = $('').text().trim();
  
 // job.experience_required = $('').text().trim();
 
  // job.source_empname     = $('').text().trim();
  // job.logo               = $('').attr("src");  

  //var date = $('').text().trim();
  //job.dateposted_raw  = getDateFormat(); // Function parameters: dateRaw, cut, dayPosition, monthPosition, yearPosition

  
 //-----------REMOVE SELECTORS--------------------------------------//

    full_html.find('a, input, button').remove().end().html();
    full_html.find('img, div.alert, style, script').remove().end().html();
    full_html.find('form').remove().end().html();
    
    //full_html.find("h1").remove().end().html();

    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

    //full_html.find("p:contains(CONTACT)").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();

//-----------------------------------------------------------------// 

  var full_html = full_html.html();
  job.html = full_html.trim();

  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();

//Emoji cleanner
// job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);

  out["job"]  = job;
  return out;
  
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = text + " " + newHtml;
        }     
      }
      return newHtml;
    }

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"");

       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods > 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/rd|st|th/i,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch and French
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
  var datum = month +"/"+  day +"/"+ year    return datum;
}

 // 4. MULTI-LOCATION ----------------------------------------------------------------------------------------------------------------------------------------------//

// CASO A. SIMPLE

jobs.push(job2);

 job.location = job.location.replace(/ or | and | \&/gi,"/"); 

        if(job.location.indexOf("/")>-1){//
        
          var locs = job.location.split("/"); // 
            for(w in locs){
            
              var jobw = {...job};
              
             
              jobw.location = locs[w];
   
              jobs.push(jobw); // Multi-location jobs
            }
        
        }else{
            
            jobs.push(job); // Single Location jobs
            
        } 


// CASO B. PARA ITERAR UN NODELIST

let selectorLocs = 'ul.multilocation';
let selectorLoc  = 'li.location'; 

        if(elem.querySelector(selectorLocs) !== null){ // Validación del selector con multi-location
        
          var locs = elem.querySelector(selectorLocs).querySelectorAll(selectorLoc);
            for(w in locs){
                  if(typeof locs[w] =="function") continue;
                  if(typeof locs[w] =="number") continue;
            
              var jobw = {...job};
              
              jobw.location = locs[w].textContent.trim();
  
              jobs.push(jobw); // Multi-location jobs
            }
        }
        jobs.push(job); // Single Location jobs
        } 
    



// 5. OBTENIENDO DESCRIPCIÓN DESDE EL EXTRACT: SIMPLE (DESDE LA MISMA PÁGINA), JSON, AJAX ----------------------------------------------------------------------------//

/////////////////////////////////////
// SIMPLE (DESDE LA MISMA PÁGINA) //
/////////////////////////////////// 


        var full_html = elem.querySelector("jobdataSelector").innerHTML;
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div;

          
         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
      
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();


          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);



function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}

///////////
// JSON //
/////////

        var full_html = json[i].description; // atributo JSON con la descripción del job
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div;

          
         for (const a of desc.querySelectorAll('a, button, script, style')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);

         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);


function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}

///////////
// AJAX //
/////////

        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div.querySelector("jobdataSelector");

          
         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
        
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);



function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}

// Función para el llamdo de AJAX

  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
   var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}


// 6. IFRAME ------------------------------------------------------------------------------------------------------------------------------------//

// EXTRACT 
 
// En la plantilla del extract colocar debajo de var "out = {};" y arriba de "var html_jobs = document.querySelectorAll("");" 

  /* // To extract from iframe
    var iframe_selector = "";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll(""); // Loop selector
  */ // The following line must be inactivated 
 

 // DESCRIPTION 

    var iframe_selector = "#grnhse_iframe";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var full_html = iframeDocument.querySelector('div[id="content"]'); // Loop selector


// 7. JOB FANTASMA ------------------------------------------------------------------------------------------------------------------------------------------------//

//Job fantasma
var job_fantasma = {title:window.location.href};
jobs.push(job_fantasma);
//Se coloca justo antes de: out["jobs"]= jobs;


// 8. CLICKING A BUTTON TO ACCESS JOBS LIST ------------------------------------------------------------------------------------------------------------------------------//

 (function() {
  var out = {};
   var buttonSelector = '';
    document.querySelector(buttonSelector).click();
    return out;
})();


// 9. PAGINACIONES --------------------------------------------------------------------------------------------------------------------------------------------------//

// 9.1 NEXT 

// NEXT - CASO I 

(function() {
    var out = {};
  var next_page_selector = ''; // Selector del next 
  var last_page_selector = ''; //Selector de la última página
  
    var clickable_elem = document.querySelector(next_page_selector);
  
    //stop condition
    if (document.querySelector(last_page_selector)) {
    out["has_next_page"] = false;
    } else {
        clickable_elem.click();
      out["has_next_page"] = true;
    }

    //out.waitFor = "";
    return out;
})();

// NEXT - CASO II 



(function() {
    var out = {};
  var next_page_selector = 'span[aria-label="Next page"]'; // Selector del next 
  //var last_page_selector = ''; //Selector de la última página
  
    var clickable_elem = document.querySelector(next_page_selector);
  
  
  var current_number_of_jobs = Number(document.querySelector("span.jtable-page-info").textContent.split(/out/i).shift().replace(/[a-z]/gi,"").trim());
  var total_number_of_jobs   = Number(document.querySelector("span.jtable-page-info").textContent.split(/of/i).pop().replace(/[a-z]/gi,"").trim());
    
  
  console.log(current_number_of_jobs);
  console.log(total_number_of_jobs);
  
    //stop condition
    if (current_number_of_jobs == total_number_of_jobs) {
    out["has_next_page"] = false;
    } else {
        clickable_elem.click();
      out["has_next_page"] = true;
    }

    //out.waitFor = 'span[aria-label="Next page"]';
    return out;
})();

// 9.2 POR NÚMEROS --------------------------------------------------------------//

(function () {     
    var out = {};
    var selector = "ul.pagination > li > a";  // selector donde esta la paginacion

  if (typeof pass_it == "undefined") pass_it = {};
    
  if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;
        
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == out["pass_it"].cont){                
                //msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
                out["has_next_page"] = true;
            }
        });  

    //out.waitFor = '';
    return out;
})();

// 9.3 PAG URL --------------------------------------------------------------//


(function () {
    var out  = {};
    //out.wait = 1000;
  
    var url_base           = "";
    var main_loop_selector = ""; // Selector que se usa en el step extract para iterar en el listado de jobs


    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 2,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  

  var perpage_fijo = 10;
  var perpage_actual = document.querySelectorAll(main_loop_selector).length;
    

    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
 if(perpage_actual < perpage_fijo){
    msg('\x1b[41m The pagination has finished \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
  //out.waitFor = "";
   //out["wait"] = true;
    return out;
})();


// 10. STRING TO DATE (POSTED AND CLOSED) 

    // DatePostedRaw  

    var timePosted = elem.querySelector("datePostedSelector").innerText;

        timePosted = timePosted.replace(/Stunden|Stunde/i,"hour");
        timePosted = timePosted.replace(/Tag|Tagen|jour|giorni/i,"day");
        timePosted = timePosted.replace(/Woche|Wochen/i,"week");
        timePosted = timePosted.replace(/Monat|Monate|mois/i,"month");
    
    
    if(timePosted.search(/hour/)>-1){

      let today   = new Date(),
          current_day   = today.getDate(),
          current_month = (today.getMonth()+1),
          current_year  = today.getFullYear();

      job.dateposted_raw  = current_month +"/"+  current_day +"/"+ current_year;
    }

    if(timePosted.search(/month|day/i)>-1){
        
  
            if(timePosted.search(/day/)>-1){

              var days_ago = timePosted;
                  days_ago = days_ago.replace(/[a-z]/gi,"");
                  days_ago = Number(days_ago);
             }

           if(timePosted.search(/month/)>-1){

            var month_to_days = timePosted.replace(/[a-z]/gi,"");
                month_to_days = Number(month_to_days);
                month_to_days = month_to_days * 30;
               var days_ago = month_to_days;

          }
          var currentDate = new Date();

          var day = currentDate.getDate();
              day = day - days_ago;
          currentDate.setDate(day);

          var postedDate = currentDate; // postedDate == fecha actual - los días de publicados 

          var postedDay   = postedDate.getDate(),
              postedMonth = postedDate.getMonth() + 1,
              postedYear  = postedDate.getFullYear();

          if(postedMonth < 10){postedMonth = "0" + postedMonth;} 
          if(postedDay < 10){postedDay = "0" + postedDay;} 

          job.dateposted_raw  =  postedMonth + "/" + postedDay + "/" + postedYear; // Formato de fecha para indexación. 
    }  


    // Date closed raw -------------------------------------------------------------------------------------------------//

      var timeToExpire = elem.querySelector("dateClosedSelector").innerText;
    
    
    if(timeToExpire.search(/hour/)>-1){

      let today   = new Date(),
          current_day   = today.getDate(),
          current_month = (today.getMonth()+1),
          current_year  = today.getFullYear();

      job.dateclosed_raw  = current_month +"/"+  current_day +"/"+ current_year;
    }

    if(timeToExpire.search(/month|day|week/i)>-1){

          if(timeToExpire.search(/week/)>-1){

            var week_to_days = timeToExpire.replace(/[a-z]/gi,"");
                week_to_days = Number(week_to_days);
                week_to_days = week_to_days * 7;
                var days_Left = week_to_days;

          }
        
  
            if(timeToExpire.search(/day/)>-1){

              var days_Left = timeToExpire;
                  days_Left = days_Left.replace(/[a-z]/gi,"");
                  days_Left = Number(days_Left);
             }

           if(timeToExpire.search(/month/)>-1){

            var month_to_days = timeToExpire.replace(/[a-z]/gi,"");
                month_to_days = Number(month_to_days);
                month_to_days = month_to_days * 30;
                var days_Left = month_to_days;

          }

          var currentDate = new Date();

          var day = currentDate.getDate();
              day = day + days_Left;
          currentDate.setDate(day);

          var closedDate = currentDate; // closedDate == fecha actual + los días de publicados 

          var closedDay   = closedDate.getDate(),
              closedMonth = closedDate.getMonth() + 1,
              closedYear  = closedDate.getFullYear();

          if(closedMonth < 10 && closedMonth.length <2){closedMonth = "0" + closedMonth;} 
          if(closedDay < 10 && closedDay.length <2){closedDay = "0" + closedDay;} 

          job.dateclosed_raw  =  closedMonth + "/" + closedDay + "/" + closedYear; // Formato de fecha para indexación. 
    }  



// 11. CODIGO DE APOYO RESUMIDO -------------------------------------------------------------------------------------------------------------------------------------//

/*

                            #1 TITLE
                            #2 LOCATION
                            #3 JOBTYPE
                            #4 E-MAIL
                            #5 URL
                            #6 VALIDACIONES
                            #7 EXPERIENCE
                            #8 ESPERAS
                            #9 DESCRIPTION ARRAY. Arreglo cuando la descripción está separada en distintos tags. EJ.: "Details" and "Benefits"
                            #10 AJAX CALL
                            #11 MÉTODO FILTER


*/

////////////////
// #1 TITLE  //
//////////////     

     job.title = job.title.trim().replace(/^\,/,"").trim();

     job.title   = job.title.trim();
     var firstCharTitle = job.title.charAt(0);
     if(firstCharTitle === "-" || firstCharTitle === "," || firstCharTitle === "("){job.title = job.title.slice(1).trim();}

    job.title = job.title.trim();
    let lastCharTitle = job.title.substr(job.title.length -1);
     if(lastCharTitle === "-"){job.title = job.title.slice(0,-1).trim();}


      //if(job.title.indexOf("")>-1){job.title =  "";} 
    
      job.title = job.title.replace(/[0-9]/g, '');

      job.title = job.title.replace(/\(.*?\)/g, '');

      job.title = job.title.replace(/\{.*?\}/g, '');

      job.title = job.title.replace(/\[.*?\]/g, '').trim();
               

              // Split - city 2

      if(job.location.indexOf(",")>-1){
         let city = job.location.split(",")[0].trim();
              var preClean = job.title.split(city).shift().trim();
               if(preClean.length > 10){
                   job.title = job.title.split(city).shift().trim();
                      let lastChar = job.title.substr(job.title.length -1);
                        if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                          job.title = job.title.slice(0,-1).trim();}
                        }else{
                          job.title = job.title.replace(city,"").trim();
                          job.title = job.title.trim().replace(/^\-|\–/,"").trim();
                        }
      }


/////////////////////
//  #2 LOCATION   //
///////////////////

    job.location = job.location.trim().replace(/^\;/,"").trim();

    job.location = job.location.trim();
    let lastChar = job.location.substr(job.location.length -1);
    if(lastChar === "-" || lastChar === "," || lastChar === "(" ){job.location = job.location.slice(0,-1).trim();}

    //Delete first hyphen "-" from location.  
    job.location  = job.location.trim();
    var firstCharLoc = job.location.charAt(0);
    if(firstCharLoc === "-"){job.location = job.location.slice(1).trim();}

    //Delete last hyphen "-" from location. 
    job.location    = job.location.trim();
    var lastCharLoc = job.location.substr(job.location.length -1);
     if(lastCharLoc === "-"){job.location = job.location.slice(0,-1).trim();}

 
    job.location = job.location.replace(/[0-9]/g, "");
    
    job.location = job.location.replace(/\(.*?\)/g, '');

    job.locaion  = job.location.replace(/\[.*?\]/g, ''); 

    job.locaion  = job.location.replace(/\<.*?\>/g, '');

    
    job.location = job.location.split("-").reverse().join(", ");




    //Location array "city, country"

    var city    = elem.querySelector("selectorDeLaCiudad");//.textContent.trim();
    var country = elem.querySelector("selectorDelPaís"); //.textContent.trim();
          
    var loc = "";
    var array_loc = Array();

    if(city !== null) array_loc.push(city);
    if(country !== null) array_loc.push(country);
          
    if(array_loc.length) loc = array_loc.join(", ");

  job.location = loc;

///////////////////
//  #3 JOBTYPE  //
/////////////////

      //----------Job-Type-Array()-------------------------------------------------------//

        var type   = elem.querySelector("selector").textContent.trim();
        var temps  = elem.querySelector("selector").textContent.trim();
         
        var jobType = "";
        var array_jobType = Array();

        if(type) array_jobType.push(type);
        if(temps) array_jobType.push(temps);
        if(array_jobType.length) jobType = array_jobType.join(" - ");

    job.source_jobtype = jobType;

    if(type.indexOf("CDI")>-1){job.source_jobtype = "CDI";}
    if(type.indexOf("CDD")>-1){job.source_jobtype = "CDD";}
    if(type.toLowerCase().indexOf("stage")>-1){job.source_jobtype =  "Stage";}
    if(type.toLowerCase().indexOf("alternance")>-1){job.source_jobtype =  "Alternance";}

    
    job.title = job.title.replace(/part time|full time|full\-time|part\-time/g,"").replace("()","").trim();

    job.title = job.title.replace(/stage/i,"").trim();
    job.title = job.title.replace(/alternance/i,"").trim();


        job.title = job.title.replace("(CDI)","").trim();
        job.title = job.title.replace("(CDD)","").trim();
        job.title = job.title.replace(/CDI/i,"").trim();
        job.title = job.title.replace(/CDD/i,"").trim();


/////////////////
// #4 E-MAIL  //
///////////////

 
    //To extract the string that contains email in job descriptions. 
    /*
    if(full_html.innerText.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    job.source_apply_email = full_html.innerText.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
    */

 //////////////
// #5 URL  //
////////////

/*

IMPORTANTE CONSULTAR "¿Qué es una URL?"

https://developer.mozilla.org/es/docs/Learn/Common_questions/Qu%C3%A9_es_una_URL

*/

// Methods

// encodeURIComponent();

// decodeURIComponent();

window.location.protocol + "//" + window.location.hostname + window.location.pathname;


var x  = window.location.protocol + "//" + window.location.hostname;

var org = window.location.origin;


     window.location.href       returns the href (URL) of the current page
     window.location.hostname   returns the domain name of the web host
     window.location.pathname   returns the path and filename of the current page
     window.location.protocol   returns the web protocol used (http: or https: ) 

(Tomado de https://www.w3schools.com/js/js_window_location.asp, NOV 28, 2019)


     if (job.html.indexOf('@') > -1) {  
  job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  }  if (job.html.indexOf('https') > -1) {  
    job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); 
  }  if (job.html.indexOf('http') > -1) {   job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('HTTPS') > -1) {   job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('HTTP') > -1) {   job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }



//////////////////////
// #6 VALIDACIONES //
////////////////////

    //if(job.title.search(//i)>-1){job.title = "";}
    if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
    jobs.push(job);
    }


 //////////////////
// #7 Experience //
//////////////////


    for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.search(/experience/i)>-1 && a.textContent.search(/[0-9]/g)>-1){
        job.experience_required = a.textContent;
      } 
    }


 ////////////////
// #8 ESPERAS //
////////////////

(function() {
var out = {};

//out["pic"] = true; // Se debe usar únicamente para evaluar el comportamiento del jobsite más NO COMO UNA ESPERA

//out.waitFor = '';
//out["wait"] = 200;

//out.iframeSelector = '';
//out.iframeWaitFor = '';

//location.reload(); // Refresh
return out;
})();



 //////////////////////////
// #9 DESCRIPTION ARRAY //
/////////////////////////
 
      var details  = document.querySelector("div.job-description");
      var benefits = document.querySelector("section.job-benefits");
          
      var job_description = "";
      var array_desc = Array();

      if(details !== null) array_desc.push(details.innerHTML);
      if(benefits !== null) array_desc.push(benefits.innerHTML);
          
      if(array_desc.length) job_description = array_desc.join("<br>");

      var desc      = job_description; // string
      var div       = document.createElement("div"); // Se crea un elemento HTML determinado  
      div.innerHTML = desc // Se setea el contenido HTML en la etiqueta div

     var full_html = div;



 //////////////////
// #10 AJAX CALL //
/////////////////

              // Convertir un string JS a un objeto iterable
                    var js_string        = json; 
                    //var htmlObject       = document.createElement("div");
                    //htmlObject.innerHTML = js_string

              //var parser = 
              var doc = new DOMParser().parseFromString(js_string, "text/html");
              // returns a HTMLDocument, which also is a Document.

                   // var html_jobs = htmlObject.querySelectorAll('li.clearfix.job'); 
              var html_jobs = doc.querySelectorAll('li.clearfix.job'); 

// Fuente de consulta: https://developer.mozilla.org/es/docs/Web/API/DOMParser

////////////////////////////////////////////////////////
 
  var str       = getDescription(job.url);
  var obj       = document.createElement("div");
  obj.innerHTML = str
  var desc = obj.querySelector("selector");



  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
   var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}

 ///////////////////////
// #11 MÉTODO FILTER //
//////////////////////
 



// Description cleanner

job.html = full_html.innerHTML.trim();

var obj = job.html.split("<br>");
job.html = obj.filter(removeHashTag).join("<br>");

function removeHashTag(arr_element) {
  return arr_element.search(/INDEED/gi)==-1;
}

// Location cleanner


let cut = ", ";
let obj = job.location.split(cut);
job.location = obj.filter(removeHashTag).join(cut);

function removeHashTag(arr_element) {
  return arr_element.search(/[0-9]]/g)==-1;
}


