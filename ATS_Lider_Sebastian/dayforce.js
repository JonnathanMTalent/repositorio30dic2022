//infinity
(function () {
	var out = {};

	out["pass_it"] = {
		"offSet": 1,
		"limit": 0
	};

	return out;
})();
//Extract
(function() {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;

    var data = {
        "filter": {
            "Query": "",
            "JobBoardXrefCode": "CANDIDATEPORTAL",
            "LocationId": "",
            "LocationSearch": ""
        }
    }; //datos adicionales para el request
    $.ajax({
        url: 'https://builders.dayforcehcm.com/CandidatePortal/en-US/builders/Posting/Search?page=' + out.pass_it.offSet, //link del json
        headers: {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        }, //se obtienen con el fetch
        type: 'POST',
        data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "html",
        async: false,
        success: function(result) {
            json = document.createElement('div');
            json.innerHTML = result;
            out.pass_it.limit = json.querySelector('nav[class="pagination"] ul > li:last-child').previousElementSibling.textContent.trim();
            var html_jobs = json.querySelectorAll('ul[class="search-results"] > li[class="search-result "]');
            for (var elem of html_jobs) {
                if (typeof elem == "function") continue;
                if (typeof elem == "number") continue;
                var job = {};
                job.reqid = elem.querySelector('div[class="posting-subtitle"]').textContent.trim().split('#').pop();
                job.title = elem.querySelector('div[class="posting-title"]').textContent.trim();
                job.url = elem.querySelector('a').href.trim();
                job.source_location = elem.querySelector('div[class="posting-subtitle"]').textContent.trim();
                job.location = job.source_location.split('●').shift();
                var dateAux = new Date(elem.querySelector('div[class="posting-date"]').textContent.trim());
                job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                job.temp = 96;
                jobs.push(job);
            }
        },
        error: function(error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();
//extractFetch
(async () => {
    let out = {};
    out["pass_it"] = pass_it;

    try {
        let jobs = [];
        let resp = await fetch(`${window.location.origin}/CandidatePortal/en-US/builders/Posting/Search?page=${out.pass_it.offSet}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/json",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": window.location.href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "filter": {
                    "Query": "",
                    "JobBoardXrefCode": "CANDIDATEPORTAL",
                    "LocationId": "",
                    "LocationSearch": ""
                }
            }),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });

        let data = await resp.text();
        let doc = document.createElement('div');
        doc.innerHTML = data;
        let htmlJobs = doc.querySelectorAll('ul[class="search-results"] > li[class="search-result "]');

        out.pass_it.limit = doc.querySelector('nav[class="pagination"] ul > li:last-child').previousElementSibling.textContent.trim();

        for (let elem of htmlJobs) {
            //let elem = htmlJobs[i];
            msg(elem)
            let job = {};
            job.reqid = elem.querySelector('div[class="posting-subtitle"]').textContent.trim().split('#').pop();
            job.title = elem.querySelector('div[class="posting-title"]').textContent.trim();
            job.url = elem.querySelector('a').href.trim();
            job.source_location = elem.querySelector('div[class="posting-subtitle"]').textContent.trim();
            job.location = job.source_location.split('●').shift().trim();
            msg(job.location)
            if (job.location == '' || job.location == 'Virtual') {
                job.location = 'Dallas, TX, US';
            } else {
                job.location = job.location.split(', ').slice(job.location.split(', ').length - 3, job.location.split(', ').length).join(', ');
            }
            var dateAux = new Date(elem.querySelector('div[class="posting-date"]').textContent.trim());
            job.dateposted_raw = dateAux.toLocaleDateString("en-US");
            job.temp = 96;
            jobs.push(job);
        }
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
    return out;
})();
//Pagination
(function () {
	var out = {};
	out["pass_it"] = pass_it;
	out.pass_it.offSet += 1;
	if (out.pass_it.offSet < out.pass_it.limit) {
		out["has_next_page"] = true;
	} else {
		out["has_next_page"] = false;
	}
	out["wait"] = false;
	return out;
})();
//Jobdata
(function () {
	var out = {};
	var job = {};
	//var job = pass_it["job"];

	var full_html = document.querySelector('div[class="job-posting-content"]');

	if (full_html) {

		var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

		if (remove_selectors.length > 0) {
			remove_selectors.forEach(remove_selector => {
				for (const a of full_html.querySelectorAll(remove_selector)) {
					a.remove();
				}
			});
		}

		for (const a of full_html.querySelectorAll('p, span, li')) {
			if (a.textContent.search(/@|http|www./ig) > -1) {
				a.remove();
			}
		}

		if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
		if (typeof msg == "undefined") msg = console.log;

		job.html = full_html.innerHTML.trim();

		job.html = removeTextBefore(job.html, 'Summary', false);
    job.html = removeTextAfter(job.html, 'Thank you for your application', true);

		job.html = cleanHTML(job.html);
		var tmp = document.createElement('div');
		tmp.innerHTML = job.html;
		job.jobdesc = tmp.textContent.trim();
		job.jobdesc = cleanHTML(job.jobdesc);
	}
	out["job"] = job;
	return out;

})();
function removeTextBefore(html, text, flag) {
	var newHtml = html;
	if (newHtml.search(text) > -1) {
		newHtml = newHtml.split(text).pop();
		if (!flag) {
			newHtml = "<h3>" + text + "</h3>" + newHtml;
		}
	}
	return newHtml;
}
function removeTextAfter(html, text, flag) {
	var newHtml = html;
	if (newHtml.search(text) > -1) {
		newHtml = newHtml.split(text).shift();
		if (!flag) {
			newHtml = newHtml + "<p>" + text + "</p>";
		}
	}
	return newHtml;
}