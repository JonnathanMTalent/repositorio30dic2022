// before extract

(() => out = {
    waitFor: 'ul.postingsList'
})();

// extract

(function() {
    let out = {};
    let jobs = [];
    let html_jobs = [...document.querySelectorAll("ul.postingsList")];
    html_jobs.map(elem => {
        let job = {};
        job.title = elem.querySelector("table > tbody > tr > td").textContent.trim();
        job.url = window.location.href;
        job.reqid = elem.querySelector("table > tbody > tr > td:nth-child(2)").textContent.split(':').pop().trim();

        for (const a of elem.querySelectorAll("div > li")) {

            if (a.textContent.search(/Date Posted:/gi) > -1 && a.textContent.search(/\d{1,2}\/\d{1,2}\/\d{4}/gi) > -1) {
                job.dateposted_raw = a.textContent.match(/\d{1,2}\/\d{1,2}\/\d{4}/gi)[0];
            }

            if (a.textContent.search(/Closing Date:/gi) > -1 && a.textContent.search(/\d{1,2}\/\d{1,2}\/\d{4}/gi) > -1) {
                job.dateclosed_raw = a.textContent.match(/\d{1,2}\/\d{1,2}\/\d{4}/gi)[0];
            }

            if (a.textContent.search(/District:/gi) > -1) {
                job.source_location = a.textContent.split("District:").pop().replace("\n", "").trim();
                job.location = job.source_location.replace("Christina School District", "Newark, Delaware, US");
            } else if (a.textContent.search(/Location:/gi) > -1) {
                job.source_location = a.textContent.replace(/Location:|\n/gi, "").trim();
                job.location = job.source_location.replace("Christina School District", "Newark, Delaware, US");
            } else {
                job.source_location = "";
                job.location = "Newark, Delaware, US";
            }

        }

        var full_html = elem.querySelector("div > span[id^='DescriptionText']");
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;

        var remove_selectors = ["a", "script", "style", "img"];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                let salir
                do {
                    salir = false;
                    if (full_html.querySelector(remove_selector)) {
                        full_html.querySelector(remove_selector).remove();
                        salir = true;
                    }
                } while (salir);
            });
        }

        /*for (const a of full_html.querySelectorAll("")) {
          if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi) > -1) { //search, match, includes, indexOf can be used
            //if (a.textContent.search(/CV|resume|cover letter|curriculum/gi) > -1)
            job.source_apply_email = a.textContent.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0];
            //a.remove(); //removes the selector that contains the email
          }
        }*/

        job.html = full_html.innerHTML.replace(/&nbsp;/g, " ").trim();

        if (job.html.indexOf('@') > -1) job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi, "");
        if (job.html.indexOf('https') > -1) job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        if (job.html.indexOf('http') > -1) job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        if (job.html.indexOf('HTTPS') > -1) job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        if (job.html.indexOf('HTTP') > -1) job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        if (job.html.indexOf('www') > -1) job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
        if (job.html.indexOf('WWW') > -1) job.html = job.html.replace(/(WWW?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");

        job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextBefore(job.html, '', false);

        job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);
        //job.html = removeTextAfter(job.html, '', true);

        //job.html = cleanFromPointAtoB(job.html, "Qualified applicants must complete an online teaching application", "you must apply specifically for the Job ID listed for this position.");
        //job.html = cleanFromPointAtoB(job.html, "", "");

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        job.jobdesc = job.jobdesc.replace(/<[^>]*>?/g, "");

        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    });

    out.jobs = jobs;
    return out;
})();


function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) newHtml = newHtml + "<p>" + text + "</p>";
    }
    return newHtml;
}

function cleanFromPointAtoB(text, a, b) {
    if (text.indexOf(a) > -1 && text.indexOf(b) > -1) {
        let a_b = text.slice(text.indexOf(a), text.indexOf(b));
        text = text.replace(a_b, "").replace(b, "").trim();
    }
    return text;
}