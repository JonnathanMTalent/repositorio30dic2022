//job site: https://hire.myavionte.com/app/careers/#/jobs/EtnB8FiDM4U/MoaInVnOAMg//

(async function() { 
    let out = {};
    let jobs_returned = [];
        let jobs = document.querySelectorAll('div[class="job-item job-items-3 clearfix"]')
        for (let i = 0; i <jobs.length; i++) {
            let elem = jobs[i]; 
            let job = {};
            let current_button  = document.querySelectorAll('div[class="job-item job-items-3 clearfix"]')[i];            
                job.title = elem.querySelector('span[ng-bind="::job.jobTitle"]').textContent.trim();
                //job.dateclosed_raw = elem.querySelector(  "td:nth-child(2)").textContent.trim().split("/");
                //job.dateclosed_raw = job.dateclosed_raw[1] + "/" + job.dateclosed_raw[0] + "/" + job.dateclosed_raw[2];
                job.location = elem.querySelector('span[ng-bind*="::job.location"]').textContent.trim();
                //job.source_location = "";
                current_button.click();
                await waitingFor('div.job-description  div'); 
                job.url = window.location.href;
                let fullhtml = document.querySelector('div[class="job-description"]');
                job.html = fullhtml.innerHTML.trim();
                //job.html = removeTextBefore(job.html, 'Job Description', false);
                //job.html = removeTextAfter(job.html, 'Person Specification', true);
                //job.html      = cleanHTML(job.html);
                var tmp       = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc   = tmp.textContent.trim();
                //job.jobdesc   = cleanHTML(job.jobdesc);
                
                document.querySelector("div.job-actions-back > button").click(); //go back to the job site
                await waitingFor('div[class="job-item job-items-3 clearfix"]');  //Wait for the jobs -wait selector of jobs
                jobs_returned.push(job);
        }
out["jobs"] = jobs_returned;
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