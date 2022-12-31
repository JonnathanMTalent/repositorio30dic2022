//fetch JSON CON RESPUESTA HTML
(async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://careers.butler.edu/en-us/listing/?_ga=&page=2&page-items=20&ts=1659753162838", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
            "Accept": "*/*",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://careers.butler.edu/en-us/listing/?_ga=",
        "method": "POST",
        "mode": "cors"
    });
    const data = await resp.json();
    // const parseDoc = new DOMParser();
    // const doc = parseDoc.parseFromString(data.results, 'text/html')
    // const html_jobs = doc.querySelectorAll(''); 
    for (let x = 0; x < html_jobs.length; x++) {
        let elem = html_jobs[x];
        let job = {};
        job.title = elem.querySelector(``).textContent.trim();
        job.temp = `5454646`;
        jobs.push(job)
    }
    out["jobs"] = jobs;
    return out;
} catch (err) {
    throw err;
}
})();