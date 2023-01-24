
     job.location = job.location.replace(/ or | and | \&/gi,",");

if(job.location.includes(',')){
    var locations = job.location.split(',');
    for(var z=0;z<locations.length;z++){
    var jobx = {...job};
    jobx.location = locations[z].trim();
    jobx.location = jobx.location.split('-').reverse().join(', ');
    jobs.push(jobx);
    }
    }else{
    job.location = job.location.split('-').reverse().join(', ');
    jobs.push(job);
    }

    🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// Armando un array con las multilocation cuando vienen en tags diferentes

    let arr2=[]; let aux1 = Array.from(doc.querySelectorAll('p#job-location span.jobGeoLocation'));
    for(x in aux1)arr2.push(aux1[x].textContent.trim());
    let location1=arr2.join('/');
    job.location=location1;
    job.source_location=location1;



    🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
    //////////////////////////////////////
// con selectores

    let selectorLoc  = 'span.jobGeoLocation'; 
    if(job.location.indexOf("more")>-1){

if(doc.querySelector(selectorLoc) !== null){ // Validación del selector con multi-location
var loc;
var locs = doc.querySelectorAll(selectorLoc);
for(w in locs){
      if(typeof locs[w] =="function") continue;
      if(typeof locs[w] =="number") continue;

  var jobw = {...job};
  
  jobw.location = locs[w].textContent.trim();
if(jobw.location.indexOf(",")>2) loc = jobw.location.substring(jobw.location.lastIndexOf(","));
jobw.location=jobw.location.replace(loc,"");

  jobs.push(jobw); // Multi-location jobs
}
} }else
{
if(job.location.indexOf(",")>2) loc = job.location.substring(job.location.lastIndexOf(","));
job.location=job.location.replace(loc,"");
jobs.push(job); // Single Location jobs
// jobs.push(job);
}

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// spliteando y limpiando desde innerHTML y luego quitando primera y ultima ocurrencias.


var exp=doc.querySelector('p.jv-job-detail-meta').innerHTML.trim();
exp=exp.split('<span class="jv-inline-separator"></span>');
exp=exp.join("-");
exp=exp.replaceAll(" ","").replaceAll("\n","");
let reqid=exp.split("-").pop();
let ini=exp.split("-").shift();
exp=exp.replace(ini+"-","");
exp=exp.replace("-"+reqid,"");
job.location=exp;


🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

