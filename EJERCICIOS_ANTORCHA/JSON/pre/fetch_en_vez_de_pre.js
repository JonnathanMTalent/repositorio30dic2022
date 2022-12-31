//extract
(async () => {
    let out = {};
    // out["pass_it"] = pass_it;
    var jobsSelector = ``
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
    htmlJobs.forEach((elem) => {
    var job = {};
    //elem.querySelector(``).textContent.trim()
    jobs.push(job);
    })
    out["jobs"] = jobs;
    return out;
    } catch (err) {
    console.log(err)
    }
    })();