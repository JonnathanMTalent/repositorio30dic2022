// Mercury

//Extract

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("tbody > tr.SearchBoxRow");
  var jobs = [];
  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("a.SearchTitleLink").textContent.trim();
    job.url = window.location.href;
    job.reqid = elem.querySelector("td > div > div:nth-child(1) > span").textContent.replace("#","").trim();
    job.location = elem.querySelector('span[id*="LocationLabel"]').textContent.trim();

    if(elem.querySelector("td > div > span:nth-child(14)")){
      var posted = elem.querySelector("td > div > span:nth-child(14)").textContent.trim();
      posted = posted.split("Posted : ").pop().split("Closing:").shift().trim();  
      posted = posted.split("/");
      job.dateposted_raw = posted[1] +"/"+ posted[0] +"/"+ posted[2];
    }

    if(elem.querySelector("td > div > span:nth-child(14) > span")){
      var closed = elem.querySelector("td > div > span:nth-child(14) > span").textContent.trim().replace("Open Ended", "01/01/1991");
      closed = closed.split("Closing: ").pop().trim();  
      closed = closed.split("/");
      job.dateclosed_raw = closed[1] +"/"+ closed[0] +"/"+ closed[2];
    }

    //job.location = elem.querySelector("span:nth-child(5)").textContent.trim();
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector('span[id*="EmpTypeLabel"]').textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    //job.dateclosed_raw = monthJob+"/"+dia+"/"+ano;

    job.html 	= elem.querySelector("div.widget-body").innerHTML.trim();
    job.html 		= cleanHTML(job.html);

    job.html = removeTextBefore(job.html, "About the role", true);

    job.html = removeTextAfter(job.html, "Apply", true);
    job.html = removeTextAfter(job.html, "Recruitment agencies", true);

    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);

    
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
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    

    job.temp = 1;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
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




//Validaciones en el Extract y multilocation

(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("tr.SearchBoxRow > td > div.SearchBox");
  var jobs = [];
  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    var elem = html_jobs[x];

    if (elem.querySelector("img")) elem.querySelector("img").remove();

    var loc = elem.querySelector("span:nth-child(5)").textContent.trim();
    
    loc = loc.split(",")
    loc.forEach( function (element){      

      var job = {};
      job.title = elem.querySelector("a.SearchTitleLink").textContent.trim();
      job.url = window.location.href;
      job.location = element.trim()+", AU";
      if(job.location.indexOf("Time") > -1) {
        job.location = elem.querySelector("span:nth-child(6)").textContent.trim()+", AU";
      }
      if(job.location.indexOf("Casual") > -1) {
        job.location = elem.querySelector("span:nth-child(6)").textContent.trim()+", AU";
      }
      if(job.location.indexOf("Permanent") > -1) {
        job.location = elem.querySelector("span:nth-child(6)").textContent.trim()+", AU";
      }
      if(job.location.indexOf("Peel") > -1)
        job.location = "Peel, Western Australia, AU";

      if(elem.querySelectorAll("span:nth-child(14)").length > 0){
        var datec = elem.querySelector("span:nth-child(14)").textContent.trim().replace("Open Ended", "01/01/1991");

        datec = datec.split("Closing: ")[1];
        datec = datec.split("/");
        if(datec[1].indexOf("Jan") > -1){datec[1] = "01";}
        if(datec[1].indexOf("Feb") > -1){datec[1] = "02";}
        if(datec[1].indexOf("Mar") > -1){datec[1] = "03";}
        if(datec[1].indexOf("Apr") > -1){datec[1] = "04";}
        if(datec[1].indexOf("May") > -1){datec[1] = "05";}
        if(datec[1].indexOf("Jun") > -1){datec[1] = "06";}
        if(datec[1].indexOf("Jul") > -1){datec[1] = "07";}
        if(datec[1].indexOf("Aug") > -1){datec[1] = "08";}
        if(datec[1].indexOf("Sep") > -1){datec[1] = "09";}
        if(datec[1].indexOf("Oct") > -1){datec[1] = "10";}
        if(datec[1].indexOf("Nov") > -1){datec[1] = "11";}
        if(datec[1].indexOf("Dec") > -1){datec[1] = "12";}
        job.dateclosed_raw = datec[1]+"/"+datec[0]+"/"+datec[2];

        var datep1 = elem.querySelector("span:nth-child(14)").textContent.trim();
        datep1 = datep1.split("Posted : ").pop().split("Closing").shift();  
        datep1 = datep1.split("/");
        if(datep1[1].indexOf("Jan") > -1){datep1[1] = "01";}
        if(datep1[1].indexOf("Feb") > -1){datep1[1] = "02";}
        if(datep1[1].indexOf("Mar") > -1){datep1[1] = "03";}
        if(datep1[1].indexOf("Apr") > -1){datep1[1] = "04";}
        if(datep1[1].indexOf("May") > -1){datep1[1] = "05";}
        if(datep1[1].indexOf("Jun") > -1){datep1[1] = "06";}
        if(datep1[1].indexOf("Jul") > -1){datep1[1] = "07";}
        if(datep1[1].indexOf("Aug") > -1){datep1[1] = "08";}
        if(datep1[1].indexOf("Sep") > -1){datep1[1] = "09";}
        if(datep1[1].indexOf("Oct") > -1){datep1[1] = "10";}
        if(datep1[1].indexOf("Nov") > -1){datep1[1] = "11";}
        if(datep1[1].indexOf("Dec") > -1){datep1[1] = "12";}
        job.dateposted_raw = datep1[1]+"/"+datep1[0]+"/"+datep1[2];
      }
      //job.location = elem.querySelector("span:nth-child(5)").textContent.trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      //job.dateclosed_raw = monthJob+"/"+dia+"/"+ano;

      job.html 		= elem.querySelector("div.widget-body").innerHTML.trim();
      job.jobdesc 	= elem.querySelector("div.widget-body").textContent.trim();

      job.html 		= cleanHTML(job.html);
      job.jobdesc 	= cleanHTML(job.jobdesc);

      job.html = removeTextAfter(job.html, "Apply", true);
      job.jobdesc = removeTextAfter(job.jobdesc, "Apply", true);
      job.html = removeTextAfter(job.html, "How to apply", true);
      job.jobdesc = removeTextAfter(job.jobdesc, "How to apply", true);
      job.html = removeTextAfter(job.html, "If you have any questions regarding the role please contact", true);
      job.jobdesc = removeTextAfter(job.jobdesc, "If you have any questions regarding the role please contact", true);

      job.temp = 2;
      jobs.push(job);
    }, elem);
  } 

  out["jobs"]= jobs;
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

