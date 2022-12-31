///////////////////////////////////// EXTRACT

(function () {
    const out = {};
    const jobs = [];
    const html_jobs = document.querySelectorAll('.jobs');

    for (let x in html_jobs) {
        if (typeof html_jobs[x] === 'function') continue;
        if (typeof html_jobs[x] === 'number') continue;

        const job = {};
        const elem = html_jobs[x];

        job.title = elem.querySelector('.job a').textContent.trim();
        job.url = elem.querySelector('.job a').href.trim();
        job.reqid = job.url.split('jid=').pop().split('&').shift();

        const full_html = getDescription(job.url);
        let div = document.createElement('div');
        div.innerHTML = full_html;

        job.location = div.querySelector('#ctl00_pageContent_ctl00_jobloc').textContent.trim();

        job.temp = 'Marz-26-2021';

        jobs.push(job);
    }

    const seen = new Set();
    let jobsfiltered = jobs.filter(item => {
        const duplicate = seen.has(item.title + item.location + item.url + item.reqid);
        seen.add(item.title + item.location + item.url + item.reqid);
        return !duplicate;
    });
    out['jobs'] = jobsfiltered;
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

///////////////////////////////////// PAGINATION

(function () {
    const out = {};
    out['has_next_page'] = false;
    out['wait'] = false;
    return out;
})();

///////////////////////////////////// JOBDESCRIPTION

(function () {
    const out = {};
    const job = {};
    const selector = 'article';
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

    if (document.querySelector(selector)) {
        if (typeof cleanHTML === 'undefined') cleanHTML = x => x;
        if (typeof msg === 'undefined') msg = console.log;

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

        job.html = full_html.innerHTML.trim();
        job.html = cleanHTML(job.html);
        job.jobdesc = job.html;

        const clean_strings = [];

        if (clean_strings.length > 0) {
            clean_strings.forEach(elem => {
                job.html = job.html.replace(elem, '');
            });
        }

        job.html = removeTextBefore(job.html, 'Job Description', true);
        job.html = removeTextAfter(job.html, 'At Shady Grove Fertility, we', true);

        if (job.jobdesc.length < 120) {
            job.flag_active = 0;
            job.html = '';
            job.jobdesc = '';
        }
    } else {
        job.flag_active = 0;
        job.html = '';
        job.jobdesc = '';
    }
    out['job'] = job;
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
