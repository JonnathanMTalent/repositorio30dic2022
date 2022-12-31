//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        offSet: 1,
        limit: 0,
        jobCount: 0
    };
    return out;
})();
//extract
(function() {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;
    let jsonParameters = JSON.parse(JSON.parse(document.querySelector('input[id="preLoadJSON"]').value).SmartSearchJSONValue);
    let rft = document.querySelector('input[name="__RequestVerificationToken"]').value;
    var data = {
        "partnerId": jsonParameters.PartnerId,
        "siteId": jsonParameters.SiteId,
        "keyword": "",
        "location": "",
        "keywordCustomSolrFields": jsonParameters.KeywordCustomSolrFields,
        "locationCustomSolrFields": jsonParameters.LocationCustomSolrFields,
        "linkId": "",
        "Latitude": 0,
        "Longitude": 0,
        "facetfilterfields": {
            "Facet": []
        },
        "powersearchoptions": {
            "PowerSearchOption": []
        },
        "SortType": "LastUpdated",
        "pageNumber": out.pass_it.offSet,
        "encryptedSessionValue": jsonParameters.EncryptedSessionValue
    }; //datos adicionales para el request
    $.ajax({
        url: 'https://sjobs.brassring.com/TgNewUI/Search/Ajax/ProcessSortAndShowMoreJobs', //link del json
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        }, //se obtienen con el fetch
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function(result) {
            msg(result)
            json = result.Jobs.Job;
            out.pass_it.limit = result.JobsCount;
            for (let elem of json) {
                var job = {};
                job.url = elem.Link;
                for (let auxQuestion of elem.Questions) {
                    if (auxQuestion.QuestionName == 'autoreq') {
                        job.reqid = auxQuestion.Value;
                    }
                    if (auxQuestion.QuestionName == 'lastupdated') {
                        var dateAux = new Date(auxQuestion.Value);
                        job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                    }
                    if (auxQuestion.QuestionName == 'jobtitle') {
                        job.title = auxQuestion.Value;
                    }
                    if (auxQuestion.QuestionName == 'jobdescription') {
                        var full_html = document.createElement("div");
                        full_html.innerHTML = auxQuestion.Value;
                        if (full_html) {
                            for (const a of full_html.querySelectorAll('p, span, li')) {
                                if (a.textContent.search(/@|http|www./ig) > -1) {
                                    a.remove();
                                }
                            }
                            var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
                            if (remove_selectors.length > 0) {
                                remove_selectors.forEach(remove_selector => {
                                    for (const a of full_html.querySelectorAll(remove_selector)) {
                                        a.remove();
                                    }
                                });
                            }
                            if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                                return x
                            };
                            if (typeof msg == "undefined") msg = console.log;
                            job.html = full_html.innerHTML.trim();
                            //job.html = removeTextBefore(job.html, '', false);
                            //job.html = removeTextAfter(job.html, '', true);
                            job.html = cleanHTML(job.html);
                            var tmp = document.createElement('div');
                            tmp.innerHTML = job.html;
                            job.jobdesc = tmp.textContent.trim();
                            job.jobdesc = cleanHTML(job.jobdesc);
                        }
                    }
                    if (auxQuestion.QuestionName == 'formtext21') {
                        job.source_location = auxQuestion.Value;
                        job.location = job.source_location;
                    }
                }
                job.temp = "96";
                jobs.push(job);
            }
            //counter += 1;
        },
        error: function(error) {
            msg(error);
        }
    });
    out.pass_it.jobCount += jobs.length;
    msg('Jobs Count: ' + out.pass_it.jobCount + '\nTotal: ' + out.pass_it.limit);
    out["jobs"] = jobs;
    return out;
})();
//pagination
(function() {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.jobCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();