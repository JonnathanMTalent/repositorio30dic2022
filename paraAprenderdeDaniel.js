// (async () => {
//     const out = {};
//     const jobs = [];
//      if (!pass_it.cont) {
//         out.pass_it = {
//             "cont": 1,
//             "expected_jobs": 0,
//             "jobs": 0
//         };
//     } else out.pass_it = pass_it;


//     try {
//         let resp = await fetch("https://www.usajobs.gov/Search/ExecuteSearch", {
//             "headers": {
//                 "accept": "application/json, text/javascript, */*; q=0.01",
//                 "accept-language": "es-ES,es;q=0.9,en;q=0.8",
//                 "content-type": "application/json; charset=UTF-8",
//                 "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
//                 "sec-ch-ua-mobile": "?0",
//                 "sec-ch-ua-platform": "\"Windows\"",
//                 "sec-fetch-dest": "empty",
//                 "sec-fetch-mode": "cors",
//                 "sec-fetch-site": "same-origin",
//                 "x-requested-with": "XMLHttpRequest"
//             },
//             "referrer": "https://www.usajobs.gov/Search/Results?hp=public&hp=fed-competitive&hp=fed-excepted&hp=fed-internal-search&hp=fed-transition&hp=land&hp=vet&hp=mspouse&hp=nguard&hp=student&hp=graduates&hp=ses&hp=disability&hp=overseas&hp=native&hp=peace&hp=special-authorities&p=1",
//             "referrerPolicy": "strict-origin-when-cross-origin",
//             "body": `{\"JobTitle\":[],\"GradeBucket\":[],\"JobCategoryCode\":[],\"JobCategoryFamily\":[],\"LocationName\":[],\"PostingChannel\":[],\"Department\":[],\"Agency\":[],\"PositionOfferingTypeCode\":[],\"TravelPercentage\":[],\"PositionScheduleTypeCode\":[],\"SecurityClearanceRequired\":[],\"PositionSensitivity\":[],\"ShowAllFilters\":[],\"HiringPath\":[\"public\",\"fed-competitive\",\"fed-excepted\",\"fed-internal-search\",\"fed-transition\",\"land\",\"vet\",\"mspouse\",\"nguard\",\"student\",\"graduates\",\"ses\",\"disability\",\"overseas\",\"native\",\"peace\",\"special-authorities\"],\"SocTitle\":[],\"MCOTags\":[],\"CyberWorkRole\":[],\"CyberWorkGrouping\":[],\"Page\":\"${out.pass_it.cont}\",\"IsAuthenticated\":false}`,
//             "method": "POST",
//             "mode": "cors",
//             "credentials": "include"
//         });


//         const Data = await resp.json();
//         const json = Data.Jobs;
//         out.pass_it.expected_jobs = Data.Total;

//         for (let x in json) {
//             const job = {};
//             const elem = json[x];

//             job.title = elem.Title;

//             job.reqid = elem.DocumentID;           
//             job.url = `https://www.usajobs.gov/job/${job.reqid}`

//             job.source_jobtype = elem.WorkSchedule;

//             let salary = elem.SalaryDisplay;
//             salary.match(/[0-9]/gi) ? job.source_salary = salary : undefined;


//             let [dateposted, dateclosed] = elem.DateDisplay.replace(/Open/gi, '').trim().split(' to ');
//             job.dateposted_raw = dateposted;
//             job.dateclosed_raw = dateclosed;


//             job.source_location = elem.LocationName;
//             job.location = elem.LocationName
//             if (job.location.search(/Negotiable|Request|Selection|Duty Locations/gmi) > -1) job.location = "Washington, DC";

//             job.temp = '--/11/11/2022---';
//               jobs.push(job);

//         }
//     } catch (error) {
//         msg(`\x1B[32m Error: ${error.message}`);
//         msg(`\x1B[31m Line: ${error.stack}`);
//     }
//     out.pass_it.jobs += jobs;
//     out.jobs = jobs;
//     return out;
// })();


