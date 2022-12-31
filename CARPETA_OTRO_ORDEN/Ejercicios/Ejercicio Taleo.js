//URL: https://www.att.jobs/search-jobs

//Before extract:

(function() {
var out = {};
out.waitFor = "#pagination-bottom > div > div.pagination-paging"
out.pic=true;
return out;
})();


//Extract:

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("#search-results-list > ul > li");
    var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
        job.title = elem.querySelector("a > h2").textContent.trim();
        job.url = elem.querySelector("a").href.trim();
        job.location = elem.querySelector("a > span.job-location-search").textContent.trim();
        //job.location = job.location.split('-').reverse().join(', ');  
            //if(job.location.search(/Locations/g)>-1) job.location = 'Santa Clara, CA, US';

            //job.logo = elem.querySelector("td:nth-child(3) > div > div").getAttribute("title").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    } 

    out["jobs"]= jobs;
    return out;
})();


//Paginación:

(function() {
    var out = {};
    var next_page_selector = "a.next:not(.disabled)"; //selector to identify the next button
    //var last_page_selector = ""; //selector to identify the last page

    var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (!document.querySelector(next_page_selector)) {
        //last page
        out["has_next_page"] = false;
    } else if(clickable_elem){
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = true;
    }

    out.waitFor = next_page_selector;
    return out;
})();