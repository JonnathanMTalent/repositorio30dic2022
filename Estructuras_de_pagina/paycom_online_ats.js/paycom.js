(function() {
  var out = {};
  var jobs = [];
  var html_jobs = document.querySelectorAll('#results .JobListing a'); 

  for (var x in html_jobs) {
      if (typeof html_jobs[x] === "function") continue;
      if (typeof html_jobs[x] === "number") continue;

      var job = {};
      var elem = html_jobs[x];

      job.title = elem.querySelector('span.jobInfoLine.jobTitle').textContent.split("(3").shift().split("(2").shift().trim();
     
      job.url = elem.href.trim();
/*
      var location = elem.querySelector('span.jobInfoLine.jobLocation.JobListing__subTitle').textContent
      job.source_location = elem.querySelector('span.jobInfoLine.jobLocation.JobListing__subTitle').textContent
      if(location.split("-").length > 1){
        job.location = location.split("|").pop().split('-').pop();
        job.location = job.location.split('-').pop().trim();
        job.location = job.location.replace(/[0-9]|Remote|\(|\)/gi, "").trim();
      } else {
        job.location = "Buckhannon, US"
        job.source_location = '';
      }
      */
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
var full_html = getDescription(job.url);
var div = document.createElement("div");
div.innerHTML = full_html;
var desc = div.querySelector('div[name="main"]');


if(div.querySelector('script[type="application/ld+json"]')){
  // Extract text on the script
  var html=div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  //convert text to json
  var json=JSON.parse(html);
 //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
 var date=json.datePosted.split("T").shift().split("-");
  job.dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
  job.location=json.jobLocation.address.addressLocality+" ,"+json.jobLocation.address.addressRegion+", "+json.jobLocation.address.addressCountry;


}
      
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          job.html = removeTextAfter(job.html, "Nimm am Besten gleich Kontakt auf:", true);
          //job.html = removeTextBefore(job.html, "", false);
        
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

      job.source_jobtype = elem.querySelector('.JobListing__subTitle').textContent.split(" | ")[0].trim();   
      job.reqid = job.url.split("job=").pop().split("&").shift().trim();
      job.temp = 1826;
      
      jobs.push(job);
  }
  out["jobs"] = jobs;
  return out;
})();

function getDescription(url) {
var xhrrequest = new XMLHttpRequest();
xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
//xhrrequest.setRequestHeader(header, value);
var response = "";
xhrrequest.onreadystatechange = function() {
if (xhrrequest.readyState == 4 && xhrrequest.status == 200) { 
    //console.log(xhrrequest.responseText);
    response = xhrrequest.responseText;
}
};
xhrrequest.send();
return response;
}
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