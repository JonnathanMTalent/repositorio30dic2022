(function() {
    var out = {};
    var html_jobs = document.querySelector('div[class="elementor-element elementor-element-aac6c55 elementor-widget elementor-widget-theme-post-content"] div[class="elementor-widget-container"]');
    var jobs = [];
    const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
        var job = {};
        job.title = html_jobs.querySelectorAll('h2')[0].textContent.trim();
        job.url =window.location.href;
        job.location = "Magdalena, guatemala";//headQuarters;
        var date=document.querySelector('span[class="elementor-icon-list-text elementor-post-info__item elementor-post-info__item--type-date"]').textContent.trim().replace(',','').split(' ').join().split(',,').pop().split(','); 
        job.dateposted_raw=formatDate(date);
/*
        job.jobdesc=document.querySelector("div[class='elementor-element elementor-element-aac6c55 elementor-widget elementor-widget-theme-post-content']").textContent.trim();
        job.jobdesc = removeTextBefore(job.jobdesc,'Requisitos:', false);
        job.jobdesc = removeTextAfter(job.jobdesc,'¿Cómo Aplicar?', true);
        job.jobdesc=cleanHTML(job.jobdesc);
*/
        
        
    var full_html = document.querySelector("div[class='elementor-element elementor-element-aac6c55 elementor-widget elementor-widget-theme-post-content']");
    job.html = full_html.innerHTML.trim();

    job.html = removeTextBefore(job.html, 'Requisitos:', false);
    job.html = removeTextAfter(job.html, '¿Cómo Aplicar?', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    

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