//Oracle fetch

(async () => {
    var jobs = [];
    var out = {};
    var json;
    if (!pass_it['cont']) {
        out["pass_it"] = {
            'cont': 0,
            'total': 0
        };
    } else {
        out['pass_it'] = pass_it;
    }

    var url = 'https://fa-esow-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX_1,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS,limit=24,offset=' + out["pass_it"].cont;

    const resp = await fetch(url),
        result = await resp.json();

    json = result.items[0].requisitionList;

    if (!out['pass_it']['total'])
        out['pass_it']['total'] = result.items[0].TotalJobsCount;

    for (var i = 0; i < json.length; i++) {
        var job = {};
        job.title = json[i].Title.trim();
        var reqid = json[i].Id;
        job.url = "https://fa-esow-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/requisitions/preview/" + reqid;
        job.location = json[i].PrimaryLocation;
        job.source_location = json[i].PrimaryLocation;
        job.reqid = job.url.split("/").pop().replace(/req_/i, '');

        if (/(Full|Part)\s?-?Time/i.test(job.title))
            job.source_jobtype = /(Full|Part)\s?-?Time/i.exec(job.title)[0];

        let date = json[i].PostedDate.split("T").shift().split("-");
        job.dateposted_raw = new Date(date[1] + '/' + date[2] + '/' + date[0]).toLocaleDateString('en-US');

        job.temp = '09/08/2022';
        jobs.push(job);

    }

    out["pass_it"].cont = out["pass_it"].cont + json.length;
    out["jobs"] = jobs;
    out["pass_it"].jobslength = jobs.length;
    return out;
})();



//Pag


(function() {
    var out = {};
    out['pass_it'] = pass_it;

    //stop condition out['pass_it']['cont'] <= out['pass_it']['total'] ||
    if (out["pass_it"].jobslength == 0) {
        // out['pass_it']['cont'] +=out["pass_it"].jobslength;
        out["has_next_page"] = false;
        // msg('jobs x pg -> ' + out["pass_it"].jobslength)
    } else {
        out["has_next_page"] = true;
        // msg(out["pass_it"].jobslength)

        if (out["pass_it"].jobslength == 0) {
            out["has_next_page"] = false;
        }
    }

    return out;
})();



//Desc

(function() {
    const out = {};
    const job = {};
    const selector = 'div.job-details-container'; // .info
    const remove_selectors = [
        'a',
        'img',
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
        const search_jobType = document.querySelectorAll('.job-info-wrapper'); // .job-meta__item
        for (let i of search_jobType) {
            if (i.textContent.indexOf('Job Schedule') > -1) {
                job.source_jobtype = i.querySelector('.job-info-values').textContent.trim(); // .job-meta__subitem
            }
            if (i.textContent.indexOf('Apply Before') > -1) {
                let dateClosed = i.querySelector('.job-info-values').textContent.trim();
                job.dateclosed_raw = dateClosed.split(',').shift().trim();
            }
        }
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
        job.html = full_html.innerHTML.trim();

        let benefitRegex = /Wellbeing & Benefits/gi;
        if (job.html.search(benefitRegex) > -1) {
            for (const b of full_html.querySelectorAll("p")) {
                if (b.textContent.search(benefitRegex) > -1 && b.nextElementSibling.querySelector("li")) {
                    job.source_benefit = b.nextElementSibling.textContent.trim();
                    break;
                }
                if (b.textContent.search(benefitRegex) > -1 && b.nextElementSibling.nextElementSibling.querySelector("li")) {
                    job.source_benefit = b.nextElementSibling.nextElementSibling.textContent.trim();
                    break;
                }
            }
        }


        job.html = cleanHTML(job.html);
        let tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        job.html = removeTextBefore(job.html, "About the Role", false);
        //job.html = removeTextAfter(job.html, //gi, true);
    }
    out.job = job;
    return out;
})();

function removeTextBefore(html, text, flag) {
    let keyWord;
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) keyWord = text;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).pop();
    if (!flag)
        if (keyWord) newHtml = '<h3>' + keyWord + '</h3>' + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).shift();
    if (!flag) newHtml = newHtml + '<p>' + text + '</p>';
    return newHtml;
}