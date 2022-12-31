//Json result HTML


(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var stop = true;
  var json;

  do {
    //var data = {}; 
    $.ajax({

      url : 'https://backend.ascendify.com/jobsapi/showPublicJobsList/bwL0bd7JDsDkWmO/'+counter,

      headers: {  
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "es-ES,es;q=0.9,ja;q=0.8",
        "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site" 
      },

      type : 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.page;

        if(json.length < 1){
          stop = false;
        }

        for(var i = 0; i<json.length; i++) {
          var job = {};

          var div = document.createElement("div");
          div.innerHTML = json[i];

          

          job.title = div.querySelector("div.asc-job-public-name.highlight > a").textContent.trim();
          job.url = div.querySelector("div.asc-job-public-name.highlight > a").href.trim();     
          job.location = div.querySelector('div.muted.asc-job-public-stats').innerHTML.trim().split('<span id="asc-client-hide">')[0];
          job.location = job.location.replace(/1|2|3|4|5|6|7|8|9|0/gi, "");

          //job.dateposted_raw = div.querySelector("").textContent.trim();
          //job.dateclosed_raw = div.querySelector("").textContent.trim();
          //job.source_jobtype = div.querySelector("").textContent.trim();
          //job.source_salary = div.querySelector("").textContent.trim();      
          //job.source_empname = div.querySelector("").textContent.trim();
          //job.logo = div.querySelector("").getAttribute("").trim();

          job.temp = 12021;
          jobs.push(job);

        }
        counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
  } while (stop);

  out["jobs"]= jobs;
  return out;
})();