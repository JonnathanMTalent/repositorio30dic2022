//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "jobsPerPage":0,
        "jobsInPage":0
    }
    return out;
})()



//fetch limpia 
(async () => {
    let out = {};
     out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://api.mycareersfuture.gov.sg/v2/jobs?limit=20&page=0&uen=S64SS0032E", {
  "headers": {
    "accept": "*/*",
    "accept-language": "es-ES,es;q=0.9",
    "if-none-match": "W/\"142d4-dQvLrLn4mFUv8E0RwVZThEWrncs\"",
    "mcf-client": "jobseeker",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://www.mycareersfuture.gov.sg/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
        const data = await resp.json();
        out.pass_it.jobsPerPage=20;
        out.pass_it.jobsInPage = data.results.length;
        msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.results.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.results[x];  //poner tambien el contenedor de los jobs
            let job = {};
            job.title = elem.title;
            job.url = elem.metadata.jobDetailsUrl;
            job.reqid=elem.metadata.jobPostId.split('-')[2];
            job.source_jobtype=elem.employmentTypes[0].employmentType;
            job.experience_required=elem.minimumYearsExperience;
            job.source_salary='$'+elem.salary.minimum+'-$'+elem.salary.maximum+elem+' '+elem.salary.type.salaryType;
            job.dateposted_raw = elem.metadata.newPostingDate;
            job.source_location = elem.address.districts[0].location;
            job.location = job.source_location.split(',')[1]+', '+job.source_location.split(',')[2]+', SG';

            job.temp = `jonnathan M`;
            jobs.push(job)
        }
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();


//PAGINATION
(()=>{
    var out={};
    out.pass_it=pass_it;
    var { counter, jobsPerPage, jobsInPage } = out.pass_it;
    out.pass_it.counter+=1;
    out.has_next_page=jobsInPage==jobsPerPage?true:false;
    return out;
})()