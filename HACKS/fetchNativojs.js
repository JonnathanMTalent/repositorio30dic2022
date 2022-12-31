//extract
(async () => {
    let out = {};
    // out.pic = true; 
    out["pass_it"] = pass_it;
    var jobsSelector = ``  // selector de los jobs
    try {
        let jobs = [];
        const url = window.location.href
        const resp = await fetch(url, {
            "headers": {}
        });
        const data = await resp.text();
        var doc = document.createElement('div');
        doc.innerHTML = data;
        var htmlJobs = doc.querySelectorAll(jobsSelector);
        // msg(data)
        htmlJobs.forEach((elem) => {
            var job = {};
            //elem.querySelector(``).textContent.trim()
            job.title = elem.querySelector(``).textContent.trim();
            job.url = elem.querySelector(``).href.trim();
            job.reqid = job.url.split(`-`).pop().trim();
            job.source_location = elem.querySelector(``).textContent.trim();
            job.location = job.source_location.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
            job.location = job.location.split(`-`).shift().trim();
            job.dateposted_raw = elem.querySelector(``).textContent;
            job.dateposted_raw = job.dateposted_raw.split(` `);
            job.dateposted_raw = `${job.dateposted_raw[0]}/${job.dateposted_raw[1]}/${job.dateposted_raw[2]}`;
            job.dateposted_raw = job.dateposted_raw.replace(/,/, '').replace("Jan", "01")
                .replace("Feb", "02")
                .replace("Mar", "03")
                .replace("Apr", "04")
                .replace("May", "05")
                .replace("Jun", "06")
                .replace("Jul", "07")
                .replace("Aug", "08")
                .replace("Sep", "09")
                .replace("Oct", "10")
                .replace("Nov", "11")
                .replace("Dec", "12");
            if(!job.dateposted_raw.match(/^[0-9]+\/+[0-9]+\/+[0-9]/)){
                job.dateposted_raw = '';
            }
            job.temp = `06/28/2022`;
            jobs.push(job);
        })
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        console.log(err)
    }
})();