//extract
(async () => {
    let out = {};
    //out["pass_it"] = pass_it;

    try {
        let jobs = [];
        const aAux = window.location.href.split('a=').pop().split('&').shift().trim();

        let tokenAux = await fetch("https://ws.jobdiva.com/candPortal/rest/auth/a", {
            "headers": {
                "a": aAux,
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9",
                "authorization": "Basic YXhlbG9uOmF4ZWxvbg==",
                "compid": "0",
                "portalid": "1",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://www1.jobdiva.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        let tokenJsonAux = await tokenAux.json();

        let resp = await fetch("https://ws.jobdiva.com/candPortal/rest/job/searchjobsportal", {
            "headers": {
                "a": aAux,
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                "portalid": tokenJsonAux.portalID,
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "token": tokenJsonAux.token
            },
            "referrer": "https://www1.jobdiva.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "city=&country=&from=0&jobCategories=&jobDivisions=&jobTypes=&keywords=&miles=&onsiteFlex=&portalID=1&states=&to=9999&zipcode=",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        });


        //Texto
        // const data = await resp.text();
        // let doc = document.createElement('div');
        // doc.innerHTML = data;
        // let htmlJobs = doc.querySelectorAll('Selector');

        //JSON
        let data = await resp.json();
        let htmlJobs = data.data;

        //out.pass_it.limit = data.total;

        htmlJobs.forEach(elem => {
            let job = {};
            job.reqid = elem.refNo;
            job.title = elem.title;
            job.url = 'https://www1.jobdiva.com/portal/?a=' + aAux + '&compid=0#/jobs/' + elem.id;
            job.source_location = elem.location;
            job.location = job.source_location;
            var dateAux = new Date(elem.postDate);
            job.dateposted_raw = dateAux.toLocaleDateString("en-US");
            job.temp = 96;

            jobs.push(job);
        });
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
    return out;
})();