EXTRACT


(async () => {
    const out = {};
    const jobs = [];

    if (!pass_it.count) {
        out.pass_it = {
            count: 1,
            limit: 0,
            total: 0
        };
    } else {
        out.pass_it = pass_it;
    }

    const urlFeed = 'https://www.usajobs.gov/Search/ExecuteSearch';

    try {
        const body = {
            JobTitle: [],
            GradeBucket: [],
            JobCategoryCode: [],
            JobCategoryFamily: [],
            LocationName: [],
            PostingChannel: [],
            Department: [],
            Agency: [],
            PositionOfferingTypeCode: [],
            TravelPercentage: [],
            PositionScheduleTypeCode: [],
            SecurityClearanceRequired: [],
            PositionSensitivity: [],
            ShowAllFilters: [],
            HiringPath: [
                'public',
                'fed-competitive',
                'fed-excepted',
                'fed-internal-search',
                'fed-transition',
                'land',
                'vet',
                'mspouse',
                'nguard',
                'student',
                'graduates',
                'ses',
                'disability',
                'overseas',
                'native',
                'peace',
                'special-authorities',
            ],
            SocTitle: [],
            MCOTags: [],
            CyberWorkRole: [],
            CyberWorkGrouping: [],
            Page: out.pass_it.count,
            IsAuthenticated: false,
        };

        const response = await fetch(urlFeed, {
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "content-type": "application/json; charset=UTF-8",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(body),
        });

        const Data = await response.json();
        const json = Data.Jobs;
        
        out.pass_it.limit = Data.Total;
        out.pass_it.total += json.length;

        for (let x in json) {
            const job = {};
            const elem = json[x];
            job.source_salary = elem.SalaryDisplay;

            job.title = elem.Title;
            job.reqid = elem.DocumentID;
            job.url = `https://www.usajobs.gov/job/${job.reqid}`;
            job.location = elem.LocationName;
            job.source_location = elem.LocationName;
            
            if (job.location.match(/Negotiable|Request|Selection|Duty Locations/gmi)) 
                job.location = 'Washington, DC';
            
            const fullJobtype = [];
            if (elem.WorkSchedule) {
                if (!elem.WorkSchedule.match(/Multiple|[0-9]|Only|Exceed|negotiable|:|employee|Days/gi) &&
                    !elem.WorkSchedule.match(/Virtual|Will|STATUS|Positions|Open|When|working/gi)) {
                    fullJobtype.push(elem.WorkSchedule);
                }
            }
            
            if (elem.WorkType) {
                if (!elem.WorkType.match(/Multiple|[0-9]|Only|Exceed|negotiable|:|employee|Days/gi) &&
                    !elem.WorkType.match(/Virtual|Will|STATUS|Positions|Open|When|working/gi)) {
                    fullJobtype.push(elem.WorkType);
                }
            }
            
            // if (elem.SalaryDisplay) {
            //     if (elem.SalaryDisplay.match(/\d/gi) ) {
            //       job.source_salary = elem.SalaryDisplay;
            //     }
            // }
            
            job.source_jobtype = fullJobtype.join(' - ');
            
            // elem.SalaryDisplay.match(/[0-9]/gi) ? job.source_salary = elem.SalaryDisplay : '';

            const [ posted, closed ] = elem.DateDisplay.replace('Open', '').trim().split(' to ');
            
            job.dateposted_raw = posted;
            job.dateclosed_raw = closed;
            

            job.temp = 12;

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

function validationDate(date) {
    const result = Math.abs(new Date() - new Date(date));
    return Math.trunc(result / (1000 * 3600 * 24));
}



PAGINATION



(() => {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;
    
    if (out.pass_it.total < out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }
    
    return out;
})();



JOBDESCRIPTION



(async () => {
    const out = {};
    const job = {};
    const selector = '.usajobs-joa-intro--v1-5__container';
    const urlJob = pass_it.job.link;

    const removeSelectors = [
        'a',
        'img',
        'svg',
        'video',
        'input',
        'style',
        'button',
        'figure',
        'script',
        'javascript',
    ];

    try {
        const response = await fetch(urlJob);
        const Data = await response.text();
        const fullHtml = new DOMParser().parseFromString(Data, 'text/html').body;
        
        const experience = [];
        
        for (let li of fullHtml.querySelectorAll("li")) {
            const regex = /years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|dans/i;
            const regexTwo = /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|tecrübeli|werkervaring/i;
            const regexThree = /[1-9]|one|two|three|four|five|six|seven|eight|nine|uno|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez/gi;
            
            if (regex.test(li.textContent) &&
                regexTwo.test(li.textContent) &&
                regexThree.test(li.textContent)) {
                experience.push(li.textContent);
            }
        }
        
                for (let li of fullHtml.querySelectorAll("li")) {
            const regexs = /\$/gi;
            const regexTwos = /salary/gmi;
            const regexThrees = /[1-9]/gi;
            
            if (regexs.test(li.textContent) &&
                regexTwos.test(li.textContent) &&
                regexThrees.test(li.textContent)) {
                job.source_salary=li.textContent.replace("Salary","").trim();
            }
        }


        if (experience.length > 0)
            job.experience_required = experience.join("\n").trim();

        // Remove something from the jobdatata
        if (removeSelectors.length > 0) {
            removeSelectors.forEach(function (elem) {
                if (fullHtml.querySelector(elem)) {
                    let items = fullHtml.querySelectorAll(elem);
                    for (const item of items) item.remove();
                }
            });
        }

        const htmlDesc = fullHtml.querySelector(selector);

        job.html = htmlDesc.innerHTML.trim();
        job.html = cleanHTML(job.html);

        let tmp = document.createElement('div');
        tmp.innerHTML = job.html;

        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        let cleanStrings = [];

        if (cleanStrings.length > 0) {
            cleanStrings.forEach(text => (job.html = job.html.replace(text, '')));
        }

        // job.html = removeTextBefore(job.html, 'About the Position', true);
        job.html = removeTextBefore(job.html, "Summary", true);
        job.html = removeTextAfter(job.html, "Additional information", true);
        job.html = removeTextAfter(job.html, "To preview questions please click here", true);
        job.html = removeTextAfter(job.html, "Read more", true);
        job.html = removeTextAfter(job.html, "Next steps", true);
        job.html = removeTextAfter(job.html, "How to Apply", true);
        job.html = removeTextAfter(job.html, "In addition to the above requirements", true);
        job.html = removeTextAfter(job.html, "IMPORTANT: A transcript must be submitted", true);
        job.html = removeTextAfter(job.html, "A transcript must be submitted", true);
        job.html = removeTextAfter(job.html, "For additional information about", true);
        job.html = removeTextAfter(job.html, "For more information on these", true);
        job.html = removeTextAfter(job.html, "For more information about the", true);
        job.html = removeTextAfter(job.html, "The Special Agent Selection System", true);
        
    } catch (error) {
        msg(`\x1B[32m Error: ${error.message}`);
        msg(`\x1B[31m Line: ${error.stack}`);
        throw error;
    }

    out.job = job;
    printJob(job);

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


function printJob(job) {
    let claves = Object.keys(job);
    msg(`\n \x1b[31m INICIO JOB.....\x1b[39m`)
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        if (claves[i] == "jobdesc" || claves[i] == "html") {
            continue
        }
        msg(`${"\x1b[32m"+claves[i]}:`)
        msg(job[clave])
    }
    msg(`\x1b[31m FIN JOB.....\n \x1b[39m`)
}



// (async () => {


//     let out = {};
//     var job = {};

//     if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
//         return x
//     };
//     if (typeof msg == "undefined") msg = console.log;
//     try {
//         const resp = await fetch(window.location.href, {
//             "credentials": "include",
//             "headers": {
//                 "Accept": "**"
//             },
//             "referrer": window.location.href,
//             "method": "GET",
//             "mode": "cors"
//         });

//         const data = await resp.text();
//         // msg(data)
//         const parseDoc = new DOMParser();
//         const doc = parseDoc.parseFromString(data, 'text/html')
//         const full_html = doc.querySelector('.usajobs-joa-intro--v1-5__container');


//         if (full_html) {


//             var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

//             if (remove_selectors.length > 0) {
//                 remove_selectors.forEach(remove_selector => {
//                     for (const a of full_html.querySelectorAll(remove_selector)) {
//                         a.remove();
//                     }
//                 });
//             }


//             let experience = []

//             for (let li of full_html.querySelectorAll("li")) {

//                 if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|yıl|dans/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|tecrübeli|werkervaring/i.test(li.textContent) &&
//                     /[1-9]|one|two|three|four|five|six|seven|eight|nine|uno|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez/gi.test(li.textContent))
//                     experience.push(li.textContent);

//             }


//             if (experience.length > 0)
//                 job.experience_required = experience.join("\n").trim();

//             job.html = full_html.innerHTML.trim();

//             job.html = job.html.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '').replace(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g, '').replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');

//             job.html = removeTextBefore(job.html, "Summary", false);
//             job.html = removeTextAfter(job.html, "Additional information", true);
//             job.html = removeTextAfter(job.html, "To preview questions please click here", true);
//             job.html = removeTextAfter(job.html, "Read more", true);
//             job.html = removeTextAfter(job.html, "Next steps", true);
//             job.html = removeTextAfter(job.html, "How to Apply", true);
//             job.html = removeTextAfter(job.html, "In addition to the above requirements", true);
//             job.html = removeTextAfter(job.html, "IMPORTANT: A transcript must be submitted", true);
//             job.html = removeTextAfter(job.html, "A transcript must be submitted", true);
//             job.html = removeTextAfter(job.html, "For additional information about", true);
//             job.html = removeTextAfter(job.html, "For more information on these", true);
//             job.html = removeTextAfter(job.html, "For more information about the", true);
//             job.html = removeTextAfter(job.html, "The Special Agent Selection System", true);

//             if (job.html.indexOf('@') > -1) {
//                 job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi, "");
//             }
//             if (job.html.indexOf('https') > -1) {
//                 job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
//             }
//             if (job.html.indexOf('http') > -1) {
//                 job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
//             }
//             if (job.html.indexOf('HTTPS') > -1) {
//                 job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
//             }
//             if (job.html.indexOf('HTTP') > -1) {
//                 job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
//             }





//             job.html = cleanHTML(job.html);
//             var tmp = document.createElement('div');
//             tmp.innerHTML = job.html;
//             job.jobdesc = tmp.textContent.trim();
//             job.jobdesc = cleanHTML(job.jobdesc);
//         }


//         out["job"] = job;
//         return out;
//     } catch (err) {
//         throw err;
//     }
// })()

// function removeTextBefore(html, text, flag) {
//     var newHtml = html;
//     if (newHtml.search(text) > -1) {
//         newHtml = newHtml.split(text).pop();
//         if (!flag) {
//             newHtml = "<h3>" + text + "</h3>" + newHtml;
//         }
//     }
//     return newHtml;
// }

// function removeTextAfter(html, text, flag) {
//     var newHtml = html;
//     if (newHtml.search(text) > -1) {
//         newHtml = newHtml.split(text).shift();
//         if (!flag) {
//             newHtml = newHtml + "<p>" + text + "</p>";
//         }
//     }
//     return newHtml;
// }

// function removeInfoIntermediate(a, start_url = 'http://www', end_url = '.html') {
//     //let div = document.createElement("div");
//     let result = a;
//     if (a.includes(start_url) && a.includes(end_url)) {
//         let ulrRemove = start_url + a.split(start_url)[1].split(end_url)[0] + end_url;
//         result = result.replace(ulrRemove, '').trim();
//     }
//     return result
// }