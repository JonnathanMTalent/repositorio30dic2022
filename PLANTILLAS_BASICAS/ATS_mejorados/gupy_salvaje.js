(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('li[data-testid="job-list__listitem"]');
    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('div>div:first-child').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.reqid = job.url.split('job/').pop().split('?').shift();
        job.source_location = elem.querySelector('div>div:nth-child(2)').textContent.trim();
        job.location = elem.querySelector('div>div:nth-child(2)').textContent.trim();
        //job.dateposted_raw = elem.querySelector('').textContent.trim();
        //job.logo = elem.querySelector('').getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector('').textContent.trim();
        //job.source_empname = elem.querySelector''").textContent.trim();
        job.source_jobtype = elem.querySelector('div>div:last-child').textContent.trim();
        //job.source_salary = elem.querySelector('').textContent.trim();
        job.temp = 'Template_gupy';
        if (job.location == '') {
            job.location = 'HQ';
            job.source_location = '';
        }
        jobs.push(job);
    }
    out["jobs"] = jobs;
    return out;
})();
/////////////////////////////////pagination
(function () {
    var out = {};
    out["has_next_page"] = false;
    return out;
})();
///////////////////////////////////jobdata
(function () {
    var out = {};
    var job = {};
    var selector = 'section[data-testid]';
    var remove_selectors = [];
    if (document.querySelector(selector)) {
        var full_html = document.querySelector(selector);
        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
        if (typeof msg == "undefined") msg = console.log;
        //--------------------------JOB-INFO ------------------------------------//
        job.source_benefit = '';
        //----------------------------------------------------------------------//
        // To Remove selectors 
        for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
            if (a) {
                a.remove();
            }
        }
        for (const a of full_html.querySelectorAll('p')) {  // Varios p
            const text = a.textContent.trim();
            if (text.search(/please/i) > -1) a.remove();
            if (text.search(/apply/i) > -1) a.remove();
            if (text.search(/call /i) > -1) a.remove();
            if (text.search(/click/i) > -1) a.remove();
            if (text.search(/cv/i) > -1) a.remove();
            if (text.search(/telephone/i) > -1) a.remove();
            if (text.search(/e-mail/i) > -1) a.remove();
            if (text.search(/email/i) > -1) a.remove();
            if (text.search(/https/i) > -1) a.remove();
            if (text.search(/www./i) > -1) a.remove();
            if (text.search(/@/i) > -1) a.remove();
        }
        //----------------------------------------------------------------------//
        job.html = full_html.innerHTML.trim();
        // --------------- removeTextBefore -----------
        //job.html = removeTextBefore(job.html, "", false);
        // --------------- removeTextAfter -----------
        //job.html = removeTextAfter(job.html, "", true);
        if (job.html.indexOf('@') > -1) { //Existen algunos jobdata que no estan estructurados por párrafos o selectores.
            var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
            job.html = job.html.replace(eliminar, '');
        }
        if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('http') > -1) { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('HTTP') > -1) { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('www') > -1) { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        job.html = splitDescriptionRemovetor(job.html);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    } else {
        msg('\x1b[44m NO HAY SELECTOR\x1b[44m');
    }
    out["job"] = job;
    return out;
})();
function splitDescriptionRemovetor(html, split_w = ' ') {
    var NewHtml = html;
    var expression1 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex1 = new RegExp(expression1);
    var regex = new RegExp(expression);
    var t = html.split(split_w);
    for (const a of t) {
        if (a.match(regex) || a.match(regex1)) {
            NewHtml = NewHtml.replace(a, '').trim();
        }
    }
    return NewHtml;
}
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}