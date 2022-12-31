//Extract
(async () => {


    var out = {};
    var html_jobs = document.querySelectorAll("div.jv-job-list ul li a");
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];

        job.title = elem.querySelector('.jv-job-list-name').textContent.trim();

        const tracker = '?__jvst=Job Board&__jvsd=talent';
        job.url = elem.href.trim() + tracker;
		
		
		//job.reqid = elem.querySelector(".jv-job-list-name a").href.trim().split("/").pop();
        //job.url = `https://jobs.jobvite.com/360insights/job/${job.reqid}?nl=1&nl=1&fr=true` + "?__jvst=Job Board&__jvsd=talent";

        job.reqid = job.url.split('/').pop().replace(tracker, '').trim();

        job.source_location = elem.querySelector('.jv-job-list-location').textContent.trim();
        job.location = elem.querySelector('.jv-job-list-location')
            .textContent.trim().replace(`Remote,`, ``).trim();
            
        if(job.location === 'Remote'){
            job.location = 'Foothill Ranch, California, US' //HQ - https://www.linkedin.com/company/loandepot/
        }


        job.temp = '09/28/2022';

        if (job.location.indexOf("Locations") > -1) {

            const resp = await fetch(job.url),
                html = await resp.text(),
                div = document.createElement('div');
            div.innerHTML = html;

            var loc = div.querySelector('p[class="jv-job-detail-meta"]').innerHTML.trim().split('<span class="jv-inline-separator"></span>');
            job.source_location = div.querySelector('p[class="jv-job-detail-meta"]').innerHTML.trim();

            for (var i = 0; i < loc.length; i++) {
                let jobx = {
                    ...job
                };
                jobx.location = loc[i].replace(/\n+/g, '').replace(/\s+/g, ' ').split('|').pop().trim();
                jobs.push(jobx);
            }


        } else {
            job.location = job.location.replace(/\n+/g, '').replace(/\s+/g, ' ')
            jobs.push(job);
        }
    }

    out["jobs"] = jobs;
    return out;
})();



//Option 2
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("table.jv-job-list tbody tr");
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};


        var elem = html_jobs[x];
        job.title = elem.querySelector("a").textContent.trim();
        job.url = elem.querySelector("a").href.trim();
        job.reqid = job.url.split("/").pop();
        job.url += "?__jvst=Job Board&__jvsd=talent";

        job.source_location = elem.querySelector('.jv-job-list-location').textContent.trim();
        job.location = elem.querySelector('.jv-job-list-location')
            .textContent.trim().replace(`Remote,`, ``).trim();

        if (job.location === 'Remote') {
            job.location = 'Chicago, IL, US' //HQ - https://www.linkedin.com/company/plumrose/?trk=public_profile_experience-item_profile-section-card_image-click&originalSubdomain=co
        }



        job.temp = '10/13/2022';


        if (job.location.indexOf("Locations") > -1) {
            aux = getDescription(job.url);
            var parser = new DOMParser();
            var doc = parser.parseFromString(aux, 'text/html');
            aux_loc = Array.from(doc.querySelector("p.jv-job-detail-meta").childNodes).filter(aux => aux.nodeName == "#text");
            for (i = 1; aux_loc.length > i; i++) {
                job2 = Object.assign({}, job);
                job2.location = aux_loc[i].textContent.replace(/\n+/g, '').replace(/\s+/g, ' ').replace('<span>', '').replace('</span>', '').replace(/&nbsp;|&middot;|&rdquo;|&ldquo;|&amp;|&rsquo;|&mdash;|&ndash;|Remote,/gi, ' ').split('|').pop().trim();
                if (job2.location.search(/Remote/gi) > -1) {
                    job2.location = 'Chicago, IL, US' //HQ - https://www.linkedin.com/company/plumrose/?trk=public_profile_experience-item_profile-section-card_image-click&originalSubdomain=co
                }

                jobs.push(job2);
            }
        } else {
            jobs.push(job);
        }
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();

    }

    out["jobs"] = jobs;
    return out;
})();

function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}





//Pagination

(function() {
    let out = {};
    let next_page_selector = '.jv-pagination-next';
    let clickable_elem = document.querySelector(next_page_selector);

    if (!document.querySelector(next_page_selector)) {
        out['has_next_page'] = false;
    } else if (clickable_elem) {
        clickable_elem.click();
        out['has_next_page'] = true;
    } else {
        out['has_next_page'] = true;
    }

    out.waitFor = 'table.jv-job-list tbody tr'
    return out;
})();