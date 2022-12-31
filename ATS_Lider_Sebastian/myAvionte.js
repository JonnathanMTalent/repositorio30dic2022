//extract
(function() {
    var jobs = [];
    var out = {};
    //out["pass_it"] = pass_it;
    let jobSiteID = document.querySelector('iframe').src.split('jobs/').pop().slice(0, -2).trim();
    //let jobSiteID = window.location.href.split('jobs/').pop().slice(0, -2).trim();
    //Change acording to the jobsite

    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    $.ajax({
        url: 'https://hire.myavionte.com/sonar/v2/jobBoard/' + jobSiteID, //link del json
        headers: {
            "accept": "application/json, text/plain, */*"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "json",
        async: false,
        success: function(result) {
            let json = result.jobPosts;
            //limit = result.total;
            for (let x in json) {
                let elem = json[x];
                var job = {};
                job.reqid = elem.jobPostIdEnc;
                job.title = elem.jobTitle;
                job.source_location = elem.location;
                job.location = job.source_location;
                job.url = window.location.href + '?postid=' + job.reqid;
                //job.url = 'https://talener.com/job/' + job.title.replace(/\s/g, '-').toLowerCase() + '-' + job.location.split(',').pop().trim().toLowerCase() + '-' + job.reqid;
                //Change acording to the jobsite
                job.source_jobtype = elem.jobType;
                var dateAux = new Date(elem.postDateUtc);
                job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                job.temp = "96";
                
                $.ajax({
                    url: 'https://hire.myavionte.com/sonar/v2/jobBoard/jobPost/' + job.reqid + '/description', //link del json
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en-GB,en;q=0.9",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-compas-careers-buildidenc": result.buildIdEnc,
                        "x-compas-careers-jobboardidenc": result.jobBoardIdEnc
                    }, //se obtienen con el fetch
                    type: 'GET',
                    //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
                    dataType: "json",
                    async: false,
                    success: function(resultDesc) {
                        var full_html = document.createElement("div");
                        full_html.innerHTML = resultDesc["description"];

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
                    },
                    error: function(error) {
                        msg(error);
                    }
                });

                jobs.push(job);
            }
        },
        error: function(error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();