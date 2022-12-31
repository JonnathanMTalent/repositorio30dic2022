/////////////////////////////////////// EXTRACT
// ? URL: https://careers.ppg.com/jobs/search/4249903/page1

(function () {
    const out = {};
    const jobs = [];
    const htmlJobs = document.querySelectorAll('.jResultsActive [id^="job_list_"]');

    for (let x in htmlJobs) {
        if (typeof htmlJobs[x] === 'function') continue;
        if (typeof htmlJobs[x] === 'number') continue;

        const job = {};
        const elem = htmlJobs[x];

        job.title = elem.querySelector('.job_link').textContent.trim();
        job.url = elem.querySelector('.job_link').href.trim();
        job.reqid = job.url.split('-').pop().trim();

        job.source_location = removeEmojis(elem.querySelector('.location').textContent.trim());

        job.location = elem
            .querySelector('.location')
            .textContent.replace(/of America|\n+|\t+/gi, '')
            .trim();
        job.location = removeEmojis(job.location);

        job.temp = 'Jun-2022';

        if (job.location.includes('additional')) {
            const full_html = getDescription(job.url);
            let contentDesc = document.createElement('div');
            contentDesc.innerHTML = full_html;

            let locations = contentDesc.querySelectorAll(
                '.primary_location a, .additional_locations a'
            );

            job.source_location = [...locations]
                .map(item => {
                    let sourceLoc = item.textContent.replace(/\n+|\t+/gi, '').trim();
                    return removeEmojis(sourceLoc);
                })
                .join('; ');

            for (let loc of locations) {
                const jobx = { ...job };
                jobx.location = loc.textContent.replace(/of America|\n+|\t+/gi, '').trim();
                jobx.location = removeEmojis(jobx.location);
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

function removeEmojis(string) {
    const regex =
        /:?[\uD83D-\uDD0D]|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}

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

/////////////////////////////////////// PAGINATION

(function () {
    const out = {};
    const url_base = 'https://careers.ppg.com/jobs/search/4249903/page';
    const selector_jobs = '.jResultsActive [id^="job_list_"]';

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

    msg(`\x1b[0m Total number jobs: ${numberJobs}`);
    msg(`\x1b[0m Actual number jobs: ${actualNumber}`);

    if (actualNumber < numberJobs) {
        out.has_next_page = false;
    } else {
        out.pass_it.cont++;
        out.has_next_page = true;
        window.location.href = url_base + out.pass_it.cont;
    }

    return out;
})();

/////////////////////////////////////// DESCRIPTION

(function () {
    const out = {};
    const job = {};
    const selector = 'div[class="job_description"]';
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

        job.html = removeTextBefore(job.html, 'alertas de oportunidades de trabajo', true);
        job.html = removeTextAfter(job.html, 'PPG’s affirmative action plan by emailing', true);
        job.html = removeTextAfter(job.html, 'PPG Way:', true);
        job.html = removeTextAfter(job.html, 'Pour en savoir plus', true);
        job.html = removeTextAfter(job.html, 'About us', true);
        job.html = removeTextAfter(job.html, 'ABOUT US', true);
        job.html = removeTextAfter(job.html, 'SOBRE NÓS', true);
        job.html = removeTextAfter(job.html, 'Über uns', true);
    } else {
        job.html = '';
        job.jobdesc = '';
        msg('\x1b[31m ¡No se econtro el selector! ');
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
