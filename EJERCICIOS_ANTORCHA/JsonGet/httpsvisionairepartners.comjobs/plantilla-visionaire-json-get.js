//infinity
(function() {
    var out = {};
    out.pass_it = {
        "page": 0,
        "jobs": 0,
        "totalJobs": 0
    }
    return out;
})();

//extractJSON
(function() {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;

    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    $.ajax({
        url: `https://public-rest33.bullhornstaffing.com/rest-services/17EG1/search/JobOrder?start=${out.pass_it.page}&query=(isOpen:1)%20AND%20(isDeleted:0)&fields=id,title,publishedCategory(id,name),address(city,state,countryName),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit&count=300&sort=-dateLastPublished&showTotalMatched=true`, //link del json
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "json",
        async: false,
        success: function(result) {
            json = result.data;
            out.pass_it.totalJobs = result.total;
            for (let elem of json) {
                var job = {};
                job.html = elem.publicDescription;
                job.source_location = elem.address[0] + elem.address[1];
                job.location = elem.address[0] + ', ' + elem.address[1];
                job.title = elem.title;
                if (elem.salary != 0) {
                    job.source_salary = elem.salary;
                }
                var dateAux = new Date(elem.dateLastPublished);
                job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                job.reqid = elem.id;
                job.url = `https://visionairepartners.com/wp-content/plugins/bullhorn-oscp/#/jobs/${elem.url}`;
                job.temp = "test";
                jobs.push(job);
            }
            //counter += 1;
        },
        error: function(error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();

//pagination
(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.page+=300;
    out["has_next_page"] = false;
    if (out.pass_it.totalJobs > out.pass_it.page) {
        out["has_next_page"] = true;
    }
    out["wait"] = false;
    msg(out.pass_it)
    return out;
})();