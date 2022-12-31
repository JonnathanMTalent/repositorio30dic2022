//////////////////////////////// EXTRACT
(function () {
    const out = {};
    const jobs = [];
    const html_jobs = document.querySelectorAll('.jlr_right_hldr');
    for (let x in html_jobs) {
        if (typeof html_jobs[x] === 'function') continue;
        if (typeof html_jobs[x] === 'number') continue;
        const job = {};
        const elem = html_jobs[x];
        job.title = elem.querySelector('.jlr_title p a').textContent.trim();
        job.url = elem.querySelector('.jlr_title p a').href.trim();
        job.reqid = job.url.split('-').pop().trim();
        job.source_location = elem.querySelector('.jlr_title .location').textContent.trim();
        job.location = elem
            .querySelector('.jlr_title .location')
            .textContent.replace(/- Headquarters|- Country Office|\t+|\n+/g, '')
            .trim();
        const full_html = getDescription(job.url);
        let div = document.createElement('div');
        div.innerHTML = full_html;
        let datePosted = div
            .querySelector('.job_post_date .field_value')
            .textContent.replace(' an ', '1')
            .replace('About', '')
            .trim();
        if (datePosted.search(/ago/g) > -1) {
            job.dateposted_raw = getDateAgo(datePosted);
        } else {
            job.dateposted_raw = new Date(datePosted).toLocaleDateString();
        }
        job.temp = 'Feb-2022';
        if (job.location.includes('additional')) {
            const full_html = getDescription(job.url);
            let contentDesc = document.createElement('div');
            contentDesc.innerHTML = full_html;
            let locations = contentDesc.querySelectorAll(
                '.primary_location a, .additional_locations a'
            );
            job.source_location = [...locations]
                .map(item => {
                    let preLoc = item.textContent.replace(/\t+|\n+/g, '').trim();
                    return removeEmojis(preLoc);
                })
                .join('; ');
            for (let loc of locations) {
                const jobx = { ...job };
                jobx.location = removeEmojis(loc.textContent.replace(/\t+|\n+/g, '').trim());
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
function getDateAgo(date) {
    let numDays = 0;
    let numDayDate = 0;
    const dayMonths = [];
    const arrayDate = date.split(' ');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    for (let x = 1; x <= 12; x++) dayMonths[x] = new Date(currentYear, x, 0).getDate();
    arrayDate.forEach(word => {
        if (word.match(/\d+/)) numDayDate = parseInt(word);
        if (word.match(/TODAY|HOY|HOURS?/i)) numDays = 0;
        if (word.match(/YESTERDAY|AYER|HIER/i)) numDays = 1;
        if (word.match(/DAYS?|DIAS?|JOURS?/i)) numDays = numDayDate;
        if (word.match(/WEEKS?|SEMANAS?|SEMAINES?/i)) numDays = numDayDate * 7;
        if (word.match(/MONTHS?|MES(ES)?|MOIS/i)) numDays = numDayDate * dayMonths[currentMonth];
        if (word.match(/YEARS?|AÑOS?|ANNÉES?/i)) {
            if (dayMonths[1] === 29) numDays = numDayDate * 366;
            else numDays = numDayDate * 365;
        }
    });
    let dateNow = new Date().getDate() - numDays;
    let getDate = new Date().setDate(dateNow);
    let datePosted = new Date(getDate);
    return datePosted.toLocaleDateString();
}
function removeEmojis(string) {
    const regex =
        /:?[\uD83D-\uDD0D]|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}
//////////////////////////////// PAGINATION
(function () {
    const out = {};
    const url_base = 'https://marcuscorp.referrals.selectminds.com/jobs/search/2453955/page';
    const selector_jobs = '.jlr_right_hldr';
    if (!pass_it.cont) {
        out.pass_it = {
            cont: 2,
            jobs: 0,
        };
    } else {
        out.pass_it = pass_it;
    }
    const numberJobs = 10;
    const actualNumber = document.querySelectorAll(selector_jobs).length;
    if (actualNumber < numberJobs) {
        out.has_next_page = false;
    } else {
        let newUrl = url_base + out.pass_it.cont;
        out.pass_it.cont++;
        window.location.href = newUrl;
        out.has_next_page = true;
    }
    return out;
})();
//////////////////////////////// JOBDESCRIPTION
(function () {
    const out = {};
    const job = {};
    const selector = '.job_description';
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
        //job.html = removeTextBefore(job.html, "JOB DESCRIPTION", true);
        job.html = removeTextAfter(job.html, 'Equal Opportunity Employer', true);
        job.html = removeEmojis(job.html);
    } else {
        job.html = '';
        job.jobdesc = '';
        msg('\x1b[45m JOB INACTIVO: No se econtro el selector');
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
function removeEmojis(string) {
    const regex =
        /:?[\uD83D-\uDD0D]|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}