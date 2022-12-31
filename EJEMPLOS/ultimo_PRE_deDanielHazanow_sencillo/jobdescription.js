(function() {
    var out = {};
    var job = {};
    var selector = 'div.default-menu';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    for (const a of full_html.querySelectorAll('a')) {
        a.remove(); //if you want to remove this selector
    }
    for (const a of full_html.querySelectorAll('script')) {
        a.remove(); //if you want to remove this selector
    }
    for (const a of full_html.querySelectorAll('style')) {
        a.remove(); //if you want to remove this selector
    }

    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;



    job.html = full_html.innerHTML.trim();

   // job.html = removeTextBefore(job.html, 'Your Future Role', false);
    job.html = removeTextAfter(job.html, 'Interested?', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    out["job"] = job;
    return out;

})();

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