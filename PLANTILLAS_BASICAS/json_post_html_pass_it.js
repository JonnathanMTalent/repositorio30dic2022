https://www.joinnspg.org/SearchResults.aspx?CategoryClassDDL=-1&CategoryDDL=-1&ScheduleDDL=-1&LocationDDL=


//  RECORDAR QUE  LOS SELECTORES NO SON LOS MISMOS Y TOCA BUSCARLOS CON UN MSG
//infinity

(() => {
    var out = {};
    out.pass_it = {
        "counter":1,
        "counterJobs":0,
        "limit":0
    }
    return out;
})()


(function() {

    var out = {};
    var jobs = [];
    var counter = 2;
    var limit = 0;
    var json;
    let flag = true;
    out.pass_it=pass_it;
    //do {
        var data = {
            "companyId": 18302,
            "categoryClassIds": -1,
            "categoryIds": -1,
            "cityStates": "",
            "customVarIds": -1,
            "entityIds": -1,
            "recruiterIds": -1,
            "scheduleIds": -1,
            "shiftIds": -1,
            "sortBy": "",
            "pageNum": out.pass_it.counter
        }

        $.ajax({
            url: 'https://www.joinnspg.org/Ajax/GetSearchListingsWide.aspx',
            headers: {
                "accept": "*/*",
                "accept-language": "es-ES,es;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Opera\";v=\"89\", \"Chromium\";v=\"103\", \"_Not:A-Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-newrelic-id": "VgAHUVJXGwADVVhaAQE=",
                "x-requested-with": "XMLHttpRequest"
            },
            type: 'POST',
            //data : JSON.stringify(data),
            data: data,
            dataType: "HTML",
            async: false,
            success: function(result) {
                
                var tmp = document.createElement('div');
                tmp.innerHTML = result;

                var html_jobs = tmp.querySelectorAll("table.tablesaw tbody  tr");
                out.pass_it.limit=html_jobs.length



                for (var x in html_jobs) {
                    if (typeof html_jobs[x] == "function") continue;
                    if (typeof html_jobs[x] == "number") continue;
                    var job = {};
                    var elem = html_jobs[x];
                    if (elem.querySelector("td.title")) {
                        job.title = elem.querySelector("td.title a").textContent.trim();
                        job.url = elem.querySelector("td.title a").href.trim();

                        job.temp = 1;
                        jobs.push(job);
                    }
                }
                

            },
            error: function(error) {
                msg(error);
            }
        });
   // } while (flag);


    out["jobs"] = jobs;
    return out;
})();


(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 1;
    if (out.pass_it.limit < 1) {
        out.has_next_page = false;
    }else{
        out.has_next_page = true;
    }
    return out;
})();