//Oracle cloud

//Before extract


(function() {
    var out = {};
    try{
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.items[0].requisitionList;  // ruta donde estan los jobs
      out["json"] = jobs;
    }catch(error){
      out["wait"] = 7000; // un poco de tiempo json
  
    }
    out["pic"] = true;
    return out;
  })();


// Extract


(function() {
  var out = {};
  // var html_jobs = document.querySelectorAll("");
  //  This gives you an HTMLElement object

  if(typeof pass_it == "undefined") pass_it = {};
  msg("***************************************");
  //msg(pass_it);
  //msg(window.location.href);
  msg("***************************************");
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var locfinal;

  //var element = document.querySelector("pre").textContent;
  //msg(element);
  var jobs =  pass_it["json"];

  var returnedJobs = [];    
  if(!jobs){
    var element = document.querySelector("pre").textContent;
    //msg(element);
    var json = JSON.parse(element);
    var jobs = json.items[0].requisitionList;
  }
  //msg(typeof(jobs));
  for(i in jobs) {
    var job = {};/*init*/
    // msg("Entre")


    job.title = jobs[i].Title;
    job.reqid = jobs[i].Id;
    job.url   = "https://eour.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/" + job.reqid;

    var posted = jobs[i].PostedDate.split("T").shift();
    posted = posted.split("-");
    job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];


    if(jobs[i]){
      var total = jobs[i];
      var finalloc= JSON.stringify(total);

      var finalloc1 = finalloc.split('PrimaryLocation":"').pop().replace('","','').trim();
      finalloc1 = finalloc1.split("PrimaryLocationCountry").shift().trim();

      var finalloc2 = finalloc.split('secondaryLocations').pop().split('Name').pop().split("CountryCode").shift();
      finalloc2 = finalloc2.split('":[]}').shift().replace('":"','').replace('","','').trim();

      job.location = finalloc1 + ";" + finalloc2;  
    }



    job.temp = 122020;

    if(job.location.indexOf(';') > -1) {
      var array = job.location.split(';');
      for (var i in array) {
        var jobx = {};
        jobx.title = job.title;
        jobx.reqid = job.reqid;
        jobx.url = job.url;
        //jobx.source_jobtype = job.source_jobtype;
        //jobx.source_salary = job.source_salary;
        //jobx.logo = job.logo;
        //jobx.source_empname = job.source_empname;
        jobx.dateposted_raw = job.dateposted_raw;
        //jobx.dateclosed_raw = job.dateclosed_raw

        jobx.location = array[i].trim();
        jobx.temp = job.temp;
        if (jobx.location.length > 0) {
          returnedJobs.push(jobx);
        }
      }
    }
    else {
      job.location = job.location
      returnedJobs.push(job);
    }
  } 

  out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
  return out;
})();



//Paginación

(function() {
    var out = {};
    out["pass_it"] = pass_it;
    var element = document.querySelector("pre").textContent;
    //msg(element);
    var json = JSON.parse(element);
    var total_jobs = json.items[0].TotalJobsCount;
    var jobs = json.items[0].requisitionList;
    //var per_page = json.meta.perPage;
    msg("========>" + jobs.length);
    if(jobs.length >= 23){
      out["pass_it"].cont += 24;
      var url = "https://eour.fa.us2.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BPOSTING_DATES%3BFLEX_FIELDS,limit=24,offset=" + out["pass_it"].cont;
      window.location.href = url;
      out["has_next_page"] = true;
    }else{
      out["has_next_page"] =false;
    }
    out["wait"] = true;
    out["pic"] = true;
    out.waitFor = 'pre';
    return out;
  })();