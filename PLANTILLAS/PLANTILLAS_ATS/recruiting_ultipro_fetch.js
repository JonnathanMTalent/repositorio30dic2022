//https://recruiting.ultipro.com/DES1005DSCEG/JobBoard/eeee8621-eba1-4a38-8a6f-cf6f23b057d7/OpportunityDetail?opportunityId=99940665-8429-48df-8699-7a85775c9674
/////////Extract////////////
(async () => {
    const out = {};
    const jobs = [];
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) {
        return x;
    };
    if (!pass_it.counter) {
        out.pass_it = {
            "counter": 0,
            "jobs": 0,
            "limit": 0
        };
    } else {
        out.pass_it = pass_it;
    }
    const resp = await fetch("https://recruiting.ultipro.com/DES1005DSCEG/JobBoard/eeee8621-eba1-4a38-8a6f-cf6f23b057d7/JobBoardView/LoadSearchResults", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en,fr-CO;q=0.9,fr;q=0.8,en-CO;q=0.7,es-CO;q=0.6,es;q=0.5,pt-BR;q=0.4,pt;q=0.3,fr-FR;q=0.2,en-US;q=0.1",
            "content-type": "application/json; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "x-requestverificationtoken": "CfDJ8Eet8x4cp8tDq8H6a7BuiiY-TiTqUAfs8PepKS_RxzQQICe9QHEyjJTAlVFpAl6dLuaoitBNtPh6eW_7CX0zfzMI7n1twTuRI34RF_A5kPqGArVRUYTzi7bu7z72AgXYptPJl5enINjUsYR4Y-NfUO4"
        },
        "referrer": "https://recruiting.ultipro.com/DES1005DSCEG/JobBoard/eeee8621-eba1-4a38-8a6f-cf6f23b057d7/?q=&o=postedDateDesc",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"opportunitySearch\":{\"Top\":50,\"Skip\":${out.pass_it.counter},\"QueryString\":\"\",\"OrderBy\":[{\"Value\":\"postedDateDesc\",\"PropertyName\":\"PostedDate\",\"Ascending\":false}],\"Filters\":[{\"t\":\"TermsSearchFilterDto\",\"fieldName\":4,\"extra\":null,\"values\":[]},{\"t\":\"TermsSearchFilterDto\",\"fieldName\":5,\"extra\":null,\"values\":[]},{\"t\":\"TermsSearchFilterDto\",\"fieldName\":6,\"extra\":null,\"values\":[]}]},\"matchCriteria\":{\"PreferredJobs\":[],\"Educations\":[],\"LicenseAndCertifications\":[],\"Skills\":[],\"hasNoLicenses\":false,\"SkippedSkills\":[]}}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    const json = await resp.json();
    const html_jobs = json.opportunities;
    out.pass_it.limit = json.totalCount;
    out.pass_it.jobs = out.pass_it.jobs + html_jobs.length;
    for (let elem of html_jobs) {
        const job = {};
        job.title = elem.Title;
        job.url = `https://recruiting.ultipro.com/DES1005DSCEG/JobBoard/eeee8621-eba1-4a38-8a6f-cf6f23b057d7/OpportunityDetail?opportunityId=${elem.Id}`;
        job.reqid = elem.RequisitionNumber;
        job.dateposted_raw = elem.PostedDate.split('T').shift().split('-');
        job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[2]}/${job.dateposted_raw[0]}`;
        if (elem.FullTime)
            job.source_jobtype = 'Full Time';
        else
            job.source_jobtype = 'Part Time';
        job.temp = 8;
        elem.Locations.forEach(loc => {
            const jobx = {
                ...job
            };
            if (loc.Address.City && loc.Address.PostalCode) {
                jobx.source_location = `${loc.Address.City}, ${loc.Address.State.Code} ${loc.Address.PostalCode}, ${loc.Address.Country.Code}`;
                jobx.location = jobx.source_location.replace('USA', 'US');
            } else if (loc.Address.City && loc.Address.State) {
                jobx.source_location = `${loc.Address.City}, ${loc.Address.State.Code}, ${loc.Address.Country.Code}`;
                jobx.location = jobx.source_location.replace('USA', 'US');
            } else if (loc.Address.State) {
                jobx.source_location = `${loc.Address.State.Name}, ${loc.Address.Country.Code}`;
                jobx.location = jobx.source_location.replace('USA', 'US');
            } else {
                jobx.source_location = loc.LocalizedName;
                jobx.location = jobx.source_location.replace('USA', 'US');
            }
            jobs.push(jobx);
        });
    }
    out.pass_it.counter = out.pass_it.counter + 50;
    out.jobs = jobs;
    return out;
  })();
  //////////pagination//////////
  (()=> {
    const out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) {
        return x;
    };
    out.pass_it = pass_it;
    //stop condition
    if (out.pass_it.jobs >= out.pass_it.limit) {
        //last page
        out.has_next_page = false;
    } else {
        //try again
        out.has_next_page = true;
    }
    //out["wait"] = true;
    //out.waitFor = "tr.data-row.clickable";
    return out;
  })();