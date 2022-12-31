(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var size = 0;
    var json;
    do {
        var data =;            
        $.ajax({
            url: 'poner la url',
            headers: {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "es-ES,es;q=0.9",
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
                    job.url = 'https://humber.taleo.net/careersection/hbr_ex/jobdetail.ftl?job=' + elem.contestNo;
                    
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