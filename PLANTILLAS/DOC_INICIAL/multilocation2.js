(function () {
    var out = {};
    var jobs = [];
    var html_jobs = document.querySelectorAll('tr[class="ftlcopy ftlrow"]');
    
    
    
    for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector('a[id*="requisitionListInterface.reqTitleLinkAction.row"]').textContent.trim();
    job.reqid = elem.querySelector('span[id*="requisitionListInterface.reqContestNumberValue.row"]').textContent.trim();
    job.url = "https://hdr.taleo.net/careersection/jobdetail.ftl?job="+job.reqid;
    job.source_location = elem.querySelector('span[id*="requisitionListInterface.reqBasicLocation.row"]').textContent.trim();
    job.location = elem.querySelector('span[id*="requisitionListInterface.reqBasicLocation.row"]').textContent.trim();
    if(elem.querySelector('a[id*="requisitionListInterface.reqMoreLocationAction.row"]')){
    job.location = job.location + ", "+elem.querySelector('a[id*="requisitionListInterface.reqMoreLocationAction.row"]').getAttribute('title').split(': ')[1];
    }
    job.dateposted_raw = elem.querySelector('span[id*="requisitionListInterface.reqPostingDate.row"]').textContent.trim().replace(',','').replaceAll(' ','/').replace('Jan','1').replace('Feb','2').replace('Mar','3').replace('Apr','4').replace('May','5').replace('Jun','6').replace('Jul','7').replace('Aug','8').replace('Sep','9').replace('Oct','10').replace('Nov','11').replace('Dec','12');
    //job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector('span[id*="requisitionListInterface.reqSchedule.row"]').textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
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
    }
    out["jobs"] = jobs;
    return out;
    })();




//  EL MISMO CORREGIDO:




    (function () {
        var out = {};
        var jobs = [];
        var html_jobs = document.querySelectorAll('tr[class="ftlcopy ftlrow"]');
       for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('a[id*="requisitionListInterface.reqTitleLinkAction.row"]').textContent.trim();
        job.reqid = elem.querySelector('span[id*="requisitionListInterface.reqContestNumberValue.row"]').textContent.trim();
        job.url = "https://hdr.taleo.net/careersection/jobdetail.ftl?job="+job.reqid;
        job.source_location = elem.querySelector('span[id*="requisitionListInterface.reqBasicLocation.row"]').textContent.trim();
        job.location = elem.querySelector('span[id*="requisitionListInterface.reqBasicLocation.row"]').textContent.trim();
        if(elem.querySelector('a[id*="requisitionListInterface.reqMoreLocationAction.row"]')){
        job.location = job.location + ", "+elem.querySelector('a[id*="requisitionListInterface.reqMoreLocationAction.row"]').getAttribute('title').split(': ')[1];
        }
        job.dateposted_raw = elem.querySelector('span[id*="requisitionListInterface.reqPostingDate.row"]').textContent.trim().replace(',','').replaceAll(' ','/').replace('Jan','1').replace('Feb','2').replace('Mar','3').replace('Apr','4').replace('May','5').replace('Jun','6').replace('Jul','7').replace('Aug','8').replace('Sep','9').replace('Oct','10').replace('Nov','11').replace('Dec','12');
        //job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        job.source_jobtype = elem.querySelector('span[id*="requisitionListInterface.reqSchedule.row"]').textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
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
        }
        out["jobs"] = jobs;
        return out;
        })();
       