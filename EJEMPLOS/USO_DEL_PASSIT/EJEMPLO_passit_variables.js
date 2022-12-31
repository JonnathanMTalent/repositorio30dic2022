//BEFORE EXTRACT   SCANID=137768

//https://www.beechenghiang.com.sg/careers/

(function () {
    var out = {};
    var selector_jobs = 'div[class="job-data-row"]';
    var selector_desc = 'div[class="fc-modal-content"]';
    var selector_click_Job = 'div[class="job-data-row"] h4';

    if (typeof pass_it == "undefined")
        pass_it = {};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "salir": false,
            "selector_jobs": selector_jobs,
            "selector_click_Job": selector_click_Job,
            "selector_desc": selector_desc


        };
    } else {
        out["pass_it"] = pass_it;
    }
    msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length);
    var elemento = out["pass_it"]["selector_jobs"];
    var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]];
    if (elem) {

        var title = elem.querySelector("h4").textContent.trim();
        /*var dateposted_raw = elem.parentNode.parentNode.querySelector("td:nth-child(3)").textContent.split("/");
        dateposted_raw = dateposted_raw[1] + "/" + dateposted_raw[0] + "/" + dateposted_raw[2];
        var dateclosed_raw = elem.parentNode.parentNode.querySelector("td:nth-child(4)").textContent.split("/");
        dateclosed_raw = dateclosed_raw[1] + "/" + dateclosed_raw[0] + "/" + dateclosed_raw[2];*/
        var url = window.location.href;
        var location = 'Puchong, Selangor';
        var source_location = '';


        /*var fecha = elem.querySelector("").textContent.trim().split("/");
                                            var dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //var dateposted_raw = elem.querySelector("").textContent.trim();
        //var dateclosed_raw = elem.querySelector("").textContent.trim();		
        //var logo = elem.querySelector("").getAttribute("src").trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();
        //var source_empname = elem.querySelector("").textContent.trim();
        //var source_jobtype = elem.querySelector("").textContent.trim();
        //var source_salary = elem.querySelector("").textContent.trim();


        out["pass_it"]["title"] = title;
        out["pass_it"]["location"] = location;
        out["pass_it"]["url"] = url;
        out["pass_it"]["source_location"] = source_location;
        //out["pass_it"]["dateposted_raw"] = dateposted_raw;
        //out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
        //out["pass_it"]["logo"] = logo;
        //out["pass_it"]["source_apply_email"] = source_apply_email;  
        //out["pass_it"]["source_empname"] = source_empname; 
        //out["pass_it"]["source_jobtype"] = source_jobtype;
        //out["pass_it"]["source_salary"] = source_salary;   


        if (typeof (selector_click_Job) == 'undefined') {
            elem.click();
            out.waitFor = out["pass_it"]["selector_desc"];
        } else {
            elem.querySelector(selector_click_Job).click();
            out.waitFor = out["pass_it"]["selector_desc"];
        }

    } else {
        msg("EN EL FALSE DE BEFORE");
        msg(elemento);
        msg(elem);
        out["pass_it"]["salir"] = true;
    }


    return out;
})();


//  EXTRACT

(function () {

    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;
    if (out["pass_it"]["salir"]) {
        var job = {};
        job.title = 'ghost';
        jobs.push(job);
    } else {

        // msg(out["pass_it"]["selector"]);
        if (document.querySelector(out["pass_it"]["selector_desc"])) {
            var job = {};
            var remove_selectors = ["a", "script", "style"];


            job.title = out["pass_it"]["title"];
            job.location = out["pass_it"]["location"];
            job.url = out["pass_it"]["url"];
            job.source_location = out["pass_it"]["source_location"];
            //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
            //job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];
            //job.logo = out["pass_it"]["logo"];
            //job.source_apply_email = out["pass_it"]["source_apply_email"];
            //job.source_empname = out["pass_it"]["source_empname"];
            //job.source_jobtype = out["pass_it"]["source_jobtype"];
            //job.source_salary = out["pass_it"]["source_salary"];


            var full_html = document.querySelector(out["pass_it"]["selector_desc"]);
            // remove something from the jobdatata
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

            job.html = full_html.innerHTML.trim();
            //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
            //job.html = removeTextAfter(job.html, 'Application Instructions', true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);

            job.temp = '05/12/2022';
            jobs.push(job);

        } else
            msg("en el else");
    }
    //out["pic"] = true;
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


// PAGINATION

(function () {
    var out = {};

    out["pass_it"] = pass_it;
    out["pass_it"].cont += 1;


    //window.location.href = 'https://britishlibrary.recruitment.zellis.com/birl/pages/searchResults.jsf';
    //window.history.back();
    if (document.querySelector('img[alt="Close"]')) {
        document.querySelector('img[alt="Close"]').click();
    }


    if (out["pass_it"]["salir"])
        out["has_next_page"] = false;
    else
        out["has_next_page"] = true;

    out.waitFor = out["pass_it"]["selector_jobs"];
    //out["wait"] = true;
    return out;
})();

//