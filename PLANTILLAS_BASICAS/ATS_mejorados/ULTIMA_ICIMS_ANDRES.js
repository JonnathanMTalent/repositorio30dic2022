//version extract corregido mia,  ORIGINAL ABAJO



///////////////////////////////////////// EXTRACT
(async () => {
    const out = {};
    const jobs = [];
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
    const remove_selectors = [
        'a',
        'img',
        'video',
        'input',
        'style',
        'button',
        'script',
        'javascript',
    ];
    !pass_it.count ? (out.pass_it = { count: 0, limit: 0 }) : (out.pass_it = pass_it);
    const urlRequest = `${window.location.origin}/jobs/search?in_iframe=1&pr=${out.pass_it.count}`;
    try {
        const response = await fetch(urlRequest, {
            headers: {
                accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image' +
                    '/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'cache-control': 'no-cache',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'iframe',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': '1',
            },
            body: null,
            method: 'GET',
        });
        const Data = await response.text();
        const fullHtml = new DOMParser().parseFromString(Data, 'text/html').body;
        const htmlJobs = fullHtml.querySelectorAll('.iCIMS_JobsTable .row');
        if (out.pass_it.count === 0) {
            out.pass_it.limit = fullHtml
                .querySelector('.pull-left .iCIMS_SubHeader_Jobs')
                .textContent.split(' of ')
                .pop()
                .trim();
        }
        for (let x in htmlJobs) {
            if (typeof htmlJobs[x] === 'function') continue;
            if (typeof htmlJobs[x] === 'number') continue;
            const job = {};
            const elem = htmlJobs[x];
            job.title = elem.querySelector('.title h2').textContent.trim();
            job.url = elem.querySelector('.title a').href.trim();
            // If reqid and location are in those selectors
            if(elem.querySelector('.right span:last-child'))job.reqid = elem.querySelector('.right span:last-child').textContent.trim();
            if(elem.querySelector('.left span:last-child')){
            job.source_location = elem.querySelector('.left span:last-child').textContent.trim();
            job.location = elem
                .querySelector('.left span:last-child')
                .textContent.trim()
                .split('-')
                .reverse()
                .join(', ');
            }else{
            job.source_location='';    
            job.location = 'Dallas, TX, US';
        }
            
            // If job has date posted in that selector
            if (elem.querySelector('.right span:last-child').getAttribute('title')) {
                let posted = elem.querySelector('.right span:last-child').getAttribute('title');
                // job.dateposted_raw = new Date(posted).toLocaleDateString();
                job.dateposted_raw =formatDate(posted);
            }
            // If location, jobtype, empname, reqid are in job tags
            const jobTags = elem.querySelectorAll('.iCIMS_JobHeaderTag');
            jobTags.forEach(tag => {
                if (tag.textContent.includes('ID')) {
                    job.reqid = tag.querySelector('dd').textContent.trim();
                }
                if (tag.textContent.includes('Locations')) {
                    job.source_location = tag.querySelector('dd').textContent.trim();
                    job.location = tag
                        .querySelector('dd')
                        .textContent.trim()
                        .split('-')
                        .reverse()
                        .join(', ');
                }
                if (tag.textContent.includes('Company')) {
                    job.source_empname = tag.querySelector('dd').textContent.trim();
                }
                if (tag.textContent.includes('Type')) {
                    job.source_jobtype = tag.querySelector('dd').textContent.trim();
                }
            });
            // Request to jobdescription
            const descRequest = await fetch(job.url);
            const dataDesc = await descRequest.text();
            const htmlDesc = new DOMParser().parseFromString(dataDesc, 'text/html').body;
            const selectorDesc = '.iCIMS_JobContent';
            const fullHtmlDesc = htmlDesc.querySelector(selectorDesc);
            // If reqid, jobtype and some variables are not in main feed
            const descTags = fullHtmlDesc.querySelectorAll('.iCIMS_JobHeaderTag');
            descTags.forEach(tag => {
                if (tag.textContent.includes('ID')) {
                    job.reqid = tag.querySelector('dd').textContent.trim();
                }
                if (tag.textContent.includes('Status')) {
                    job.source_jobtype = tag.querySelector('dd').textContent.trim();
                }
            });
            // Delete some unnecessary selectors such as a, scripts, buttons and so on
            if (remove_selectors.length > 0) {
                remove_selectors.forEach(function (elem) {
                    if (fullHtmlDesc.querySelector(elem)) {
                        let items = fullHtmlDesc.querySelectorAll(elem);
                        for (const item of items) item.remove();
                    }
                });
            }
            job.html = fullHtmlDesc.innerHTML.trim();
            job.html = cleanHTML(job.html);
            let tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            // job.source_benefit = getBenefits(job.jobdesc, '', '');
            // Clean jobdescription of some unnecessary paragraphs
            job.html = removeTextBefore(job.html, 'Job Summary', true);
            job.html = removeTextAfter(job.html, 'Options', true);
            job.temp = 'Oct-2022';
            // Doing Mulrilocation
            if (job.location.includes('|')) {
                let locations = job.location.split('|');
                for (let loc of locations) {
                    const jobx = { ...job };
                    jobx.location = loc.trim().split('-').reverse().join(', ');
                    jobs.push(jobx);
                }
            } else {
                jobs.push(job);
            }
        }
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

















///////////////////////////////////////// EXTRACT
(async () => {
    const out = {};
    const jobs = [];
    const remove_selectors = [
        'a',
        'img',
        'video',
        'input',
        'style',
        'button',
        'script',
        'javascript',
    ];
    !pass_it.count ? (out.pass_it = { count: 0, limit: 0 }) : (out.pass_it = pass_it);
    const urlRequest = `${window.location.origin}/jobs/search?in_iframe=1&pr=${out.pass_it.count}`;
    try {
        const response = await fetch(urlRequest, {
            headers: {
                accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image' +
                    '/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'cache-control': 'no-cache',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'iframe',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': '1',
            },
            body: null,
            method: 'GET',
        });
        const Data = await response.text();
        const fullHtml = new DOMParser().parseFromString(Data, 'text/html').body;
        const htmlJobs = fullHtml.querySelectorAll('.iCIMS_JobsTable .row');
        if (out.pass_it.count === 0) {
            out.pass_it.limit = fullHtml
                .querySelector('.pull-left .iCIMS_SubHeader_Jobs')
                .textContent.split(' of ')
                .pop()
                .trim();
        }
        for (let x in htmlJobs) {
            if (typeof htmlJobs[x] === 'function') continue;
            if (typeof htmlJobs[x] === 'number') continue;
            const job = {};
            const elem = htmlJobs[x];
            job.title = elem.querySelector('.title h2').textContent.trim();
            job.url = elem.querySelector('.title a').href.trim();
            // If reqid and location are in those selectors
            job.reqid = elem.querySelector('.right span:last-child').textContent.trim();
            job.source_location = elem.querySelector('.left span:last-child').textContent.trim();
            job.location = elem
                .querySelector('.left span:last-child')
                .textContent.trim()
                .split('-')
                .reverse()
                .join(', ');
            // If job has date posted in that selector
            if (elem.querySelector('.right span:last-child').getAttribute('title')) {
                let posted = elem.querySelector('.right span:last-child').getAttribute('title');
                job.dateposted_raw = new Date(posted).toLocaleDateString();
            }
            // If location, jobtype, empname, reqid are in job tags
            const jobTags = elem.querySelectorAll('.iCIMS_JobHeaderTag');
            jobTags.forEach(tag => {
                if (tag.textContent.includes('ID')) {
                    job.reqid = tag.querySelector('dd').textContent.trim();
                }
                if (tag.textContent.includes('Locations')) {
                    job.source_location = tag.querySelector('dd').textContent.trim();
                    job.location = tag
                        .querySelector('dd')
                        .textContent.trim()
                        .split('-')
                        .reverse()
                        .join(', ');
                }
                if (tag.textContent.includes('Company')) {
                    job.source_empname = tag.querySelector('dd').textContent.trim();
                }
                if (tag.textContent.includes('Type')) {
                    job.source_jobtype = tag.querySelector('dd').textContent.trim();
                }
            });
            // Request to jobdescription
            const descRequest = await fetch(job.url);
            const dataDesc = await descRequest.text();
            const htmlDesc = new DOMParser().parseFromString(dataDesc, 'text/html').body;
            const selectorDesc = '.iCIMS_JobContent';
            const fullHtmlDesc = htmlDesc.querySelector(selectorDesc);
            // If reqid, jobtype and some variables are not in main feed
            const descTags = fullHtmlDesc.querySelectorAll('.iCIMS_JobHeaderTag');
            descTags.forEach(tag => {
                if (tag.textContent.includes('ID')) {
                    job.reqid = tag.querySelector('dd').textContent.trim();
                }
                if (tag.textContent.includes('Status')) {
                    job.source_jobtype = tag.querySelector('dd').textContent.trim();
                }
            });
            // Delete some unnecessary selectors such as a, scripts, buttons and so on
            if (remove_selectors.length > 0) {
                remove_selectors.forEach(function (elem) {
                    if (fullHtmlDesc.querySelector(elem)) {
                        let items = fullHtmlDesc.querySelectorAll(elem);
                        for (const item of items) item.remove();
                    }
                });
            }
            job.html = fullHtmlDesc.innerHTML.trim();
            job.html = cleanHTML(job.html);
            let tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            // job.source_benefit = getBenefits(job.jobdesc, '', '');
            // Clean jobdescription of some unnecessary paragraphs
            job.html = removeTextBefore(job.html, 'Job Summary', true);
            job.html = removeTextAfter(job.html, 'Options', true);
            job.temp = 'Oct-2022';
            // Doing Mulrilocation
            if (job.location.includes('|')) {
                let locations = job.location.split('|');
                for (let loc of locations) {
                    const jobx = { ...job };
                    jobx.location = loc.trim().split('-').reverse().join(', ');
                    jobs.push(jobx);
                }
            } else {
                jobs.push(job);
            }
        }
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
///////////////////////////////////////// PAGINATION
(() => {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;
    if (out.pass_it.count < out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }
    return out;
})();