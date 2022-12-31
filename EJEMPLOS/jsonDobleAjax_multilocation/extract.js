(function() {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = parseInt(document.querySelector('p[data-automation-id="jobFoundText"]').textContent.split(' ').shift().trim());
    var json;
    do {
      var data = {limit:20, offset:counter, appliedFacets: {}, searchText: ""};
      $.ajax({
        url : 'https://3m.wd1.myworkdayjobs.com/wday/cxs/3m/Search/jobs',
        headers: {
      "accept": "application/json",
      "accept-language": "es",
      "content-type": "application/json",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
        },
        type : 'POST',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){          
          json = result.jobPostings; //posición de los jobs en el preview
          limit = limit;
          //msg(limit)
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.title;
            job.reqid = elem.bulletFields[0];
            // job.location = elem.locationsText;
            job.url = "https://3m.wd1.myworkdayjobs.com/en-US/Search" + elem.externalPath; // URL DEL JSON DEL JOBSITE
            if(elem.postedOn){
              var dateposted = elem.postedOn;
              var aux = getXDaysBefore(dateposted);
              job.dateposted_raw = aux;
  
            }
            job.source_jobtype = elem.timeType;
            job.temp = 22;
  
  
            $.ajax({
              url: "https://3m.wd1.myworkdayjobs.com/wday/cxs/3m/Search"+ elem.externalPath, // URL DEL JSON DE LA DESCRIPCIÓN
              headers: {
                "accept": "application/json",
                "accept-language": "en-US",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
              },
              type: "GET",
              async: false,
              success: function (result) {
  
                job.location  = result.jobPostingInfo.location;
                job.source_location  = result.jobPostingInfo.location;
                jobs.push(job);
  
                if(result.jobPostingInfo.additionalLocations){
                  result.jobPostingInfo.additionalLocations.map(location =>{
                    var jobx = {};
                    jobx ={...job}
                    jobx.location = location;
                    jobs.push(jobx);
                  }) 
  
                }
  
              },
              error: function (error) {
               // msg(error);
              },
            });
  
          }
          jobs.push(job);
          
          counter = counter + 20;
          //msg("he extraido "+counter+" jobs")
        },
        error: function(error){
        }
      });
      //condición de parada paginación
    } while (counter < limit);
  
    out["jobs"]= jobs;
    return out;
  })();
  
  function getXDaysBefore(dateposted){//dateposted = Posted Yesterday || Posted x Days Ago || Posted 30+ Days Ago
    let today = new Date()// dd, mm, yyyy;
    dateposted = dateposted.toLowerCase();
    if(dateposted.indexOf('today') != -1){
      //msg("date doesn't change");
    }
    if(dateposted.indexOf('hour') != -1){
      //msg("date doesn't change");
    }
    else if(dateposted.indexOf('yesterday') != -1){
      today.setDate(today.getDate() - 1);
    }
    else if(dateposted.indexOf('days') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
      today.setDate(today.getDate() - parseInt(dateposted)); //substracts 30 days from actual date
    }
    else if(dateposted.indexOf('day') != -1){ //Normally 30+ Days Ago
      today.setDate(today.getDate() - 1); //substracts 30 days from actual date
    }
    else if(dateposted.indexOf('weeks') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
      today.setDate(today.getDate() - (parseInt(dateposted)*7));
    }
    else if(dateposted.indexOf('week') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
      today.setDate(today.getDate() - 7);
    }
    else if(dateposted.indexOf('months') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
      today.setDate(today.getDate() - (parseInt(dateposted)*30)); //substracts 30 days from actual date
    }
    else if(dateposted.indexOf('month') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
      today.setDate(today.getDate() - 30); //substracts 30 days from actual date
    }
    else if(dateposted.indexOf('years') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); 
      today.setDate(today.getDate() - (parseInt(dateposted)*360)); //substracts 30 days from actual date
    }
    else if(dateposted.indexOf('year') != -1){ //Normally 30+ Days Ago
      dateposted = dateposted.replace(/\D/g,''); 
      today.setDate(today.getDate() - 360); //substracts 30 days from actual date
    }
    else{
      dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
      today.setDate(today.getDate() - dateposted);
    }
    var dd = String(today.getDate()).padStart(2, '0'); //sets the day
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //sets the month (January is 0!)
    var yyyy = today.getFullYear(); //sets the year
    return mm + '/' + dd + '/' + yyyy;
  }