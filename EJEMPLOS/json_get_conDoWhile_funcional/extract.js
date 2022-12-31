(function () {
    const out = {};
    const jobs = [];
    let count = 1;
    let limit = 0;
  	let total = 0;
    let json;

    do {
        $.ajax({
            url: `https://careers.tailoredbrands.com/api/jobs?page=${count}&sortBy=relevance&descending=false&internal=false`,
            headers: {
            	'accept': 'application/json, text/plain, */*',
                'accept-language': 'es-CO,es;q=0.9,en-US;q=0.8,en-GB;q=0.7,en-VG;q=0.6,en;q=0.5,es-419;q=0.4,he;q=0.3',
                'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            },
            type: 'GET',
            data: null,
            dataType: 'json',
            async: false,
            success: result => {
                json = result.jobs;
                limit = result.totalCount;
              	total += json.length;

                for (let x in json) {
                    const job = {};
                    const elem = json[x].data;

                    job.title = elem.title;
                    job.reqid = elem.req_id;
                    job.url = `https://careers.tailoredbrands.com/main/jobs/${job.reqid}?lang=en-us&previousLocale=en-US`;
                  
                  	const fullLoc = [];
                  	const sourceLoc = [];
                  	
                  	if (elem.short_location) fullLoc.push(elem.short_location);
                    if (elem.country_code) fullLoc.push(elem.country_code);
                    if (elem.location_name) sourceLoc.push(elem.location_name);
                    if (elem.street_address) sourceLoc.push(elem.street_address);
                    if (elem.short_location) sourceLoc.push(elem.short_location);
                  
                    job.source_location = sourceLoc.join(', ');
                    job.location = fullLoc.join(', ');
                    job.source_empname = elem.brand;
                  
                  	if (job.title.search(/Part Time/ig) > -1) job.source_jobtype = 'Part Time';
                  
                  	let datePosted = elem.create_date.split('T').shift().trim().split('-');
                  	job.dateposted_raw = `${datePosted[1]}/${datePosted[2]}/${datePosted[0]}`;

                    job.temp = 'Feb-32242021';

                    jobs.push(job);
                }
                //msg(`\x1B[33m Total: ${total} | Limite: ${limit}`);
                count++;
            },
            error: error => msg(error),
        });
    } while (total !== limit);

    out['jobs'] = jobs;
    return out;
})();