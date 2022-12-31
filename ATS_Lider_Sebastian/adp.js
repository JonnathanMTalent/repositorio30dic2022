//El Rojito/Verde
//Extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var counter = 0;
    var limit = 0;
    var json;

    //do {

    var time = new Date();
    time = Date.now();

    var requestURL = 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?timeStamp=' + time + '&$top=20&$skip=' + out.pass_it.offSet;
    var jobURL = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?lang=';

    if (window.location.href.match(/lang\=/)) {
        var lang = window.location.href.split('lang=').pop().split('&').shift();
        requestURL += '&lang=' + lang;
        jobURL += lang;
    } else {
        var lang = 'en_US';
        requestURL += '&lang=' + lang;
        jobURL += lang;
    }
    if (window.location.href.match(/cid\=/)) {
        requestURL += '&cid=' + window.location.href.split('cid=').pop().split('&').shift();
        jobURL += '&cid=' + window.location.href.split('cid=').pop().split('&').shift();
    }
    if (window.location.href.match(/ccId\=/)) {
        requestURL += '&ccId=' + window.location.href.split('ccId=').pop().split('&').shift();
        jobURL += '&ccId=' + window.location.href.split('ccId=').pop().split('&').shift();
    }

    //var data = {};
    $.ajax({
        url: requestURL,
        headers: {
            "accept": "*/*",
            "accept-language": lang,
            "content-type": "application/json",
            "locale": lang,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-forwarded-host": "workforcenow.adp.com",
            "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.jobRequisitions;
            if (json.length > 0) {
                out.pass_it.limit = result.meta.totalNumber;
                for (let elem of json) {
                    var job = {};
                    job.reqid = elem.clientRequisitionID;
                    job.title = elem.requisitionTitle;
                    job.url = jobURL + '&jobId=' + elem.customFieldGroup.stringFields[0].stringValue;
                    job.dateposted_raw = elem.postDate.split('T').shift();
                    job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                    job.source_jobtype = elem?.workLevelCode?.shortName;
                    job.source_location = elem?.requisitionLocations[0]?.nameCode?.shortName;
                    if (job.source_location) {
                        job.source_location = job.source_location.trim();
                    } else {
                        job.source_location = '';
                    }
                    job.temp = 96;


                    for (let a of elem.requisitionLocations) {
                        var jobx = {};
                        jobx = {
                            ...job
                        }
                        jobx.location = [];
                        jobx.location.push(a?.address?.cityName);
                        jobx.location.push(a?.address?.countrySubdivisionLevel1?.codeValue);
                        jobx.location = jobx.location.filter(Boolean).join(", ");
                        if (jobx.location == '') {
                            jobx.location = 'HQ';
                        }
                        jobs.push(jobx);
                    }
                }
            } else {
                var job = {};
                job.title = 'Ghost job, probably no jobs here...' + window.location.href;
                jobs.push(job);
            }
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 20;
    if (out.pass_it.offSet < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0
    };
    return out;
})();
//Jobdata
(function () {
    var out = {};
    var job = {};

    var time = new Date();
    time = Date.now();
    var requestURL = window.location.href;
    var jobid = window.location.href.split("jobId=").pop().split('&').shift();

    var endpoint = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions/" + jobid + "?lang=en_US";

    if (requestURL.match(/lang\=/)) {
        var lang = requestURL.split('lang=').pop().split('&').shift();
        endpoint += '&locale=' + lang;
    } else {
        var lang = 'en_US';
        endpoint += '&locale=' + lang;
    }
    if (requestURL.match(/cid\=/)) {
        endpoint += '&cid=' + requestURL.split('cid=').pop().split('&').shift();
    }
    if (requestURL.match(/ccId\=/)) {
        endpoint += '&ccId=' + requestURL.split('ccId=').pop().split('&').shift();
    }

    msg(endpoint);

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
            //job.html = removeTextBefore(job.html, '', false);
            job.html = removeTextAfter(job.html, /How to Apply|Qualified applicants can apply/g, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
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

//El otro
//infinity
(function () {
    var out = {};

    out["pass_it"] = {
        "offSet": 1,
        "limit": 0
    };

    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.offSet <= out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//Extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;
    var data = { "filters": [{ "name": "grp", "label": "Area of Interest" }, { "name": "typeOfFulltime", "label": "Position Type" }, { "name": "zzreqSeason", "label": "Season" }, { "name": "zzreqMinAgeRequired", "label": "Minimum Age Required" }], "results": { "pageTitle": "Search Results", "zeroResultsMessage": "We're sorry but we have no job openings at this time that match your search criteria. Please try another search.", "searchFailureMessage": "Oops! Something went wrong.  Search has encountered a problem. Try searching again", "resultsFoundLabel": "results found", "bookmarkText": "Bookmark This", "pageSize": "100", "sortOrder": "00001000", "shareText": "Share", "fields": [{ "name": "ptitle", "label": "Published Job Title" }, { "name": "zzreqSeason", "label": "Season" }, { "name": "zzreqMinAgeRequired", "label": "Minimum Age Required" }, { "name": "grp", "label": "Area of Interest" }] }, "pagefilter": { "page": out.pass_it.offSet }, "rl": "enUS" };
    $.ajax({
        url: 'https://recruiting.adp.com/srccar/public/rest/1/185607/search/',//cambiar ID
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.jobs;
            out.pass_it.limit = result.pages;
            for (var i = 0; i < json.length; i++) {
                var job = {};
                var elem = json[i];
                job.reqid = elem.num;
                job.title = elem.ptitle;

                job.location = [];
                job.source_location = [];

                job.source_location.push(elem?.city);
                job.source_location.push(elem?.state);
                job.source_location = job.source_location.filter(Boolean).join(", ");

                job.location.push(elem?.city);
                job.location.push(elem?.state);
                job.location = job.location.filter(Boolean).join(", ");

                job.url = elem.url;
                job.source_jobtype = elem.typeOfFulltime;

                job.temp = 96;
                jobs.push(job);
            }
        },
        error: function (error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();
//Jobdata
(function () {
    var out = {};
    var job = {};

    var jobid = window.location.href.split("&r=").pop();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/185607" + jobid + "?rl=enUS";//cambiar ID
    //msg(endpoint);

    $.ajax({
        url: endpoint,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'GET',
        async: false,
        success: function (result) {
            var full_html = "";

            for (var i = 0; i < result.fields.length; i++) {
                // Ignorar las dos primeras posiciones porque son como basura...
                if (result.fields[i].label == 'Employment Status') {
                    job.source_jobtype = result.fields[i].content;
                }
                if (result.fields[i].label == 'Description of Duties' || result.fields[i].label == 'Requirements' || result.fields[i].label == 'Job Summary') {
                    full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
                    full_html += "<br/>";
                }
            }

            job.html = full_html;

            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();

        },
        error: function (error) {
            msg(error);
        }
    });

    out["job"] = job;
    return out;
})();

//elotroFetch
//infinity
(function () {
    var out = {};

    out["pass_it"] = {
        "offSet": 1,
        "limit": 0
    };

    return out;
})();
//extract
(async () => {
    let out = {};
    out["pass_it"] = pass_it;

    try {
        let jobs = [];
        let resp = await fetch("https://recruiting.adp.com/srccar/public/rest/1/1024641/search/", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/json;charset=UTF-8",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://recruiting.adp.com/srccar/public/RTI.home?c=1046545&d=External&rb=ADP_COM",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "filters": [{
                    "name": "country",
                    "label": "Country"
                }, {
                    "name": "state",
                    "label": "State / Province"
                }, {
                    "name": "city",
                    "label": "City"
                }, {
                    "name": "zzreqJobCategory",
                    "label": "Job Category"
                }, {
                    "name": "typeOfFulltime",
                    "label": "Employment Status"
                }, {
                    "name": "zzreqVirtualRemote",
                    "label": "Virtual/Remote"
                }],
                "results": {
                    "pageTitle": "Search Results",
                    "zeroResultsMessage": "We're sorry but we have no job openings at this time that match your search criteria. Please try another search.",
                    "searchFailureMessage": "Oops! Something went wrong.  Search has encountered a problem. Try searching again",
                    "resultsFoundLabel": "results found.  To filter your results, click on \"filter\" on the sidebar.",
                    "bookmarkText": "Bookmark This",
                    "pageSize": "250",
                    "sortOrder": "00002000",
                    "shareText": "Share",
                    "fields": [{
                        "name": "ptitle",
                        "label": "Published Job Title"
                    }, {
                        "name": "typeOfFulltime",
                        "label": "Employment Status"
                    }, {
                        "name": "zzreqJobCategory",
                        "label": "Job Category"
                    }, {
                        "name": "allLocations",
                        "label": "All Locations"
                    }]
                },
                "pagefilter": {
                    "page": out.pass_it.offSet
                },
                "rl": "enUS"
            }),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });

        const data = await resp.json();
        let htmlJobs = data.jobs;
        out.pass_it.limit = data.pages;

        for (let i in htmlJobs) {
            let elem = htmlJobs[i];
            let job = {};
            job.reqid = elem.num;
            job.title = elem.ptitle;

            job.location = [];
            job.source_location = [];

            job.source_location.push(elem?.city);
            job.source_location.push(elem?.state);
            job.source_location = job.source_location.filter(Boolean).join(", ");

            job.location.push(elem?.city);
            job.location.push(elem?.state);
            job.location = job.location.filter(Boolean).join(", ");

            job.url = elem.url;
            job.source_jobtype = elem.typeOfFulltime;

            job.temp = 96;
            jobs.push(job);
        }
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;

    if (out.pass_it.offSet <= out.pass_it.limit && out.pass_it.offSet <= 101) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//jobdata
(async () => {
    let out = {};
    //out["pass_it"] = pass_it;

    try {
        let job = {};

        let resp = await fetch(`https://recruiting.adp.com/srccar/public/rest/1/1024641/job/${window.location.href.split("&r=").pop()}?rl=enUS`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://recruiting.adp.com/srccar/public/RTI.home?c=1046545&d=External&rb=ADP_COM",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        let result = await resp.json();

        var full_html = "";

        for (var i = 0; i < result.fields.length; i++) {
            // Ignorar las dos primeras posiciones porque son como basura...
            if (result.fields[i].label == 'Employment Status') {
                job.source_jobtype = result.fields[i].content;
            }
            if (result.fields[i].label == 'Position Description') {
                full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
                full_html += "<br/>";
            }
        }

        job.html = full_html;

        job.html = cleanHTML(job.html);
        var tmp = document.createElement("DIV");
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();

        out["job"] = job;
    } catch (err) {
        console.log(err)
    }
    return out;
})();