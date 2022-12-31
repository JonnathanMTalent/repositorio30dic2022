//extract
//extract 
(function () {
    const out = {};
    const jobs = [];
    let htmlJobs;

    if (!pass_it.count) {
        out.pass_it = {
            count: 0,
            limit: 0,
            attempts: 0,
        };
    } else {
        out.pass_it = pass_it;
    }

    out.pass_it.attempts++;
    
    const data = `pr=${out.pass_it.count}&in_iframe=1&schemaId=&o=`;
    
    $.ajax({
        url: 'https://careers-ahmchealth.icims.com/jobs/search',
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif' +
                ',image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },
        type: 'GET',
        data: data,
        dataType: 'html',
        async: false,
        success: result => {
            const fullHtml = document.createElement('div');
            fullHtml.innerHTML = result;

            htmlJobs = fullHtml.querySelectorAll('.iCIMS_JobsTable .row');
            out.pass_it.limit = htmlJobs.length;

            for (let x in htmlJobs) {
                if (typeof htmlJobs[x] == 'function') continue;
                if (typeof htmlJobs[x] == 'number') continue;

                const job = {};
                const elem = htmlJobs[x];

                job.title = elem.querySelector('.iCIMS_Anchor h2').textContent.trim();

                
                job.url = elem.querySelector('.iCIMS_Anchor').href.trim();

                job.reqid = job.url.split('jobs/').pop().split('/').shift();

                const htmlDesc = getDescription(job.url);
                let contentDesc = document.createElement('div');
                contentDesc.innerHTML = htmlDesc;

                let infoJob = [...elem.querySelectorAll('.iCIMS_JobHeaderGroup dl')].find(
                    item => item.textContent.search(/Location|Location/g) > -1
                );

                if (elem.querySelector('.left span:last-child')) {
                    job.source_location = elem.querySelector('.left span:last-child')
                        .textContent.trim();

                    job.location = elem.querySelector('.left span:last-child').textContent.trim();
                } else if (infoJob) {
                    const searching = elem.querySelectorAll('.iCIMS_JobHeaderGroup dl');
                    const fullLoc = [];

                    searching.forEach(node => {
                        if (node.textContent.search(/Location|Locations/g) > -1) {
                            let loc = node.querySelector('dd').textContent.trim();
                            fullLoc.push(loc);
                        }

                        if (node.textContent.search(/City|State\/Province|Country/g) > -1) {
                            let loc = node.querySelector('dd').textContent.trim();
                            fullLoc.push(loc);
                        }
                    });

                    job.source_location = fullLoc.join(', ');
                    job.location = fullLoc.join(', ');
                } else {
                    job.source_location = [...contentDesc.querySelectorAll('.iCIMS_JobHeaderGroup dl')]
                        .find(item => item.textContent.search(/Location/g) > -1)
                        .querySelector('dd').textContent.trim();

                    job.location = [...contentDesc.querySelectorAll('.iCIMS_JobHeaderGroup dl')]
                        .find(item => item.textContent.search(/Location/g) > -1)
                        .querySelector('dd').textContent.trim().split('-').reverse().join(', ');
                }

                if (elem.querySelector('.right > span:last-child')) {
                    let datePosted = elem.querySelector('.right > span:last-child')
                        .getAttribute('title').split(' ').shift().split('/');
                    job.dateposted_raw = `${datePosted[0]}/${datePosted[1]}/${datePosted[2]}`;
                }

                const selectorRemove = ['.iCIMS_JobHeaderGroup', 'div.title'];
                const full_html = contentDesc.querySelector('.iCIMS_JobContent');

                if (selectorRemove.length > 0) {
                    selectorRemove.forEach(elem => {
                        if (full_html.querySelector(elem)) {
                            let items = full_html.querySelectorAll(elem);
                            for (const selector of items) selector.remove();
                        }
                    });
                }

                job.html = full_html.innerHTML.trim();
                
                
                job.html = removeTextBefore(job.html, 'AM)', true);
                job.html = removeTextBefore(job.html, 'PM)', true);
                job.html = removeTextBefore(job.html, 'About us', true);
                job.html = removeTextBefore(job.html, 'The Opportunity', true);
                job.html = removeTextAfter(job.html, 'Options', true);
                job.html = removeTextAfter(job.html, 'The Opportunity', true);
                job.html = removeTextAfter(job.html, 'The Team', true);
                job.html = removeTextAfter(job.html, 'Socialize this job opportunity to a friend, colleague, or family member:', true);
                
             job.html      = cleanHTML(job.html);
              var tmp       = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc   = tmp.textContent.trim();
              job.jobdesc   = cleanHTML(job.jobdesc);


                job.temp = '05/16/2022 JuanReno :v';

                if (!job.location) job.location = 'Jacksonville, Florida';

                job.location = job.location.replace(/ OR /g, ' | ').trim();
                if (job.location.indexOf(' | ') > -1) {
                    let loc = job.location.split(' | ');

                    job.source_location = loc.map(item => item.trim()).join('; ');

                    for (let i of loc) {
                        const jobx = { ...job };
                        jobx.location = i.trim();
                        jobx.location = jobx.location.split('-').reverse().join(', ');

                        jobs.push(jobx);
                    }
                } else {
                    job.location = job.location.split('-').reverse().join(', ');
                    jobs.push(job);
                }
            }
        },
        error: error => msg(error),
    });
    
    if (out.pass_it.attempts >= 3) {
        const jobGhost = { titñe: 'Repeat jobs!' };
        jobs.push(jobGhost);
    }

    out.jobs = jobs;
    return out;
})();

function removeTextBefore(html, text, flag) {
    let keyWord;
    let newHtml = html;

    if (newHtml.indexOf(text) > -1) keyWord = text;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).pop();
    if (!flag) if (keyWord) newHtml = '<h3>' + keyWord + '</h3>' + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).shift();
    if (!flag) newHtml = newHtml + '<p>' + text + '</p>';
    return newHtml;
}

function getDescription(url) {
    let res = '';
    let req = new XMLHttpRequest();

    req.open('GET', url, false);
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) 
        res = req.responseText;
    };
    req.send();
    return res;
}

//pagination

(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;
    out.pass_it.attempts = 0;

    if (out.pass_it.count <= out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }

    return out;
})();