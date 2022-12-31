// https://workatlevy.com/jobs/joblist?page=1&rp=40&sortname=&sortorder=&query=&qtype=



(function() {
    var out = {};
    var jobs = [];
    if (typeof pass_it == "undefined") pass_it = {};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    var element = document.querySelector("pre").textContent;
    var html = element.split('"id"');
    var cant = html.length;
    //var cant = 3; 
    //msg("JOBS: "+element);



    for (var aux = 1; aux < cant; aux++) {

        var job = {};
        job.title = html[aux].split('"cell":[').pop().split("]},").shift().split(",")[0].replace('"', "").split(/\\|"/gi).shift();
        var city2 = html[aux].split('"cell":[').pop().split("]},").shift().split(",")[2].replace('"', "").split(/\\|"/gi).shift();
        var city3 = html[aux].split('"cell":[').pop().split("]},").shift().split(",")[3].replace('"', "").split(/\\|"/gi).shift();

        job.dateposted_raw = html[aux].split('"cell":[').pop().split("]},").shift().split(",")[4].replace('"', "").split(/\\|"/gi).shift();

        var loc = "";
        var array_loc = Array();

        if (city2) array_loc.push(city2);
        if (city3) array_loc.push(city3);

        if (array_loc.length) {
            loc = array_loc.join(", ");
            job.source_location = loc;

        } else {
            loc = "USA";
            job.source_location = "";
        }


        job.location = loc+" ,US";

        job.url = "https://workatlevy.com/" + html[aux].split('"cell":[').pop().split("]},").shift().split(",")[5].split("title=").shift().split('"/').pop().split('\\').shift();
        job.temp = "[04/29/2022]]";

        job.reqid = html[aux].split('"cell":[').pop().split("]},").shift().split(",")[5].split("/")[2].split("title=").shift().split('"/').pop().split('\\').shift();
        //job.title = html[i].split("<h2>").pop();
        // job.title = $(this).find("h2").text();
        //job.location = $(this).find("span.job-location:eq(0)").text().split("Primary location:").join("");
        //job.url = "https://jobs.owenscorning.com"+$(this).find("a").attr("href");
        // job.temp = 1;
        //jobs.push(job);

        jobs.push(job);
    }



    out["pass_it"]["jobs"] = jobs.length;
    out["jobs"] = jobs;
    return out;
})();