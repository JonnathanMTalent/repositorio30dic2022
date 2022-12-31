/////////////////////////////////////////////// EXTRACT
(async () => {
    const out = {};
    const jobs = [];
    const remove_selectors = [
        'a',
        'img',
        'video',
        'button',
        'input',
        'style',
        'javascript',
        'script',
    ];
    if (!pass_it.count) {
        out.pass_it = {
            count: 0,
            limit: 0,
            
        };
    } else {
        out.pass_it = pass_it;
    }
    let pathName = 'External_Careers';
    let urlRequest = `${window.location.origin}/wday/cxs/` +
        `${window.location.host.split('.').shift()}/${pathName}/jobs`;
    const body = {
        limit: 20,
        offset: out.pass_it.count,
        searchText: '',
        appliedFacets: {},
    };
    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const Data = await response.json();
        const json = Data.jobPostings;
        if (out.pass_it.count === 0) out.pass_it.limit = Data.total;
        out.pass_it.total += json.length;
        for (let x in json) {
            const job = {};
            const elem = json[x];
            job.title = elem.title;
            job.url = `${window.location.origin}/en-US/${pathName}${elem.externalPath}`;
            job.reqid = elem.bulletFields[0];
            job.source_location = elem.locationsText;
            job.location = elem.locationsText;
            if (!job.location) job.location = 'San Francisco, CA, US';
            const urlJsonGet =
                `${window.location.origin}/wday/cxs/` +
                `${window.location.host.split('.').shift()}/${pathName}${elem.externalPath}`;
            const descRequest = await fetch(urlJsonGet);
            const dataDesc = await descRequest.json();
            const jsonDesc = dataDesc.jobPostingInfo;
            if (jsonDesc) {
                job.reqid = jsonDesc.jobReqId;
                job.source_jobtype = jsonDesc.timeType;
                job.dateposted_raw = new Date(jsonDesc.startDate).toLocaleDateString();
                const fulHtml = new DOMParser().parseFromString(
                    jsonDesc.jobDescription,
                    'text/html'
                ).body;
                if (remove_selectors.length > 0) {
                    remove_selectors.forEach(function (elem) {
                        if (fulHtml.querySelector(elem)) {
                            let items = fulHtml.querySelectorAll(elem);
                            for (const item of items) {
                                item.remove();
                            }
                        }
                    });
                }
                job.html = fulHtml.innerHTML.trim();
                job.html = cleanHTML(job.html);
                let tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);
                // job.html = removeTextBefore(job.html, 'Position Description: ', true);
                // job.html = removeTextAfter(job.html, '**If you require accommodations', true);
            }
            job.temp = 'Sept-2022';
            if (job.location.indexOf('Locations') > -1) {
                const locations = jsonDesc.additionalLocations;
                locations.push(jsonDesc.location);
                job.source_location = [...locations].map(item => item).join('; ');
                for (let loc in locations) {
                    const jobx = { ...job };
                    jobx.location = locations[loc].split(', ').reverse().join(', ');
                    if (jobx.location.includes('Remote')) jobx.location = 'San Francisco, CA, US';
                    jobs.push(jobx);
                }
            } else {
                job.location = job.location.split(', ').reverse().join(', ');
                if (job.location.includes('Remote')) job.location = 'San Francisco, CA, US';
                jobs.push(job);
            }
        }
        // msg(`\x1B[35m Counter: ${out.pass_it.count} | Limit: ${out.pass_it.limit}`);
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










/////////////////////////////////////////////// PAGINATION
(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count += 20;
    if (out.pass_it.count > out.pass_it.limit || out.pass_it.count >= 2000) {
        out.has_next_page = false;
    } else {
        out.has_next_page = true;
    }
    return out;
})();