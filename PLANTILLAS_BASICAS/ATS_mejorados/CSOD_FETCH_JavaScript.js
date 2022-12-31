// jobsite: https://atu.csod.com/ux/ats/careersite/1/home?c=atu
// before extract
(() => out = {
    wait: true
})();
// extract
(async () => {
    const out = {};
    const jobs = [];
    const tokenSelector = [...document.querySelectorAll("script")].map(src => src.textContent.trim()).filter(src => src.search(/"token":/) > -1)[0];
    const token = JSON.parse(tokenSelector.replace(/if\(\!csod\.context  \|\| \!csod\.context\.token\)  csod\.context\=|;/gi, "")).token;
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it.counter) {
        out.pass_it = {
            counter: 1,
            limit: 0,
        };
    } else {
        out.pass_it = pass_it;
    }
    try {
        let url = 'https://us.api.csod.com/rec-job-search/external/jobs';
        const fetchPro = fetch(url, {
            headers: {
                "accept": "application/json; q=1.0, text/*; q=0.8, */*; q=0.1",
                "accept-language": "en-US,en;q=0.9,es;q=0.8,es-ES;q=0.7",
                "authorization": "Bearer " + token,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "csod-accept-language": "en-US",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"104\", \"Opera\";v=\"90\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            body: "{\"careerSiteId\":1,\"careerSitePageId\":1,\"pageNumber\":" + out.pass_it.counter + ",\"pageSize\":25,\"cultureId\":1,\"searchText\":\"\",\"cultureName\":\"en-US\",\"states\":[],\"countryCodes\":[],\"cities\":[],\"placeID\":\"\",\"radius\":null,\"postingsWithinDays\":null,\"customFieldCheckboxKeys\":[],\"customFieldDropdowns\":[],\"customFieldRadios\":[]}",
            method: "POST",
            mode: "cors",
            credentials: "include",
        });
        const request = await fetchPro;
        const data = await request.json();
        //msg(data);
        if (out.pass_it.limit === 0) {
            out.pass_it.limit = Math.ceil(data.data.totalCount / 25);
            msg(out.pass_it.limit);
        }
        for (const [index, elem] of Object.entries(data.data.requisitions)) {
            const job = {};
            job.title = elem.displayJobTitle;
            job.reqid = elem.requisitionId;
            job.url = "https://atu.csod.com/ux/ats/careersite/1/home/requisition/" + job.reqid + "?c=atu";
            job.dateposted_raw = elem.postingEffectiveDate;
            job.temp = 1;
            try {
                let url2 = 'https://atu.csod.com/Services/API/ATS/CareerSite/1/JobRequisitions/' + job.reqid + '?useMobileAd=false&cultureId=1';
                const fetchPro2 = fetch(url2, {
                    headers: {
                        "accept": "application/json; q=1.0, text/*; q=0.8, */*; q=0.1",
                        "accept-language": "en-US,en;q=0.9,es;q=0.8,es-ES;q=0.7",
                        "authorization": "Bearer " + token,
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                        "csod-accept-language": "en-US",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"104\", \"Opera\";v=\"90\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site"
                    },
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                });
                const request2 = await fetchPro2;
                const data2 = await request2.json();
                //msg(data2);
                const stringToHTML = (str) =>
                    new DOMParser().parseFromString(str, 'text/html').body;
                let full_html = stringToHTML(data2.data[0].items[0].fields.ad);
                if (typeof cleanHTML == 'undefined') cleanHTML = (x) => x;
                if (typeof msg == 'undefined') msg = console.log;
                let remove_selectors = 'a,script,style,img,button,iframe,video';
                let links = [...full_html.querySelectorAll(remove_selectors)];
                links.map((elem) => elem.remove());
                job.html = full_html.innerHTML.replace(/&nbsp;/g, ' ').trim();
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = cleanFromPointAtoB(job.html, "", "");
                //job.html = cleanFromPointAtoB(job.html, "", "");
                job.jobdesc = stringToHTML(job.html).textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc).replace(/<[^>]*>?/g, '');
            } catch (error) {
                msg(error);
                throw error;
            }
            for (let j in elem.locations) {
                var city = elem.locations[j].city;
                var state = elem.locations[j].state;
                var country = elem.locations[j].country;
                var array_loc = [];
                if (city) array_loc.push(city);
                if (state) array_loc.push(state);
                if (country) array_loc.push(country);
                if (array_loc.length) {
                    job.source_location = array_loc.join(', ');
                    job.location = job.source_location;
                } else {
                    job.source_location = "";
                    job.location = "HQ";
                }
                jobs.push(job);
            }
        }
    } catch (error) {
        msg(error);
        throw error;
    }
    out.jobs = jobs;
    return out;
})();
function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) newHtml = '<h3>' + html.match(text)[0] + '</h3>' + newHtml;
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) newHtml = newHtml + '<p>' + html.match(text)[0] + '</p>';
    }
    return newHtml;
}
function cleanFromPointAtoB(text, a, b) {
    if (text.indexOf(a) > -1 && text.indexOf(b) > -1) {
        let a_b = text.slice(text.indexOf(a), text.indexOf(b));
        text = text.replace(a_b, '').replace(b, '').trim();
    }
    return text;
}
// pagination
(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter++;
    if (out.pass_it.counter <= out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }
    return out;
})();