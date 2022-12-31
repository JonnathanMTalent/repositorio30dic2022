//https://88jobs.fr/jobs/offres-emploi/localisation-royaume-uni-regions/localisation-royaume-uni-londres/localisation-france-paris/localisation-france-regions/localisation-chine/localisation-autres
//homepage= https://88jobs.fr/
(async () => {
    const out = {};
    const jobs = [];

    if (!pass_it.count) {
        out.pass_it = {
            count: 1,
            limit: 0,
        };
    } else {
        out.pass_it = pass_it;
    }

    const urlRequest = `https://88jobs.fr/jobs/offres-emploi/localisation-royaume-uni-regions` + 
        `/localisation-royaume-uni-londres/localisation-france-paris/localisation-france-regions` + 
        `/localisation-chine/localisation-autres?page=${out.pass_it.count}&ajax=1`;

    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                "accept": "*/*",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            body: null,
        });

        const Data = await response.text();
        const fullHtml = document.createElement('div');
        fullHtml.innerHTML = Data;

        if (out.pass_it.count === 1) {
            out.pass_it.limit = fullHtml.querySelector('.pagination li:last-child')
                .previousElementSibling.textContent.trim();
        }

        msg(out.pass_it.limit);
        const htmlJobs = fullHtml.querySelectorAll('a.job-item');

        for (let x in htmlJobs) {
            if (typeof htmlJobs[x] === 'function') continue;
            if (typeof htmlJobs[x] === 'number') continue;

            const job = {};
            const elem = htmlJobs[x];

            job.title = elem.querySelector('h2[class="job-title"]').textContent.trim();
            job.url = elem.href.trim();
            job.location = elem.querySelector('div[class="job-localization"]').textContent.trim();
            job.source_location = elem.querySelector('div[class="job-localization"]').textContent.trim();
            job.logo = elem.querySelector('div[class="job-img"]>img').getAttribute("src").trim();
            
            let posted = elem.querySelector('div[class="job-post-date"]').textContent.trim();
            job.dateposted_raw = worldDates(posted, ' ', 1, 0, 2, 'fr');
    
    		job.source_jobtype = elem.querySelector('div[class="job-type"]').textContent.trim();

            job.temp = 'May-2022';

            jobs.push(job);
        }
    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
    }

    out.jobs = jobs;
    return out;
})();

function worldDates(date, cut, mp, dp, yp, lang) {
    // andres-sal function
    let month = date.toLowerCase().split(cut)[mp];
    let day = date.split(cut)[dp];
    let year = date.split(cut)[yp];

    const months = [...Array(12).keys()];
    const intlOne = new Intl.DateTimeFormat(lang, { month: 'short' });

    const calendar = months.map((currentMonth, index) => {
        const monthName = intlOne.format(new Date(new Date().getFullYear(), currentMonth));

        return {
            name: monthName,
            number: index + 1,
        };
    });

    month = calendar.find(item => month.search(`${item.name}`) > -1);
    return `${month.number}/${day}/${year}`;
}