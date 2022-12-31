(function() {
    var jobs = [];
    var out = {};
    var cont = 1;
    var limit;
    do {
        if (typeof msg == "undefined") msg = console.log;

        var data = 'pr=' + cont + '&in_iframe=1&schemaId=&o=';

        $.ajax({
            // Change Url taking current url until the word "?pr="
            url: 'https://careers-oportun.icims.com/jobs/search?pr=' + cont + '&schemaId=&o=', // 1) url
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en,es;q=0.9,es-419;q=0.8",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            type: 'GET', // 3) tipo
            dataType: "html", // 4) data que retorna
            data: data,
            async: false,
            success: function(result) {
                // Result in String is passed to new element html
                var html = document.createElement("html");
                html.innerHTML = result.trim();

                // We capture the values
                var html_jobs = html.querySelectorAll("div.iCIMS_JobsTable>div.row");
                // Example "Search Results Page 2 of 5"  | we take value after the word "of"
                limit = Number(html.querySelector('h2.iCIMS_SubHeader_Jobs').textContent.split('of').pop().trim())

                for (var x in html_jobs) {
                    if (typeof html_jobs[x] == "function") continue;
                    if (typeof html_jobs[x] == "number") continue;
                    var elem = html_jobs[x];
                    var job = {};

                    job.title = elem.querySelector("a").textContent.replace('Job Title', '').trim();
                    job.url = elem.querySelector("a").href.trim() + "&mode=job&iis=Neuvoo";

                    // Extract Location when exists Multi location
                    //for (const a of elem.querySelectorAll('div[role="list"]>dl')) {
                    //    if (a.textContent.search('Remote') > -1) {
                    //        job.source_location = a.nextElementSibling.querySelector('dd').textContent.trim();
                    //        job.location = a.nextElementSibling.querySelector('dd').textContent.replace(/^, /gmi, '').trim()
//
                    //        if (job.source_location.search(/time/gmi) > -1) job.location = "San Carlos, California"
                    //    }
                    //}
                    
                    job.source_location = elem.querySelector(".additionalFields div:nth-child(4) dd").textContent.trim()
                    job.location = job.source_location.replace('-Remote','').trim()

                    //Extract Reqid 
                    for (let item of elem.querySelectorAll('div[role="list"]>dl')) {
                        if (item.textContent.search(/ID|Req /) > -1) {
                            job.reqid = item.textContent.split('.').pop().trim()
                        }
                    }

                    //Extract jobtype
                    for (let item of elem.querySelectorAll('div[role="list"]>dl')) {
                        if (item.textContent.search(/Type/i) > -1) {
                            job.source_jobtype = item.textContent.split('Type').pop().replace('Regular', '').trim();
                        }
                    }

                    //Extract dateposted if exist in Step "Extract"
                    let ifExists = elem.querySelector('div[class="col-xs-6 header right"]>span:last-child'); // Return True or False}
                    if (ifExists) {
                        job.dateposted_raw = elem.querySelector('div[class="col-xs-6 header right"]>span:last-child').textContent
                            .split('(').pop().split(' ')[0].trim();

                    }
                    //job.dateposted_raw = dateAgo(date, " ", 0,1)
                    //job.logo = elem.querySelector("").getAttribute("src").trim();
                    //job.source_apply_email = elem.querySelector("").textContent.trim();
                    //job.source_empname = elem.querySelector("").textContent.trim();
                    //job.source_jobtype = elem.querySelector("").textContent.trim();
                    //job.source_salary = elem.querySelector("").textContent.trim();

                    job.temp = '[09/21/2022]';
                    //Multilocation
                    if (job.location.indexOf('|') > -1) {
                        msg('\x1b[32m Multilocation')
                        let locs = job.location.split('|');
                        for (let loc of locs) {
                            let jobx = {
                                ...job
                            };
                            jobx.location = loc.split('-').reverse().join(', ').trim().replace(/^, /gmi, '').trim(); // Format Correct : "City,State,Country" 
                            if (jobx.location.search(/time/gmi) > -1) jobx.location = "San Carlos, California"
                            jobs.push(jobx);
                        }
                    } else {
                        job.location = job.location.split('-').reverse().join(', ').trim().replace(/^, /gmi, '').trim();
                        if (job.location.search(/time/gmi) > -1) job.location = "San Carlos, California"
                        jobs.push(job);
                    }


                }
                cont++;
            },
            error: function(error) {
                msg(error);
            }
        });
    } while (cont < limit);

    out["jobs"] = jobs;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g, "").trim();

    let day = dateRaw.split(cut)[dayPosition].trim(),
        month = dateRaw.split(cut)[monthPosition].trim(),
        year = dateRaw.split(cut)[yearPosition].trim();
    // if(day < 10 && day.length < 2){day = "0" + day;} 

    if (dateRaw.search(/[a-z]/gi) > -1) {
        if (month.search(/jan/i) > -1) {
            month = "01";
        }
        if (month.search(/feb|fév/i) > -1) {
            month = "02";
        }
        if (month.search(/mar/i) > -1) {
            month = "03";
        }
        if (month.search(/apr|avr/i) > -1) {
            month = "04";
        }
        if (month.search(/may|mai/i) > -1) {
            month = "05";
        }
        if (month.search(/jun|juin/i) > -1) {
            month = "06";
        }
        if (month.search(/jul|juil/i) > -1) {
            month = "07";
        }
        if (month.search(/aug|août/i) > -1) {
            month = "08";
        }
        if (month.search(/sep/i) > -1) {
            month = "09";
        }
        if (month.search(/oct/i) > -1) {
            month = "10";
        }
        if (month.search(/nov/i) > -1) {
            month = "11";
        }
        if (month.search(/dec|déc/i) > -1) {
            month = "12";
        }
    }
    var datum = month + "/" + day + "/" + year;
    return datum;
}