(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("tr.alternative_1 , tr.alternative_0");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("td.real_table_col1 , td.real_table_col0 > a").textContent.trim();
      if (job.title.indexOf("-") > -1) {
        job.title = job.title.split("-")[0].trim();
      }
      job.title=job.title.replace('(m/w/d)','');
  
      job.url = elem.querySelector("td.real_table_col1 > a").href.trim();
      job.location = elem.querySelector("td.real_table_col2").textContent.replace("weltweit", "Beckum").trim();
      job.source_location = elem.querySelector("td.real_table_col2").textContent.trim();
      job.reqid = job.url.split('-de-').pop().split('.')[0]
      job.temp = "28/04/22";
      
      
              
          var full_html = getDescription(job.url);
          var div = document.createElement("div");
          div.innerHTML = full_html;
          
          //sacar las variables
          if(div.querySelector('script[type="application/ld+json"]')){
            // Extract text on the script
            var html=div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
            //convert text to json
            var json=JSON.parse(html);
           //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
           var date=json.datePosted.split("T").shift().split("-");
            job.dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
            
            var description=json.responsibilities;
            job.jobdesc=description;
          }
    
  
  //LIMPIANDO
    
    job.jobdesc = description
    //job.dateclosed_raw = dateclosed_returned(tmp);  //sent element with html description - enviar elemento con el html de la descripcion.        
    if (job.jobdesc.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
    if (job.jobdesc.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
    if (job.jobdesc.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
    if (job.jobdesc.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }
  
    job.jobdesc = removeTextBefore(job.jobdesc, "Key responsibilities:", false);            
    job.jobdesc = removeTextAfter(job.jobdesc, "George Weston Limited recognizes", true);
    job.jobdesc      = cleanHTML(job.jobdesc);
      
      
  
      if(job.location.indexOf(",") > -1) {
        var array = job.location.split(",");
        for (var i in array) {
          var jobx = {};
          jobx.title = job.title;
          jobx.url = job.url;
          jobx.dateposted_raw = job.dateposted_raw;
          jobx.jobdesc = job.jobdesc;
          jobx.reqid  = job.reqid ;
          //jobx.source_salary = job.source_salary;
          //jobx.logo = job.logo;
          //jobx.source_empname = job.source_empname;
          //jobx.dateposted_raw = job.dateposted_raw;
          //jobx.html = job.html;
          //jobx.jobdesc= job.jobdesc;
          jobx.location = array[i].trim();
          jobx.location=jobx.location+" , Deutschland";
          jobx.temp = job.temp;
          if (jobx.location.length > 0) {
            jobs.push(jobx);
          }
        }
      }
      else {
        job.location = job.location+" , Deutschland";
        jobs.push(job);
      }
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
  
      //jobs.push(job);
      
  
      
    } 
  
    out["jobs"]= jobs;
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