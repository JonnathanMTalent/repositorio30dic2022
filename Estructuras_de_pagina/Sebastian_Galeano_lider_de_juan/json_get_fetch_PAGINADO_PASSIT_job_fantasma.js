//JOBSITE= https://www.jobs-ups.com/search-jobs
//HOMEPAGE=http://www.ups.com/


//INFINITY
//pagination
(function () {
    var out = {};
    out["pass_it"] = {
      "offSet": 0,
      "limit": 0
    };
        return out;
  })();








// EXTRACT
//extract
(async () => {
    let out = {};
    out["pass_it"] = pass_it;
    try {
        let jobs = [];
        //const url = window.location.href;
        let resp = await fetch("https://www.jobs-ups.com/search-jobs/results?CurrentPage=" + out.pass_it.offSet + "&RecordsPerPage=1000&SearchResultsModuleName=Search+Results&SearchFiltersModuleName=Search+Filters&SortCriteria=6&SortDirection=0&SearchType=5", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/json; charset=utf-8",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://www.jobs-ups.com/",
            "referrerPolicy": "strict-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        //Texto
        // const data = await resp.text();
        // let doc = document.createElement('div');
        // doc.innerHTML = data;
        // let htmlJobs = doc.querySelectorAll('Selector');
        //JSON
        let data = await resp.json();
        let html_Jobs = data.results;
        let doc = document.createElement('div');
        doc.innerHTML = html_Jobs;
        let htmlJobs = doc.querySelectorAll('section[id="search-results-list"] > ul > li');
        // msg('Data:\n');
        // msg(htmlJobs);
        out.pass_it.limit = out.pass_it.offSet + 2;
        htmlJobs.forEach(elem => {
            let job = {};
            job.reqid = elem.querySelector('span[class="job-id"]').textContent.split(':').pop().trim();
            job.title = elem.querySelector('h2').textContent.trim();
            job.url = elem.querySelector('a').href.trim();
            //job.source_location = elem.querySelector('span[class="job-location"]').textContent.trim();
            //job.location = elem.querySelector('span[class="job-location"]').textContent.trim();
            if(elem.querySelector(`span.job-location:nth-child(3)`)){
                job.source_location = elem.querySelector(`span.job-location:nth-child(3)`).textContent.trim();
            }else{if(elem.querySelector(`span.job-location`)){
                job.source_location = elem.querySelector(`span.job-location`).textContent.trim();
            }else{
                job.source_location="";
            }
                
            }
            job.location = job.source_location.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
            if(job.location.indexOf('-')>-1){
            job.location = job.location.replace('-',',');
            }
            job.location=Locacion(job.location);
            
            
            
            job.temp = 96;
            jobs.push(job);
        });
        if (htmlJobs.length == 0) {
            let job = {
                title: 'Ghost Job, stop pagination'
            };
            jobs.push(job);
            out.pass_it.limit = 0;
        }
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
    return out;
})();


function Locacion(Locate) {
    var location = Locate;
    if (Locate.indexOf("AL") > -1) {
        location = Locate.replace("AL", "Alabama ");
    };
    if (Locate.indexOf("AK") > -1) {
        location = Locate.replace("AK", "Alaska ");
    };
    if (Locate.indexOf("AZ") > -1) {
        location = Locate.replace("AZ", "Arizona ");
    };
    if (Locate.indexOf("AR") > -1) {
        location = Locate.replace("AR", "Arkansas ");
    };
    if (Locate.indexOf("CA") > -1) {
        location = Locate.replace("CA", "California ");
    };
    if (Locate.indexOf("CO") > -1) {
        location = Locate.replace("CO", "Colorado ");
    };
    if (Locate.indexOf("CT") > -1) {
        location = Locate.replace("CT", "Connecticut ");
    };
    if (Locate.indexOf("DE") > -1) {
        location = Locate.replace("DE", "Delaware ");
    };
    if (Locate.indexOf("FL") > -1) {
        location = Locate.replace("FL", "Florida ");
    };
    if (Locate.indexOf("GA") > -1) {
        location = Locate.replace("GA", "Georgia ");
    };
    if (Locate.indexOf("HI") > -1) {
        location = Locate.replace("HI", "Hawaii ");
    };
    if (Locate.indexOf("ID") > -1) {
        location = Locate.replace("ID", "Idaho ");
    };
    if (Locate.indexOf("IL") > -1) {
        location = Locate.replace("IL", "llinois ");
    };
    if (Locate.indexOf("IN") > -1) {
        location = Locate.replace("IN", "Indiana ");
    };
    if (Locate.indexOf("IA") > -1) {
        location = Locate.replace("IA", "Iowa ");
    };
    if (Locate.indexOf("KS") > -1) {
        location = Locate.replace("KS", "Kansas ");
    };
    if (Locate.indexOf("KY") > -1) {
        location = Locate.replace("KY", "Kentucky ");
    };
    if (Locate.indexOf("LA") > -1) {
        location = Locate.replace("LA", "Louisiana ");
    };
    if (Locate.indexOf("ME") > -1) {
        location = Locate.replace("ME", "Maine ");
    };
    if (Locate.indexOf("MD") > -1) {
        location = Locate.replace("MD", "Maryland ");
    };
    if (Locate.indexOf("MA") > -1) {
        location = Locate.replace("MA", "Massachusetts ");
    };
    if (Locate.indexOf("MI") > -1) {
        location = Locate.replace("MI", "Míchigan ");
    };
    if (Locate.indexOf("MN") > -1) {
        location = Locate.replace("MN", "Minnesota ");
    };
    if (Locate.indexOf("MS") > -1) {
        location = Locate.replace("MS", "Mississippi ");
    };
    if (Locate.indexOf("MO") > -1) {
        location = Locate.replace("MO", "Missouri ");
    };
    if (Locate.indexOf("MT") > -1) {
        location = Locate.replace("MT", "Montana ");
    };
    if (Locate.indexOf("NE") > -1) {
        location = Locate.replace("NE", "Nebraska ");
    };
    if (Locate.indexOf("NV") > -1) {
        location = Locate.replace("NV", "Nevada ");
    }
    if (Locate.indexOf("NH") > -1) {
        location = Locate.replace("NH", "New Hampshire ");
    };
    if (Locate.indexOf("NJ") > -1) {
        location = Locate.replace("NJ", "New Jersey ");
    };
    if (Locate.indexOf("NM") > -1) {
        location = Locate.replace("NM", "New Mexico ");
    };
    if (Locate.indexOf("NY") > -1) {
        location = Locate.replace("NY", "New York ");
    };
    if (Locate.indexOf("NC") > -1) {
        location = Locate.replace("NC", "North Carolina ");
    };
    if (Locate.indexOf("ND") > -1) {
        location = Locate.replace("ND", "North Dakota ");
    };
    if (Locate.indexOf("OH") > -1) {
        location = Locate.replace("OH", "Ohio ");
    };
    if (Locate.indexOf("OK") > -1) {
        location = Locate.replace("OK", "Oklahoma ");
    };
    if (Locate.indexOf("OR") > -1) {
        location = Locate.replace("OR", "Oregon ");
    };
    if (Locate.indexOf("PA") > -1) {
        location = Locate.replace("PA", "Pennsylvania ");
    };
    if (Locate.indexOf("RI") > -1) {
        location = Locate.replace("RI", "Rhode Island ");
    };
    if (Locate.indexOf("SC") > -1) {
        location = Locate.replace("SC", "South Carolina ");
    };
    if (Locate.indexOf("SD") > -1) {
        location = Locate.replace("SD", "South Dakota ");
    };
    if (Locate.indexOf("TN") > -1) {
        location = Locate.replace("TN", "Tennessee ");
    };
    if (Locate.indexOf("TX") > -1) {
        location = Locate.replace("TX", "Texas ");
    };
    if (Locate.indexOf("UT") > -1) {
        location = Locate.replace("UT", "Utah ");
    };
    if (Locate.indexOf("VT") > -1) {
        location = Locate.replace("VT", "Vermont ");
    };
    if (Locate.indexOf("VA") > -1) {
        location = Locate.replace("VA", "Virginia ");
    };
    if (Locate.indexOf("WA") > -1) {
        location = Locate.replace("WA", "Washington ");
    };
    if (Locate.indexOf("WV") > -1) {
        location = Locate.replace("WV", "West Virginia ");
    };
    if (Locate.indexOf("WI") > -1) {
        location = Locate.replace("WI", "Wisconsin ");
    };
    if (Locate.indexOf("WY") > -1) {
        location = Locate.replace("WY", "Wyoming ");
    };
    if (Locate.indexOf("AL") > -1) {
        location = Locate.replace(/AL/g, "Alabama ");
    };
    if (Locate.indexOf("AK") > -1) {
        location = Locate.replace(/AK/g, "Alaska ");
    };
    if (Locate.indexOf("AZ") > -1) {
        location = Locate.replace(/AZ/g, "Arizona ");
    };
    if (Locate.indexOf("AR") > -1) {
        location = Locate.replace(/AR/g, "Arkansas ");
    };
    if (Locate.indexOf("CA") > -1) {
        location = Locate.replace(/CA/g, "California ");
    };
    if (Locate.indexOf("CO") > -1) {
        location = Locate.replace(/CO/g, "Colorado ");
    };
    if (Locate.indexOf("CT") > -1) {
        location = Locate.replace(/CT/g, "Connecticut ");
    };
    if (Locate.indexOf("DE") > -1) {
        location = Locate.replace(/DE/g, "Delaware ");
    };
    if (Locate.indexOf("FL") > -1) {
        location = Locate.replace(/FL/g, "Florida ");
    };
    if (Locate.indexOf("GA") > -1) {
        location = Locate.replace(/GA/g, "Georgia ");
    };
    if (Locate.indexOf("HI") > -1) {
        location = Locate.replace(/HI/g, "Hawaii ");
    };
    if (Locate.indexOf("ID") > -1) {
        location = Locate.replace(/ID/g, "Idaho ");
    };
    if (Locate.indexOf("IL") > -1) {
        location = Locate.replace(/IL/g, "llinois ");
    };
    if (Locate.indexOf("IN") > -1) {
        location = Locate.replace(/IN/g, "Indiana ");
    };
    if (Locate.indexOf("IA") > -1) {
        location = Locate.replace(/IA/g, "Iowa ");
    };
    if (Locate.indexOf("KS") > -1) {
        location = Locate.replace(/KS/g, "Kansas ");
    };
    if (Locate.indexOf("KY") > -1) {
        location = Locate.replace(/KY/g, "Kentucky ");
    };
    if (Locate.indexOf("LA") > -1) {
        location = Locate.replace(/LA/g, "Louisiana ");
    };
    if (Locate.indexOf("ME") > -1) {
        location = Locate.replace(/ME/g, "Maine ");
    };
    if (Locate.indexOf("MD") > -1) {
        location = Locate.replace(/MD/g, "Maryland ");
    };
    if (Locate.indexOf("MA") > -1) {
        location = Locate.replace(/MA/g, "Massachusetts ");
    };
    if (Locate.indexOf("MI") > -1) {
        location = Locate.replace(/MI/g, "Míchigan ");
    };
    if (Locate.indexOf("MN") > -1) {
        location = Locate.replace(/MN/g, "Minnesota ");
    };
    if (Locate.indexOf("MS") > -1) {
        location = Locate.replace(/MS/g, "Mississippi ");
    };
    if (Locate.indexOf("MO") > -1) {
        location = Locate.replace(/MO/g, "Missouri ");
    };
    if (Locate.indexOf("MT") > -1) {
        location = Locate.replace(/MT/g, "Montana ");
    };
    if (Locate.indexOf("NE") > -1) {
        location = Locate.replace(/NE/g, "Nebraska ");
    };
    if (Locate.indexOf("NV") > -1) {
        location = Locate.replace(/NV/g, "Nevada ");
    }
    if (Locate.indexOf("NH") > -1) {
        location = Locate.replace(/NH/g, "New Hampshire ");
    };
    if (Locate.indexOf("NJ") > -1) {
        location = Locate.replace(/NJ/g, "New Jersey ");
    };
    if (Locate.indexOf("NM") > -1) {
        location = Locate.replace(/NM/g, "New Mexico ");
    };
    if (Locate.indexOf("NY") > -1) {
        location = Locate.replace(/NY/g, "New York ");
    };
    if (Locate.indexOf("NC") > -1) {
        location = Locate.replace(/NC/g, "North Carolina ");
    };
    if (Locate.indexOf("ND") > -1) {
        location = Locate.replace(/ND/g, "North Dakota ");
    };
    if (Locate.indexOf("OH") > -1) {
        location = Locate.replace(/OH/g, "Ohio ");
    };
    if (Locate.indexOf("OK") > -1) {
        location = Locate.replace(/OK/g, "Oklahoma ");
    };
    if (Locate.indexOf("OR") > -1) {
        location = Locate.replace(/OR/g, "Oregon ");
    };
    if (Locate.indexOf("PA") > -1) {
        location = Locate.replace(/PA/g, "Pennsylvania ");
    };
    if (Locate.indexOf("RI") > -1) {
        location = Locate.replace(/RI/g, "Rhode Island ");
    };
    if (Locate.indexOf("SC") > -1) {
        location = Locate.replace(/SC/g, "South Carolina ");
    };
    if (Locate.indexOf("SD") > -1) {
        location = Locate.replace(/SD/g, "South Dakota ");
    };
    if (Locate.indexOf("TN") > -1) {
        location = Locate.replace(/TN/g, "Tennessee ");
    };
    if (Locate.indexOf("TX") > -1) {
        location = Locate.replace(/TX/g, "Texas ");
    };
    if (Locate.indexOf("UT") > -1) {
        location = Locate.replace(/UT/g, "Utah ");
    };
    if (Locate.indexOf("VT") > -1) {
        location = Locate.replace(/VT/g, "Vermont ");
    };
    if (Locate.indexOf("VA") > -1) {
        location = Locate.replace(/VA/g, "Virginia ");
    };
    if (Locate.indexOf("WA") > -1) {
        location = Locate.replace(/WA/g, "Washington ");
    };
    if (Locate.indexOf("WV") > -1) {
        location = Locate.replace(/WV/g, "West Virginia ");
    };
    if (Locate.indexOf("WI") > -1) {
        location = Locate.replace(/WI/g, "Wisconsin ");
    };
    if (Locate.indexOf("WY") > -1) {
        location = Locate.replace(/WY/g, "Wyoming ");
    };
    return location;
}


// PAGINATION

(function() {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.offSet < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    return out;
})();