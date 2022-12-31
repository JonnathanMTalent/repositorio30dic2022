(async () => {
    let out = {};
    let jobs = [];
    try {
        const fetchPro = fetch("https://martins.gupy.io/");
        const resp = await fetchPro;
        // console.log(resp);
        let data = await resp.text();
        //console.log(data);
        //div = document.createElement("div");
        //div.innerHTML = data;
        const stringToHTML = (str) =>
            new DOMParser().parseFromString(str, "text/html").body;
        let div = stringToHTML(data);
        let full_html = Array.from(div.querySelectorAll('li[data-testid="job-list__listitem"]')); // job selecetor
        let full_html_aux = Array.from(div.querySelectorAll('tr[data-type*="employee"]')); // job selecetor
        console.log(full_html);
        if (full_html.length > 0) {
            for (const [index, elem] of Object.entries(full_html)) {
                let job = {};
                job.title = elem.querySelector('a > div > div').textContent.trim();
                job.url = elem.querySelector('a').href.trim();
                job.source_location = elem.querySelector('a > div > div:nth-child(2)').textContent.trim();
                job.location = elem.querySelector('a > div > div:nth-child(2)').textContent.replace("/", ", ").trim();
                if (!job.location) job.location = "Uberlândia, MG";
                //job.dateposted_raw = elem.querySelector("").textContent.trim();
                //job.dateclosed_raw = elem.querySelector("").textContent.trim();
                //job.logo = elem.querySelector("").getAttribute("src").trim();
                //job.source_apply_email = elem.querySelector("").textContent.trim();
                //job.source_empname = elem.querySelector("").textContent.trim();
                job.source_jobtype = elem?.querySelector("a > div > div:nth-child(3)").textContent.trim();
                //job.source_salary = elem.querySelector("").textContent.trim();
                //job.experience_required = elem.querySelector("").textContent.trim();
                job.reqid = job.url.split("/").pop().split("?")[0].trim();
                //job.source_benefit
                job.temp = "2022-26-9";
                jobs.push(job);
            }
        } else if (full_html_aux.length > 0) {
            for (const [index, elem] of Object.entries(full_html_aux)) {
                let job = {};
                job.title = elem.querySelector('h4').textContent.trim();
                job.url = elem.querySelector('a').href.trim();
                job.source_location = elem.querySelector('td:nth-child(2)').textContent.trim();
                job.location = elem.querySelector('td:nth-child(2)').textContent.replace("/", ", ").trim();
                if (!job.location) job.location = "Uberlândia, MG";
                //job.dateposted_raw = elem.querySelector("").textContent.trim();
                //job.dateclosed_raw = elem.querySelector("").textContent.trim();
                //job.logo = elem.querySelector("").getAttribute("src").trim();
                //job.source_apply_email = elem.querySelector("").textContent.trim();
                //job.source_empname = elem.querySelector("").textContent.trim();
                job.source_jobtype = elem?.querySelector("td:nth-child(3)").textContent.trim();
                //job.source_salary = elem.querySelector("").textContent.trim();
                //job.experience_required = elem.querySelector("").textContent.trim();
                job.reqid = job.url.split("/").pop().split("?")[0].trim();
                //job.source_benefit
                job.temp = 95;
                jobs.push(job);
            }
        }
        console.log(jobs);
    } catch (error) {
        console.error(error);
        throw error;
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
    out["jobs"] = jobs;
    return out;
})();




// JOBDESCRIPTION


(function() {
    var out = {};
    var job = {};
    var selector = "body";
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    // To Remove selectors
    for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
        if (a) {
            a.remove();
        }
    }
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    //----------------------------------------------------------------------//
    for (const a of document.querySelectorAll('body')) {
        if (a.textContent.includes("Aqui você tem:")) {
            job.source_benefit = a.textContent.split("Aqui você tem:").pop().split("#")[0].trim();
            //msg(job.source_benefit)
        }
    }
    for (const a of document.querySelectorAll('body')) {
        if (a.textContent.includes("AQUI VOCÊ TEM:")) {
            job.source_benefit = a.textContent.split("AQUI VOCÊ TEM:").pop().split("#")[0].trim();
            //msg(job.source_benefit)
        }
    }
    //----------------------------------------------------------------------//


    for (const a of full_html.querySelectorAll('p')) { // Varios p
        const text = a.textContent.trim();
        if (text.search(/ klick| solliciteren| solliciteer| cv| tel.| vragen| formulier| contact|mailen|www.|@|https/i) > -1) a.remove();
    }
    //----------------------------------------------------------------------//
    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, "Job description", false);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html = removeTextAfter(job.html, "#vemsergentemartins", true);

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
  
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
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