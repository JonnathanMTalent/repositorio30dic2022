// bef Extract

(function () {
    const out = {};
    out.waitFor = 'pre';
    return out;
})();

//Extract

(function () {
    const out = {};
    const jobs = [];
    const element = document.querySelector('pre').textContent;
    const json = JSON.parse(element);
    const json_jobs = json.content;

    for (let x in json_jobs) {
        const job = {};
        const elem = json_jobs[x];

        job.title = elem.name;
        job.reqid = elem.refNumber;
        job.url = `https://www.smartrecruiters.com/NielsenIQ/${elem.id}`;

        const fullLoc = [];
        if (elem.location.city) fullLoc.push(elem.location.city);
        if (elem.location.region) fullLoc.push(elem.location.region);
        if (elem.location.country) fullLoc.push(elem.location.country);

        job.source_location = fullLoc.join(', ');
        job.location = fullLoc.join(', ');
        job.source_jobtype = elem.typeOfEmployment.label;

        let datePosted = elem.releasedDate.split('T').shift().split('-');
        job.dateposted_raw = `${datePosted[1]}/${datePosted[2]}/${datePosted[0]}`;

        job.temp = 'Abr-2022';

        jobs.push(job);
    }

    out.jobs = jobs;
    return out;
})();

// pagination

(function () {
    const out = {};
    const urlBase = 'https://api.smartrecruiters.com/v1/companies' + 
        '/NielsenIQ/postings?limit=100&offset=';

    if (!pass_it.cont) {
        out.pass_it = {
            cont: 0,
            jobs: 0,
        };
    } else {
        out.pass_it = pass_it;
    }

    const numberJobs = '100';
    const element = document.querySelector('pre').textContent;
    const json = JSON.parse(element);
    const actualNumber = json.content.length;

    //console.log('perpage_fijo: \x1b[0m' + numberJobs);
    //console.log('perpage_actual: \x1b[0m' + actualNumber);

    if (actualNumber < numberJobs) {
        //msg('\x1b[41m The pagination has finished \x1b[0m');
        out.has_next_page = false;
    } else {
        //msg('\x1b[33m \x1b[4m ' + actualNumber + ' jobs de ' + numberJobs + ' jobs\x1b[0m');
        let newUrl = urlBase + out.pass_it.cont;
        out.pass_it.cont += 100;
        //msg('URL siguiente: \x1b[0m' + newUrl);
        window.location.href = newUrl;
        out.has_next_page = true;
    }

    return out;
})();

//jobdescription

(function () {
    const out = {};
    const job = {};
    const selector = '.job-sections div[itemprop="description"]';
    const remove_selectors = [
        'a',
        'img',
        'video',
        'button',
        'input',
        'style',
        'javascript',
        'script',
    ];

    if (document.querySelector(selector)) {
        
        
                //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        //BENEFIT
        let job={} //poner esto si se va a probar en consola
        
        let auxbenefit = Array.from(document.querySelectorAll('p')).filter(x => x.textContent.search(/Our Benefits/gmi) > -1);
        //auxbenefit[0]!=null ? job.source_benefit=auxbenefit[0].textContent.trim() : job.source_benefit='';
        auxbenefit[0]!=null ? job.source_benefit=auxbenefit[0].nextElementSibling.textContent.trim() : job.source_benefit='';
        
        //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        if (typeof cleanHTML === 'undefined') cleanHTML = x => x;
        if (typeof msg === 'undefined') msg = console.log;

        const image = document.querySelector('span[class="header-logo logo"]');
        if (image) {
            job.source_empname = image.querySelector('img').getAttribute('alt');
            job.logo = image.querySelector('img').getAttribute('src');
        }

        const searching = document.querySelectorAll('p');
        searching.forEach(item => {
            if (item.textContent.search(/Compensation:/g) > -1) {
                job.source_salary = item.textContent.split(':').pop().trim();
            }
        });

        const full_html = document.querySelector(selector);
        // Remove something from the jobdatata
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(elem => {
                if (full_html.querySelector(elem)) {
                    let items = full_html.querySelectorAll(elem);
                    for (const selector of items) selector.remove();
                }
            });
        }

        job.html = full_html.innerHTML.trim();
        job.html = cleanHTML(job.html);

        let tmp = document.createElement('div');
        tmp.innerHTML = job.html;

        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        job.html = removeTextBefore(job.html, 'Job Description', true);
        //job.html = removeTextBefore(job.html, 'Overall job purpose:', true);
        //job.html = removeTextAfter(job.html, 'Applicant Instructions', true);
        
    } else {
        job.html = '';
        job.jobdesc = '';
    }
    out['job'] = job;
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