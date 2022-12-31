////////////////////////////////////////////////// EXTRACT

(function () {
    const out = {};
    const jobs = [];
    const html_jobs = document.querySelectorAll('.oracletaleocwsv2-accordion');

    if (html_jobs.length > 0) {
        for (let x in html_jobs) {
            if (typeof html_jobs[x] === 'function') continue;
            if (typeof html_jobs[x] === 'number') continue;

            const job = {};
            const elem = html_jobs[x];

            if (elem.querySelector('h4 a')) {
                job.title = elem.querySelector('h4 a').textContent.trim();
                job.url = elem.querySelector('h4 a').href.trim();
                job.reqid = job.url.split('=').pop().trim();

                const selector_location = '.oracletaleocwsv2-accordion-head-info div:first-of-type';
                job.source_location = elem.querySelector(selector_location).textContent.trim();

                job.location = elem
                    .querySelector(selector_location)
                    .textContent.split(/-/g)
                    .reverse()
                    .join(', ')
                    .trim();

                const selector_jobtype = '.oracletaleocwsv2-accordion-head-info div:last-of-type';
                job.source_jobtype = elem.querySelector(selector_jobtype).textContent.trim();

                job.temp = 'Sept-2021';

                jobs.push(job);
            }
        }
    } else {
        const job = {};
        job.title = 'No jobs';
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

////////////////////////////////////////////////// PAGINATION

(function () {
    const out = {};
    out['has_next_page'] = false;
    out['wait'] = false;
    return out;
})();

////////////////////////////////////////////////// INFINITY PAGINATION

(function () {
    const out = {};
    const event = new Event('scroll');

    if (!pass_it.heights) out.pass_it = { heights: [] };
    else out.pass_it = pass_it;

    out.has_next_page = true;

    if (out.pass_it.heights.length > 3) {
        let last_three_heights = out.pass_it.heights.slice(out.pass_it.heights.length - 3);
        if (
            last_three_heights[0] == last_three_heights[1] &&
            last_three_heights[1] == last_three_heights[2]
        )
            out.has_next_page = false;
    }

    window.scrollBy(0, document.body.scrollHeight);
    window.dispatchEvent(event);

    out.wait = true;
    out.pic = true;
    out.html = true;
    out.pass_it.heights.push(document.body.scrollHeight);

    return out;
})();

////////////////////////////////////////////////// JOBDESCRIPTION

(function () {
    const out = {};
    const job = {};
    const selector = '[class="col-xs-12 col-sm-12 col-md-8"] [class="col-xs-12 col-sm-12"]'; // [name="cwsJobDescription"]
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

        const clean_strings = [];

        if (clean_strings.length > 0) {
            clean_strings.forEach(elem => {
                job.html = job.html.replace(elem, '');
            });
        }

        job.html = removeTextBefore(job.html, 'Overview:', true);
        job.html = removeTextAfter(job.html, 'Additional Details:', true);
    } else {
        job.html = '';
        job.jobdesc = '';
        msg('\x1b[42m JOB INACTIVO: No se econtro el selector');
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
