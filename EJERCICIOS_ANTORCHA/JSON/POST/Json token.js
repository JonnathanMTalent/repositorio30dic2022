(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    if (!pass_it["token"]) { // Poner if (!pass_it["token"]) { sino funciona con if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0,
            "totalJ": 0,
            "token": "",

        };
    } else {
        out["pass_it"] = pass_it;
    }
    //do {
    var data = {
        "token": out["pass_it"].token,
        "query": "",
        "location": [],
        "department": [],
        "worktype": [],
        "remote": []
    };
    $.ajax({
        url: `https://apply.workable.com/api/v3/accounts/wallbox/jobs`,// se modifica url se puede sacar del encabezado o del copiar fetch

        headers: {
               "accept": "application/json, text/plain, */*",
    "accept-language": "en",
    "content-type": "application/json",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-datadog-origin": "rum",
    "x-datadog-parent-id": "5595724837628867524",
    "x-datadog-sampled": "1",
    "x-datadog-sampling-priority": "1",
    "x-datadog-trace-id": "8583116466924390029"
        },

        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function(result) {
            json = result.results;
            msg(json)
            out["pass_it"].totalJ = result.total;
            out["pass_it"].jobs = out["pass_it"].jobs + json.length;
            out["pass_it"].token = result.nextPage;
            for (var i = 0; i < json.length; i++) {
                var job = {};
                var elem = json[i];
                job.title = elem.title;
                //job.location = elem.address.city;
                //job.url = elem.positionOfUrl;
                //job.dateposted_raw = elem.positionOfDatePosted;
                //job.dateclosed_raw = elem.positionOfDateClosed;
                //job.source_jobtype = elem.positionOfJobtype;
                //job.source_salary = elem.positionOfSalary;
                //job.source_empname = elem.positionOfEmpname;
                //job.logo = elem.positionOfLogo;
                //job.source_apply_email = elem.positionOfEmail;

                job.temp = "1";
                jobs.push(job);
            }
            //counter = counter + 1;
        },
        error: function(error) {
            //  msg(error);
        }
    });
    // } while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();

//Paginacion

(function() {

    var out = {};



    out["pass_it"] = pass_it;



    //var cont = out["pass_it"].cont_real*50;

    //msg(out["pass_it"].jobs +"  -------- "+ out["pass_it"].totalJ)

    if( out["pass_it"].jobs < out["pass_it"].totalJ){

      //go to next page

      //out["pass_it"].cont = out["pass_it"].cont + 30;// Numero de jobs

      out["has_next_page"] = true;

    } else {

      //try again

      out["has_next_page"] = false;

    }



    out.waitFor = "";

    return out;

  })();
