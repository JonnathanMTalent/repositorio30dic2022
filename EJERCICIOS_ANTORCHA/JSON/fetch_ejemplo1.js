// https://flourish-uk.com/search-hospitality-jobs/


//infinite pagination
(function() {
    var out = {};
    out.pass_it = {
        "page": 1,
        "jobs": 0,
        "totalJobs": 0
    }
    return out;
})();
//extract
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    try {
        let jobs = [];
        const resp = await fetch(`https://flourish-uk.com/Umbraco/api/SearchJobs/GetOffers?PageNumber=${out.pass_it.page}&JobTitles=&JobTerm=0&Counties=`, {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Content-Type": "application/json; charset=utf-8",
                "X-Requested-With": "XMLHttpRequest",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://flourish-uk.com/search-hospitality-jobs/",
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.json();
        let json_jobs = data.List
        out.pass_it.totalJobs = data.TotalCount // paginacion
        msg(`Total jobs: ${out.pass_it.totalJobs}`)
        for (let x = 0; x < json_jobs.length; x++) {
            let job = {};
            let elem = json_jobs[x];
            job.title = elem.JobTitle;
            job.url = `https://flourish-uk.com` + elem.JobUrl;
            job.reqid = elem.Id;
            job.dateposted_raw = elem.Posted.split(`the`).pop().split(`/`);
            job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[0]}/${job.dateposted_raw[2]}`;
            job.temp = `test`;
            jobs.push(job)
        }
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        console.log(err)
    }
})();
(()=>{
    var out = {};
    out.pass_it = pass_it; 
    out.has_next_page = false;
    out.pass_it.page ++ ; 
    out.pass_it.jobs+=10;
    if(out.pass_it.totalJobs > out.pass_it.jobs){
        out.has_next_page = true
    }
    return out;
})()

