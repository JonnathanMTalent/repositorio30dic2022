/////////////////////////////////////////////// EXTRACT

(function () {
    const out = {};
    const jobs = [];
    let count = 1;
    let limit = 0;
    let total = 0;
    let json;

    do {
        const data = {
            multilineEnabled: false,
            sortingSelection: { sortBySelectionParam: '3', ascendingSortingOrder: 'false' },
            fieldData: { fields: { KEYWORD: '', LOCATION: '', CATEGORY: '' }, valid: true },
            filterSelectionParam: {
                searchFilterSelections: [
                    { id: 'POSTING_DATE', selectedValues: [] },
                    { id: 'LOCATION', selectedValues: [] },
                    { id: 'JOB_FIELD', selectedValues: [] },
                ],
            },
            advancedSearchFiltersSelectionParam: {
                searchFilterSelections: [
                    { id: 'ORGANIZATION', selectedValues: [] },
                    { id: 'LOCATION', selectedValues: [] },
                    { id: 'JOB_FIELD', selectedValues: [] },
                    { id: 'JOB_NUMBER', selectedValues: [] },
                    { id: 'URGENT_JOB', selectedValues: [] },
                    { id: 'EMPLOYEE_STATUS', selectedValues: [] },
                    { id: 'STUDY_LEVEL', selectedValues: [] },
                ],
            },
            pageNo: count,
        };
        $.ajax({
            url: 'https://cpsk12il.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=4140430395',
            headers: {
                accept: 'application/json, text/javascript, */*; q=0.01',
                'accept-language': 'es-ES,es;q=0.9,de;q=0.8,ja;q=0.7',
                'content-type': 'application/json',
                'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                tz: 'GMT-05:00',
                tzname: 'America/Bogota',
                'x-requested-with': 'XMLHttpRequest',
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            async: false,
            success: result => {
                json = result.requisitionList;
                limit = result.pagingData.totalCount;
                total += json.length;

                for (let x in json) {
                    const job = {};
                    const elem = json[x];

                    job.title = elem.column[0].trim();
                    job.reqid = elem.contestNo;
                    job.url = `https://cpsk12il.taleo.net/careersection/3/jobdetail.ftl?job=${job.reqid}`;
                    job.source_location = elem.column[1].trim();
                    job.location = 'Chicago, IL, US';

                    let datePosted = elem.column[2].trim();
                    job.dateposted_raw = new Date(datePosted).toLocaleDateString();

                    job.temp = 'Abr-2022';

                    jobs.push(job);
                }
                msg(`\x1B[33m Current page: ${count}`);
                count++;
            },
            error: error => msg(error),
        });
    } while (total < limit);

    out.jobs = jobs;
    return out;
})();

/////////////////////////////////////////////// PAGINATION

(function () {
    const out = {};
    const job = {};
    const selector = 'tr[id="requisitionDescriptionInterface.ID3374.row.row1"]'; // .editablesection // div[name="cwsJobDescription"]
    const remove_selectors = ['img', 'video', 'button', 'input', 'style', 'javascript', 'script'];

    if (document.querySelector(selector)) {
        if (typeof cleanHTML === 'undefined') cleanHTML = x => x;
        if (typeof msg === 'undefined') msg = console.log;

        const selectDate = '[id^="requisitionDescriptionInterface.reqUnpostingDate.row"]';
        if ((dateClosed = document.querySelector(selectDate))) {
            let dateClosed = document
                .querySelector(selectDate)
                .textContent.split(',')
                .shift()
                .replace(/-/g, ' ')
                .trim();

            if (dateClosed.indexOf('Ongoing') < 0) {
                job.dateclosed_raw = new Date(dateClosed).toLocaleDateString();
            }
        }

        /* Cuando la locacion no esta en el extract
        var search_location = document.querySelectorAll('span[id="requisitionDescriptionInterface.ID2034.row1"] p'); 

        for (let i of search_location) {
            if (i.textContent.indexOf("LOCATION:") > -1){
                let location = i.textContent.trim();
                location = location.replace(/[0-9]/g, "").replace("LOCATION:", "").split(",");
                job.location = location[1] + ", " + location[2];
            } else {
                job.location = "Chicago, IL";
            }
        } 
        */

        /* Cuando la fecha de posteo no esta en el extract
        let searching = document.querySelectorAll('.editablesection div');
      	for (let i of searching) {
        	if (i.textContent.indexOf("Job Posting") > -1) {
                var datePosted = i.textContent.replace("Job Posting:", "").trim();  
      			job.dateposted_raw = getDateFormat(datePosted, "-", 1, 0, 2);
            }
        }
        */

        let full_html = document.querySelector(selector);
        // Remove something from the jobdatata
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(function (e) {
                if (full_html.querySelector(e)) {
                    let items = full_html.querySelectorAll(e);
                    for (const a of items) {
                        a.remove();
                    }
                }
            });
        }

        let delete_items = document.querySelectorAll('p');
        for (const item of delete_items) {
            if (item.textContent.search(/@|www.|https:/g) > -1) {
                item.remove();
            }
        }

        job.html = full_html.innerHTML.trim();
        job.html = cleanHTML(job.html);

        let tmp = document.createElement('div');
        tmp.innerHTML = job.html;

        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        job.html = removeTextBefore(job.html, 'POSITION SUMMARY', true);
        job.html = removeTextBefore(job.html, 'Community Epidemiology', true);
        job.html = removeTextBefore(job.html, 'bottom of this posting.', true);
        job.html = removeTextAfter(job.html, 'For further information on', true);

        if (job.jobdesc.length < 120) {
            job.flag_active = 0;
            job.html = '';
            job.jobdesc = '';
        }
    } else {
        job.flag_active = 0;
        job.html = '';
        job.jobdesc = '';
    }
    out['job'] = job;
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
