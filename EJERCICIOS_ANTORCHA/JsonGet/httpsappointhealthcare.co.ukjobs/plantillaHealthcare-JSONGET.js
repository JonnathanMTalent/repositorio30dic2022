//infinite pagination
(function() {
    var out = {};
    out.pass_it = {
        "page": 1,
        "jobs": 0,
        "totalJobs": 0
    }
    return out;
})();

//extract
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    try {
        let jobs = [];
        const resp = await fetch(`https://unity.appointgroup.co.uk/api/search?dummy=0.9188393018609327&keywords=&sector=&location=&location_geo=&location_range=&salary=%7B%22min%22%3A0%7D&paginate=true&site=appointhealthcare.co.uk&page=${out.pass_it.page}`, {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site"
            },
            "referrer": "https://appointhealthcare.co.uk/",
            "method": "GET",
            "mode": "cors"
        });
        const dataJSON = await resp.json();
        const json_jobs = dataJSON.data.data;
        out.pass_it.totalJobs = dataJSON.data.total;
        for (let x = 0; x < json_jobs.length; x++) {
            let elem = json_jobs[x];
            let job = {};
            job.reqid = elem.jobRef;
            job.title = elem.title;
            let salaryValue = elem.baseSalary.split(/value":"|minValue":"/).pop().split('"').shift();
            let currency = elem.baseSalary.split('currency":"').pop().split('"').shift();
            let time = elem.baseSalary.split('unitText":"').pop().split('"').shift();
            job.source_salary = `${currency} ${salaryValue} ${time}`
            job.source_benefit = elem.jobBenefits;
            job.dateclosed_raw = elem.validThrough.split('-');
            job.dateclosed_raw = `${job.dateclosed_raw[1]}/${job.dateclosed_raw[2]}/${job.dateclosed_raw[0]}`;
            var dateAux = new Date(elem.created_at);
            job.dateposted_raw = dateAux.toLocaleDateString("en-US");
            for (let y = 0; y < elem.tags.length; y++) {
                if (elem.tags[y].id == '29') {
                    job.source_jobtype = elem.tags[y].name;
                }
            }
            job.source_location = elem.locations[0].address;
            job.location = job.source_location;
            job.url = `https://appointhealthcare.co.uk/job/${job.reqid}/`;

            job.html = elem.description;

            job.html = removeTextBefore(job.html, 'Right now, we are looking for a', false);
            job.html = removeTextBefore(job.html, 'About the role:', false);
            job.html = removeTextBefore(job.html, 'Home Information:', false);
            //job.html = removeTextBefore(job.html, '', false);
            //job.html = removeTextBefore(job.html, '', false);
            job.html = removeTextAfter(job.html, /How to Apply/, true);
            job.html = removeTextAfter(job.html, /for more information please contact:/, true);
            job.html = removeTextAfter(job.html, /For more information/, true);
            job.html = removeTextAfter(job.html, /Alternatively, you can text/, true);
            job.html = removeTextAfter(job.html, /How to apply:/, true);
            job.html = removeTextAfter(job.html, /If you are interested/, true);
            //job.html = removeTextAfter(job.html, //, true);
            //job.html = removeTextAfter(job.html, //, true);
            //job.html = removeTextAfter(job.html, //, true);

            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);


            //benefit
            if (job.jobdesc.search(/benefits|Benefits:/) > -1) {
                job.source_benefit = job.jobdesc;
                job.source_benefit = removeTextBefore(job.source_benefit, 'benefits', true);
                job.source_benefit = removeTextBefore(job.source_benefit, 'Benefits:', true);
                job.source_benefit = removeTextBefore(job.source_benefit, 'includes', true);
                job.source_benefit = removeTextAfter(job.source_benefit, 'Person Specification:', true);
                job.source_benefit = removeTextAfter(job.source_benefit, 'For more information', true);
                job.source_benefit = removeTextAfter(job.source_benefit, 'Alternatively, you can text', true);
                job.source_benefit = removeTextAfter(job.source_benefit, 'but is not limited to:', true);
                job.source_benefit = removeTextAfter(job.source_benefit, 'include;', true);
                // job.source_benefit = removeTextAfter(job.source_benefit, '', true);
                // job.source_benefit = removeTextAfter(job.source_benefit, '', true);

            }

            msg(job.source_salary)
            msg(job.source_benefit)
            jobs.push(job)
        }

        // var job = {}
        // job.title = 'x'
        // jobs.push(job)
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        console.log(err)
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

//pagination
(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.page += 1;
    out.has_next_page = false;
    out.pass_it.jobs +=15;
    if (out.pass_it.totalJobs > out.pass_it.jobs) {
        out.has_next_page = true;
    }
    msg(out.pass_it)
    return out;

})();