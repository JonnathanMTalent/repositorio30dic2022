//Extract
(async () => {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["page"]) {
        out["pass_it"] = {
            "page": 0,
            "jobs": 0,
            "totalJobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    let cid = window.location.href.split("cid=").pop().split("&").shift();
    let ccId = window.location.href.split("ccId=").pop().split("&").shift();
    let lang = window.location.href.split("lang=").pop().split("&").shift();
    let time = new Date();
    time = Date.now();
    try {
        let jobs = [];
        const page = out.pass_it['page']
        const resp = await fetch(`https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=${cid}&timeStamp=${time}&lang=${lang}&iccFlag=yes&eccFlag=yes&ccId=${ccId}&locale=${lang}&$top=20&$skip=${page}`);
        const data = await resp.json(); // The response.json() method parses the response as JSON and returns a promise. if request not return a JSON necessary change to 'resp.text()'
        // msg(data);
        // Job data
        const json_jobs = data.jobRequisitions;
        out["pass_it"]["jobs"] = data.meta.totalNumber; // stop condition
        out["pass_it"]["totalJobs"] = out["pass_it"]["totalJobs"] + json_jobs.length; // all jobs
        for (i in json_jobs) {
            let job = {}; /*init*/
            let elem = json_jobs[i];
            job.title = elem.requisitionTitle;
            job.url = `https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=${cid}&ccId=${ccId}&jobId=${elem.customFieldGroup.stringFields[0].stringValue}&lang=${lang}`
            job.reqid = elem.clientRequisitionID;
            //job.source_location = elem.positionOfsource_location;
            //job.street_location = elem.positionOfstreet_location;
            job.dateposted_raw = elem.postDate.split("T").shift();
            job.dateposted_raw = `${job.dateposted_raw.split("-")[1]}/${job.dateposted_raw.split("-")[2]}/${job.dateposted_raw.split("-")[0]}`;
            //job.dateclosed_raw = elem.positionOf.dateposted_raw;
            //job.logo = elem.positionOflogo;
            //job.source_apply_email = elem.positionOfemail;
            //job.source_empname = elem.positionOfempname;
            job.source_jobtype = elem.workLevelCode?.shortName
            //job.source_salary = elem.positionOfsalary;
            job.temp = "1";
            elem.requisitionLocations.map(a =>{
              var jobw = {...job};
              jobw.source_location = a.nameCode.shortName;
              let loc = [];
              if(a.address.cityName)loc.push(a.address.cityName);
              if(a.address.countrySubdivisionLevel1.codeValue)loc.push(a.address.countrySubdivisionLevel1.codeValue)
              jobw.location = loc.join(", ");
              jobs.push(jobw);
            })
        }
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
        // handle errors with fetch petion here
        //console.log(err)
    }
})();


//Pagination
(function() {
    var out = {};  
    out["pass_it"] = pass_it;
    out.pass_it.page+=20;
    out["has_next_page"] = out.pass_it.totalJobs < out.pass_it.jobs ? true : false;  
    return out;
  })();


//Jobdesc

(async () => {
    let out = {};
    let job = {};
    let jobid = pass_it["job"].link.split("jobId=").pop().split("&").shift();
    let cid = pass_it["job"].link.split("cid=").pop().split("&").shift();
    let ccId = pass_it["job"].link.split("ccId=").pop().split("&").shift();
    let lang = pass_it["job"].link.split("lang=").pop().split("&").shift();
    let time = new Date();
    time = Date.now();
    try {
        const resp = await fetch(`https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions/${jobid}?cid=${cid}&timeStamp=${time}&lang=en_US&ccId=${ccId}&locale=${lang}`);
        const data = await resp.json(); // The response.json() method parses the response as JSON and returns a promise. if request not return a JSON necessary change to 'resp.text()'
        if (data.payGradeRange) job.source_salary = `${data.payGradeRange.minimumRate.amountValue} to ${data.payGradeRange.maximumRate.amountValue}`;
        let full_html = document.createElement("div");
        full_html.innerHTML = data.requisitionDescription;
        full_html.querySelectorAll("a, style, script, button, input").forEach(a => {a.remove()});
        msg(job)
        job.html = full_html.innerHTML.trim();
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        out["job"] = job;
        return out;
    } catch (err) {
        throw err;
        // handle errors with fetch petion here
        //console.log(err)
    }
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