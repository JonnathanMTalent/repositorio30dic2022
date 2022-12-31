//Multilocación


job.temp = 1;

if(job.location.indexOf(',') > -1) {
  var array = job.location.split(',');
  for (var i in array) {
    var jobx = {};
    jobx.title = job.title;
    jobx.reqid = job.reqid;
    jobx.url = job.url;
    //jobx.source_jobtype = job.source_jobtype;
    //jobx.source_salary = job.source_salary;
    //jobx.logo = job.logo;
    //jobx.source_empname = job.source_empname;
    //jobx.dateposted_raw = job.dateposted_raw;
    //jobx.dateclosed_raw = job.dateclosed_raw
    //jobx.html = job.html;
    //jobx.jobdesc= job.jobdesc;
 
    jobx.location = array[i].trim();
    jobx.temp = job.temp;
    if (jobx.location.length > 0) {
      jobs.push(jobx);
    }
  }
}
else {
  job.location = job.location
  jobs.push(job);
}
} 

out["jobs"]= jobs;
return out;
})();



//Multilocation con selector diferente

job.temp = 1;
if (elem.querySelector("span.job-location")){
  job.location = elem.querySelector("span.job-location").textContent.split("Location").pop().trim();
  jobs.push(job);
}else{
  var locs = elem.querySelectorAll('ul[data-ph-at-id="job-multi-locations-list"]>li'); // Traigo el array de las locaciones
  //Hago El multi location
  locs.forEach(loc=>{
    let jobx = {};
    jobx.title = job.title;
    jobx.reqid = job.reqid;
    jobx.url = job.url;
    jobx.source_jobtype = job.source_jobtype;
    jobx.location = loc.innerText.trim();
    jobx.temp = job.temp;
    jobs.push(jobx)
  })
}
} 
out["jobs"]= jobs;
return out;
})();



//Multilocation desde el mismo titulo:

var array = job.location.split(",");
for(var i = 0; i < array.length; i++) {
    var jobx={};
    jobx.title = job.title;
    jobx.url = job.url;
    jobx.location = array[i];
    jobx.temp = job.temp;
    jobs.push(jobx);
}

// multi location corta
job.temp = 1;        
job.location = job.location.split(",")
job.location.map(location =>{
  var jobx = {};
  jobx ={...job}
  jobx.location = location;
  jobs.push(jobx);
}) 