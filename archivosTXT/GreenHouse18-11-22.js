//Extract
(async () => {
    let out = {};
    //out["pass_it"] = pass_it;
    try {
        let jobs = [];
        let resp = await fetch(`https://api.greenhouse.io/v1/boards/${window.location.href.split('/').pop()}/jobs`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });
        //JSON.stringify(data)
        let data = await resp.json();
        let htmlJobs = data.jobs;
        //msg(data);
        //out.pass_it.limit = data.;
        for (let i in htmlJobs) {
            //for (let elem of htmlJobs) {
            let elem = htmlJobs[i];
            let job = {};
            job.reqid = elem.requisition_id;
            job.title = elem.title;
            job.url = elem.absolute_url;
            job.source_location = elem.location.name;
            job.location = job.source_location.replace(/Remote \-|or remote|remote|, remote|\/ remote/ig, '').trim();
            let dateAux = new Date(elem.updated_at);
            job.dateposted_raw = dateAux.toLocaleDateString("en-US");
            job.temp = 96;
            let multiloc_char = ' and ';
            if (job.location.search(multiloc_char) > -1) {
                for (let auxLoc of job.location.split(multiloc_char)) {
                    var jobx = {};
                    jobx = {
                        ...job
                    }
                    jobx.location = auxLoc.trim(); //Edit Location Here
                    jobs.push(jobx);
                }
            } else {
                job.location = job.location; //Edit Location Here
                jobs.push(job);
            }
        }
        out["jobs"] = jobs;
    } catch (err) {
        throw err;
    }
    return out;
})();
//JobData
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];
    var full_html = document.querySelector('div[id="content"]');
    if (full_html) {
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                }
            });
        }
        for (const a of full_html.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
        }
        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.replace(/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g, '').trim();
        //job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextAfter(job.html, '', true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
    out["job"] = job;
    return out;
})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}