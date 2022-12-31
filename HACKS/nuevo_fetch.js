//fetch con token y valores que se deben extraer ante de la petición que retorna los jobs.
//infinity
(function() {
    var out = {};
    out.pass_it = {
        "page": 1,
        "jobs": 0
    }
    return out;
})();
//extract
(async () => {
    let out = {};
    out.pass_it = pass_it;
    //Primera petición (aca se extraen los datos necesarios para realizar la petición por los jobs.)
    try {
        let jobs = [];
        const url = window.location.href
        const respHT = await fetch(url, {
            "headers": {}
        });
        const dataHT = await respHT.arrayBuffer();
        let decoder = new TextDecoder();
        let text = decoder.decode(dataHT);
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(text, 'text/html');
        //Generar los token, pageid, y datos necesarios desde acá teniendo en cuenta que doc hace el papel del
        //document Object model
        let token = doc.querySelector(`meta[name="csrf-token"]`).getAttribute(`content`);
        //Una vez se tienen todos los datos, realizamos la petición estandar por los datos
        //Tener presente que al haber hecho una petición previa no se puede usar forEach.
        const resp = await fetch(`https://lssliving.recsolu.com/job_boards/kYwtvMPanMr3hrMl1_vrcg/search?query=&filters=&page_number=${out.pass_it.page}&job_board_tab_identifier=95967d04-8f84-db05-2985-6e53e48b2c5f`, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "X-NewRelic-ID": "VQQFUldbCBADVVlQBwQFVA==",
                "X-CSRF-Token": token,
                "X-Requested-With": "XMLHttpRequest",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://lssliving.recsolu.com/job_boards/kYwtvMPanMr3hrMl1_vrcg",
            "method": "GET",
            "mode": "cors"
        });
        const data = await resp.json();
        out.pass_it.jobs = data.count_on_page;
        msg(`En esta página hay: ${out.pass_it.jobs} jobs.`);
        let html_response = parseDoc.parseFromString(data.html, 'text/html');
        let jobsSelector = `li.search-results__item`;
        let html_jobs = html_response.querySelectorAll(jobsSelector)
        for (let x = 0; x < html_jobs.length; x++) {
            if (typeof html_jobs[x] === 'function') continue;
            if (typeof html_jobs[x] === 'number') continue;
            let job = {};
            let elem = html_jobs[x];
            job.title = elem.querySelector('a').textContent.trim();
            job.url = elem.querySelector('a').href.trim();
            job.reqid = job.url.split('jobs/').pop().split('?').shift().trim();
            job.source_location = elem.querySelector('div div span:first-child').textContent.trim();
            job.location = job.source_location;
            if (job.location == '' || job.location.length < 1 || job.location.includes('Other')) {
                job.source_location = ``;
                job.location = 'Brentwood, MO, US';
            }
            // let datePosted = elem.querySelector("div[class='search-results__post-time pull-right']").textContent.trim();
            // job.dateposted_raw = dateAgo(datePosted, ' ', 1, 2);
            job.temp = `07/14/2022 Juan Bermudez`;
            if (job.location.indexOf('/') > -1) {
                let array = job.location.split("/");
                for (let i = 0; i < array.length; i++) {
                    const jobx = {
                        ...job
                    };
                    jobx.location = array[i];
                    jobs.push(jobx);
                }
            } else {
                jobs.push(job);
            }
        }
        out["jobs"] = jobs;
        console.table(jobs)
        return out;
    } catch (err) {
        console.log(err)
    }
})()
//pagination
(function() {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.page++;
    out["has_next_page"] = false;
    if (out.pass_it.jobs >= 25) {
        out["has_next_page"] = true;
    }
    out["wait"] = false;
    return out;
})();