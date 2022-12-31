(function () {
    var out = {};
    var job = {};

    var jobid = pass_it["job"].link.split("jobId=").pop().split('&').shift();
    var cid = pass_it["job"].link.split('cid=').pop().split('&').shift();
    var ccId = pass_it["job"].link.split('ccId=').pop().split('&').shift();
    var lang = pass_it["job"].link.split('lang=').pop().split('&').shift();
    var time = new Date();
    time = Date.now();
    var endpoint = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions/" + jobid + "?cid=" + cid + "&timeStamp=" + time + "&lang=en_US&ccId=" + ccId + "&locale=" + lang;
    //msg(endpoint);

    $.ajax({
        url: endpoint,
        headers: {
            "accept": "*/*",
            "accept-language": lang,
            "content-type": "application/json",
            "locale": "en_US",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-forwarded-host": "workforcenow.adp.com",
            "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        async: false,
        success: function (result) {

            if (result.payGradeRange) {
                //if(result.payGradeRange.maximumRate.amountValue.match(/[0-9]/) && result.payGradeRange.minimumRate.amountValue.match(/[0-9]/)){
                job.source_salary = result.payGradeRange.minimumRate.amountValue + ' to ' + result.payGradeRange.maximumRate.amountValue;
                //}
            }
            if (result.workLevelCode) {
                if (result.workLevelCode.shortName) {
                    job.source_jobtype = result.workLevelCode.shortName;
                }
            }

            var full_html = document.createElement("DIV");
            full_html.innerHTML = result.requisitionDescription;

            var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

            if (remove_selectors.length > 0) {
                remove_selectors.forEach(remove_selector => {
                    for (const a of full_html.querySelectorAll(remove_selector)) {
                        a.remove();
                    }
                });
            }

            for (const a of full_html.querySelectorAll('p, span, li')) {
                if (a.textContent.search(/@|http|www./ig) > -1) {
                    a.remove();
                }
            }

            job.html = full_html.innerHTML.trim();
            job.html = removeTextBefore(job.html, 'Principal Responsibilities:', false);
            job.html = removeTextAfter(job.html, /How to Apply/g, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            if (job.jobdesc.length < 50) {
                job.html = " ";
                job.jobdesc = " ";
            }

        },
        error: function (error) {
            msg(error);
        }
    });

    out["job"] = job;
    return out;
})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}