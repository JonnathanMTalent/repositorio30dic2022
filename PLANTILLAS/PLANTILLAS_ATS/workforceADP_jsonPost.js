//////////////////// EXTRACT

(function () {
    const out = {};
    const jobs = [];
    let json;

    if (!pass_it.count) {
        out.pass_it = {
            count: 1,
            limit: 0,
        };
    } else {
        out.pass_it = pass_it;
    }

    //do {
    const data = {
        filters: [
            { name: 'state', label: 'State' },
            { name: 'city', label: 'City' },
            { name: 'zzreqAreaofInterest', label: 'Area of Interest' },
            { name: 'typeOfFulltime', label: 'Position Type' },
        ],
        results: {
            pageTitle: 'Search Results',
            zeroResultsMessage:
                "We're sorry but we have no job openings at this" +
                ' time that match your search criteria. Please try another search.',
            searchFailureMessage:
                'Oops! Something went wrong.  Search has encountered a problem. Try searching again',
            resultsFoundLabel: 'results found',
            bookmarkText: 'Bookmark This',
            pageSize: '100',
            sortOrder: '00001000',
            shareText: 'Share',
            fields: [
                { name: 'num', label: 'Req Num' },
                { name: 'ptitle', label: 'Published Job Title' },
                { name: 'departmentCode', label: 'Department' },
            ],
        },
        pagefilter: { page: out.pass_it.count },
        rl: 'enUS',
    };

    $.ajax({
        url: 'https://recruiting.adp.com/srccar/public/rest/1/886341/search/',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        success: result => {
            json = result.jobs;
            out.pass_it.limit = result.pages;

            for (let x in json) {
                let job = {};
                let elem = json[x];

                job.title = elem.ptitle;
                job.url = elem.url;
                job.reqid = elem.num;

                const fullSourceLoc = [];
                const fullLoc = [];
                if (elem.city) fullLoc.push(elem.city);
                if (elem.state) fullLoc.push(elem.state);

                if (elem.locationaddress[0]) {
                    let country = elem.locationaddress[0]
                        .split(',')
                        .pop()
                        .replace(/[0-9]/g, '')
                        .trim();
                    fullLoc.push(country);
                }

                fullSourceLoc.push(fullLoc.join(', '));
                if (elem.postingLocationCode) fullSourceLoc.push(elem.postingLocationCode);
                job.source_location = fullSourceLoc.join(', ');

                job.location = fullLoc
                    .join(', ')
                    .replace(/Remote,/gi, '')
                    .trim();
                if (!job.location) job.location = 'Coppell, TX, US';

                job.source_jobtype = elem.typeOfFulltime;

                /*
                    const jobtype = [];
                    if (elem.zzreqFullTime) jobtype.push(elem.zzreqFullTime);
                    if (elem.zzreqemployeeclass) jobtype.push(elem.zzreqemployeeclass);
                    job.source_jobtype = jobtype.join(' - ');
                    */

                job.temp = 'Abr-2022';

                jobs.push(job);
            }
            //cont++;
        },
        error: error => msg(error),
    });
    //} while (cont < limit + 1);

    out.jobs = jobs;
    return out;
})();

//////////////////// JOBDESCRIPTION

(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;

    if (out.pass_it.count <= out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }

    return out;
})();

//////////////////// JOBDESCRIPTION

/*
Entrando el una descripción aleatoria
Procedimiento
    1. Inspeccionamos
    2. Seleccionamos el archivo JSON de la descripción. 
    3. Tomamos el enlace de EJEMPLO: https://recruiting.adp.com/srccar/public/rest/1/115407/job/5000596984106?rl=enUS
    4. Debemos cumplir ese patrón. 
    5. Del URL que extraemos del extract solo tomaremos el ID; var jobid. // var jobid
*/

(function () {
    const out = {};
    const job = {};
    const jobid = pass_it.job.link.split('&r=').pop();
    const endpoint = `https://recruiting.adp.com/srccar/public/rest/1/415441/job/${jobid}?rl=enUS`;

    $.ajax({
        url: endpoint,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        type: 'GET',
        async: false,
        success: result => {
            let full_html = '';
            let elem_fields = result.fields;

            for (let i of elem_fields) {
                if (i.label === 'Job Description' || i.label === 'Perks') {
                    full_html += '<h3>' + i.label + '</h3><br/>' + i.content;
                    full_html += '<br/>';
                }
            }

            for (let i of elem_fields) {
                if (i.label === 'Full-Time / Part-Time') {
                    // FT/PT
                    job.source_jobtype = i.content.trim();
                }
            }

            job.html = full_html.trim();
            job.html = cleanHTML(job.html);

            let temp = document.createElement('div');
            temp.innerHTML = job.html;

            job.jobdesc = temp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
        },
        error: error => msg(error),
    });

    out.job = job;
    return out;
})();

function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).pop();
    if (!flag) newHtml = '<h3>' + text + '</h3>' + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).shift();
    if (!flag) newHtml = newHtml + '<p>' + text + '</p>';
    return newHtml;
}
