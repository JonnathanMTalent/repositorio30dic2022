(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var size = 0;
    var json;
    do {
        var data = { "multilineEnabled": false, "sortingSelection": { "sortBySelectionParam": "3", "ascendingSortingOrder": "false" }, "fieldData": { "fields": { "KEYWORD": "", "LOCATION": "", "CATEGORY": "" }, "valid": true }, "filterSelectionParam": { "searchFilterSelections": [{ "id": "POSTING_DATE", "selectedValues": [] }, { "id": "LOCATION", "selectedValues": [] }, { "id": "JOB_FIELD", "selectedValues": [] }, { "id": "JOB_SCHEDULE", "selectedValues": [] }] }, "advancedSearchFiltersSelectionParam": { "searchFilterSelections": [{ "id": "ORGANIZATION", "selectedValues": [] }, { "id": "LOCATION", "selectedValues": [] }, { "id": "JOB_FIELD", "selectedValues": [] }, { "id": "JOB_NUMBER", "selectedValues": [] }, { "id": "URGENT_JOB", "selectedValues": [] }, { "id": "EMPLOYEE_STATUS", "selectedValues": [] }, { "id": "JOB_SHIFT", "selectedValues": [] }] }, "pageNo": counter };            
        $.ajax({
            url: 'https://bombardier.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=140180101',
            headers: {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "es-ES,es;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "tz": "GMT-05:00",
    "tzname": "America/Bogota",
    "x-requested-with": "XMLHttpRequest"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.requisitionList;
                limit = result.pagingData.totalCount;
                size += result.pagingData.pageSize;
                for (var elem of json) {
                    var job = {};
                    job.reqid = elem.jobId;
                    job.title = elem.column[0];
                    job.location = 'Ontario, CA';
                    job.url = 'https://humber.taleo.net/careersection/hbr_ex/jobdetail.ftl?job=' + elem.contestNo;
                    job.dateposted_raw = elem.column[3];
                    job.temp = 96;
                    jobs.push(job);
                }
                counter = counter + 1;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (size < limit);

    out["jobs"] = jobs;
    return out;
})();