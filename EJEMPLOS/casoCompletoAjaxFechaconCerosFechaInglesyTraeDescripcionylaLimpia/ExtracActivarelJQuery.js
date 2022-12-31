(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('tr.data-row');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('span.jobTitle.hidden-phone a').textContent.trim();
        job.url = elem.querySelector('span.jobTitle.hidden-phone a').href.trim();
        job.location = elem.querySelector('td.colLocation.hidden-phone span.jobLocation').textContent.replace(/\d/g,"").replace(', ,',',').replace('PH candida','').trim();
        job.reqid = elem.querySelector('td.colShifttype.hidden-phone span.jobShifttype').textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        
        var full_html = getDescription(job.url);
        var div = document.createElement("div");
        div.innerHTML = full_html;
        
        //sacar las variables
        var date=div.querySelector('p.jobDate').textContent.split(':').pop().trim().replace(",","");
        
        
        job.dateposted_raw=formatDate(date," ",0,1,2);
        var desc = div.querySelector("div.jobDisplay");
        //msg("LO QUE HAY EN EL DESC ES: "+desc);
        
          job.html = desc.innerHTML.trim(); 
          job.jobdesc = removeTextBefore(job.html, 'Summary Role:', false);
          job.jobdesc = removeTextAfter(job.html, 'Equal Employment Opportunity', true);
          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);

    job.jobdesc   = cleanHTML(job.jobdesc);



        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

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

function formatDate(get_date, sC, pMes, pDia, pAno) {  //Ingreso String con fecha;caracter separador;posicion Mes, Dia y Año
    get_date = get_date.replace(/\,/g,"").trim();
    let monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
    let dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
    let dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
    typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
   return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
 }

