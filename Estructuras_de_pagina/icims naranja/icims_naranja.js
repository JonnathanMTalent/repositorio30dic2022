ACTUALIZADO

// DOS FORMAS DE EXTRAC, 
(function () {
    var jobs = [];
    var out = {};
    out.pass_it = pass_it.offSet ? pass_it : {
        "offSet": 0,
        "limit": 0
    }
    var counter = 0;
    var limit = 0;
    var json;
    
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
    //do {
    //var data = {};
    $.ajax({
        url: 'https://encareers-cmh.icims.com/jobs/search?mobile=false&width=895&height=500&bga=true&needsRedirect=false&jan1offset=-300&jun1offset=-300&in_iframe=1',
        headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "iframe",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "upgrade-insecure-requests": "1"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
            json = document.createElement('div');
            json.innerHTML = result;
            msg('El  json es : '+json);
            if (out.pass_it.limit == 0)
                if (json.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child'))
                    out.pass_it.limit = json.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child').href.split('pr=').pop().split('&').shift().trim();
            //msg('Counter: ' + out.pass_it.offSet + '\nLimit: ' + out.pass_it.limit);
            //var iframeDocument = json.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
            msg(json);
            var html_jobs = json.querySelectorAll('div[class*="iCIMS_JobsTable"] > div[class="row"]');
            for (var x in html_jobs) {
                if (typeof html_jobs[x] == "function") continue;
                if (typeof html_jobs[x] == "number") continue;
                var job = {};
                var elem = html_jobs[x];
      job.title    = elem.querySelector('div.col-xs-12.title > a > h2').textContent.trim();
      job.url      = elem.querySelector('a').href.trim() + "&mode=job&iis=Neuvoo";
      job.location = 'Cambridge, ON, CA';
	  job.reqid = elem.querySelector('div.col-xs-12.additionalFields dl div:nth-child(1) dd').textContent.trim();
      job.source_jobtype = elem.querySelector('div.col-xs-12.additionalFields dl div:nth-child(2) dd').textContent.trim();
//       //job.source_salary  = elem.querySelector('').textContent.trim();
//       //job.experienced_required = elem.querySelector('').textContent.trim();
//       //job.source_empname     = elem.querySelector('').textContent.trim();
//       //job.logo               = elem.querySelector('').getAttribute("src").trim();
//       //job.source_apply_email = elem.querySelector('').textContent.trim();
      var datePosted     = elem.querySelector("div.col-xs-12.additionalFields dl div:nth-child(4) dd span").textContent.trim();
      job.dateposted_raw =formatDate(datePosted);
    //   var dateClosed     = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(4) > dd > span').textContent.trim();
    //  if(dateClosed.split('/')[2]!=null){
    //     job.dateclosed_raw = getDateFormat(dateClosed,"/",1,0,2);
    //     job.dateclosed_raw=formatDate(job.dateclosed_raw);
    //  }  
	  job.temp  = "4546";
	  
	      //     ████████████████████████████████████████████████████████████████████  /*  
//poner después del temp
$.ajax({
    //poner acá la URL
    url: job.url.split('?').shift() + '?in_iframe=1', 
    headers: {
        //poner acá los headers
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
    },
    type: 'GET',
    //poner acá el tipo de peticion JSON, HTML
    dataType: "html",
    async: false,
    success: function(resultD) {
    
    
        //poner acá las variable que se van a extraer de la descripcion
        var jsonDesc = resultD
        //msg(jsonDesc)
    
        //var selector = 'div[class="position-job-description"]';
        //var remove_selectors = ['img', 'video', 'button', 'input', 'style', 'javascript', 'script'];
        var div = document.createElement("div");
    
        div.innerHTML = jsonDesc;
    
        // msg(div.innerHTML)
    var desc = div.querySelector('div[class="iCIMS_JobContent"]');
    // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
   var full_html=desc;
                for (const a of full_html.querySelectorAll('dt')) {
                    if (a.textContent.search(/Type|Job Classification/ig) > -1) {
                        if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i)) {
                            job.source_jobtype = a.nextElementSibling.textContent.trim();
                            a.nextElementSibling.remove();
                            a.remove();
                        }
                    }
                    if (a.textContent.search(/Minimum Pay/ig) > -1) {
                        if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/[1-9]/)) {
                            job.source_salary = a.nextElementSibling.textContent.trim();
                            a.nextElementSibling.remove();
                            a.remove();
                        }
                    }
                    if (a.textContent.search(/Maximum Pay/ig) > -1) {
                        if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/[1-9]/)) {
                            job.source_salary += ' - ' + a.nextElementSibling.textContent.trim();
                            a.nextElementSibling.remove();
                            a.remove();
                        }
                    }

                }
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
    
    
    
        // job.jobdesc = cleanHTML(job.jobdesc);
    
    
    },
    error: function(error) {
        msg(error);
    }
    });
    
    //*/// ████████████████████████████████████████████████████████████████████
	  jobs.push(job);
                // }
            }
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter <= limit);
    out["jobs"] = jobs;
    return out;
})();

// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
// ************************************************************************************








// DOS FORMAS DE EXTRAC, 
(function () {
    var jobs = [];
    var out = {};
    out.pass_it = pass_it.offSet ? pass_it : {
        "offSet": 0,
        "limit": 0
    }
    var counter = 0;
    var limit = 0;
    var json;
    
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
    //do {
    //var data = {};
    $.ajax({
        url: 'https://encareers-cmh.icims.com/jobs/search?mobile=false&width=895&height=500&bga=true&needsRedirect=false&jan1offset=-300&jun1offset=-300&in_iframe=1',
        headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "iframe",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "upgrade-insecure-requests": "1"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
            json = document.createElement('div');
            json.innerHTML = result;
            if (out.pass_it.limit == 0)
                if (json.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child'))
                    out.pass_it.limit = json.querySelector('div[class="iCIMS_Paging text-center"] > a:last-child').href.split('pr=').pop().split('&').shift().trim();
            //msg('Counter: ' + out.pass_it.offSet + '\nLimit: ' + out.pass_it.limit);
            //var iframeDocument = json.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
            var html_jobs = json.querySelectorAll('div[class*="iCIMS_JobsTable"] > div[class="row"]');
            for (var x in html_jobs) {
                if (typeof html_jobs[x] == "function") continue;
                if (typeof html_jobs[x] == "number") continue;
                var job = {};
                var elem = html_jobs[x];
      job.title    = elem.querySelector('div.col-xs-12.title > a > h2').textContent.trim();
      job.url      = elem.querySelector('a').href.trim() + "&mode=job&iis=Neuvoo";
      job.location = 'Cambridge, ON, CA';
	  job.reqid = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(1) > dd > span').textContent.trim();
      job.source_jobtype = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(2) > dd > span').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();
      //job.experienced_required = elem.querySelector('').textContent.trim();
      //job.source_empname     = elem.querySelector('').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
      var datePosted     = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").split(" ").shift().trim();
      job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
      job.dateposted_raw =formatDate(job.dateposted_raw);
      var dateClosed     = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(4) > dd > span').textContent.trim();
     if(dateClosed.split('/')[2]!=null){
        job.dateclosed_raw = getDateFormat(dateClosed,"/",1,0,2);
        job.dateclosed_raw=formatDate(job.dateclosed_raw);
     }  
	  job.temp  = "4546";
	  jobs.push(job);
                // }
            }
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter <= limit);
    out["jobs"] = jobs;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
      dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

          if (day < 10 && day.length < 2) {day = "0" + day;}

          if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec/i)>-1){month = "12";}
          }
  var datum = month +"/"+  day +"/"+ year;
	   
      return datum;
  }






//  (function() {
//   var out = {};
//     var iframe_selector = "#icims_iframe_span > iframe";
//     var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
//     var html_jobs = iframeDocument.querySelectorAll(".iCIMS_JobsTable > div.row"); 

