// https://3m.recsolu.com/job_boards/1

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.js-search-results-container li');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('a.search-results__req_title').textContent.trim();
        job.url = elem.querySelector('a.search-results__req_title').href.trim();
        job.location = 'United States';


        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();





// Extract
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.js-search-results-container li');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('a.search-results__req_title').textContent.trim();
        job.url = elem.querySelector('a.search-results__req_title').href.trim();
        job.location = 'United States';


        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();