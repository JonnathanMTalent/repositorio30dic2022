//peoplestreme

//Extract

(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var seguir = true;
    var json;
  
    do {
  
      //var data = {};
  
      $.ajax({
  
        url: 'https://www.v8peoplestreme.net/resthaven/api/api/erecjobboard/getjobs?jobBoard=external&batchSize=10&pageNo='+counter, //URL DEL JSON 
  
        headers: {
  
          "accept": "*/*",
          "accept-language": "es-ES,es;q=0.9",
          "content-type": "application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"//HEADERS
        },
  
        type: 'GET', 
        //data: JSON.stringify(data),
        dataType: "json", 
        async: false, 
        success: function (result) {
          // out["expected_jobs"] = result.totalCount;
          json = result.jobs; 
  
          var stop_pag = json;
          if (stop_pag.length < 1) {
            seguir = false;
            msg(`---> FINAL DE PAGINACIÓN`);
          }
  
          for (var i in json) {
            var job = {};
            job.title = json[i].title;
            job.reqid = json[i].id;
  
            job.url = "https://hcm616.peoplestreme.net/resthaven/erec_external.asp?jobId=" + job.reqid;
  
            job.location = json[i].location + ", AU";
            job.location = job.location.replace("All Areas","Wayville, Adelaide, South Australia").trim();
  
            var closed = json[i].externalClosingDate.split("/");
            job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
  
            //job.dateposted_raw = json[i].;
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;
  
            job.source_jobtype = json[i].type;
            job.source_salary = json[i].salaryFrom + " to " + json[i].salaryTo + " " + json[i].salaryPeriod;
            job.source_salary = job.source_salary.replace("null to null","").trim();
  
            job.html= json[i].longDescription;
  
            job.html = removeTextBefore(job.html, 'This opportunity:', false);
            job.html = removeTextBefore(job.html, 'You will have:', false);
            job.html = removeTextBefore(job.html, 'Role requirements', false);
            
            job.html = removeTextAfter(job.html, 'Applications close', true);
            job.html = removeTextAfter(job.html, 'Apply now', true);
            job.html = removeTextAfter(job.html, 'For enquiries', true);
            job.html = removeTextAfter(job.html, 'For further queries', true);
            job.html = removeTextAfter(job.html, 'For any enquiries', true);
            job.html = removeTextAfter(job.html, 'Please contact', true);
            job.html = removeTextAfter(job.html, 'Interviews will be taking place', true);
            job.html = removeTextAfter(job.html, 'Enquiries are welcome', true);
  
  
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
  
            job.temp = 1;
            jobs.push(job);
          }
  
          counter += 1;
          msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
        },
        error: function (error) {
          msg(error);
        }
      });
  
    } while (seguir);
  
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