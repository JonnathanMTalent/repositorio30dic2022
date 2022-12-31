(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.et_pb_column.et_pb_column_2_3 div[class*="et_pb_module"]');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        
        const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
        if(elem.querySelector('p a')!=null){
        job.title= elem.querySelector('h2').textContent.trim();
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*  LIMPIANDO TITULO
        job.location='';
        job.title=job.title.replaceAll(',','').replaceAll('(','').replaceAll(')','').replaceAll('–','')
        .replaceAll('or','').replaceAll('06','').replaceAll('MN','').replaceAll('/','').replaceAll('Wk','')
        .replaceAll('M4 Crid','');
        
        
        if(job.title.indexOf('Paris')>-1){
        job.title=job.title.replaceAll('France','').replaceAll('Paris','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'France, Paris';
        }
        
        if(job.title.indexOf('UK')>-1){
        job.title=job.title.replaceAll('UK','').replaceAll('Reading','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Reading, UK';
        }
        
        if(job.title.indexOf('Singapore')>-1){
        job.title=job.title.replaceAll('Singapore','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Singapore, Singapore';
        }
        
        if(job.title.indexOf('Taipei')>-1){
        job.title=job.title.replaceAll('Taipei','').replaceAll('Taiwan','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Taipei, Taiwan';
        }
        
        if(job.title.indexOf('Shenzhen')>-1){
        job.title=job.title.replaceAll('Shenzhen','').replaceAll('China','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Shenzhen, China';
        }
        
        if(job.title.indexOf('Sophia Antipolis')>-1){
        job.title=job.title.replaceAll('Sophia Antipolis','').replaceAll('France','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Sophia Antipolis, France';
        }
        
        if(job.title.indexOf('Tel Aviv')>-1){
        job.title=job.title.replaceAll('Tel Aviv','').replaceAll('Israel','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Tel Aviv, Israel';
        }
        
        if(job.title.indexOf('Burnsville')>-1){
        job.title=job.title.replaceAll('Burnsville','').replaceAll('US','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Burnsville, US';
        }
        
        if(job.title.indexOf('remote')>-1){
        job.title=job.title.replaceAll('Remote','').replaceAll('remote','').replaceAll('Work','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Tel Aviv, Israel';
        }

        if(job.title.indexOf('Finland')>-1){
        job.title=job.title.replaceAll('Salo','').replaceAll('Finland','');
        if(job.location.length>0)job.location=job.location+' - ';
        job.location=job.location+'Salo, Finland';
        }
        job.title=job.title.trim();
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

        
        job.url = elem.querySelector('p a').href.trim();
        //job.source_location = elem.querySelector('').textContent.trim();
        //job.location = job.source_location;
        var datee= elem.querySelector("div p:nth-child(1)").textContent.trim();
        job.dateposted_raw =formatDate(datee);
        //job.source_benefit=elem.querySelector("").textContent.trim();
        job.temp = 1;
        
        
    if(job.location.includes('-')){
    var locations = job.location.split('-');
    for(var z=0;z<locations.length;z++){
    var jobx = {...job};
    jobx.location = locations[z].trim();
    //jobx.location = jobx.location.split('-').reverse().join(', ');
    jobs.push(jobx);
    }
    }else{
    //job.location = job.location.split('-').reverse().join(', ');
    jobs.push(job);
    }
        
        
        //jobs.push(job);
        }
    }

    out["jobs"] = jobs;
    return out;
})();