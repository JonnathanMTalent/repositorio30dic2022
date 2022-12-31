//https://noom.eightfold.ai/careers?pid=137450971930&domain=noom.com

(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
        var data = {};
        $.ajax({
            url: `https://noom.eightfold.ai/api/apply/v2/jobs?domain=noom.com&start=${counter}&num=10&pid=137448939838&domain=noom.com`,
            type: 'GET',
            //data : JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function(result) {
                json = result.positions;
                //limit = result.positionLimit;
                for (var i = 0; i < json.length; i++) {
                    var elem = json[i];
                    const locations = elem.locations;
                    for (const location of locations) {
                        var job = {};

                        job.title = elem.name;
                        job.location = location.trim();
                        job.source_location = job.location;
                        job.reqid = elem.id;
                        job.url = `https://noom.eightfold.ai/careers/job?pid=${job.reqid}&domain=noom.com`;
                        msg('URL: ' + job.url)
                        //job.dateposted_raw = elem.positionOfDatePosted;
                        //job.dateclosed_raw = elem.positionOfDateClosed;
                        //job.source_jobtype = elem.positionOfJobtype;
                        //job.source_salary = elem.positionOfSalary;         
                        //job.source_empname = elem.positionOfEmpname;
                        //job.logo = elem.positionOfLogo;
                        //job.source_apply_email = elem.positionOfEmail;

                        job.temp = "12jan22";

                        //poner después del temp
                        $.ajax({
                            //poner acá la URL
                            url: job.url, //88888888888888888888888888888888888,
                            headers: {
                                //poner acá los headers
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                                "Accept": "*/*",
                                "Accept-Language": "en",
                                "Content-Type": "application/vnd.oracle.adf.resourceitem+json;charset=utf-8",
                                "Ora-Irc-Language": "en",
                                "Sec-Fetch-Dest": "empty",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Site": "same-origin"
                            },
                            type: 'GET',
                            //poner acá el tipo de peticion JSON, HTML
                            dataType: "html",
                            async: false,
                            success: function(resultD) {


                                //poner acá las variable que se van a extraer de la descripcion
                                jsonDesc = resultD
                                // msg(jsonDesc)

                                // var selector = 'div[class="position-job-description"]';
                                // var remove_selectors = ['img', 'video', 'button', 'input', 'style', 'javascript', 'script'];
                                var div = document.createElement("div");

                                div.innerHTML = jsonDesc;

                                // msg(div.innerHTML)

                                if (div.querySelector('script[type="application/ld+json"]')) {
                                    // Extract text on the script
                                    var html = div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g, ' ').replace(/\@/gi, "");
                                    //convert text to json
                                    var json = JSON.parse(html);
                                    //ORIGINAL: var date=json.graph[1].datePublished.split("T").shift().split("-");
                                    var date = json.datePosted.split("T").shift().split("-");
                                    job.dateposted_raw = date[1] + "/" + date[2] + "/" + date[0];
                                    var jobdesc = json.description;
                                    jobdesc = cleanHTML(jobdesc)
                                    job.html = jobdesc;
                                    // msg(job.html)
                                    job.jobdesc = jobdesc;
                                    msg('desc: ' + job.jobdesc)
                                    if (jsonn.employmentType) {
                                        job.source_jobtype = jsonn.employmentType;
                                    }

                                }



                                // job.jobdesc = cleanHTML(job.jobdesc);


                            },
                            error: function(error) {
                                msg(error);
                            }
                        });


                        jobs.push(job);
                    }
                }
                counter += 10;
            },
            error: function(error) {
                msg(error);
            }
        });
    } while (json?.length);

    out["jobs"] = jobs;
    return out;
})();

//funciones de descripcion
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