(function () {
    const out = {};
    const job = {};
    const selector = '.job-view__main-content-body .col-md-8';
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

        const clean_strings = [`${pass_it.job.title}`];

        if (clean_strings.length > 0) {
            clean_strings.forEach(elem => {
                job.html = job.html.replace(elem, '');
            });
        }

        job.html = removeTextBefore(job.html, 'Les missions', true);
        job.html = removeTextBefore(job.html, 'Les voici :', true);
        job.html = removeTextAfter(job.html, 'Informations supplémentaires', true);
        
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