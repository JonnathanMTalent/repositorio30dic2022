(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0
    };
    return out;
  })();

//EXTRACT
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


  // PAGINATION

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


  // JOBDESCRIPTION

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
            // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  //EXPERIENCE QUE TOMA MESES EN VARIOS IDIOMAS             
                let experience=[];  for (let li of tmp.querySelectorAll("li")) {
                  if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung/i.test(li.textContent)
                    && /\d|one|two|three|four|five|six|seven|eight|nine|ten/gi.test(li.textContent))
                    experience.push(li.textContent);
                }
                job.experience_required=experience[0];
  //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
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

