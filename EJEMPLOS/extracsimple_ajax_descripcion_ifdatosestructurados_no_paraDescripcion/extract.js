(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.dp-job-item');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('div.dp-job-title a').textContent.trim();
        job.url = elem.querySelector('div.dp-job-title a').href.trim();
 
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;

       // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        //to job.location = div.querySelector('div.dp-job-location').textContent.trim();
        var full_html = getDescription(job.url);
        var div = document.createElement("div");
        div.innerHTML = full_html;
        
        // jjjjjjjjjjjjjjjjjjjjjjjjjjjjj SPAN DEL JSON DATEPOSTED RAWjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
if(div.querySelector('script[type="application/ld+json"]')){
  // Extract text on the script
  var t=JSON.parse(div.querySelector('script[type="application/ld+json"]').textContent);
  var dto=t["@graph"][0].datePublished
  //convert text to json
 //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
 var date=dto.split("T").shift().split("-");
  job.dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
}
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        
        //sacar las variables
        job.location = div.querySelector('div.dp-job-location').textContent.trim();
        job.location=job.location+", AU";
        
        
        var desc = div.querySelector("div.dp-content-wrapper-main");
        //msg("LO QUE HAY EN EL DESC ES: "+desc);
        
          job.html = desc.innerHTML.trim(); 
          job.jobdesc = removeTextBefore(job.html, 'About the Role', false);
          job.jobdesc = removeTextAfter(job.html, 'if this sounds like the role for you', true);
          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);

    job.jobdesc   = cleanHTML(job.jobdesc);
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

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