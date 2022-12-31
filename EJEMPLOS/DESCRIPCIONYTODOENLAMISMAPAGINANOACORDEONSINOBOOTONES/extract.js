//https://www.federspiel.lu/offres-demploi/
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.offres-block-links button.offre-link');
    var jobs = [];
    var cont=0;
    var descripciones=document.querySelectorAll("div.offres-block-tab div.offre-tab");
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.textContent.trim();
        job.url =window.location.href;
        job.location = "Bertrange,FR"
        job.source_location="";
        //atributo de cada titulo
        var desc=descripciones[cont].textContent.trim();
        //job.jobdesc=desc;

        // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    var full_html = descripciones[cont];
    job.html = full_html.innerHTML.trim();

    //job.html = removeTextBefore(job.html, 'Your Future Role', false);
    job.html = removeTextAfter(job.html, 'NOM', true);
    job.html = removeTextAfter(job.html, 'Lettre de motivation', true);
    job.html = removeTextAfter(job.html, 'Veuillez faire votre', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);




        // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        /*
        var atributo=elem.querySelector('div.offres-block-links button.offre-link')[0].getAttribute('data-attr');
        // aqui esta el atributo de cada descripcion
        document.querySelectorAll("div.offres-block-tab div.offre-tab")[0].getAttribute("id");
        document.querySelectorAll("div.offres-block-tab div.offre-tab")[8].textContent.trim();
        job.jobdesc=elem.querySelector('div[class*="offre-tab active"]');
        */
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        cont++;
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