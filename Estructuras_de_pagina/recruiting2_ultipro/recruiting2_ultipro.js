(async () => {
    let out = {};
    var json;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch(window.location.origin + window.location.pathname + 'JobBoardView/LoadSearchResults', {
            "credentials": "include",
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/json; charset=UTF-8",
                "sec-ch-ua": "\"Opera GX\";v=\"77\", \"Chromium\";v=\"91\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "x-requestverificationtoken": "AqBeEwm2xF-n-gSQhiaKfiRnhtlbvrEPV8dpefYA9RKsoHPtGtv4E0eLtkpKWAX72JomoCZXRxsKBFakUtZ6Zs9zYRVmuleYwHoJUODcbDZrXFqIKqt1QTLfF532HyCUbOPFiQ2"
            },
            "referrer": window.location.href,
            "body": "{\"opportunitySearch\":{\"Top\":9999,\"Skip\":0,\"QueryString\":\"\",\"OrderBy\":[{\"Value\":\"postedDateDesc\",\"PropertyName\":\"PostedDate\",\"Ascending\":false}],\"Filters\":[{\"t\":\"TermsSearchFilterDto\",\"fieldName\":4,\"extra\":null,\"values\":[]},{\"t\":\"TermsSearchFilterDto\",\"fieldName\":5,\"extra\":null,\"values\":[]},{\"t\":\"TermsSearchFilterDto\",\"fieldName\":6,\"extra\":null,\"values\":[]}]},\"matchCriteria\":{\"PreferredJobs\":[],\"Educations\":[],\"LicenseAndCertifications\":[],\"Skills\":[],\"hasNoLicenses\":false,\"SkippedSkills\":[]}}",
            "method": "POST",
            "mode": "cors"
        });

        const result = await resp.json();
        json = result.opportunities;
        limit = result.totalCount;
        for (let x = 0; x < json.length; x++) {
            let elem = json[x];
            let source_location = [];

            for (let y = 0; y < elem.Locations.length; y++) {
                let auxLoc = elem.Locations[y];
                let source_location_aux = [];
                source_location_aux.push(auxLoc?.Address?.City);
                source_location_aux.push(auxLoc?.Address?.State?.Code + ' ' + auxLoc?.Address?.PostalCode);
                source_location_aux.push(auxLoc?.Address?.Country?.Code?.slice(0, -1));
                source_location_aux = source_location_aux.filter(Boolean).map(x => x.trim()).join(", ");
                source_location.push(source_location_aux);
            }
            source_location = source_location.filter(Boolean).join('\n');

            for (let z = 0; z < elem.Locations.length; z++) {
                var job = {};
                let auxLoc = elem.Locations[z];
                job.reqid = elem?.RequisitionNumber;
                job.title = elem?.Title;
                job.url = window.location.href.split('?').shift() + 'OpportunityDetail?opportunityId=' + elem.Id;
                if (elem.PostedDate) {
                    var dateAux = new Date(elem.PostedDate);
                    job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                }
                //job.dateposted_raw = elem?.PostedDate.split('T').shift();
                //job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                elem.FullTime ? job.source_jobtype = 'Full Time' : job.source_jobtype = 'Part Time';
                job.source_location = source_location
                job.location = [];
                job.location.push(auxLoc?.Address?.City);
                job.location.push(auxLoc?.Address?.State?.Code);
                job.location.push(auxLoc?.Address?.Country?.Code?.slice(0, -1));
                job.location = job.location.filter(Boolean).map(x => x.trim()).join(", ");

                job.temp = 96;
                jobs.push(job);
            }
        }
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();

// pagination
(function() {
    var out = {};
    out["has_next_page"] = false;
    return out;
})();



// before jobdesc
(function() {
    var out = {};
    out.waitFor = `p[class="opportunity-description"]`
    return out;
})();




//Jobdata
(function() {
    var out = {};
    var job = {};
    //var jobPassit = pass_it["job"];

    var full_html = document.querySelector('p[class="opportunity-description"]');

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
        job.html = removeTextAfter(job.html, `For immediate consideration`, true);
        //job.html = removeTextAfter(job.html, ``, true);
        //job.html = removeTextAfter(job.html, ``, true);

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
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