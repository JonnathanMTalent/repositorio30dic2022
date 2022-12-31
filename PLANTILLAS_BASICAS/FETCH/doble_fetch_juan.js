//fetch limpia 
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://api.employeeworkplace.com/arna/job/search", {
            "headers": {
                "accept": "*/*",
                "accept-language": "es-ES,es;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "sec-ch-ua": "\"Opera GX\";v=\"89\", \"Chromium\";v=\"103\", \"_Not:A-Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://employeeworkplace.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{\"keywords\":null,\"campaignCode\":null,\"department\":null,\"erecruitid\":null,\"city\":null,\"state\":null,\"positionType\":null,\"postalCode\":null,\"distanceInMiles\":0,\"page\":${out.pass_it.cont},\"resultsPerPage\":\"100\",\"sortColumn\":\"DatePosted\",\"sortDirection\":\"desc\"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        });
        const data = await resp.json();
        out.pass_it.limit = data.totalResults
        for (let x = 0; x < data.searchResults.length; x++) {
            let elem = data.searchResults[x];
            let job = {};
            job.title = elem.title;
            job.source_jobtype = elem.positionType;
            job.reqid = elem.id;
            var dateAux = new Date(elem.expirationDate);
            job.dateclosed_raw = dateAux.toLocaleDateString("en-US");
            job.dateposted_raw = elem.datePosted.split(`-`).join(`/`);
            job.source_location = elem.city + elem.stateProvince + elem.country
            job.location = elem.city + `, ` + elem.stateProvince + `, ` + elem.country
            job.url = `https://employeeworkplace.com/jobs/${elem.brandCode}/${elem.id}`
            job.temp = `08/25/2022 Juan Bermudez`;
            const respHT = await fetch(`https://api.employeeworkplace.com/${elem.brandCode}/Job/Search/${elem.id}`, {
                "headers": {
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "accept-language": "es-ES,es;q=0.9",
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Opera GX\";v=\"89\", \"Chromium\";v=\"103\", \"_Not:A-Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site"
                },
                "referrer": "https://employeeworkplace.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "omit"
            });
            const dataHT = await respHT.json();
            if (dataHT.salaryLow < dataHT.salaryHigh) {
                job.source_salary = `$`+dataHT.salaryLow + ` - ` + `$`+dataHT.salaryHigh
            } else {
                job.source_salary = `$`+dataHT.salaryLow
            }
            var full_html = document.createElement(`div`);
            full_html.innerHTML = dataHT["description"];
            // msg(dataHT.description)
            if (full_html) {
                for (const a of full_html.querySelectorAll('p, span, li')) {
                    if (a.textContent.search(/@|http|www./ig) > -1) {
                        a.remove();
                    }
                }
                var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
                if (remove_selectors.length > 0) {
                    remove_selectors.forEach(remove_selector => {
                        for (const a of full_html.querySelectorAll(remove_selector)) {
                            a.remove();
                        }
                    });
                }
                if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                    return x
                };
                if (typeof msg == "undefined") msg = console.log;
                job.html = full_html.innerHTML.trim();
                //benefit
                if (full_html.textContent.search(/Employee Benefits:|Employee Benefits:/) > -1) {
                    job.source_benefit = full_html.textContent.trim();
                    job.source_benefit = removeTextBefore(job.source_benefit, `Employee Benefits:`, true);
                    job.source_benefit = removeTextBefore(job.source_benefit, `Employee Benefits`, true);
                    // job.source_benefit = removeTextBefore(job.source_benefit, ``, true); 
                    // job.source_benefit = removeTextBefore(job.source_benefit, ``, true); 
                    job.source_benefit = removeTextAfter(job.source_benefit, `Are you ready`, true);
                    // job.source_benefit = removeTextAfter(job.source_benefit, ``, true);
                    // job.source_benefit = removeTextAfter(job.source_benefit, ``, true);
                    // job.source_benefit = removeTextAfter(job.source_benefit, ``, true);
                    job.source_benefit = job.source_benefit.trim();
                }
                // msg(job.source_benefit)
                job.html = removeTextBefore(job.html, `If so, WE WANT YOU!`, true);
                job.html = removeTextBefore(job.html, `SUMMARY:`, true);
                //job.html = removeTextBefore(job.html, ``, false);
                //job.html = removeTextBefore(job.html, ``, false);
                //job.html = removeTextBefore(job.html, ``, false);
                job.html = removeTextAfter(job.html, `If this sounds like you`, true);
                job.html = removeTextAfter(job.html, `Are you ready`, true);
                job.html = removeTextAfter(job.html, `Please email`, true);
                job.html = removeTextAfter(job.html, `Please call`, true);
                job.html = removeTextAfter(job.html, `Please ask`, true);
                job.html = removeTextAfter(job.html, `We are looking to fill positions as soon as possible so`, true);
                // job.html = removeTextAfter(job.html, `What's next?`, true);
                job.html = removeTextAfter(job.html, `APPLY Today!`, true);
                job.html = removeTextAfter(job.html, `Call`, true);
                job.html = removeTextAfter(job.html, /\*Interested\?/, true);
                //job.html = removeTextAfter(job.html, ``, true);
                //job.html = removeTextAfter(job.html, ``, true);
                // job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);
            }
            jobs.push(job)
        }
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
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