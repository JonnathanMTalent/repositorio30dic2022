//ICIMS JSON POST

//Extract 
(function () {
    var out = {};   
    var jobs = [];  
        if (!pass_it["cont"]) {
          out["pass_it"] = {
            "cont": 0,
            "total": 0
          };
        } else {
          out["pass_it"] = pass_it;
        }   
        
      var data = {fields: ["title", "url", "postDate", "category", "locations", "description"], filters: {}};
      $.ajax({
        url: 'https://careers-solenis.icims.com/proxy/uxs/portals/search/job?limit=20&offset=' + out["pass_it"].cont,
        headers: {                                                      
          "accept": "application/json, text/plain, */*",
          "Content-Type":"application/json;charset=UTF-8"    // 2) headers
        },
        type: 'POST',                                        // 3) tipo
        dataType: "json",                                   // 4) data que retorna
        //data: data,
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
          msg("\x1b[45m loading jobs...");
          var json = result.jobs;
          var total = result.total; 
          out["pass_it"].total =total;
          
          for (var i = 0; i < json.length; i++) {
            var job = {};
            job.title = json[i].title;
            job.url = json[i].applyUrl;
            job.source_jobtype = json[i].employmentType;
            job.dateposted_raw = json[i].datePosted.split('T').shift().split('-');
            job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[2]}/${job.dateposted_raw[0]}`;
            job.location = json[i].customFields.Job_AllLocations.stringValues[0];
            job.reqid = json[i].identifier; 
            job.html = json[i].description; 
                //limpieza
                job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
                job.html = removeTextAfter(job.html, 'Application Instructions', true);
            
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
            //job.title = job.title.split(": ").pop().split("|").shift();
            //job.location = json[i].jobSite;
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;            
            //job.source_salary = json[i].;            
            //job.dateclosed_raw = json[i].;
            job.temp = 1;
            
            //multilocation
            job.location =job.location.split("\n");
            job.location.map(location =>{
              var jobx = {...job};
              jobx.location = location.split('-').reverse().join(', ').trim();
              jobs.push(jobx);
            });   
          }
        },
        error: function (error) {
          msg(error);
        }
      });
    out["jobs"] = jobs;
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

//Paginacion 
(function() {
    var out = {}; 
    out["pass_it"] = pass_it;   
    out["pass_it"].cont+= 20;
    if(out["pass_it"].cont < out["pass_it"].total){
        out["has_next_page"] = true;
    }else {
        out["has_next_page"] = false;
    }
 
    return out;
})();