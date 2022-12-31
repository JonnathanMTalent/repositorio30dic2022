//infinite pagination
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
    if (out.pass_it.offSet < out.pass_it.limit) {
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
    var pageID = 0; 
    var id = document.querySelectorAll(`script[type="text/javascript"]`)
    id.forEach((elm) => {
        if (elm.textContent.match(/csID/)) {
            pageID = elm.textContent.split(`csID=`).pop().replace(`;`, ``).trim()
            msg(pageID)
        }
    })
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