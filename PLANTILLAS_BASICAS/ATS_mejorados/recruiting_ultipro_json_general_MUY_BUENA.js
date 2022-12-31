(async () => {
    const out = {};
    const jobs = [];

    if (!pass_it.count) {
        out.pass_it = {
            count: 0,
            limit: 0,
        };
    } else {
        out.pass_it = pass_it;
    }

    const urlFeed = `${window.location.origin}${window.location.pathname}JobBoardView/LoadSearchResults`;

    msg(urlFeed);

    try {
        const body = {
            opportunitySearch: {
                Top: 50,
                Skip: out.pass_it.count,
                QueryString: '',
                OrderBy: [
                    { Value: 'postedDateDesc', PropertyName: 'PostedDate', Ascending: false },
                ],
                Filters: [
                    { t: 'TermsSearchFilterDto', fieldName: 4, extra: null, values: [] },
                    { t: 'TermsSearchFilterDto', fieldName: 5, extra: null, values: [] },
                    { t: 'TermsSearchFilterDto', fieldName: 6, extra: null, values: [] },
                ],
            },
            matchCriteria: {
                PreferredJobs: [],
                Educations: [],
                LicenseAndCertifications: [],
                Skills: [],
                hasNoLicenses: false,
                SkippedSkills: [],
            },
        };

        const response = await fetch(urlFeed, {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body),
        });

        const Data = await response.json();
        const json = Data.opportunities;
        out.pass_it.limit = Data.totalCount;

        for (let x in json) {
            const job = {};
            const elem = json[x];

            job.title = elem.Title;

            const URL_base = `${window.location.origin}${window.location.pathname}` +
                `OpportunityDetail?opportunityId=`;

            job.url = URL_base + elem.Id;
            job.reqid = elem.RequisitionNumber;

            const fullLoc = [];
            const sourceLoc = [];

            if (elem.Locations[0].Address.City) fullLoc.push(elem.Locations[0].Address.City);
            if (elem.Locations[0].Address.State) fullLoc.push(elem.Locations[0].Address.State.Code);
            if (elem.Locations[0].Address.Country)
                fullLoc.push(elem.Locations[0].Address.Country.Code);
            if (elem.Locations[0].LocalizedName) sourceLoc.push(elem.Locations[0].LocalizedName);
            if (elem.Locations[0].Address.City) sourceLoc.push(elem.Locations[0].Address.City);
            if (elem.Locations[0].Address.State)
                sourceLoc.push(elem.Locations[0].Address.State.Code);
            if (elem.Locations[0].Address.PostalCode)
                sourceLoc.push(elem.Locations[0].Address.PostalCode);
            if (elem.Locations[0].Address.Country)
                sourceLoc.push(elem.Locations[0].Address.Country.Code);

            job.source_location = sourceLoc.join(', ');
            job.location = fullLoc.join(', ');

            if (elem.FullTime === true) job.source_jobtype = 'Full Time';
            else job.source_jobtype = 'Part Time';

            let datePosted = elem.PostedDate.split('T').shift().trim().split('-');
            job.dateposted_raw = `${datePosted[1]}/${datePosted[2]}/${datePosted[0]}`;

            job.temp = 'Jul-265348923022';

            if (elem.Locations.length > 1) {
                let locations = elem.Locations;

                job.source_location = locations
                    .map(item => {
                        const sourceLocx = [];

                        if (item.LocalizedName) sourceLocx.push(item.LocalizedName);
                        if (item.Address.City) sourceLocx.push(item.Address.City);
                        if (item.Address.State) sourceLocx.push(item.Address.State.Code);
                        if (item.Address.PostalCode) sourceLocx.push(item.Address.PostalCode);
                        if (item.Address.Country) sourceLocx.push(item.Address.Country.Code);

                        return sourceLocx.join(', ');
                    }).join(' / ');

                for (let loc of locations) {
                    const jobx = { ...job };

                    const locx = [];
                    if (loc.Address.City) locx.push(loc.Address.City);
                    if (loc.Address.State) locx.push(loc.Address.State.Code);
                    if (loc.Address.Country) locx.push(loc.Address.Country.Code);

                    jobx.location = locx.join(', ');

                    jobs.push(jobx);
                }
            } else {
                jobs.push(job);
            }
        }
    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
    }

    out.jobs = jobs;
    return out;
})();




// JOBDESCRIPTION

(function () {
    const out = {};
    const job = {};
    const selector = '.col-md-18 > .row:first-child';

    
        const remove_selectors = [
        'a',
        'i',
        'img',
        'svg',
        'link',
        'iframe',
        'form',
        'noscript',
        'figure',
        'video',
        'button',
        'input',
        'style',
        'javascript',
        'script',
    ];

    if (document.querySelector(selector)) {
        if (typeof cleanHTML === 'undefined') cleanHTML = x => x;
        if (typeof msg === 'undefined') msg = console.log;

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
        /*
        const delete_items = document.querySelectorAll('p');
		for (const item of delete_items) {
    		if (item.textContent.search(/@|www.|https:|http:|.com/g) > -1) {
        		item.remove();
    		}
		}
        */

        const clean_strings = [];

        if (clean_strings.length > 0) {
            clean_strings.forEach(elem => {
                job.html = job.html.replace(elem, '');
            });
        }

        job.html = full_html.innerHTML.trim();
        job.html = cleanHTML(job.html);



        job.html = removeTextBefore(job.html, 'WHO YOU ARE', true);
        job.html = removeTextAfter(job.html, 'Equal Opportunity Employer', true);
        job.html = removeTextAfter(job.html, 'qual Opportunity Employer', true);
        job.html = removeTextAfter(job.html, 'Beechwood Sales & Service is an', true);
        job.html = removeTextAfter(job.html, 'll candidates considered will have a background check', true);
        
        



    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    
    //clean emogis
    job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
    if(job.html.indexOf('@')>-1){
        var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
        job.html = job.html.replace(eliminar,'');
    }
    
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
            
        
        
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        
        
        
        if (job.jobdesc.search('Benefits') > -1) {
            job.source_benefit = job.jobdesc.split('include:').pop()
                .split('The CIA has implemented').shift().trim();
        }
        
    } else {
        msg("No se encontro el selector");
    }
    
    out.job = job;
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