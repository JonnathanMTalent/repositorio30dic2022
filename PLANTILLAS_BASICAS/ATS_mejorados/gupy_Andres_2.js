(async () => {
    const out = {};
    const jobs = [];
    // !pass_it.count ? (out.pass_it = { count: 1, limit: 0 }) : (out.pass_it = pass_it);
    const urlRequest = `https://${window.location.host.split('.').shift()}.gupy.io`;
    try {
        const response = await fetch(urlRequest);
        const Data = await response.text();
        const fullHtml = new DOMParser().parseFromString(Data, 'text/html').body;
        const htmlJobs = fullHtml.querySelectorAll('[data-testid="job-list__list"] li');
        for (let x in htmlJobs) {
            if (typeof htmlJobs[x] === 'number') continue;
            if (typeof htmlJobs[x] === 'function') continue;
            const job = {};
            const elem = htmlJobs[x];
            job.url = elem.querySelector('a').href.split('?').shift().trim();
            const respDesc = await fetch(job.url);
            const dataDesc = await respDesc.text();
            const htmlDesc = new DOMParser().parseFromString(dataDesc, 'text/html').body;
            const info = htmlDesc.querySelector('script[id="__NEXT_DATA__"]');
            const json = JSON.parse(info.textContent.trim()).props.pageProps.job;
            job.reqid = json.id;
            job.title = json.name;
            job.logo = json.careerPage.urlLogo;
            job.source_empname = json.careerPage.name;
            job.source_jobtype = json.jobType.replaceAll('_', ' ');
            const fullLoc = [];
            if (json.addressCity) fullLoc.push(json.addressCity);
            if (json.addressStateShortName) fullLoc.push(json.addressStateShortName);
            if (json.addressCountry) fullLoc.push(json.addressCountry);
            job.location = fullLoc.join(', ');
            job.dateposted_raw = new Date(json.publishedAt).toLocaleDateString();
            job.dateclosed_raw = new Date(json.expiresAt).toLocaleDateString();
            // DESCRIPTION
            const description =
                `<h3>DESCRIPCION</h3>${json.description}` +
                `<br><h3>RESPONSABILIDADES</h3>${json.responsibilities}` +
                `<br><h3>REQUISITOS</h3>${json.prerequisites}` +
                `<br><h3>INFORMACIÓN ADICIONAL</h3>${json.relevantExperiences}`;
            job.html = description.trim();
            job.html = cleanHTML(job.html);
            let tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            // 3. PUT THE STRING THAT YOU NEED CLEAN
            let cleanStrings = [];
            if (cleanStrings.length > 0) {
                cleanStrings.forEach(text => (job.html = job.html.replace(text, '')));
            }
            // GET BENEFITS
            job.source_benefit = cleanHTML(json.relevantExperiences);
            // 4. REMOVE STRINGS BEFORE OR AFTER
            // job.html = removeTextBefore(job.html, 'About the Position', true);
            // job.html = removeTextAfter(job.html, 'Other details', true);
            job.temp = 'Jan-2023-Edit-1';
            jobs.push(job);
        }
    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
        throw error;
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