//       //var html_jobs = document.querySelectorAll("");
//       var jobs = [];
//       for(var x in html_jobs){
//       if(typeof html_jobs[x] =="function") continue;
//       if(typeof html_jobs[x] =="number") continue;
//       var job  = {};
//       var elem = html_jobs[x];
//       job.title    = elem.querySelector('div.col-xs-12.title > a > h2').textContent.trim();
//       job.url      = elem.querySelector('a').href.trim() + "&mode=job&iis=Neuvoo";
//       job.location = 'Cambridge, ON, CA';
// 	  job.reqid = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(1) > dd > span').textContent.trim();
//       job.source_jobtype = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(2) > dd > span').textContent.trim();
//       //job.source_salary  = elem.querySelector('').textContent.trim();
//       //job.experienced_required = elem.querySelector('').textContent.trim();
//       //job.source_empname     = elem.querySelector('').textContent.trim();
//       //job.logo               = elem.querySelector('').getAttribute("src").trim();
//       //job.source_apply_email = elem.querySelector('').textContent.trim();
//       var datePosted     = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").split(" ").shift().trim();
//       job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
//       var dateClosed     = elem.querySelector('div.col-xs-12.additionalFields > div > dl:nth-child(4) > dd > span').textContent.trim();
//      if(dateClosed.split('/')[2]!=null){
//         job.dateclosed_raw = getDateFormat(dateClosed,"/",1,0,2);
//      }  
// 	  job.temp  = "J-2021";
//       jobs.push(job);
//       }                
//     out["jobs"]= jobs;
//     return out;
// })();
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
      dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

          if (day < 10 && day.length < 2) {day = "0" + day;}

          if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec/i)>-1){month = "12";}
          }
  var datum = month +"/"+  day +"/"+ year;
	   
      return datum;
  }


  //DOS FORMAS DE DESCRIPCION

  (function () {
    var out = {};
    var job = {};
    var json;

    $.ajax({
        url: window.location.href.split('?').shift() + '?in_iframe=1',
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
            json = document.createElement('div');
            json.innerHTML = result;
            var full_html = json.querySelector('div[class="iCIMS_JobContent"]');

            if (full_html) {

                for (const a of full_html.querySelectorAll('p, span, li')) {
                    if (a.textContent.search(/@|http|www./ig) > -1) {
                        a.remove();
                    }
                    if (a.textContent.search(/Starting rate/ig) > -1) {
                        job.source_salary = '$' + a.textContent.split('$').pop().replace(/\*/g, '').trim();
                        a.remove();
                    }
                }

                for (const a of full_html.querySelectorAll('dt')) {
                    if (a.textContent.search(/Type|Job Classification/ig) > -1) {
                        if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i)) {
                            job.source_jobtype = a.nextElementSibling.textContent.trim();
                            a.nextElementSibling.remove();
                            a.remove();
                        }
                    }
                    if (a.textContent.search(/Minimum Pay/ig) > -1) {
                        if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/[1-9]/)) {
                            job.source_salary = a.nextElementSibling.textContent.trim();
                            a.nextElementSibling.remove();
                            a.remove();
                        }
                    }
                    if (a.textContent.search(/Maximum Pay/ig) > -1) {
                        if (a.nextElementSibling.textContent.trim() != '' && a.nextElementSibling.textContent.match(/[1-9]/)) {
                            job.source_salary += ' - ' + a.nextElementSibling.textContent.trim();
                            a.nextElementSibling.remove();
                            a.remove();
                        }
                    }

                }

                var remove_selectors = ['div[class="iCIMS_JobHeaderGroup"]', 'div[class="iCIMS_Logo"]', 'div[class="iCIMS_PageFooter"]', 'div[class="iCIMS_JobOptions"]', 'a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

                if (remove_selectors.length > 0) {
                    remove_selectors.forEach(remove_selector => {
                        for (const a of full_html.querySelectorAll(remove_selector)) {
                            a.remove();
                        }
                    });
                }

                if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
                if (typeof msg == "undefined") msg = console.log;

                job.html = full_html.innerHTML.trim();

                job.html = removeTextBefore(job.html, 'Overview', false);
                job.html = removeTextAfter(job.html, /Need help finding the right job\?|\#[A-Z]/ig, true);

                job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);
                
            } 
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










//  (function() {
// var out = {};
// var job = {};

// var selector = "div.iCIMS_JobContent";
  
// var iframe_selector = "#icims_content_iframe";
// var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
 
// var remove_selectors = ["a","a","a"];
//   //var job = pass_it["job"];
  
  
//   if(iframeDocument.querySelector(selector)){

//   //------------INFO----------------------------------------------------------//

//   // job.reqid                = iframeDocument.querySelector('').textContent.trim();
//   // job.location             = iframeDocument.querySelector('').textContent.trim();
//   // job.source_jobtype       = iframeDocument.querySelector('').textContent.trim();
//   // job.source_salary        = iframeDocument.querySelector('').textContent.trim();
//   // job.experienced_required = iframeDocument.querySelector('').textContent.trim();

//   //var datePosted     = iframeDocument.querySelector('').textContent.trim();
//   //job.dateposted_raw = getDateFormat(datePosted,"",0,1,2);
  
//   //var dateClosed     = iframeDocument.querySelector('').textContent.trim();
//   //job.dateclosed_raw = getDateFormat(dateClosed,"",0,1,2);


//   //--------------------------------------------------------------------------//

// var full_html = iframeDocument.querySelector(selector);
// // remove something from the jobdatata
// if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
// if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
// if (typeof msg == "undefined") msg = console.log;



//   var full_html_text = full_html.textContent;
  
  
//   for (const a of full_html.querySelectorAll('p')) {
//     if (a.textContent.includes('https:')){ //can us search or match methods
//       a.remove(); //if you want to remove this selector
//     } 
//   }
   
//   for (const a of full_html.querySelectorAll('p')) {
//     if (a.textContent.includes('indeed')){ //can us search or match methods
//       a.remove(); //if you want to remove this selector
//     } 
//   }   

//   /*
//     for (const a of full_html.querySelectorAll('li')) {
//       if (a.textContent.includes('Type')){ //can us search or match methods
//         job.location = a.textContent.trim(); //.split(':').pop(); //another querySelector if needed
//         //a.remove(); //if you want to remove this selector
//       } 
//     }
  
// */
//   if(full_html_text.search(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
//     job.source_apply_email = full_html_text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
//   }


// job.html    = full_html.innerHTML.trim();
// job.jobdesc = full_html.textContent.trim();

//   job.html = removeTextBefore(job.html, "Overview", false);
//   //job.html = removeTextBefore(job.html, "", false);
//   //job.html = removeTextBefore(job.html, "", false);
//   //job.html = removeTextBefore(job.html, "", false);
//   //job.html = removeTextBefore(job.html, "", false);

//   job.html = job.html.split("Options")[0];
//   //job.html = job.html.split("Connect With Us!")[0];
//   //job.html = job.html.split("")[0];
//   //job.html = job.html.split("")[0];
//   //job.html = job.html.split("")[0];

// /*
//   if(job.html.indexOf("-")>-1 && job.html.indexOf("")>-1){
        
//     let a = job.html.indexOf("");
//     let b = job.html.indexOf("");
//     let x = job.html.slice(a,b);
//     job.html = job.html.replace(x,"").trim();
//   }
// */
 
  
//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");
//   //job.html = job.html.replace("","");

  

//   //var title = pass_it["job"].title;
//   //job.html  = job.html.replace(title,"");

//   //CLEAN EMOJIS
//   //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();


// job.html    = cleanHTML(job.html);
// job.jobdesc = job.html;

//   if(job.html.length < 200){
//       job.flag_active =  0;
//       job.html        = "Jobdata not available";
//       job.jobdesc     = "";
//   }


//   }else{
   
//       job.flag_active =  0;
//       job.html        = "Jobdata not available";
//       job.jobdesc     = "";

// }

// out["job"] = job;
// return out;

// })();

// function removeTextBefore(html, text, flag) {
// var newHtml = html;
// if (newHtml.indexOf(text) > -1) {
// newHtml = newHtml.split(text).pop();
// if (!flag) {
// newHtml = text + " " + newHtml;
// }
// }
// return newHtml;
// }

// function removeTextAfter(html, text, flag) {
// var newHtml = html;
// if (newHtml.indexOf(text) > -1) {
// newHtml = newHtml.split(text).shift();
// if (!flag) {
// newHtml = newHtml + "<p>" + text + "</p>";
// }
// }
// return newHtml;
// }

// function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
//       dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
          
//         let day   =  dateRaw.split(cut)[dayPosition].trim(), 
//             month =  dateRaw.split(cut)[monthPosition].trim(), 
//             year  = dateRaw.split(cut)[yearPosition].trim();

//           if (day < 10 && day.length < 2) {day = "0" + day;}

//           if(dateRaw.search(/[a-z]/gi)>-1){ 
//             if(month.search(/jan/i)>-1){month = "01";}
//             if(month.search(/feb|fév/i)>-1){month = "02";}
//             if(month.search(/mar/i)>-1){month = "03";}
//             if(month.search(/apr|avr/i)>-1){month = "04";}
//             if(month.search(/may|mai/i)>-1){month = "05";}
//             if(month.search(/jun|juin/i)>-1){month = "06";}
//             if(month.search(/jul|juil/i)>-1){month = "07";}
//             if(month.search(/aug|août/i)>-1){month = "08";}
//             if(month.search(/sep/i)>-1){month = "09";}
//             if(month.search(/oct/i)>-1){month = "10";}
//             if(month.search(/nov/i)>-1){month = "11";}
//             if(month.search(/dec/i)>-1){month = "12";}
//           }
//   var datum = month +"/"+  day +"/"+ year;
	   
//       return datum;
//   }