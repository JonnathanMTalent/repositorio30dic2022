//////////////////////////////////////////// EXTRACT
(function () {
    const out = {};
    const jobs = [];
    const htmlJobs = document.querySelectorAll('.job-list table tr');
    for (let x in htmlJobs) {
        if (typeof htmlJobs[x] === 'function') continue;
        if (typeof htmlJobs[x] === 'number') continue;
        const job = {};
        const elem = htmlJobs[x];
        job.title = elem.querySelector('a').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.reqid = job.url.split('/').pop().split('?').shift().trim();
        job.source_location = elem.querySelector('td:nth-child(2)').textContent.trim();
        job.location = elem
            .querySelector('td:nth-child(2)')
            .textContent.replaceAll('/', ', ')
            .trim();
        if (!job.location) job.location = 'São Paulo, SP, BR';
        job.source_jobtype = elem.getAttribute('data-type').trim();
        const full_html = getDescription(job.url);
        let contentDesc = document.createElement('div');
        contentDesc.innerHTML = full_html;
        const searching = contentDesc.querySelectorAll('ul li');
        searching.forEach(item => {
            if (item.textContent.search('Open for applications until:') > -1) {
                let [day, month, year] = item.textContent.split(':').pop().trim().split('/');
                job.dateclosed_raw = `${month}/${day}/${year}`;
            }
        });
        job.temp = 'Jul-2022';
        if (job.location.includes(' and ')) {
            let locations = job.location.split(' and ');
            for (let loc of locations) {
                const jobx = { ...job };
                jobx.location = loc.replaceAll('/', ', ').trim();
                if (jobx.location.search(/Remote/gi) > -1) jobx.location = 'São Paulo, SP, BR';
                jobs.push(jobx);
            }
        } else {
            jobs.push(job);
        }
    }
    const seen = new Set();
    let jobsfiltered = jobs.filter(item => {
        const duplicate = seen.has(item.title + item.location + item.url + item.reqid);
        seen.add(item.title + item.location + item.url + item.reqid);
        return !duplicate;
    });
    out.jobs = jobsfiltered;
    return out;
})();
function getDescription(url) {
    let res = '';
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) res = req.responseText;
    };
    req.send();
    return res;
}
//////////////////////////////////////////// PAGINATION
(function () {
    const out = {};
    out.has_next_page = false;
    return out;
})();
//////////////////////////////////////////// JOBDESCRIPTION
(function () {
    const out = {};
    const job = {};
    const selector = '.description';
    const remove_selectors = [
        'a',
        'img',
        'svg',
        'video',
        'button',
        'input',
        'style',
        'javascript',
        'script',
    ];
    if (document.querySelector(selector)) {
        const full_html = document.querySelector(selector);
        // Remove something from the jobdatata
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(elem => {
                if (full_html.querySelector(elem)) {
                    let items = full_html.querySelectorAll(elem);
                    for (const selector of items) selector.remove();
                }
            });
        }
        /*
        const delete_items = document.querySelectorAll('p');
        for (const item of delete_items) {
            if (item.textContent.search(/@|www.|https:|http:|.com/g) > -1) {
                item.remove();
            }
        }
        */
        job.html = full_html.innerHTML.trim();
        job.html = cleanHTML(job.html);
        let temp = document.createElement('div');
        temp.innerHTML = job.html;
        job.jobdesc = temp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        const clean_strings = [`${pass_it.job.title}`];
        if (clean_strings.length > 0) {
            clean_strings.forEach(elem => {
                job.html = job.html.replace(elem, '');
            });
        }
        job.html = removeTextAfter(job.html, 'QUEM SOMOS', true);
        job.html = removeTextAfter(job.html, 'Quem somos', true);
        job.html = removeTextAfter(job.html, 'Sobre a Alpargatas', true);
    }
    out.job = job;
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