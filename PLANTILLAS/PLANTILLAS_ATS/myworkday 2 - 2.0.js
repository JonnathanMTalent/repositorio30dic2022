//Extract

(function() {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = 0;
    var json;
    let feedType = 'Academy_of_Art';
    let urlRequest =`${window.location.origin}/wday/cxs/${window.location.host.split('.').shift()}/${feedType}/jobs`;
    let urlX = urlRequest//"https://bdc.wd10.myworkdayjobs.com/wday/cxs/bdc/BDC_Careers/jobs"
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs":0
      };
    } else {
      out["pass_it"] = pass_it;
    }//
    //do {
    var data = {
        "appliedFacets": {},
        "limit": 20,
        "offset": out["pass_it"].cont,
        "searchText": ""
    };
    $.ajax({
        url: urlX,
        headers: {
            "content-type": "application/json"
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function(result) {
            json = result.jobPostings;
            limit = json.length>0?true:false;
            for (var i = 0; i < json.length; i++) {
                var job = {};
                var elem = json[i];
                job.title = elem.title;
                job.reqid = elem.bulletFields[0];
                job.source_location = elem.locationsText;
                job.location = elem.locationsText;
                job.url = `${window.location.origin}/wday/cxs/${window.location.host.split('.').shift()}/${feedType}${elem.externalPath}`//urlX.replace("/jobs","") + elem.externalPath;
                if (job.location?.search(/Locations/i) > -1) {
                    job.location = getLocations(job.url);
                }else{
                    job.location = !job.location ? ["Montréal, Quebec"]:[job.location];
                }
                //job.dateposted_raw = elem.positionOfDatePosted;
                //job.dateclosed_raw = elem.positionOfDateClosed;
                //job.source_jobtype = elem.positionOfJobtype;
                //job.source_salary = elem.positionOfSalary;         
                //job.source_empname = elem.positionOfEmpname;
                //job.logo = elem.positionOfLogo;
                //job.source_apply_email = elem.positionOfEmail;

                job.temp = "1";
                job.location.map(loc =>{
                  var jobw = {...job};
                  jobw.location = loc;
                  jobs.push(jobw);
                })
            }
            counter = counter + 20;
        },
        error: function(error) {
            msg(error);
        }
    });
    //} while (limit);

    out["jobs"] = jobs;
    return out;
})();

function getLocations(urlDesc) {
    let loc = [];
    $.ajax({
        url: urlDesc,
        headers: {
            "content-type": "application/json"
        },
        type: 'GET',
        dataType: "json",
        async : false,
        success: function(result) {
            loc = result.jobPostingInfo.additionalLocations;
            loc.push(result.jobPostingInfo.location);
        },
        error: function(error) {
            msg(error);
        }
    });
    return loc;
}

// Pagination 

(function() {
    var out = {};  
    out["pass_it"] = pass_it;
    let expJ = document.querySelector(`p[data-automation-id="jobFoundText"]`).textContent.split(" ")[0];
    out["pass_it"].cont += 20;
    msg(out["pass_it"].cont + " ------- " + expJ)
    if(out["pass_it"].cont > expJ){
        out["has_next_page"] = false; 
    }else{
        out["has_next_page"] = true; 
    }
    
    out["wait"] = false;
    return out;
  })();

  // Jobdesc

  (function() {
    var job = {};
    var out = {};
    var json;
    let feedType = 'Academy_of_Art';
    out["pass_it"] = pass_it;
      $.ajax({
        url : out["pass_it"].link,
        headers: {
          "Content-Type": "application/json"
        },
        type : 'GET',
        dataType: "json",
        async : false,
        success : function(result){
          json = result.jobPostingInfo;
          job.source_jobtype = json.timeType;
          job.dateposted_raw = json.startDate;
          job.dateposted_raw = `${job.dateposted_raw.split("-")[1]}/${job.dateposted_raw.split("-")[2]}/${job.dateposted_raw.split("-")[0]}`;
          
          job.link = `${window.location.origin}/en-US/${feedType}/job/${json.jobPostingId}`//`https://bdc.wd10.myworkdayjobs.com/es/BDC_Careers/job/${json.jobPostingId}`;
          
          let full_html = document.createElement('div');
          full_html.innerHTML = json.jobDescription;
          job.html      = full_html.innerHTML.trim();    
          //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
          //job.html = removeTextAfter(job.html, 'Application Instructions', true);
          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);
        },
        error: function(error){
          msg(error);
        }
      });
    out["job"]= job;
    return out;
  })();
  function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }       
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }       
  }
  return newHtml;
}