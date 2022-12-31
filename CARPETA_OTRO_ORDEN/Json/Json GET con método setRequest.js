//Json Get con el método setRequestHeader()


//Url: https://recrutonsensemble.com/public/offers
//Spider: http://boo1.neuvoo.com/boo3-web/spider/add-step.php?style=dark&id=191947


//Extract

(function() {
  var out = {};
  var jobs = [];

  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  //  Selector pre is usually where the string of the json is
  var element = document.querySelector("pre").textContent;
  //  We parse the json so it can be worked
  var json = JSON.parse(element);
  //  Replace positionOfJobs for the path were are the jobs
  var json_jobs = json;

  for(i in json_jobs) {
    var job = {};/*init*/
    var elem = json_jobs[i];

    job.title = elem.title;
    job.location = elem.location.split("(").shift().trim();  
    if(job.location.length < 2) { job.location = "Marseille"; }
    job.location = job.location + ", FR";

    job.url = "https://recrutonsensemble.com/offers/"+ elem.id +"/show";  
    let tmpURL = 'https://recrutonsensemble.com/api/api/show/'+job.url.match(/\d+/)[0]+'/offer/visited'
    var fecha = elem.createdAtDateFormatted.split("/");
    job.dateposted_raw = fecha[1] +'/'+ fecha[0] +'/'+ fecha[2];

    job.html =  JSON.parse(getDescription(tmpURL)).offer.description

    //job.dateclosed_raw = elem.positionOfDateClosed;
    //job.source_jobtype = elem.positionOfJobtype;
    //job.source_salary = elem.positionOfSalary;         
    //job.source_empname = elem.positionOfEmpname;
    //job.logo = elem.positionOfLogo;
    //job.source_apply_email = elem.positionOfEmail;

    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    job.temp = "1";

    jobs.push(job);
  }

  out["jobs"]= jobs;
  return out;
})();

function getDescription(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, false); //URL del ajax que trae la información del job
  xhr.setRequestHeader("Accept", "application/json,application/xml");
  xhr.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Pragma", "no-cache");
  let response = "";
  xhr.onload = function () {
    if (xhr.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhr.responseText;
    }
  };
  xhr.send();
  return response;
}


// Jobdata


(function() {
  var out = {};
  var job = {};

  var job = pass_it["job"];

  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", job.url, false);
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");

  var hola = "";
  xhrrequest.onreadystatechange = function() {
    //return xhrrequest.status;
    //hola = "[Y]-> " + xhrrequest.status;
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      //console.log(xhrrequest.responseText);
    {
      //console.log(xhrrequest.responseText);
      hola = xhrrequest.responseText;
      //msg(hola);
      var json = JSON.parse(hola);

      //msg(json.openGraphAttributes.description);      

      job.html      = json.openGraphAttributes.description;

      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement("DIV");
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
    }
  };

  xhrrequest.send(); 

  out["html"] = true;

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