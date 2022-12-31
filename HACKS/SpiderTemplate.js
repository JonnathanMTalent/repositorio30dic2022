(async()=> {
    let returnedJobs = [];
    //let limite = document.querySelector('p[data-automation-id*="jobFoundText"]').textContent.trim().split("JOBS")[0].trim();
    //msg(limite);
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it.cont) {
      out.pass_it = {
        "cont": 0,
        "jobs": 0,      
        "expected_jobs": 0
      };
    } else {
      out.pass_it= pass_it;
    }
   let body = {"limit":20,"offset":out.pass_it.cont,"searchText":"","appliedFacets":{}};
   const res = await fetch("https://ashealthnet.wd1.myworkdayjobs.com/wday/cxs/ashealthnet/ASHN/jobs", {
    "headers": {
      "accept": "application/json",
      "accept-language": "en-US",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1"
    },
       "body": JSON.stringify(body),
      "method": "POST",
  
      }); 
    
      const result = await res.json();
        json = result;
      let listJobs = json.jobPostings;
      //passit for pagination and total jobs
      if(out.pass_it.cont ===0){
          let totalJobs = json.total;
          out.pass_it.expected_jobs = totalJobs;
      }
    for(let i = 0; i<listJobs.length; i++) {
              let job = {};
              let elem = listJobs[i];
              job.title = elem.title;
              job.reqid = elem.bulletFields[0];   
              job.url = "https://ashealthnet.wd1.myworkdayjobs.com/wday/cxs/ashealthnet/ASHN" + elem.externalPath;
              job.source_location = elem.locationsText;
                 job.temp = 2022;
  // Global variable location 
             let location = elem.locationsText;
   //Get description 
              const resDescription = await fetch(job.url, {
                    "headers": {
                      "accept": "application/json",
                      "accept-language": "en-US",
                      "content-type": "application/x-www-form-urlencoded",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-origin",
                      "sec-gpc": "1"
                    },
          
            "method": "GET",
              });
              const resultDescription = await resDescription.json();
              jsonDescription = resultDescription.jobPostingInfo;	
          //Json of the description
          
      let dateposted_raw = jsonDescription.postedOn.replace('Posted ','').replace(' Ago','').trim();;
          dateposted_raw = dateposted_raw.replace(' ','/');
          job.dateposted_raw = dateAgo(dateposted_raw,'/',0,1);
          job.source_jobtype = jsonDescription.timeType;
          job.html      = jsonDescription.jobDescription;    
          //job.html = removeTextBefore(job.html, 'Summary', false);
          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);
          
      // First multilocation
          let countReqid = 0;  
            multiLocation = location.split(',');
         if(multiLocation.length > 2){
               for (let i=0; i<multiLocation.length; i++) {
                let jobx = {...job};
                jobx.location = multiLocation[i];
                jobx.reqid =job.reqid + countReqid++
                returnedJobs.push(jobx);
                }
              }else{
                 job.location = location;
              }
              if(!job.location){job.location='Kettering, OH';}
              
       //includes the word location   
       
      if(job.location.includes('Locations')){
       jsonLocation =jsonDescription.additionalLocations;
          for (let i = 0; i < jsonLocation.length; i++) {
              let otherLocations =[];
              let otherMultilocation = jsonLocation[i];
              otherLocations.push(jsonLocation[i])
              
              //Multilocation with all locations
              job.source_location = otherLocations.join('');
              
              //Other multilocation examples 3 Locations, etc
              let info = otherMultilocation.split(',');
  
               if(info.length > 2){
                  for (let i=0; i<info.length; i++) {
                       job.location = info[i];
                       let jobx = {...job};
                       jobx.location = info[i];
                       jobx.reqid =job.reqid + countReqid++
                       returnedJobs.push(jobx);
                      }
                }else{
                     job.location = info.join(',');
              }
          }
          
      }////fin if
      returnedJobs.push(job);   
    }
  
    out.pass_it.jobs = returnedJobs.length;
    out.jobs= returnedJobs;
    return out;
  })();
   function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
        var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
        if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
          var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
          }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
        var date_Now = new Date();  //declaro un objeto tipo fecha
        var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|Hoy|NOW|HOUR/g)>-1){nDays = 0;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
        if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
        if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
        if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}   
        var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
        //Obtengo dia mes y Año
        var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
        var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
        var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
        if (dd < 10){dd ='0'+dd;}
        if (mm < 10){mm ='0'+ mm;}
        dateJob= mm +'/'+dd+'/'+yyyy;
        return dateJob;
      }
      //PAGINATION
      (()=>{
        var out = {};
        if (typeof msg == "undefined") msg = function(x) { return x; };
        out.pass_it = pass_it;
        if (out.pass_it.expected_jobs <= (out.pass_it.cont + 20)) {            
          out.has_next_page = false;
        } else if (out.pass_it.jobs > 0) {
            out.pass_it.cont += 20;          
            out.has_next_page = true;
        }  
        out.wait= true;
        return out;
    })();