(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("");
    var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("").textContent.trim();
    job.url = elem.querySelector("").href.trim();
    job.location = elem.querySelector("").textContent.trim();
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    if (job.location.indexOf("Locationso palabra clave, mas, more, etc") > -1) {  //si esta la palabra entrara a la descripcion
    var htmlJob = getDescription(job.url);
    var tmp = document.createElement("DIV");
    tmp.innerHTML = htmlJob;
    var jobdescLocs = tmp.querySelectorAll('SELECTOR_DE_MULTILOCATIONS');
    for (var z in jobdescLocs) {
    var jobx = {...job};
    jobx.location = jobdescLocs[z].textContent.trim();
    jobs.push(jobx);
    }
    } else {
    jobs.push(job);
    }
    }
    
    out["jobs"]= jobs;
    return out;
    })();
    function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
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