(function() {
    var job = {};
    var out = {};
    var json;
    let feedType = 'WMGUS';
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
          //job.html = removeTextBefore(job.html, 'Your role:', false);
          job.html = removeTextBefore(job.html, 'A little bit about our team:', false);
          job.html = removeTextBefore(job.html, 'Your role:', false);
            job.html = removeTextAfter(job.html, 'Love this job and want to apply', true);
          //job.html = removeTextAfter(job.html, 'Thanks for your interest', true);
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
/*(function() {
var out = {};
var job = {};
var selector = 'div[aria-labelledby*="Description"]';
var remove_selectors = ["a"];
//var job = pass_it["job"];
var full_html = document.querySelector(selector);
// remove something from the jobdatata
if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;

job.html      = full_html.innerHTML.trim(); 

if(document.querySelector('div[id="labeledImage.JOB_TYPE"]')){
job.source_jobtype = document.querySelector('div[id="labeledImage.JOB_TYPE"]').textContent.trim();}
  else {job.source_jobtype = ''}
  msg(job.source_jobtype);

job.html = removeTextBefore(job.html, 'A little bit about our team:', false);
//job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
//job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
//job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
//job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
//job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
job.html = removeTextAfter(job.html, 'Love this job and want to apply', true);
//job.html = removeTextAfter(job.html, 'Application Instructions', true);
//job.html = removeTextAfter(job.html, 'Application Instructions', true);
//job.html = removeTextAfter(job.html, 'Application Instructions', true);
//job.html = removeTextAfter(job.html, 'Application Instructions', true);
//job.html = removeTextAfter(job.html, 'Application Instructions', true);
job.html      = cleanHTML(job.html);
var tmp       = document.createElement('div');
tmp.innerHTML = job.html;
job.jobdesc   = tmp.textContent.trim();
job.jobdesc   = cleanHTML(job.jobdesc);

if (job.jobdesc.length<100){ job.flag_active = 0}

out["job"] = job;
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
}*/