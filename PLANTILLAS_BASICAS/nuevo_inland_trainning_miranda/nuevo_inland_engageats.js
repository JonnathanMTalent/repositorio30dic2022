//job site 1:  https://thevitagroup.engageats.co.uk/LoginV2.aspx
//job site 2:  https://www.cityofglasgowcollege.engageats.co.uk/LoginV2.aspx?enc=vDVLPY6BrOnmx9szwB5icMU/Bp97ap1BlI/jb0LhRYVeoh/cn5bYgvW+9EbbSw7a
//job site 3:  https://recruitmentbromley.engageats.co.uk

(async function() { 
    let out = {};
    let jobs_returned = [];
        let jobs = document.querySelectorAll('tr[id*="ctl00_CPH1_vcyS_vsGrid_ctl00__"]')
        for (let i = 0; i <jobs.length; i++) {
            let elem = jobs[i]; 
            let job = {};
            let current_button  = document.querySelectorAll('input[alt="View"]')[i];            
                job.title = elem.querySelector("span.VacTitle").textContent.trim();
                job.url = window.location.href;
                job.dateclosed_raw = elem.querySelector("td:nth-child(2)").textContent.trim().split("/");
                job.dateclosed_raw = job.dateclosed_raw[1] + "/" + job.dateclosed_raw[0] + "/" + job.dateclosed_raw[2];
                job.location = "Manchester, England, UK";
                job.source_location = "";
                current_button.click();
                await waitingFor("td.descWidth");
                let fullhtml = document.querySelector("td.descWidth");
                job.html = fullhtml.innerHTML.trim();
                //job.html = removeTextBefore(job.html, 'Job Description', false);
                //job.html = removeTextAfter(job.html, 'Person Specification', true);
                //job.html      = cleanHTML(job.html);
                var tmp       = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc   = tmp.textContent.trim();
                //job.jobdesc   = cleanHTML(job.jobdesc);
                current_button  = document.querySelectorAll('input[alt="View"]')[i];
                current_button.click();
                await waitForHide("td.descWidth");
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