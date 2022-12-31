(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.accordion__item');  // headQuarters= New York, NY
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('h3.accordion__title').textContent.trim();
        job.url =window.location.href;
        var urlDateposted=elem.querySelector('div.accordion__side a').href.trim()
        //job.location = elem.querySelector('').textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();

        var full_html = document.querySelector('div.accordion__main-txt');
        job.html = full_html.innerHTML.trim();
    
        //job.html = removeTextBefore(job.html, 'Requisitos:', false);
        //job.html = removeTextAfter(job.html, '¿Cómo Aplicar?', true);
    
        job.html = cleanHTML(job.html);
        job.jobdesc = removeTextBefore(job.html, 'Summary Role:', false);
        job.jobdesc = removeTextAfter(job.html, 'Equal Employment Opportunity', true);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        var full_html = getDescription(urlDateposted);
        var div = document.createElement("div");
        div.innerHTML = full_html;

        
        if(document.querySelector('script[type="application/ld+json"]')){
            // Extract text on the script
            var t=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
            var dto=t["@graph"][2].datePublished
            //convert text to json
           //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
           var date=dto.split("T").shift().split("-");
            var dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
          }


        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
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