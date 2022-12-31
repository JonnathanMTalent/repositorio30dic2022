(function () {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = 0;
    var json;
    var cid = window.location.href.split('cid=').pop().split('&').shift();
    var ccId = window.location.href.split('ccId=').pop().split('&').shift();
    var lang = window.location.href.split('lang=').pop().split('&').shift();
    var time = new Date();
    time = Date.now();
    do {
      //var data = {};
      $.ajax({
        url: 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=' + cid + '&timeStamp=' + time + '&lang=' + lang + '&iccFlag=yes&eccFlag=yes&ccId=' + ccId + '&locale=' + lang + '&$top=20&$skip=' + counter,
        headers: {
          "accept": "*/*",
          "accept-language": lang,
          "content-type": "application/json",
          "locale": lang,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-forwarded-host": "workforcenow.adp.com",
          "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (result) {
          json = result.jobRequisitions;
          if (json.length > 0) {
            limit = result.meta.totalNumber;
            for (var i = 0; i < json.length; i++) {
              var job = {};
              var elem = json[i];
              job.reqid = elem.clientRequisitionID;
              job.title = elem.requisitionTitle;
              job.url = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=' + cid + '&ccId=' + ccId + '&jobId=' + elem.customFieldGroup.stringFields[0].stringValue + '&lang=' + lang;
              job.dateposted_raw = elem.postDate.split('T').shift();
              job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];            
              /*
              if(elem.requisitionLocations[0].address.cityName){
                if(elem.requisitionLocations[0].address.countrySubdivisionLevel1.codeValue){
                  job.source_location = elem.requisitionLocations[0].address.cityName +', '+ elem.requisitionLocations[0].address.countrySubdivisionLevel1.codeValue;
                } 
              }else {              
                job.source_location = '';}
  */
  
              //
              if (elem.workLevelCode) {//jobRequisitions[0]
                if (elem.workLevelCode.shortName) {
                  job.source_jobtype = elem.workLevelCode.shortName;
                }
              }
              job.temp = 96;
  
  
              for (let a of elem.requisitionLocations) {
                var jobx = {};
                jobx = { ...job }
                jobx.location = '';
                jobx.source_location='';
                if (a.address.cityName) {
                  jobx.source_location += a.address.cityName;
                  jobx.location += a.address.cityName;
                }
                if (a.address.countrySubdivisionLevel1.codeValue) {
                  jobx.source_location += ', ' + a.address.countrySubdivisionLevel1.codeValue;
                  jobx.location += ', ' + a.address.countrySubdivisionLevel1.codeValue;
                }              
                if (jobx.location.trim() != '') {
                  jobs.push(jobx);
                }
              }
            }
          } else {
            var job = {};
            job.title = 'Ghost job, probably no jobs here...' + window.location.href;
            jobs.push(job);
          }
          counter = counter + 20;
        },
        error: function (error) {
          msg(error);
        }
      });
    } while (counter < limit);
  
    out["jobs"] = jobs;
    return out;
  })();