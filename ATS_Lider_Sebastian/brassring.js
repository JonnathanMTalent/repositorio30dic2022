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
(async () => {
    let out = {};
    out["pass_it"] = pass_it;

    try {
        let jobs = [];

        let preLoad = await fetch(window.location.href, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        let auxPreload = await preLoad.text();
        let jsonParameters = document.createElement('div');
        jsonParameters.innerHTML = auxPreload;
        jsonParameters = JSON.parse(JSON.parse(jsonParameters.querySelector('input[id="preLoadJSON"]').value).SmartSearchJSONValue);
        // let jsonParameters = JSON.parse(JSON.parse(document.querySelector('input[id="preLoadJSON"]').value).SmartSearchJSONValue);


        let resp = await fetch("https://sjobs.brassring.com/TgNewUI/Search/Ajax/ProcessSortAndShowMoreJobs", {
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
            "referrer": "https://sjobs.brassring.com/TGnewUI/Search/home/HomeWithPreLoad?partnerid=" + jsonParameters.PartnerId + "&siteid=" + jsonParameters.SiteId + "&PageType=searchResults",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
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
            }),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });


        //Texto
        // const data = await resp.text();
        // let doc = document.createElement('div');
        // doc.innerHTML = data;
        // let htmlJobs = doc.querySelectorAll('Selector');

        //JSON
        let data = await resp.json();
        let htmlJobs = data.Jobs.Job;

        out.pass_it.limit = data.JobsCount;

        htmlJobs.forEach(elem => {
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

                        if (typeof cleanHTML == "undefined") cleanHTML = function (x) {
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
        });
        out.pass_it.jobCount += jobs.length;
        msg('Jobs Count: ' + out.pass_it.jobCount + '\nTotal: ' + out.pass_it.limit);
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
    if (out.pass_it.jobCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();


//multilink
//infinity
(function () {
    var out = {};

    out["pass_it"] = {
        offSet: 1,
        limit: 0,
        jobCount: 0,
        urls: ['https://sjobs.brassring.com/TGnewUI/Search/Home/HomeWithPreLoad?partnerid=25620&siteid=5494&PageType=searchResults', 'https://sjobs.brassring.com/TGnewUI/Search/Home/HomeWithPreLoad?partnerid=25620&siteid=5718&PageType=searchResults'],
        urlCount: 0
    };
    window.location.href = out.pass_it.urls[out.pass_it.urlCount];
    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.jobCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
        out.pass_it.urlCount += 1;
        if (out.pass_it.urlCount < out.pass_it.urls.length) {
            out["has_next_page"] = true;
            out.pass_it.offSet = 0;
            out.pass_it.limit = 0;
            out.pass_it.jobCount = 0;
        }
    }
    out["wait"] = false;
    return out;
})();
//en el extract cambiar la URL del primer fecth (window.location.href) por: out.pass_it.urls[out.pass_it.urlCount]

//formatoURL
//https://sjobs.brassring.com/TGnewUI/Search/home/HomeWithPreLoad?partnerid=25940&siteid=5203&PageType=searchResults