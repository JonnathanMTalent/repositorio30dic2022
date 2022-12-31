(async () => {
    const out = {};
    const jobs = [];
    if (!pass_it.count) {
        out.pass_it = {
            count: 1,
            limit: 0,
        };
    } else {
        out.pass_it = pass_it;
    }
    const urlRequest =
        `https://app.talentsquare.com/api/v2/jobs/search?slug=partena` +
        `&internal=false&version=5&page=${out.pass_it.count}&per_page=20`;
    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'es-419,es;q=0.8',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'sec-gpc': '1',
            },
            body: null,
        });
        const Data = await response.json();
        const json = Data.items;
        if (out.pass_it.count === 1) out.pass_it.limit = Data._meta.pages;
        for (let x in json) {
            const job = {};
            const elem = json[x];
            job.title = elem.title;
            job.reqid = elem.id;
            job.url = elem.absolute_url;
            const fullLoc = [];
            if (elem.city) fullLoc.push(elem.city);
            if (elem.country) fullLoc.push(elem.country);
            job.source_location = fullLoc.join(', ');
            job.location = fullLoc.join(', ');
            const hourlyType = [];
            for (let n in elem.hourly_type) {
                let hourly = elem.hourly_type[n]
                    .replace(/full/gi, 'Full Time')
                    .replace(/part/gi, 'Part Time')
                    .trim();
                hourlyType.push(hourly);
            }
            if (elem.contract_type) hourlyType.push(elem.contract_type.toUpperCase());
            job.source_jobtype = hourlyType.join(' - ');
            job.source_empname = elem.employer.name;
            job.logo = elem.employer.navbar_logo;
            job.dateposted_raw = new Date(elem.published_at).toLocaleDateString();
            job.dateclosed_raw = new Date(elem.expires_at).toLocaleDateString();
            job.temp = 'Sept-2022-edit-1';
            job.html = elem.description.trim();
            job.html = cleanHTML(job.html);
            let temp = document.createElement('div');
            temp.innerHTML = job.html;
            job.jobdesc = temp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            const clean_strings = [];
            if (clean_strings.length > 0) {
                clean_strings.forEach(elem => {
                    job.html = job.html.replace(elem, '');
                });
            }
            if (job.jobdesc.includes('Wat bieden wij jou aan?')) {
                job.source_benefit = getBenefits(
                    job.jobdesc,
                    'Wat bieden wij jou aan?',
                    'Als Payroll Consultant'
                );
            }
            //job.html = removeTextBefore(job.html, "JOB DESCRIPTION", true);
            job.html = removeTextAfter(job.html, 'Ben jij onze nieuwe gedreven ambassadeur?', true);
            job.html = removeTextAfter(job.html, 'Envie de relever le défi ?', true);
            job.html = removeTextAfter(job.html, 'Zin om de uitdaging aan te gaan?', true);
            jobs.push(job);
        }
        msg(`\x1B[35m Counter: ${out.pass_it.count} | Limit: ${out.pass_it.limit}`);
    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
        throw error;
    }
    out.jobs = jobs;
    return out;
})();
function removeTextBefore(html, text, flag) {
    let keyWord;
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) keyWord = text;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).pop();
    if (!flag) if (keyWord) newHtml = '<h3>' + keyWord + '</h3>' + newHtml;
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).shift();
    if (!flag) newHtml = newHtml + '<p>' + text + '</p>';
    return newHtml;
}
function getBenefits(source, after, before) {
    let text = '';
    if (source.includes(after)) {
        text = source.split(after).pop().trim();
        if (before) text.split(before).shift().trim();
    }
    return text;
}
///////////////////////////////////////////// PAGINATION
(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;
    if (out.pass_it.count <= out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }
    return out;
})();